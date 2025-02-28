const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const partidasFilePath = path.join(__dirname, '../data/partidas.json');

function lerPartidas() {
  if (fs.existsSync(partidasFilePath)) {
    const data = fs.readFileSync(partidasFilePath, 'utf8');
    console.log('Conteúdo do arquivo JSON:', data); // Adicione esta linha para log
    return JSON.parse(data);
  }
  return [];
}

function escreverPartidas(partidas) {
  fs.writeFileSync(partidasFilePath, JSON.stringify(partidas, null, 2));
}

// Criar partida
router.post('/', (req, res) => {
  console.log('Recebendo solicitação para criar partida:', req.body);
  try {
    const { titulo, local, data, horario } = req.body;
    const partidas = lerPartidas();
    const partida = {
      id: Date.now().toString(),
      titulo,
      local,
      data,
      horario,
      jogadores: []
    };
    partidas.push(partida);
    escreverPartidas(partidas);
    res.status(201).json(partida);
  } catch (error) {
    console.error('Erro ao criar partida:', error);
    res.status(500).json({ error: 'Erro ao criar partida' });
  }
});

// Listar partidas
router.get('/', (req, res) => {
  try {
    const partidas = lerPartidas();
    res.json(partidas);
  } catch (error) {
    console.error('Erro ao listar partidas:', error);
    res.status(500).json({ error: 'Erro ao listar partidas' });
  }
});

// Obter detalhes de uma partida específica
router.get('/:id', (req, res) => {
  try {
    const id = req.params.id;
    const partidas = lerPartidas();
    const partida = partidas.find(p => p.id === id);
    if (partida) {
      res.json(partida);
    } else {
      res.status(404).json({ error: 'Partida não encontrada' });
    }
  } catch (error) {
    console.error('Erro ao obter detalhes da partida:', error);
    res.status(500).json({ error: 'Erro ao obter detalhes da partida' });
  }
});

// Adicionar jogador à partida
router.post('/:id/jogadores', (req, res) => {
  try {
    const id = req.params.id;
    const { nome, telefone } = req.body;
    const partidas = lerPartidas();
    const partida = partidas.find(p => p.id === id);
    if (partida) {
      const jogador = { id: Date.now().toString(), nome, telefone, confirmado: false };
      partida.jogadores.push(jogador);
      escreverPartidas(partidas);
      res.status(201).json(jogador);
    } else {
      res.status(404).json({ error: 'Partida não encontrada' });
    }
  } catch (error) {
    console.error('Erro ao adicionar jogador:', error);
    res.status(500).json({ error: 'Erro ao adicionar jogador' });
  }
});

// Confirmar presença do jogador
router.put('/:id/jogadores/:jogadorId/confirmar', (req, res) => {
  try {
    const id = req.params.id;
    const jogadorId = req.params.jogadorId;
    const partidas = lerPartidas();
    const partida = partidas.find(p => p.id === id);
    if (partida) {
      const jogador = partida.jogadores.find(j => j.id === jogadorId);
      if (jogador) {
        jogador.confirmado = true;
        escreverPartidas(partidas);
        res.json(jogador);
      } else {
        res.status(404).json({ error: 'Jogador não encontrado' });
      }
    } else {
      res.status(404).json({ error: 'Partida não encontrada' });
    }
  } catch (error) {
    console.error('Erro ao confirmar presença do jogador:', error);
    res.status(500).json({ error: 'Erro ao confirmar presença do jogador' });
  }
});

// Excluir partida
router.delete('/:id', (req, res) => {
  try {
    const id = req.params.id;
    let partidas = lerPartidas();
    const partidaIndex = partidas.findIndex(p => p.id === id);
    if (partidaIndex !== -1) {
      partidas.splice(partidaIndex, 1);
      escreverPartidas(partidas);
      res.json({ deletedID: id });
    } else {
      res.status(404).json({ error: 'Partida não encontrada' });
    }
  } catch (error) {
    console.error('Erro ao excluir partida:', error);
    res.status(500).json({ error: 'Erro ao excluir partida' });
  }
});

module.exports = router;
