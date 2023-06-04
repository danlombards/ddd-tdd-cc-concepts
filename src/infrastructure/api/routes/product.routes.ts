import { Router, Request, Response } from 'express';
import CreateProductUseCase from '../../../usecase/product/create/create.product.usecase';
import ProductRepository from '../../product/repositories/sequelize/product.repository';

export const productRoute = Router();

productRoute.post('/', async (request: Request, response: Response) => {

  const usecase = new CreateProductUseCase(new ProductRepository());
  try {
    const productDto = {
      type: request.body.type,
      name: request.body.name,
      price: request.body.price,
    }

    const output = await usecase.execute(productDto);

    response.send(output);
  } catch(error) {
    response.status(500).send(error);
  }
});