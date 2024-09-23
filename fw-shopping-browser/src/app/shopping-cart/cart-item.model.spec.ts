import { CartItem } from './cart-item.model';

describe('CartItem', () => {
  it('should create an instance', () => {
    expect(new CartItem('item', 1)).toBeTruthy();
  });
});
