const express = require('express');
const cors = require('cors'); // Adicione isso
const app = express();
const port = 3000;
const partidasRouter = require('./routes');

app.use(cors()); // Adicione isso
app.use(express.json());
app.use(express.static('Paginas'));
app.use('/api/partidas', partidasRouter);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
