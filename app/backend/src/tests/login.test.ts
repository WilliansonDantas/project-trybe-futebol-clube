import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Users from '../database/models/Users';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa rota login', () => {

  let chaiHttpResponse: Response;
  let token: string;

  before(async () => {
    sinon
      .stub(Users, "findOne")
      .resolves({
        username: 'Admin',
        role: 'admin',
        email: 'admin@admin.com',
        password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
      } as Users);
      chaiHttpResponse = await chai
    .request(app).post('/login').send({ email: 'admin@admin.com', password: 'secret_admin' })
    token = chaiHttpResponse.body.token
  });

  after(()=>{
    (Users.findOne as sinon.SinonStub).restore();
  })

  it('Testa status 200, rota login', async () => {
    chaiHttpResponse = await chai
    .request(app).post('/login').send({ email: 'admin@admin.com', password: 'secret_admin' })
    expect(chaiHttpResponse.status).to.equal(200);
    expect(chaiHttpResponse.body).to.deep.equal({ token: token });
  });
});
