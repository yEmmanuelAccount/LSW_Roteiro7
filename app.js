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

    // Evento de submit do formulário de adicionar jogador
    document.querySelector('#addPlayerForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const index = document.querySelector('#matchIndexForPlayer').value;
        const playerName = document.querySelector('#playerName').value;
        const playerPhone = document.querySelector('#playerPhone').value;

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
                $('#addPlayerModal').modal('hide');
            })
            .catch(error => console.error('Erro:', error));
        }
    });

    // Evento de confirmação da exclusão de partida
    document.querySelector('#confirmDeleteMatchButton').addEventListener('click', function() {
        const index = document.querySelector('#matchIndexToDelete').value;
        fetch(`http://localhost:3000/partidas/${index}`, {
            method: 'DELETE',
        })
        .then(response => response.text())
        .then(data => {
            alert(data);
            $('#confirmDeleteMatchModal').modal('hide');
            fetchMatches(); // Atualiza a lista de partidas
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
    // Define o índice da partida no input oculto do modal
    document.querySelector('#matchIndexForPlayer').value = index;
    // Limpa os campos do formulário
    document.querySelector('#playerName').value = '';
    document.querySelector('#playerPhone').value = '';
    // Abre o modal para adicionar jogador
    $('#addPlayerModal').modal('show');
}

function viewPlayers(index) {
    fetch(`http://localhost:3000/partidas/${index}/jogadores`)
    .then(response => response.json())
    .then(jogadores => {
        const playerList = document.querySelector('#playerList');
        playerList.innerHTML = ''; // Limpa a lista anterior
        if (jogadores.length === 0) {
            const li = document.createElement('li');
            li.className = 'list-group-item';
            li.textContent = 'Nenhum jogador adicionado ainda.';
            playerList.appendChild(li);
        } else {
            jogadores.forEach((jogador, playerIndex) => {
                const li = document.createElement('li');
                li.className = 'list-group-item d-flex justify-content-between align-items-center';
                li.innerHTML = `<span>${jogador.nome} (${jogador.telefone}) ${jogador.presenca ? '- Presente' : ''}</span>`;
                const btnGroup = document.createElement('div');
                // Botão verde para confirmar presença
                const confirmBtn = document.createElement('button');
                confirmBtn.className = 'btn btn-success btn-sm';
                confirmBtn.textContent = 'Confirmar Presença';
                confirmBtn.addEventListener('click', function() {
                    confirmPresence(index, playerIndex);
                });
                // Botão vermelho para excluir jogador
                const deleteBtn = document.createElement('button');
                deleteBtn.className = 'btn btn-danger btn-sm ml-2';
                deleteBtn.textContent = 'Excluir';
                deleteBtn.addEventListener('click', function() {
                    deletePlayer(index, playerIndex);
                });
                btnGroup.appendChild(confirmBtn);
                btnGroup.appendChild(deleteBtn);
                li.appendChild(btnGroup);
                playerList.appendChild(li);
            });
        }
        // Abre o modal de jogadores
        $('#viewPlayersModal').modal('show');
    })
    .catch(error => console.error('Erro:', error));
}

function confirmPresence(matchIndex, playerIndex) {
    fetch(`http://localhost:3000/partidas/${matchIndex}/jogadores/${playerIndex}/confirm`, {
        method: 'PATCH'
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
        // Atualiza a lista de jogadores
        viewPlayers(matchIndex);
    })
    .catch(error => console.error('Erro:', error));
}

function deletePlayer(matchIndex, playerIndex) {
    if (confirm('Tem certeza que deseja excluir este jogador?')) {
        fetch(`http://localhost:3000/partidas/${matchIndex}/jogadores/${playerIndex}`, {
            method: 'DELETE'
        })
        .then(response => response.text())
        .then(data => {
            alert(data);
            // Atualiza a lista de jogadores
            viewPlayers(matchIndex);
        })
        .catch(error => console.error('Erro:', error));
    }
}

function deleteMatch(index) {
    document.querySelector('#matchIndexToDelete').value = index;
    $('#confirmDeleteMatchModal').modal('show');
}
