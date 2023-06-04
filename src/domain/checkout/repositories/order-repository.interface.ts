import Order from "../entities/order";
import RepositoryInterface from '../../@shared/repositories/repository-interface';


export default interface OrderRepositoryInterface extends RepositoryInterface<Order> {}