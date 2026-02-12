'use client'

import { useState, useEffect } from 'react'
import { Product } from '@/types/product'
import { productService } from '@/services/productService'
import { Button } from '@/components/ui/button'
import { Loader2, Package, DollarSign, ImageIcon, Tag } from 'lucide-react'

interface ProductFormModalProps {
  product?: Product 
  onSuccess: () => void
}

export function ProductFormModal({ product, onSuccess }: ProductFormModalProps) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    image_url: '',
    stock: 0,
    category: 'Electronics',
    description: ''
  })

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        price: product.price,
        image_url: product.image_url,
        stock: product.stock,
        category: product.category,
        description: product.description || ''
      })
    }
  }, [product])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (product?.id) {
        await productService.updateProduct(product.id, formData)
      } else {
        await productService.createProduct(formData)
      }
      onSuccess()
    } catch (error) {
      alert("Failed to save product. Check console.")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">
          {product ? 'Edit Product' : 'Add New Product'}
        </h2>
        <p className="text-sm text-muted-foreground">
          Fill in the details below to update your inventory.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1">
          <label className="text-sm font-medium flex items-center gap-2">
            <Package className="w-4 h-4" /> Name
          </label>
          <input
            required
            className="w-full p-2 rounded-md border bg-background"
            placeholder="e.g. Mechanical Keyboard"
            value={formData.name}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-medium flex items-center gap-2">
              <DollarSign className="w-4 h-4" /> Price
            </label>
            <input
              required
              type="number"
              step="0.01"
              className="w-full p-2 rounded-md border bg-background"
              value={formData.price}
              onChange={e => setFormData({ ...formData, price: parseFloat(e.target.value) })}
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium flex items-center gap-2">
              Stock Quantity
            </label>
            <input
              required
              type="number"
              className="w-full p-2 rounded-md border bg-background"
              value={formData.stock}
              onChange={e => setFormData({ ...formData, stock: parseInt(e.target.value) })}
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium flex items-center gap-2">
            <Tag className="w-4 h-4" /> Category
          </label>
          <select 
            className="w-full p-2 rounded-md border bg-background"
            value={formData.category}
            onChange={e => setFormData({ ...formData, category: e.target.value })}
          >
            <option value="Electronics">Electronics</option>
            <option value="Home">Home</option>
            <option value="Accessories">Accessories</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium flex items-center gap-2">
            <ImageIcon className="w-4 h-4" /> Image URL
          </label>
          <input
            required
            className="w-full p-2 rounded-md border bg-background"
            placeholder="https://images.unsplash.com/..."
            value={formData.image_url}
            onChange={e => setFormData({ ...formData, image_url: e.target.value })}
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">Description</label>
          <textarea
            rows={3}
            className="w-full p-2 rounded-md border bg-background"
            placeholder="Describe the product..."
            value={formData.description}
            onChange={e => setFormData({ ...formData, description: e.target.value })}
          />
        </div>

        <Button type="submit" className="w-full mt-4" disabled={loading}>
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin mr-2" />
          ) : (
            product ? 'Update Product' : 'Create Product'
          )}
        </Button>
      </form>
    </div>
  )
}