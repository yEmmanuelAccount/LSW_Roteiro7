const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const filePath = path.join(__dirname, 'partidas.json');

// Ler partidas
function readPartidas() {
    let partidas = [];
    if (fs.existsSync(filePath)) {
        partidas = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    }
    return partidas;
}

// Rota para criar nova partida
app.post('/criarPartida', (req, res) => {
    let partidas = readPartidas();
    partidas.push({
        ...req.body,
        jogadores: []
    });
    fs.writeFileSync(filePath, JSON.stringify(partidas, null, 2));
    res.status(201).send('Partida criada com sucesso!');
});

// Rota para obter todas as partidas
app.get('/partidas', (req, res) => {
    const partidas = readPartidas();
    res.json(partidas);
});

// Rota para adicionar jogador a uma partida
app.post('/partidas/:index/jogadores', (req, res) => {
    const index = parseInt(req.params.index, 10);
    let partidas = readPartidas();
    if (partidas[index]) {
        partidas[index].jogadores.push(req.body);
        fs.writeFileSync(filePath, JSON.stringify(partidas, null, 2));
        res.send('Jogador adicionado com sucesso!');
    } else {
        res.status(404).send('Partida não encontrada');
    }
});

// Rota para obter jogadores de uma partida
app.get('/partidas/:index/jogadores', (req, res) => {
    const index = parseInt(req.params.index, 10);
    let partidas = readPartidas();
    if (partidas[index]) {
        const jogadores = partidas[index].jogadores || [];
        res.json(jogadores);
    } else {
        res.status(404).send('Partida não encontrada');
    }
});

// Rota para confirmar presença do jogador
app.patch('/partidas/:matchIndex/jogadores/:playerIndex/confirm', (req, res) => {
    const matchIndex = parseInt(req.params.matchIndex, 10);
    const playerIndex = parseInt(req.params.playerIndex, 10);
    let partidas = readPartidas();

    // Logs para depuração
    console.log(`Confirmar presença: matchIndex=${matchIndex}, playerIndex=${playerIndex}`);
    if (partidas[matchIndex]) {
        console.log(`Partida encontrada:`, partidas[matchIndex]);
    } else {
        console.log(`Partida com índice ${matchIndex} não encontrada.`);
    }

    if (partidas[matchIndex] && partidas[matchIndex].jogadores[playerIndex]) {
        partidas[matchIndex].jogadores[playerIndex].presenca = true;
        fs.writeFileSync(filePath, JSON.stringify(partidas, null, 2));
        res.send('Presença confirmada!');
    } else {
        res.status(404).send('Partida ou jogador não encontrado');
    }
});

// Rota para excluir jogador
app.delete('/partidas/:matchIndex/jogadores/:playerIndex', (req, res) => {
    const matchIndex = parseInt(req.params.matchIndex, 10);
    const playerIndex = parseInt(req.params.playerIndex, 10);
    let partidas = readPartidas();

    // Log para depuração
    console.log(`Excluir jogador: matchIndex=${matchIndex}, playerIndex=${playerIndex}`);

    if (partidas[matchIndex] && partidas[matchIndex].jogadores[playerIndex]) {
        partidas[matchIndex].jogadores.splice(playerIndex, 1);
        fs.writeFileSync(filePath, JSON.stringify(partidas, null, 2));
        res.send('Jogador excluído com sucesso!');
    } else {
        res.status(404).send('Partida ou jogador não encontrado');
    }
});

// Rota para excluir uma partida
app.delete('/partidas/:index', (req, res) => {
    const index = parseInt(req.params.index, 10);
    let partidas = readPartidas();
    if (partidas[index]) {
        partidas.splice(index, 1);
        fs.writeFileSync(filePath, JSON.stringify(partidas, null, 2));
        res.send('Partida excluída com sucesso!');
    } else {
        res.status(404).send('Partida não encontrada');
    }
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
