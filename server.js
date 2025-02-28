const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
const PORT = 3000;
const DB_FILE = "db.json";

app.use(express.json());
app.use(cors());

// Rota para listar partidas
app.get("/partidas", (req, res) => {
    fs.readFile(DB_FILE, "utf8", (err, data) => {
        if (err) return res.status(500).json({ error: "Erro ao ler o banco de dados" });
        res.json(JSON.parse(data));
    });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
