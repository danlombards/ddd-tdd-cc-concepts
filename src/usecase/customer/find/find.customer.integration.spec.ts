import { Sequelize } from "sequelize-typescript"
import Customer from "../../../domain/customer/entities/customer";
import Address from "../../../domain/customer/value-objects/address";
import CustomerRepository from "../../../infrastructure/customer/repositories/sequelize/customer.repository";
import CustomerModel from "../../../infrastructure/customer/repositories/sequelize/models/customer.model";
import FindCustomerUseCase from "./find.customer.usecase";

describe('Test find customer use case', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should find a customer', async () => {
    const customerRepository = new CustomerRepository();
    const useCase = new FindCustomerUseCase(customerRepository);
    const customer = new Customer('1', 'Caique');
    const address = new Address('Rua 9 de Julho', 585, '08550986', 'São Paulo');
    customer.changeAddress(address);

    const customerCreated = await customerRepository.create(customer);

    const input = {
      id: '1'
    };

    const output = {
      id: '1',
      name: 'Caique',
      address: {
        street: 'Rua 9 de Julho',
        city: 'São Paulo',
        number: 585,
        zip: '08550986',
      }
    }

    const result = await useCase.execute(input);

    expect(result).toEqual(output);
  })
})