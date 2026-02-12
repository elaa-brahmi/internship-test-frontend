import { Product } from '@/types/product';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const productService = {
  async getAllProducts(category?: string): Promise<Product[]> {
    const url = category ? `${API_URL}/products?category=${category}` : `${API_URL}/products`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch products');
    return response.json();
  },

  async getProductById(id: string): Promise<Product> {
    const response = await fetch(`${API_URL}/products/${id}`);
    if (!response.ok) throw new Error('Product not found');
    return response.json();
  }
};