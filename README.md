### Node.js API RESTful Cookmaster

API desenvolvida utilizando padrão REST onde é possível fazer o cadastro e login de pessoas usuárias, bem como cadastro e requisição de receitas e upload de suas imagens.

Ferramentas utilizadas:

- JavaScript;
- Node.js;
- Express.js;
- MongoDB;
- JWT;
- Multer;
- Mocha e Sinon para os testes;

Todas as camadas da aplicação (Models, Services, Controllers, Routers e Middlewares) que foi construída com base na arquitetura MSC estão localizadas nas suas respectivas pastas dentro da pasta `src`, na raiz da aplicação, juntamente com os testes de integração;

Através dela é possível realizar as operações básicas que se pode fazer em um determinado banco de dados: Criação, Leitura, Atualização e Exclusão de receitas e imagens utilizando MongoDB como banco de dados NoSQL.

Para realizar qualquer tipo de alteração no banco de dados (como cadastro, edição ou exclusão de receitas) é necessário o usuário cadastrar-se ou autenticar-se, onde será emitido um `JSON Web Token` (JWT). Além disso, as pessoas usuárias devem poder ser clientes ou administradores. Pessoas clientes apenas poderão disparar ações nas receitas que elas mesmas criaram. Já uma pessoa administradora pode disparar qualquer ação em qualquer receita.

### Endpoints

`POST /users` - cadastra um novo usuário;

`POST /users/admin` - cadastra um novo admin, ação somente permitida para usuários administradores;

`POST /login` - autentica um usuário e gera o token JWT;

`GET /recipes` - retorna uma lista com todas as receitas cadastradas;

`GET /recipes/:id` - retorna a receita específica que contém o id passado como parâmetro, se existir;

`POST /recipes` - cadastra uma nova receita;

`PUT /recipes/:id` - edita a receita específica, sendo permitida apenas pelo usuário que a cadastrou ou administradores;

`DELETE /recipes/:id` - exclui a receita específica, sendo permitido apenas pelo usuário que a cadastrou ou administradores;

`PUT /recipes/:id/image` - faz o upload de uma imagem enviada na requisição para receita específica, sendo permitido apenas pelo usuário que a cadastrou ou administradores;

`GET /images/<id-da-receita.extensão>` - retorna a imagem passada como parâmetro na requisição, se existir;
