'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ShoppingCart, Check } from 'lucide-react'

interface Product {
  id: string
  name: string
  price: number
  image: string
  stock: number
  rating?: number
  reviews?: number
}

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const [isAdded, setIsAdded] = useState(false)
  const isOutOfStock = product.stock === 0

  const handleAddToCart = () => {
    if (!isOutOfStock) {
      setIsAdded(true)
      setTimeout(() => setIsAdded(false), 2000)
    }
  }

  return (
    <div className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card hover:shadow-lg transition-shadow duration-300">
      {/* Product Image */}
      <div className="relative overflow-hidden bg-secondary h-48 sm:h-56">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-300"
        />
        {isOutOfStock && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="text-white font-semibold text-lg">Out of Stock</span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="flex flex-col flex-grow p-4 sm:p-5">
        {/* Rating */}
        {product.rating && (
          <div className="flex items-center gap-1 mb-2">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <span key={i}>
                  {i < Math.floor(product.rating!) ? '★' : '☆'}
                </span>
              ))}
            </div>
            {product.reviews && (
              <span className="text-sm text-muted-foreground">
                ({product.reviews})
              </span>
            )}
          </div>
        )}

        {/* Title */}
        <h3 className="font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {product.name}
        </h3>

        {/* Stock Info */}
        {product.stock > 0 && product.stock <= 5 && (
          <p className="text-xs text-destructive font-medium mb-2">
            Only {product.stock} left in stock
          </p>
        )}

        {/* Spacer */}
        <div className="flex-grow" />

        {/* Price and Button */}
        <div className="flex items-end justify-between gap-3">
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-foreground">
              ${product.price}
            </span>
          </div>

          <Button
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            variant={isAdded ? 'default' : 'outline'}
            size="sm"
            className={`transition-all duration-300 ${
              isOutOfStock
                ? 'opacity-50 cursor-not-allowed'
                : ''
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-4 h-4" />
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4" />
              </>
            )}
            <span className="hidden sm:inline">
              {isAdded ? 'Added' : 'Add'}
            </span>
          </Button>
        </div>
      </div>
    </div>
  )
}
