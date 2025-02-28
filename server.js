const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/criarPartida', (req, res) => {
    const filePath = path.join(__dirname, 'partidas.json');
    const partidas = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    partidas.push(req.body);
    fs.writeFileSync(filePath, JSON.stringify(partidas, null, 2));
    res.status(201).send('Partida criada com sucesso!');
});

app.get('/partidas', (req, res) => {
    const filePath = path.join(__dirname, 'partidas.json');
    if (fs.existsSync(filePath)) {
        const partidas = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        res.json(partidas);
    } else {
        res.json([]);
    }
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
