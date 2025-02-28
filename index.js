document.addEventListener("DOMContentLoaded", () => {
    const listaPartidas = document.getElementById("ListaPartidas");
    const btnNovaPartida = document.getElementById("buttonNovaPartida");

    btnNovaPartida.addEventListener("click", () => {
        alert("Funcionalidade de criação ainda não implementada.");
    });

    function carregarPartidas() {
        fetch("http://localhost:3000/partidas")
            .then(response => response.json())
            .then(data => {
                listaPartidas.innerHTML = "";
                data.forEach(partida => {
                    const div = document.createElement("div");
                    div.classList.add("box");
                    div.innerHTML = `<strong>${partida.titulo}</strong> - ${partida.local} - ${partida.data} ${partida.horario}`;
                    listaPartidas.appendChild(div);
                });
            })
            .catch(error => console.error("Erro ao carregar partidas:", error));
    }

    carregarPartidas();
});
