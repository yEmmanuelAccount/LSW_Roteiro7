document.addEventListener('DOMContentLoaded', () => {
  const criarPartidaBtn = document.getElementById('criarPartidaBtn');
  const formPartida = document.getElementById('formPartida');
  const partidaForm = document.getElementById('partidaForm');
  const listaPartidas = document.getElementById('listaPartidas');

  const apiBaseUrl = 'http://127.0.0.1:3000/api/partidas'; // Certifique-se de usar a porta correta onde o servidor está rodando.

  if (criarPartidaBtn) {
    criarPartidaBtn.addEventListener('click', () => {
      formPartida.style.display = 'block';
    });
  }

  if (partidaForm) {
    partidaForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const titulo = document.getElementById('titulo').value;
      const local = document.getElementById('local').value;
      const data = document.getElementById('data').value;
      const horario = document.getElementById('horario').value;

      const partida = {
        titulo: titulo,
        local: local,
        data: data,
        horario: horario
      };

      try {
        const response = await fetch(apiBaseUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(partida)
        });

        if (response.ok) {
          carregarPartidas();
        } else {
          alert('Erro ao criar a partida.');
        }
      } catch (error) {
        alert('Erro ao conectar com o servidor.');
      }
      partidaForm.reset();
      formPartida.style.display = 'none';
    });
  }

  async function carregarPartidas() {
    try {
      const response = await fetch(apiBaseUrl);
      const partidas = await response.json();

      listaPartidas.innerHTML = '';
      partidas.forEach(partida => {
        const partidaItem = document.createElement('div');
        partidaItem.classList.add('partida-item');
        partidaItem.innerHTML = `
          <h2>${partida.titulo}</h2>
          <p>${partida.data} às ${partida.horario}</p>
          <p>${partida.local}</p>
          <button onclick="abrirDetalhesPartida('${partida.id}')">Detalhes</button>
        `;

        listaPartidas.appendChild(partidaItem);
      });
    } catch (error) {
      alert('Erro ao carregar as partidas.');
    }
  }

  window.abrirDetalhesPartida = function(id) {
    window.location.href = `partidaDetalhes.html?id=${id}`;
  };

  carregarPartidas();
});
