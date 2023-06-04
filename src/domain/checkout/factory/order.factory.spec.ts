import { v4 as uuid } from 'uuid';
import OrderFactory from './order.factory';

describe('Order factory unit tests', () => {

  it('should create an order', () => {

    const orderProps = {
      id: uuid(),
      customerId: uuid(),
      items: [
        {
          id: uuid(),
          name: 'Product 1',
          productId: uuid(),
          quantity: 3,
          price: 100,
        }
      ]
    }

    const order = OrderFactory.create(orderProps);  

    expect(order.id).toBe(orderProps.id);
    expect(order.customerId).toEqual(orderProps.customerId);
    expect(order.items.length).toBe(1);

  })

});