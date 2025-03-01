document.addEventListener('DOMContentLoaded', function() {
    fetchMatches();

    document.querySelector('#createMatchButton').addEventListener('click', function() {
        const title = document.querySelector('#matchTitle').value;
        const location = document.querySelector('#matchLocation').value;
        const date = document.querySelector('#matchDate').value;
        const time = document.querySelector('#matchTime').value;

        fetch('http://localhost:3000/criarPartida', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                titulo: title,
                local: location,
                data: date,
                horario: time
            })
        })
        .then(response => response.text())
        .then(data => {
            alert(data);
            fetchMatches(); 
        })
        .catch(error => console.error('Erro:', error));
    });
});

function fetchMatches() {
    fetch('http://localhost:3000/partidas')
    .then(response => response.json())
    .then(partidas => {
        const matchList = document.querySelector('#matchList');
        matchList.innerHTML = '';
        partidas.forEach((partida, index) => {
            const listItem = document.createElement('li');
            listItem.classList.add('list-group-item', 'match-item');
            listItem.innerHTML = `
                <div class="match-header">
                    <span>${partida.titulo} - ${partida.local} - ${partida.data} - ${partida.horario}</span>
                    <button class="btn btn-secondary btn-sm toggle-btn">▼</button>
                </div>
                <div class="match-options" style="display: none;">
                    <button class="btn btn-primary btn-sm" onclick="addPlayer(${index})">Adicionar Jogador</button>
                    <button class="btn btn-info btn-sm" onclick="viewPlayers(${index})">Ver Jogadores</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteMatch(${index})">Excluir Partida</button>
                </div>
            `;

            // Evento para expandir/recolher opções
            const toggleBtn = listItem.querySelector('.toggle-btn');
            toggleBtn.addEventListener('click', function() {
                const optionsDiv = listItem.querySelector('.match-options');
                const isVisible = optionsDiv.style.display === 'block';
                optionsDiv.style.display = isVisible ? 'none' : 'block';
                toggleBtn.textContent = isVisible ? '▼' : '▲';
            });

            matchList.appendChild(listItem);
        });
    })
    .catch(error => console.error('Erro:', error));
}

function addPlayer(index) {
    const playerName = prompt('Digite o nome do jogador:');
    const playerPhone = prompt('Digite o telefone do jogador:');
    if (playerName && playerPhone) {
        fetch(`http://localhost:3000/partidas/${index}/jogadores`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome: playerName,
                telefone: playerPhone
            })
        })
        .then(response => response.text())
        .then(data => {
            alert(data);
        })
        .catch(error => console.error('Erro:', error));
    } else {
        alert('Nome e telefone são obrigatórios!');
    }
}

function viewPlayers(index) {
    fetch(`http://localhost:3000/partidas/${index}/jogadores`)
    .then(response => response.json())
    .then(jogadores => {
        if (jogadores.length === 0) {
            alert('Nenhum jogador adicionado ainda.');
        } else {
            let playerList = 'Jogadores:\n';
            jogadores.forEach(jogador => {
                playerList += `- ${jogador.nome} (${jogador.telefone})\n`;
            });
            alert(playerList);
        }
    })
    .catch(error => console.error('Erro:', error));
}

function deleteMatch(index) {
    if (confirm('Tem certeza que deseja excluir esta partida?')) {
        fetch(`http://localhost:3000/partidas/${index}`, {
            method: 'DELETE',
        })
        .then(response => response.text())
        .then(data => {
            alert(data);
            fetchMatches(); // Atualiza a lista de partidas
        })
        .catch(error => console.error('Erro:', error));
    }
}
