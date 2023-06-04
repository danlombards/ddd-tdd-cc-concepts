import Order from "./order";
import OrderItem from "./order_item";

describe('Order unit tests', () => {
  it("should throw error when ID is empty", () => {
    expect(() => {
      new Order("", "123", []);
    }).toThrowError("Id is required");
  });

  it("should throw error when customerId is empty", () => {
    expect(() => {
      new Order("1", "", []);
    }).toThrowError("CustomerId is required");
  });

  it("should throw error when customerId is empty", () => {
    expect(() => {
      new Order("1", "123", []);
    }).toThrowError("Item qd must be greater than 0");
  });

  it("should calculate total", () => {
    const item1 = new OrderItem("1", "Item 1", 100, "p1", 2);
    const item2 = new OrderItem("1", "Item 1", 200, "p2", 1);

    const order1 = new Order("1", "c1", [item1]);

    let total = order1.total();

    expect(total).toBe(200);

    const order2 = new Order("1", "c1", [item1, item2]);
    total = order2.total();

    expect(total).toBe(400);
  });

  it("should throw error if item quantity is less than 0", () => {
      expect(() => {
        const item = new OrderItem("1", "Item 1", 100, "p1", -1);
        new Order("1", "c1", [item]);
      }).toThrowError("Quantity must be greather than 0");
  });
})