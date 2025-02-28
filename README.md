# Objetivo do Projeto

Criar uma aplicação que facilite a organização e marcação de partidas de futebol entre amigos.

# Módulos

Para esse projeto deve ser construído os seguintes módulos:
- Frontend utilizando HTML, CSS e Javascript para controlar os eventos da tela e realizar as requisições para o backend para salvar e recuperar os dados. É permitido utilizar bibliotecas para a estilização das páginas, tais como Bootstrap, Bulma, Semantic, UIKit, etc.
- Backend utilizando NodeJS + Express. Aqui, fique a vontade para utilizar outras bibliotecas que possam facilitar seu trabalho.

# Armazenamento de Dados

Os dados da aplicação devem ser guardados em um arquivo do tipo JSON. Para isso, utilize as funções nativas do NodeJS para ler (readFile) e escrever arquivos (writeFile).

# Funcionalidades

1. Criar partidas. Cada partida deve ter um título, um local, data e horário.
2. Criar lista de presença dos jogadores. Após criar a partida, deve ser permitido adicionar/remover uma lista com os participantes e um telefone para contato.
3. Acompanhar a presença. Essa funcionalidade será usada para "confirmar" quem vai estar presente no dia da partida marcada. Deverá ser apresentada a lista dos jogadores com uma opção para confirmar sua presença.
4. Excluir partida. Deve ser permitido excluir a partida.
5. Os dados da aplicação devem ser guardados em um arquivo do tipo JSON. Para isso, utilize as funções nativas do NodeJS para ler (readFile) e escrever arquivos (writeFile).

# Estrutura

Sua estrutura deve ser essa a seguir, seguindo as "Funcionalidades", citadas anteriormente:

1. uma página inicial (pagInicial.html) com uma apresentação breve sobre o site no body. Uma section com o botão "Criar Partida".

2. Após a partida ser criada, ela deve aparecer em uma lista na página inicial, tendo como destaque seu título, data e horário, e o local sendo uma informação secundária.

3. Após clicar em uma das partidas da lista, ela deve ser aberta uma nova página, mostrando as informações de forma mais detalhada sobre a partida escolhida e com a sessão de "Jogadores", abrindo uma parte com os botões de "Adicionar" e "Acompanhar" (para ver e excluir cada jogador).

4. por fim, um botão de excluir a partida anteriormente criada na página específica dela

# Arquivos

1. usar HTML, CSS, JS
2. deve ser criado um arquivo cores.css, para armazenar em variáveis as cores mais usadas durantes as páginas.
3. cada página deve ter seu css próprio com o cores.css linkado
4. todas as funcionalidades devem estar dentro de um mesmo arquivo (funcionalidades.js)

# Pastas

Pasta 1: JS (para todos os arquivos JS)
* funcionalidades.js (com todas as funções js necessárias para fazer as páginas no site funcionar)

Pasta 2: Paginas (para todos os arquivos HTML)
* pagInicial.html
* partidaDetalhes.html

Pasta 3: Styles (para todos os arquivos CSS)
* cores.css
* pagInicial.css
* partidaDrtalhes.css

Pasta 4: data
* partidas.json

Pasta 5: node_modules
