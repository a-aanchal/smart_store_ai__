import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import ProductForm from '../components/ProductForm';
import ProductCard from '../components/ProductCard';
import { Plus, Loader2 } from 'lucide-react';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await api.get('/products');
      setProducts(res.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await api.delete(`/products/${id}`);
        fetchProducts();
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Products Catalog</h1>
          <p className="text-slate-400 text-xs mt-1">Manage, update, and generate marketing descriptions using AI.</p>
        </div>
        <button 
          onClick={handleAddNew}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2.5 rounded-xl flex items-center gap-2 transition-all duration-300 shadow-lg shadow-blue-900/20 active:scale-[0.98]"
        >
          <Plus size={18} />
          Add Product
        </button>
      </div>

      {loading ? (
        <div className="flex h-[40vh] items-center justify-center">
          <Loader2 className="animate-spin text-blue-500 w-8 h-8" />
        </div>
      ) : products.length === 0 ? (
        <div className="glass-panel p-12 text-center border border-dashed border-slate-800">
          <p className="text-slate-400 text-sm">No products found in your catalog. Add one to get started!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {isModalOpen && (
        <ProductForm 
          onClose={() => setIsModalOpen(false)} 
          onSuccess={fetchProducts}
          initialData={editingProduct}
        />
      )}
    </div>
  );
};

export default Products;
