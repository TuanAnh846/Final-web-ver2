import React, { useState } from 'react';
import { X, Star, ShoppingCart, ChevronLeft, ChevronRight, Package, Calendar, User, Award, Shield, Truck, Heart, BarChart3, Cuboid as Cube } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Model3DViewer } from './Model3DViewer';
import type { Product } from '../types';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
  onAddToWishlist: (product: Product) => void;
  onAddToCompare: (product: Product) => void;
  isInWishlist: boolean;
  isInCompare: boolean;
}

export function ProductModal({ 
  product, 
  onClose, 
  onAddToCart, 
  onAddToWishlist, 
  onAddToCompare,
  isInWishlist,
  isInCompare 
}: ProductModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'images' | 'specs' | 'model3d'>('images');

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'gundam': return 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800';
      case 'figure': return 'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800';
      case 'accessories': return 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800';
      case 'tools': return 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800';
      default: return 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700';
    }
  };

  const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800';
      case 'Intermediate': return 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800';
      case 'Advanced': return 'bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800';
      case 'Expert': return 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800';
      default: return 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white dark:bg-slate-800 rounded-2xl max-w-7xl w-full max-h-[95vh] overflow-y-auto shadow-2xl"
      >
        <div className="sticky top-0 bg-white dark:bg-slate-800 border-b border-slate-100 dark:border-slate-700 p-6 flex items-center justify-between rounded-t-2xl">
          <div>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white truncate">{product.name}</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Premium Collectible Model</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 p-2 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-xl transition-all"
          >
            <X className="w-6 h-6" />
          </motion.button>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 p-8">
          {/* Left Column - Media */}
          <div className="space-y-6">
            {/* Tab Navigation */}
            <div className="flex space-x-1 bg-slate-50 dark:bg-slate-700 p-1 rounded-xl">
              <button
                onClick={() => setActiveTab('images')}
                className={`flex-1 px-4 py-3 text-sm font-semibold rounded-lg transition-all ${
                  activeTab === 'images'
                    ? 'bg-white dark:bg-slate-600 text-slate-800 dark:text-white shadow-sm'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
                }`}
              >
                Gallery
              </button>
              <button
                onClick={() => setActiveTab('specs')}
                className={`flex-1 px-4 py-3 text-sm font-semibold rounded-lg transition-all ${
                  activeTab === 'specs'
                    ? 'bg-white dark:bg-slate-600 text-slate-800 dark:text-white shadow-sm'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
                }`}
              >
                Specifications
              </button>
              {product.hasModel3D && (
                <button
                  onClick={() => setActiveTab('model3d')}
                  className={`flex-1 px-4 py-3 text-sm font-semibold rounded-lg transition-all flex items-center justify-center space-x-2 ${
                    activeTab === 'model3d'
                      ? 'bg-white dark:bg-slate-600 text-slate-800 dark:text-white shadow-sm'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
                  }`}
                >
                  <Cube className="w-4 h-4" />
                  <span>3D Model</span>
                </button>
              )}
            </div>

            {/* Content Area */}
            <AnimatePresence mode="wait">
              {activeTab === 'images' && (
                <motion.div
                  key="images"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-4"
                >
                  <div className="relative bg-slate-50 dark:bg-slate-700 rounded-2xl overflow-hidden">
                    <motion.img
                      key={currentImageIndex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      src={product.images[currentImageIndex]}
                      alt={product.name}
                      className="w-full h-96 object-cover"
                    />
                    
                    {product.images.length > 1 && (
                      <>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={prevImage}
                          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white dark:bg-slate-800 bg-opacity-90 rounded-full p-3 hover:bg-opacity-100 transition-all shadow-lg"
                        >
                          <ChevronLeft className="w-5 h-5 text-slate-700 dark:text-slate-300" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={nextImage}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white dark:bg-slate-800 bg-opacity-90 rounded-full p-3 hover:bg-opacity-100 transition-all shadow-lg"
                        >
                          <ChevronRight className="w-5 h-5 text-slate-700 dark:text-slate-300" />
                        </motion.button>
                      </>
                    )}
                  </div>

                  {product.images.length > 1 && (
                    <div className="flex space-x-3 overflow-x-auto pb-2">
                      {product.images.map((img, index) => (
                        <motion.button
                          key={index}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                            index === currentImageIndex ? 'border-slate-800 dark:border-slate-400 shadow-lg' : 'border-slate-200 dark:border-slate-600 hover:border-slate-300 dark:hover:border-slate-500'
                          }`}
                        >
                          <img src={img} alt="" className="w-full h-full object-cover" />
                        </motion.button>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}

              {activeTab === 'specs' && (
                <motion.div
                  key="specs"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-slate-50 dark:bg-slate-700 rounded-2xl p-8 space-y-6"
                >
                  <h3 className="font-bold text-slate-800 dark:text-white text-xl mb-6">Technical Specifications</h3>
                  
                  <div className="grid grid-cols-2 gap-6">
                    {product.specifications.height && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white dark:bg-slate-600 rounded-xl p-4"
                      >
                        <span className="text-slate-500 dark:text-slate-400 text-sm font-medium">Height</span>
                        <p className="font-bold text-slate-800 dark:text-white text-lg">{product.specifications.height}</p>
                      </motion.div>
                    )}
                    
                    {product.specifications.weight && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white dark:bg-slate-600 rounded-xl p-4"
                      >
                        <span className="text-slate-500 dark:text-slate-400 text-sm font-medium">Weight</span>
                        <p className="font-bold text-slate-800 dark:text-white text-lg">{product.specifications.weight}</p>
                      </motion.div>
                    )}
                    
                    {product.specifications.articulation && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white dark:bg-slate-600 rounded-xl p-4 col-span-2"
                      >
                        <span className="text-slate-500 dark:text-slate-400 text-sm font-medium">Articulation</span>
                        <p className="font-bold text-slate-800 dark:text-white text-lg">{product.specifications.articulation}</p>
                      </motion.div>
                    )}
                  </div>
                  
                  {product.specifications.accessories && product.specifications.accessories.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="bg-white dark:bg-slate-600 rounded-xl p-6"
                    >
                      <h4 className="font-bold text-slate-800 dark:text-white mb-4">Included Accessories</h4>
                      <div className="grid grid-cols-2 gap-3">
                        {product.specifications.accessories.map((accessory, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 + index * 0.1 }}
                            className="flex items-center space-x-3 text-slate-600 dark:text-slate-300"
                          >
                            <div className="w-2 h-2 bg-slate-800 dark:bg-slate-300 rounded-full"></div>
                            <span className="text-sm">{accessory}</span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )}

              {activeTab === 'model3d' && product.hasModel3D && (
                <motion.div
                  key="model3d"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-4"
                >
                  <div className="bg-slate-50 dark:bg-slate-700 rounded-2xl p-4">
                    <h3 className="font-bold text-slate-800 dark:text-white mb-4">Interactive 3D Model</h3>
                    <Model3DViewer modelUrl={product.modelUrl} className="w-full h-96" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Column - Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <span className={`text-sm font-semibold px-4 py-2 rounded-full border ${getCategoryColor(product.category)}`}>
                  {product.subcategory || product.category}
                </span>
                {product.difficulty && (
                  <span className={`text-sm font-semibold px-4 py-2 rounded-full border ${getDifficultyColor(product.difficulty)}`}>
                    {product.difficulty} Level
                  </span>
                )}
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-amber-400 fill-current" />
                  <span className="text-sm text-slate-600 dark:text-slate-300 font-semibold">{product.rating}</span>
                  <span className="text-xs text-slate-400 dark:text-slate-500">({product.reviews} reviews)</span>
                </div>
              </div>
              
              <h1 className="text-4xl font-bold text-slate-800 dark:text-white mb-6 leading-tight">{product.name}</h1>
              <div className="flex items-baseline space-x-4 mb-8">
                <span className="text-5xl font-bold text-slate-800 dark:text-white">
                  ${product.price.toFixed(2)}
                </span>
                <span className="text-slate-500 dark:text-slate-400 font-medium">Free shipping worldwide</span>
              </div>
            </div>

            {/* Product Details Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-2 gap-4"
            >
              {product.scale && (
                <div className="bg-slate-50 dark:bg-slate-700 rounded-xl p-4 flex items-center space-x-3">
                  <Package className="w-5 h-5 text-slate-400 dark:text-slate-500" />
                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Scale</p>
                    <p className="font-bold text-slate-800 dark:text-white">{product.scale}</p>
                  </div>
                </div>
              )}
              {product.manufacturer && (
                <div className="bg-slate-50 dark:bg-slate-700 rounded-xl p-4 flex items-center space-x-3">
                  <Award className="w-5 h-5 text-slate-400 dark:text-slate-500" />
                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Manufacturer</p>
                    <p className="font-bold text-slate-800 dark:text-white">{product.manufacturer}</p>
                  </div>
                </div>
              )}
              {product.releaseDate && (
                <div className="bg-slate-50 dark:bg-slate-700 rounded-xl p-4 flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-slate-400 dark:text-slate-500" />
                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Release Year</p>
                    <p className="font-bold text-slate-800 dark:text-white">{product.releaseDate}</p>
                  </div>
                </div>
              )}
              {product.series && (
                <div className="bg-slate-50 dark:bg-slate-700 rounded-xl p-4 flex items-center space-x-3">
                  <Shield className="w-5 h-5 text-slate-400 dark:text-slate-500" />
                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Series</p>
                    <p className="font-bold text-slate-800 dark:text-white truncate">{product.series}</p>
                  </div>
                </div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-slate-50 dark:bg-slate-700 rounded-2xl p-6"
            >
              <h3 className="font-bold text-slate-800 dark:text-white mb-4 text-lg">Product Description</h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{product.description}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-slate-50 dark:bg-slate-700 rounded-2xl p-6"
            >
              <h3 className="font-bold text-slate-800 dark:text-white mb-4 text-lg">Key Features</h3>
              <div className="grid grid-cols-1 gap-3">
                {product.features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="flex items-center space-x-3 text-slate-600 dark:text-slate-300"
                  >
                    <div className="w-2 h-2 bg-slate-800 dark:bg-slate-300 rounded-full"></div>
                    <span>{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-center justify-between bg-slate-50 dark:bg-slate-700 rounded-2xl p-6"
            >
              <div className="flex items-center space-x-4">
                <div className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  product.inStock 
                    ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' 
                    : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                }`}>
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </div>
                <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-300">
                  <Truck className="w-4 h-4" />
                  <span className="text-sm">Ships within 24 hours</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex space-x-4"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onAddToCart(product)}
                disabled={!product.inStock}
                className={`flex-1 flex items-center justify-center space-x-3 py-5 rounded-2xl font-bold text-lg transition-all ${
                  product.inStock
                    ? 'bg-slate-800 dark:bg-slate-600 text-white hover:bg-slate-700 dark:hover:bg-slate-500 shadow-lg hover:shadow-xl'
                    : 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400 cursor-not-allowed'
                }`}
              >
                <ShoppingCart className="w-6 h-6" />
                <span>{product.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onAddToWishlist(product)}
                className={`p-5 rounded-2xl font-bold transition-all shadow-lg hover:shadow-xl ${
                  isInWishlist
                    ? 'bg-red-500 text-white hover:bg-red-600'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                }`}
              >
                <Heart className={`w-6 h-6 ${isInWishlist ? 'fill-current' : ''}`} />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onAddToCompare(product)}
                className={`p-5 rounded-2xl font-bold transition-all shadow-lg hover:shadow-xl ${
                  isInCompare
                    ? 'bg-blue-500 text-white hover:bg-blue-600'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                }`}
              >
                <BarChart3 className="w-6 h-6" />
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}