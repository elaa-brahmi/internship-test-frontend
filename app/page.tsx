import { ProductCard } from '@/components/product-card'

// Sample product data
const products = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
    stock: 8,
    rating: 4.5,
    reviews: 128,
  },
  {
    id: '2',
    name: 'Smart Watch Pro',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
    stock: 0,
    rating: 4.8,
    reviews: 256,
  },
  {
    id: '3',
    name: 'Ultra HD Camera',
    price: 899.99,
    image: 'https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=500&h=500&fit=crop',
    stock: 3,
    rating: 4.6,
    reviews: 89,
  },
  {
    id: '4',
    name: 'Portable Bluetooth Speaker',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&h=500&fit=crop',
    stock: 15,
    rating: 4.3,
    reviews: 312,
  },
  {
    id: '5',
    name: 'Noise Canceling Earbuds',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&h=500&fit=crop',
    stock: 5,
    rating: 4.7,
    reviews: 198,
  },
  {
    id: '6',
    name: 'Tablet with Stylus',
    price: 499.99,
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=500&fit=crop',
    stock: 12,
    rating: 4.4,
    reviews: 165,
  },
  {
    id: '7',
    name: 'USB-C Hub Pro',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=500&h=500&fit=crop',
    stock: 0,
    rating: 4.2,
    reviews: 74,
  },
  {
    id: '8',
    name: '4K Webcam',
    price: 159.99,
    image: 'https://images.unsplash.com/photo-1598289246098-e48dd0e18b27?w=500&h=500&fit=crop',
    stock: 20,
    rating: 4.5,
    reviews: 142,
  },
]

export const metadata = {
  title: 'Products - Store',
  description: 'Browse our amazing collection of tech products',
}

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
                Our Products
              </h1>
              <p className="text-muted-foreground mt-2">
                Discover our collection of premium tech gadgets
              </p>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
              <span>Showing {products.length} products</span>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* Footer Note */}
      <div className="bg-card border-t border-border mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-muted-foreground">
          <p>
            Items added to cart are tracked locally. Build out your cart management system for a full e-commerce experience.
          </p>
        </div>
      </div>
    </main>
  )
}
