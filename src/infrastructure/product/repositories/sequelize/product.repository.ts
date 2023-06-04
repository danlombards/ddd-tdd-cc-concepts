import Product from "../../../../domain/product/entities/product";
import ProductInterface from "../../../../domain/product/entities/product.interface";
import ProductRepositoryInterface from "../../../../domain/product/repositories/product-repository.interface";
import ProductModel from "./models/product.model";


export default class ProductRepository implements ProductRepositoryInterface {
  async create(entity: ProductInterface): Promise<void> {
    await ProductModel.create({
      id: entity.id,
      name: entity.name,
      price: entity.price
    });
  }
  async update(entity: ProductInterface): Promise<void> {
    await ProductModel.update({
      name: entity.name,
      price: entity.price
    },
      {
        where: {
          id: entity.id
        }
      });
  }

  async find(id: string): Promise<ProductInterface> {
    const productModel = await ProductModel.findOne({ where: { id } });

    return new Product(productModel.id, productModel.name, productModel.price);
  }

  async findAll(): Promise<ProductInterface[]> {
    const productModels = await ProductModel.findAll();

    return productModels.map((productModel) =>
      new Product(productModel.id, productModel.name, productModel.price));
  }
}