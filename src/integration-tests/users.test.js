const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { ObjectId } = require('mongodb');

const server = require('../api/app');

chai.use(chaiHttp);

const { expect } = chai;

const DBServer = new MongoMemoryServer();

describe('POST /users', () => {
  describe('quando usuário é criado com sucesso', () => {
    let response = {};

    before(async () => {
      const URLMock = await DBServer.getUri();
      const connectionMock = await MongoClient.connect(URLMock,
          { useNewUrlParser: true, useUnifiedTopology: true }
      );

      sinon.stub(MongoClient, 'connect')
        .resolves(connectionMock);

      response = await chai.request(server)
        .post('/users')
        .send({
            name: 'Sif The Wolf',
            email: 'greywolf@gmail.com',
            password: 'defeatTheAbyss38'
        });
    });

    after(async () => {
        MongoClient.connect.restore();
        await DBServer.stop();
    });

    it('retorna o código de status 201', () => {
      expect(response).to.have.status(201);
    });

    it('retorna um objeto', () => {
      expect(response).to.be.a('object');
    });

    it('o objeto possui a propriedade user', () => { 
      expect(response.body).to.have.property('user');
    });

    it('a propriedade user possui name, email, role e _id', () => { 
      const { user } = response.body;
      expect(user).to.have.property('name');
      expect(user).to.have.property('email');
      expect(user).to.have.property('role');
      expect(user).to.have.property('_id');
    });

    it('a resposta retorna name, email e role corretos', () => { 
      const { name, email, role } = response.body.user;
      expect(name).to.be.equal('Sif The Wolf');
      expect(email).to.be.equal('greywolf@gmail.com');
      expect(role).to.be.equal('user');
    });

    it('a resposta retorna um id válido', () => { 
      const { _id } = response.body.user;
      expect(ObjectId.isValid(_id)).to.be.true;
    });
  });

  describe('quando falta o campo "name" na requisição', () => {
    let response = {};

    before(async () => {
      const URLMock = await DBServer.getUri();
      const connectionMock = await MongoClient.connect(URLMock,
          { useNewUrlParser: true, useUnifiedTopology: true }
      );

      sinon.stub(MongoClient, 'connect')
        .resolves(connectionMock);

      response = await chai.request(server)
        .post('/users')
        .send({
            email: 'greywolf@gmail.com',
            password: 'defeatTheAbyss38'
        });
    });

    after(async () => {
      MongoClient.connect.restore();
      await DBServer.stop();
    });

    it('retorna o código de status 400', () => {
      expect(response).to.have.status(400);
    });

    it('retorna a mensagem correta', () => {
      expect(response).to.have.property('text');
      expect(response.text).to.be.equal('{"message":"Invalid entries. Try again."}');
    });
  });

  describe('quando falta o campo "password" na requisição', () => {
    let response = {};

    before(async () => {
      const URLMock = await DBServer.getUri();
      const connectionMock = await MongoClient.connect(URLMock,
          { useNewUrlParser: true, useUnifiedTopology: true }
      );

      sinon.stub(MongoClient, 'connect')
        .resolves(connectionMock);

      response = await chai.request(server)
        .post('/users')
        .send({
            name: 'Sif The Wolf',
            email: 'greywolf@gmail.com'
        });
    });

    after(async () => {
      MongoClient.connect.restore();
      await DBServer.stop();
    });

    it('retorna o código de status 400', () => {
      expect(response).to.have.status(400);
    });

    it('retorna a mensagem correta', () => {
      expect(response).to.have.property('text');
      expect(response.text).to.be.equal('{"message":"Invalid entries. Try again."}');
    });
  });

  describe('quando falta o campo "email" na requisição', () => {
    let response = {};

    before(async () => {
      const URLMock = await DBServer.getUri();
      const connectionMock = await MongoClient.connect(URLMock,
          { useNewUrlParser: true, useUnifiedTopology: true }
      );

      sinon.stub(MongoClient, 'connect')
        .resolves(connectionMock);

      response = await chai.request(server)
        .post('/users')
        .send({
            name: 'Sif The Wolf',
            password: 'defeatTheAbyss38'
        });
    });

    after(async () => {
      MongoClient.connect.restore();
      await DBServer.stop();
    });

    it('retorna o código de status 400', () => {
      expect(response).to.have.status(400);
    });

    it('retorna a mensagem correta', () => {
      expect(response).to.have.property('text');
      expect(response.text).to.be.equal('{"message":"Invalid entries. Try again."}');
    });
  });
});