import { app, sequelize } from '../express';
import request from 'supertest';

describe('E2E Customer test', () => {

  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  })


  it('should create a customer', async () => {
    const response = await request(app)
    .post('/customers')
    .send({
      name: 'Caique',
      address: {
        street: 'Rua 9 de Julho',
        number: 295,
        zip: '85850-09',
        city: 'São Paulo'
      }
    });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Caique');
    expect(response.body.address.street).toBe('Rua 9 de Julho');
    expect(response.body.address.number).toBe(295);
    expect(response.body.address.zip).toBe('85850-09');
    expect(response.body.address.city).toBe('São Paulo');
  });

  it('should not create a customer', async () => {
    const response = await request(app)
    .post('/customers')
    .send({
      name: 'Caique'
    });

    expect(response.status).toBe(500);
  });

  it('should list all customers', async () => {
    const response = await request(app)
    .post('/customers')
    .send({
      name: 'Caique',
      address: {
        street: 'Rua 9 de Julho',
        number: 295,
        zip: '85850-09',
        city: 'São Paulo'
      }
    });

    expect(response.status).toBe(200);

    const response2 = await request(app)
    .post('/customers')
    .send({
      name: 'John',
      address: {
        street: 'Avenida Paulista',
        number: 958,
        zip: '82870-13',
        city: 'São Paulo'
      }
    });

    expect(response2.status).toBe(200);

    const listResponse = await request(app).get('/customers').send();

    expect(listResponse.status).toBe(200);
    expect(listResponse.body.customers.length).toBe(2);

    const customer = listResponse.body.customers[0];

    expect(customer.name).toBe('Caique');
    expect(customer.address.street).toBe('Rua 9 de Julho');

    const customer2 = listResponse.body.customers[1];

    expect(customer2.name).toBe('John');
    expect(customer2.address.street).toBe('Avenida Paulista');

    const listReponseXML = await request(app)
    .get("/customers")
    .set("Accept", "application/xml")
    .send();

    expect(listReponseXML.status).toBe(200);
    expect(listReponseXML.text).toContain(`<?xml version="1.0" encoding="UTF-8"?>`);
    expect(listReponseXML.text).toContain(`<customers>`);
    expect(listReponseXML.text).toContain(`<customer>`);
    expect(listReponseXML.text).toContain(`<name>John</name>`);
    expect(listReponseXML.text).toContain(`<address>`);
    expect(listReponseXML.text).toContain(`<street>Avenida Paulista</street>`);
    expect(listReponseXML.text).toContain(`<number>958</number>`);
    expect(listReponseXML.text).toContain(`<zip>82870-13</zip>`);
    expect(listReponseXML.text).toContain(`<city>São Paulo</city>`);
  });
  
})