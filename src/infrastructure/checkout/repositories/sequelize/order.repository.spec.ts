import { Sequelize } from "sequelize-typescript";
import Order from "../../../../domain/checkout/entities/order";
import OrderItem from "../../../../domain/checkout/entities/order_item";
import Customer from "../../../../domain/customer/entities/customer";
import Address from "../../../../domain/customer/value-objects/address";
import Product from "../../../../domain/product/entities/product";
import CustomerRepository from "../../../customer/repositories/sequelize/customer.repository";
import CustomerModel from "../../../customer/repositories/sequelize/models/customer.model";
import ProductModel from "../../../product/repositories/sequelize/models/product.model";
import ProductRepository from "../../../product/repositories/sequelize/product.repository";
import OrderItemModel from "./models/order-item.model";
import OrderModel from "./models/order.model";
import OrderRepository from "./order.repository";

describe("Order repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([
      CustomerModel,
      OrderModel,
      OrderItemModel,
      ProductModel,
    ]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a new order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 10);
    await productRepository.create(product);

    const ordemItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2
    );

    const order = new Order("1", "123", [ordemItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: "1",
      customer_id: "123",
      total: order.total(),
      items: [
        {
          id: ordemItem.id,
          name: ordemItem.name,
          price: ordemItem.price,
          quantity: ordemItem.quantity,
          order_id: "1",
          product_id: "123",
        },
      ],
    });
  });
});