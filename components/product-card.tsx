'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ShoppingCart, Check } from 'lucide-react'
import { Product } from '@/types/product'
import { cartService } from '@/services/cartService'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const [isAdded, setIsAdded] = useState(false)
  const [loading, setLoading] = useState(false)
  const isOutOfStock = product.stock === 0

  const handleAddToCart = async () => {
    if (isOutOfStock || loading) return;

    try {
      setLoading(true)
      await cartService.addToCart({ productId: product.id })
      setIsAdded(true)
      setTimeout(() => setIsAdded(false), 2000)
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Error adding to cart')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card hover:shadow-lg transition-shadow duration-300">
      <div className="relative overflow-hidden bg-secondary h-48 sm:h-56">
        <img
          src={product.image_url}
          alt={product.name}
          className="object-cover group-hover:scale-110 transition-transform duration-300"
        />
        {isOutOfStock && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="text-white font-semibold text-lg">Out of Stock</span>
          </div>
        )}
      </div>

      <div className="flex flex-col flex-grow p-4 sm:p-5">
        <h3 className="font-semibold text-foreground mb-2 line-clamp-2">{product.name}</h3>
        
        <div className="flex-grow" />

        <div className="flex items-end justify-between gap-3">
          <span className="text-2xl font-bold text-foreground">${product.price}</span>
          <Button
            onClick={handleAddToCart}
            disabled={isOutOfStock || loading}
            variant={isAdded ? 'default' : 'outline'}
            size="sm"
          >
            {isAdded ? <Check className="w-4 h-4" /> : <ShoppingCart className="w-4 h-4" />}
            <span className="ml-2 hidden sm:inline">
              {loading ? 'Adding...' : isAdded ? 'Added' : 'Add'}
            </span>
          </Button>
        </div>
      </div>
    </div>
  )
}