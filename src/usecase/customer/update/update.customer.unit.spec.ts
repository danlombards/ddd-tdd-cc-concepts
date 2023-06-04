import CustomerFactory from "../../../domain/customer/factories/customer.factory";
import Address from "../../../domain/customer/value-objects/address";
import UpdateCustomerUseCase from "./update.customer.usecase";

const customer = CustomerFactory.createWithAddress(
  'Caique',
  new Address('Rua', 123, '12121312', 'São Paulo'));

const input = {
  id: customer.id,
  name: 'Caique updated',
  address: {
    street: 'Rua updated',
    number: 1234,
    zip: '12312312 updated',
    city: 'São Paulo updated'
  }
}

const MockRepository = () => {
  return {
    create: jest.fn(),
    findAll: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    update: jest.fn(),
  }
}

describe('Unit test for customer update usecase', () => {

  it('should update a customer', async () => {
    const customerRepository = MockRepository();
    const updateCustomerUseCase = new UpdateCustomerUseCase(customerRepository);

    const output = await updateCustomerUseCase.execute(input);

    expect(output).toEqual(input);
  })
})