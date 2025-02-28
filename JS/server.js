const express = require('express');
const app = express();
const port = 3000;
const partidasRouter = require('./routes/partidas');

app.use(express.json());
app.use('/api/partidas', partidasRouter);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
