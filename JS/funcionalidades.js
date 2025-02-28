document.addEventListener('DOMContentLoaded', () => {
    const criarPartidaBtn = document.getElementById('criarPartidaBtn');
    const listaPartidas = document.getElementById('listaPartidas');
  
    criarPartidaBtn.addEventListener('click', criarPartida);
  
    function criarPartida() {
      const partida = {
        titulo: prompt('Título da Partida:'),
        local: prompt('Local da Partida:'),
        data: prompt('Data da Partida (AAAA-MM-DD):'),
        horario: prompt('Horário da Partida (HH:MM):')
      };
  
      adicionarPartidaNaLista(partida);
    }
  
    function adicionarPartidaNaLista(partida) {
      const partidaItem = document.createElement('div');
      partidaItem.classList.add('partida-item');
      partidaItem.innerHTML = `
        <h2>${partida.titulo}</h2>
        <p>${partida.data} às ${partida.horario}</p>
        <p>${partida.local}</p>
        <button onclick="abrirDetalhesPartida()">Detalhes</button>
      `;
  
      listaPartidas.appendChild(partidaItem);
    }
  
    window.abrirDetalhesPartida = function() {
      // Abrir página de detalhes da partida
    };
  });
  