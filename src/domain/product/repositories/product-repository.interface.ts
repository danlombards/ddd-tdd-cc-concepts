import RepositoryInterface from "../../@shared/repositories/repository-interface";
import ProductInterface from "../entities/product.interface";

export default interface ProductRepositoryInterface
  extends RepositoryInterface<ProductInterface> {
}