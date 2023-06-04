// Repositórios tem ligação um-pra-um com agregados
// T = Agregado
export default interface RepositoryInterface<T> {

  create(entity: T): Promise<void>;
  update(entity: T): Promise<void>;
  find(id: string): Promise<T>;
  findAll(): Promise<T[]>;
  
}