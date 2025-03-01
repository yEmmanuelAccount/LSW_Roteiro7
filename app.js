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
        partidas.forEach(partida => {
            const listItem = document.createElement('li');
            listItem.classList.add('list-group-item');
            listItem.textContent = `${partida.titulo} - ${partida.local} - ${partida.data} - ${partida.horario}`;
            matchList.appendChild(listItem);
        });
    })
    .catch(error => console.error('Erro:', error));
}
