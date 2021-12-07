### Node.js API RESTFul Cookmaster

API desenvolvida utilizando padrão REST onde é possível fazer o cadastro e login de pessoas usuárias, onde apenas essas pessoas poderão acessar, modificar e deletar as receitas que cadastrou.

Ferramentas utilizadas:

- JavaScript;
- Node.js;
- Express.js;
- MongoDB;
- JWT;
- Multer;
- Mocha e Sinon para os testes;

Todas as camadas da aplicação (Models, Services, Controllers, Routers e Middlewares) que foi construída com base na arquetura MSC, estão localizados na pasta `src`, na raiz da aplicação, bem como os testes de integração;

Através dessa aplicação é possível realizar as operações básicas que se pode fazer em um determinado banco de dados: Criação, Leitura, Atualização e Exclusão de receitas e imagens utilizando MongoDB como banco de dados NoSQL.

Para realizar qualquer tipo de alteração no banco de dados (como cadastro, edição ou exclusão de receitas) é necessário o usuário cadastar-se ou autenticar-se, onde será emitido `JSON Web Token` (JWT). Além disso, as pessoas usuárias devem poder ser clientes ou administradores. Pessoas clientes apenas poderão disparar ações nas receitas que ele mesmo criou. Já uma pessoa administradora pode disparar qualquer ação em qualquer receita.

###Endpoints

`POST /users` - cadastra de um novo usuário;

`POST /users/admin` - cadastra de um novo admin, ação somente permitida para usuários administradores;

`POST /login` - autentica um usuário e gerar o token JWT;

`GET /recipes` - retorna uma lista com todas as receitas cadastradas;

`GET /recipes/:id` - retorna a receita específica que contém o id passado como parâmetro, se existir;

`POST /recipes/:id` - cadastra uma nova receita;

`PUT /recipes/:id` - edita a receita específica, sendo permitido apenas pelo usuário que a cadastrou ou administradores;

`DELETE /recipes/:id` - exclui a receita específica, sendo permitido apenas pelo usuário que a cadastrou ou administradores;

`PUT /recipes/:id` - faz o upload de uma imagem enviada na requisição paraa receita específica, sendo permitido apenas pelo usuário que a cadastrou ou administradores;

`GET /images/<nomeDaImagem.extensão>` - retorna a imagem passada como parâmetro na requisição, se existir;