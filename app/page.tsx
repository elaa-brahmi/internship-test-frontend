'use client'

import { useEffect, useState } from 'react'
import { ProductCard } from '@/components/product-card'
import { ProductDetailModal } from '@/components/productModal'
import { ProductFormModal } from '@/components/product-form-modal'
import { productService } from '@/services/productService'
import { cartService } from '@/services/cartService'
import { Product } from '@/types/product'
import { Button } from '@/components/ui/button'
import { Plus, LayoutGrid, Settings2, Loader2 } from 'lucide-react'

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [viewingProduct, setViewingProduct] = useState<Product | null>(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | undefined>(undefined)

  const categories = ['All', 'Electronics', 'Home', 'Accessories']

  const loadProducts = async () => {
    try {
      setLoading(true)
      const data = await productService.getAllProducts(
        selectedCategory === 'All' ? undefined : selectedCategory
      )
      setProducts(data)
    } catch (error) {
      console.error("Failed to load products", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadProducts()
  }, [selectedCategory])

  const handleAddToCart = async (product: Product) => {
    try {
      await cartService.addToCart({ productId: product.id })
    } catch (error) {
      alert(error instanceof Error ? error.message : "Stock error")
    }
  }

  const openAddModal = () => {
    setEditingProduct(undefined)
    setIsFormOpen(true)
  }

  const openEditModal = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation() 
    setEditingProduct(product)
    setIsFormOpen(true)
  }

  return (
    <main className="min-h-screen bg-background pb-20">
      <header className="sticky top-0 z-30 w-full border-b bg-background/95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">TechStore</h1>
            </div>

            <div className="flex items-center gap-2">
              
              
             
                <Button size="sm" onClick={openAddModal} className="gap-2">
                  <Plus className="w-4 h-4" /> Add Product
                </Button>
              
            </div>
          </div>

          <div className="flex gap-2 mt-6 overflow-x-auto no-scrollbar">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? "default" : "secondary"}
                size="sm"
                onClick={() => setSelectedCategory(cat)}
                className="rounded-full px-6"
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-primary" />
            <p className="mt-4 text-muted-foreground">Syncing...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <div 
                key={product.id} 
                className="relative cursor-pointer group"
                onClick={() => setViewingProduct(product)}
              >
                <ProductCard product={product} />
                
               
                  <Button 
                    variant="secondary" 
                    size="icon"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                    onClick={(e) => openEditModal(product, e)}
                  >
                    <Settings2 className="w-4 h-4" />
                  </Button>
               
              </div>
            ))}
          </div>
        )}

        {!loading && products.length === 0 && (
          <div className="text-center py-20 border-2 border-dashed rounded-xl">
            <LayoutGrid className="w-12 h-12 mx-auto text-muted-foreground opacity-20" />
            <p className="mt-4 text-lg font-medium">No products found in this category.</p>
            <Button variant="link" onClick={() => setSelectedCategory('All')}>
              Clear Filters
            </Button>
          </div>
        )}
      </section>

    
      {viewingProduct && (
        <ProductDetailModal
          product={viewingProduct}
          isOpen={!!viewingProduct}
          onClose={() => setViewingProduct(null)}
          onAddToCart={handleAddToCart}
        />
      )}

      
      {isFormOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-lg bg-background rounded-lg shadow-xl p-6">
                <ProductFormModal 
                    product={editingProduct} 
                    onSuccess={() => {
                        setIsFormOpen(false);
                        loadProducts();
                    }} 
                />
                <Button 
                    variant="ghost" 
                    className="w-full mt-2" 
                    onClick={() => setIsFormOpen(false)}
                >
                    Cancel
                </Button>
            </div>
        </div>
      )}
    </main>
  )
}