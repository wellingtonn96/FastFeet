import request from 'supertest';
import faker from 'faker';
import api from '../../src/Server';

const MOCK_USER_DEFAULT = {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
};

const USER_UPDATE_DEFAULT = {
  name: 'Guezin',
  email: 'leandroguezin@email.com',
  password_hash: 'test',
  administrator: false,
};

const TOKEN_DEFAULT =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTg1NTc5MjgwLCJleHAiOjE1ODYxODQwODB9.q9kifUHcTeCTE7b4B6KtjaLEaHjp6BcWZXQpEg2R2Tw';

let app = {};

describe('suite de test para users', () => {
  beforeAll(async () => {
    app = await request(api);
  });
  it('/users - deve cadastrar um user', async () => {
    const results = await app
      .post('/users')
      .send(MOCK_USER_DEFAULT)
      .set('authorization', TOKEN_DEFAULT);

    expect(results.statusCode).toBe(200);
  });

  it('/users/id/update - deve atualizar um user', async () => {
    const results = await app
      .put('/users/5/update')
      .send(USER_UPDATE_DEFAULT)
      .set('authorization', TOKEN_DEFAULT);

    expect(results.statusCode).toBe(200);
  });

  it('/users/id/update - deve retornar messagem de error se o email ja for existente', async () => {
    const results = await app
      .put('/users/2/update')
      .send(USER_UPDATE_DEFAULT)
      .set('authorization', TOKEN_DEFAULT);

    expect(results.statusCode).toBe(401);
    expect(results.body.message).toBe('email exists');
  });

  it('/user/id/delete - deve deletar um user', async () => {
    const results = await app
      .delete('/users/8/delete')
      .set('authorization', TOKEN_DEFAULT);

    expect(results.statusCode).toBe(200);
  });

  it('/users - deve listar usuarios', async () => {
    const results = await app.get('/users').set('authorization', TOKEN_DEFAULT);

    expect(results.statusCode).toBe(200);
  });
});
