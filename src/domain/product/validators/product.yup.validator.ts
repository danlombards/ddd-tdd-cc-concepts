import ValidatorInterface from "../../@shared/validators/validator.interface";
import Product from "../entities/product";
import * as yup from 'yup';
import ProductB from "../entities/product-b";

export default class ProductYupValidator implements ValidatorInterface<Product | ProductB> {
  validate(entity: Product): void {
    try {
      yup
        .object()
        .shape({
          id: yup.string().required("Id is required"),
          name: yup.string().required("Name is required"),
          price: yup.number().positive('Price must be greater than 0').required()
        })
        .validateSync(
          {
            id: entity.id,
            name: entity.name,
            price: entity.price,
          },
          {
            abortEarly: false
          });
    } catch (errors) {
      const e = errors as yup.ValidationError;
      e.errors.forEach(error => {

        entity.notification.addError({
          context: 'product',
          message: error,
        });
      });
    }
  }
}