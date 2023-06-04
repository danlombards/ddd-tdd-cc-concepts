import Customer from '../entities/customer';
import RepositoryInterface from '../../@shared/repositories/repository-interface';

export default interface CustomerRepositoryInterface
  extends RepositoryInterface<Customer> { }