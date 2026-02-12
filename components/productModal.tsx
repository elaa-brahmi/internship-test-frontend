'use client'

import { useState } from 'react'
import { Product } from '@/types/product'
import { Button } from '@/components/ui/button'
import { ShoppingCart, X, Loader2 } from 'lucide-react'

interface ProductDetailModalProps {
  product: Product
  isOpen: boolean
  onClose: () => void
  onAddToCart: (product: Product) => Promise<void>
}

export function ProductDetailModal({ product, isOpen, onClose, onAddToCart }: ProductDetailModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (!isOpen) return null

  const handleAddAndClose = async () => {
    try {
      setIsSubmitting(true)
      
      await onAddToCart(product)
      
      onClose()
    } catch (error) {
      console.error("Failed to add to cart:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-background rounded-xl shadow-2xl">
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 z-10 p-2 rounded-full bg-secondary hover:bg-muted transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="relative h-64 md:h-[500px] bg-secondary">
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-6 md:p-10 flex flex-col">
            <span className="text-sm font-medium text-primary uppercase tracking-wider">
              {product.category}
            </span>
            <h2 className="text-3xl font-bold mt-2 text-foreground">{product.name}</h2>
            
            <div className="mt-4 flex items-center gap-4">
              <span className="text-3xl font-bold text-foreground">${product.price}</span>
              {product.stock > 0 ? (
                <span className="text-green-600 text-sm font-medium">
                  In Stock ({product.stock})
                </span>
              ) : (
                <span className="text-destructive text-sm font-medium">Out of Stock</span>
              )}
            </div>

            <p className="mt-6 text-muted-foreground leading-relaxed">
              {product.description || "No description available for this premium tech item."}
            </p>

            <div className="mt-auto pt-10">
              <Button 
                size="lg" 
                className="w-full gap-3 text-lg h-14"
                disabled={product.stock === 0 || isSubmitting}
                onClick={handleAddAndClose}
              >
                {isSubmitting ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <ShoppingCart className="w-5 h-5" />
                )}
                {isSubmitting ? 'Adding...' : 'Add to Cart'}
              </Button>
             
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}