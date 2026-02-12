export interface CartItem {
  id: string;
  product_id: string;
  quantity: number;
  created_at?: string;
}

export interface AddToCartRequest {
  productId: string;
  quantity?: number;
}