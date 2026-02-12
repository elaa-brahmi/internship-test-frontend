import { AddToCartRequest } from '@/types/cart';

const API_URL = process.env.NEXT_PUBLIC_API_URL ;

export const cartService = {
  async addToCart(payload: AddToCartRequest) {
    const response = await fetch(`${API_URL}/cart/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.error || 'Failed to add to cart');
    return result;
  }
};