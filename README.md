# Projeto - Assincronismo + NodeJS + Express

## Objetivo

Criar uma aplicação que facilite a organização e marcação de partidas
de futebol entre amigos.

## Funcionalidades

1. Criar partidas: Cada partida deve ter um título, um local, data e horário.
2. Criar lista de presença dos jogadores: Após criar a partida, deve ser permitido adicionar/remover uma lista com os participantes e um telefone para contato.
3. Acompanhar a presença: Essa funcionalidade será usada para "confirmar" quem vai estar presente no dia da partida marcada. Deverá ser apresentada a lista dos jogadores com uma opção para confirmar sua presença.
4. Excluir partida. Deve ser permitido excluir a partida.

## Módulos

Para esse projeto deve ser construído os seguintes módulos:

* Frontend utilizando HTML, CSS e Javascript para controlar os eventos da tela e realizar as requisições para o backend para salvar e recuperar os dados.
    * É permitido utilizar bibliotecas para a estilização das páginas, tais como Bootstrap, Bulma, Semantic, UIKit, etc.

* Backend utilizando NodeJS + Express.
    * Aqui, fique a vontade para utilizar outras bibliotecas que possam facilitar seu trabalho.

## Armazenamento de Dados

Os dados da aplicação devem ser guardados em um arquivo do tipo JSON.

Para isso, utilize as funções nativas do NodeJS para ler (readFile) e escrever arquivos (writeFile).