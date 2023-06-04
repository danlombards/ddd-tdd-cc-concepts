import CreateProductUseCase from "./create.product.usecase"

const input = {
  type: 'a',
  name: 'Produto 1',
  price: 39.90
}

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  }
}

describe('Create product unit tests', () => {
  it('should create a product', async () => {
    const productRepository = MockRepository();

    const createProductUseCase = new CreateProductUseCase(productRepository);

    const output = await createProductUseCase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price
    });
  });

  it('should throw an error when name is missing', async () => {
    const productRepository = MockRepository();

    const createProductUseCase = new CreateProductUseCase(productRepository);

    input.name = '';

    await expect(createProductUseCase.execute(input)).rejects.toThrow('Name is required');
  });

  it('should throw an error when price is less or equal 0', async () => {
    const productRepository = MockRepository();

    const createProductUseCase = new CreateProductUseCase(productRepository);

    input.name = 'Producto 1';
    input.price = 0;

    await expect(createProductUseCase.execute(input)).rejects.toThrow('Price must be greater than 0');
  });
})