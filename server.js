const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const filePath = path.join(__dirname, 'partidas.json');

// Rota para criar nova partida
app.post('/criarPartida', (req, res) => {
    let partidas = [];
    if (fs.existsSync(filePath)) {
        partidas = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    }
    partidas.push({
        ...req.body,
        jogadores: []
    });
    fs.writeFileSync(filePath, JSON.stringify(partidas, null, 2));
    res.status(201).send('Partida criada com sucesso!');
});

// Rota para obter todas as partidas
app.get('/partidas', (req, res) => {
    if (fs.existsSync(filePath)) {
        const partidas = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        res.json(partidas);
    } else {
        res.json([]);
    }
});

// Rota para adicionar jogador a uma partida
app.post('/partidas/:index/jogadores', (req, res) => {
    const index = req.params.index;
    let partidas = [];
    if (fs.existsSync(filePath)) {
        partidas = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    }
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
    const index = req.params.index;
    let partidas = [];
    if (fs.existsSync(filePath)) {
        partidas = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    }
    if (partidas[index]) {
        const jogadores = partidas[index].jogadores || [];
        res.json(jogadores);
    } else {
        res.status(404).send('Partida não encontrada');
    }
});

// Rota para excluir uma partida
app.delete('/partidas/:index', (req, res) => {
    const index = req.params.index;
    let partidas = [];
    if (fs.existsSync(filePath)) {
        partidas = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    }
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
