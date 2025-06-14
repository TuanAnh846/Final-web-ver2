import React from 'react';
import { X, Star, Package, Award, Calendar } from 'lucide-react';
import type { Product } from '../types';

interface CompareModalProps {
  products: Product[];
  onClose: () => void;
  onAddToCart: (product: Product) => void;
  onRemoveFromCompare: (id: string) => void;
}

export function CompareModal({ products, onClose, onAddToCart, onRemoveFromCompare }: CompareModalProps) {
  if (products.length === 0) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Compare Products</h2>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 p-2 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-xl transition-all">
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="text-center py-12">
            <Package className="w-20 h-20 text-slate-300 dark:text-slate-600 mx-auto mb-6" />
            <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">No products to compare</h3>
            <p className="text-slate-500 dark:text-slate-400">Add products to compare their features!</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-6xl w-full mx-4 max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="flex items-center justify-between p-8 border-b border-slate-100 dark:border-slate-700">
          <div>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Compare Products</h2>
            <p className="text-slate-500 dark:text-slate-400 mt-1">Compare up to {products.length} products</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 p-2 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-xl transition-all">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-8">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <td className="w-48 p-4"></td>
                  {products.map((product) => (
                    <td key={product.id} className="p-4 text-center min-w-64">
                      <div className="bg-slate-50 dark:bg-slate-700 rounded-2xl p-6">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-32 h-32 object-cover rounded-xl mx-auto mb-4"
                        />
                        <h3 className="font-bold text-slate-800 dark:text-white mb-2 text-lg">{product.name}</h3>
                        <p className="text-2xl font-bold text-slate-800 dark:text-white mb-4">${product.price.toFixed(2)}</p>
                        <div className="space-y-2">
                          <button
                            onClick={() => onAddToCart(product)}
                            disabled={!product.inStock}
                            className={`w-full py-2 rounded-lg text-sm font-semibold transition-all ${
                              product.inStock
                                ? 'bg-slate-800 dark:bg-slate-600 text-white hover:bg-slate-700 dark:hover:bg-slate-500'
                                : 'bg-slate-200 dark:bg-slate-600 text-slate-500 dark:text-slate-400 cursor-not-allowed'
                            }`}
                          >
                            Add to Cart
                          </button>
                          <button
                            onClick={() => onRemoveFromCompare(product.id)}
                            className="w-full py-2 text-red-500 hover:text-red-700 dark:hover:text-red-400 text-sm font-semibold"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </td>
                  ))}
                </tr>
              </thead>
              <tbody className="space-y-4">
                <tr className="border-t border-slate-100 dark:border-slate-700">
                  <td className="p-4 font-semibold text-slate-800 dark:text-white">Rating</td>
                  {products.map((product) => (
                    <td key={product.id} className="p-4 text-center">
                      <div className="flex items-center justify-center space-x-1">
                        <Star className="w-4 h-4 text-amber-400 fill-current" />
                        <span className="font-semibold text-slate-800 dark:text-white">{product.rating}</span>
                        <span className="text-sm text-slate-500 dark:text-slate-400">({product.reviews})</span>
                      </div>
                    </td>
                  ))}
                </tr>
                
                <tr className="border-t border-slate-100 dark:border-slate-700">
                  <td className="p-4 font-semibold text-slate-800 dark:text-white">Category</td>
                  {products.map((product) => (
                    <td key={product.id} className="p-4 text-center">
                      <span className="text-slate-600 dark:text-slate-300">{product.subcategory || product.category}</span>
                    </td>
                  ))}
                </tr>
                
                <tr className="border-t border-slate-100 dark:border-slate-700">
                  <td className="p-4 font-semibold text-slate-800 dark:text-white">Scale</td>
                  {products.map((product) => (
                    <td key={product.id} className="p-4 text-center">
                      <span className="text-slate-600 dark:text-slate-300">{product.scale || 'N/A'}</span>
                    </td>
                  ))}
                </tr>
                
                <tr className="border-t border-slate-100 dark:border-slate-700">
                  <td className="p-4 font-semibold text-slate-800 dark:text-white">Manufacturer</td>
                  {products.map((product) => (
                    <td key={product.id} className="p-4 text-center">
                      <span className="text-slate-600 dark:text-slate-300">{product.manufacturer || 'N/A'}</span>
                    </td>
                  ))}
                </tr>
                
                <tr className="border-t border-slate-100 dark:border-slate-700">
                  <td className="p-4 font-semibold text-slate-800 dark:text-white">Difficulty</td>
                  {products.map((product) => (
                    <td key={product.id} className="p-4 text-center">
                      <span className="text-slate-600 dark:text-slate-300">{product.difficulty || 'N/A'}</span>
                    </td>
                  ))}
                </tr>
                
                <tr className="border-t border-slate-100 dark:border-slate-700">
                  <td className="p-4 font-semibold text-slate-800 dark:text-white">3D Model</td>
                  {products.map((product) => (
                    <td key={product.id} className="p-4 text-center">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        product.hasModel3D 
                          ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' 
                          : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                      }`}>
                        {product.hasModel3D ? 'Available' : 'Not Available'}
                      </span>
                    </td>
                  ))}
                </tr>
                
                <tr className="border-t border-slate-100 dark:border-slate-700">
                  <td className="p-4 font-semibold text-slate-800 dark:text-white">Stock Status</td>
                  {products.map((product) => (
                    <td key={product.id} className="p-4 text-center">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        product.inStock 
                          ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' 
                          : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                      }`}>
                        {product.inStock ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}