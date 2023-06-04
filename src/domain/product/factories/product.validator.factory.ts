import ValidatorInterface from "../../@shared/validators/validator.interface";
import Product from "../entities/product";
import ProductB from "../entities/product-b";
import ProductInterface from "../entities/product.interface";
import ProductYupValidator from "../validators/product.yup.validator";

export default class ProductValidatorFactory {
  static create(): ValidatorInterface<Product | ProductB> {
    return new ProductYupValidator();
  }
}