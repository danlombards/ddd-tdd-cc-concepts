import { app, sequelize } from '../express';
import request from 'supertest';

describe('E2E Product test', () => {

  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  })


  it('should create a customer', async () => {
    const response = await request(app)
    .post('/products')
    .send({
      type: 'a',
      name: 'Product A',
      price: 23,
    });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Product A');
    expect(response.body.price).toBe(23);
  });

  it('should not create a customer', async () => {
    const response = await request(app)
    .post('/customers')
    .send({
      name: 'Product Invalid'
    });

    expect(response.status).toBe(500);
  });
})