import Address from "../value-objects/address";
import Customer from "./customer";

describe('Customer unit tests', () => {
  it("should throw error when ID is empty", () => {
    expect(() => {
      let customer = new Customer("", "Caique");
    }).toThrowError("customer: Id is required");
  });

  it("should throw error when name is empty", () => {
    expect(() => {
      let customer = new Customer("1", "");
    }).toThrowError("customer: Name is required");
  });

  it("should throw error when id and name are empty", () => {
    expect(() => {
      let customer = new Customer("", "");
    }).toThrowError("customer: Id is required,customer: Name is required");
  });

  it("should change name", () => {
    // Triple A para testes.
    // Arrange
    const customer = new Customer("1", "Caique");

    // Act
    customer.changeName("Caique Ribeiro");

    // Assert
    expect(customer.name).toBe("Caique Ribeiro");
  });

  it("should activate customer", () => {
    const customer = new Customer("1", "Caique");
    const address = new Address("Street 1", 143, "98590-174", "Poá");

    customer.changeAddress(address);

    customer.activate();

    expect(customer.isActive()).toBe(true);
  });

  it("should deactivate customer", () => {
    const customer = new Customer("1", "Caique");
    const address = new Address("Street 1", 143, "98590-174", "Poá");
    customer.changeAddress(address);

    customer.activate();

    expect(customer.isActive()).toBe(true);

    customer.deactivate();

    expect(customer.isActive()).toBe(false);
  });

  it("should throw errror when address is undefined in activating customer", () => {
    expect(() => {
      const customer = new Customer("1", "Caique");
      customer.activate();
    }).toThrowError("Address is mandatory to activate a costumer");
  });

  it("should add reward points", () => {
    const customer = new Customer("1", "Customer 1")
    expect(customer.rewardPoints).toBe(0);

    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(10);

    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(20);
  });

})