import { Sequelize } from "sequelize-typescript"
import Customer from "../../../domain/customer/entities/customer";
import Address from "../../../domain/customer/value-objects/address";
import CustomerRepository from "../../../infrastructure/customer/repositories/sequelize/customer.repository";
import CustomerModel from "../../../infrastructure/customer/repositories/sequelize/models/customer.model";
import FindCustomerUseCase from "./find.customer.usecase";

const customer = new Customer('1', 'Caique');
const address = new Address('Rua 9 de Julho', 585, '08550986', 'São Paulo');
customer.changeAddress(address);

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    findAll: jest.fn().mockReturnValue(Promise.resolve([customer])),
    create: jest.fn(),
    update: jest.fn(),
  }
}

describe('Test find customer use case', () => {

  it('should find a customer', async () => {
    const customerRepository = MockRepository();
    const useCase = new FindCustomerUseCase(customerRepository);

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
  });

  it('should not find a customer', () => {

    const customerRepository = MockRepository();

    customerRepository.find.mockImplementationOnce(() => {
      throw new Error('Customer not found');
    });

    const useCase = new FindCustomerUseCase(customerRepository);

    const input = {
      id: '2'
    };

    expect(() => {
      return useCase.execute(input)
    }).rejects.toThrow('Customer not found');

  });
})