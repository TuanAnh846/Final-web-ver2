import React, { useState } from 'react';
import { X, Plus, Edit, Trash2, Save, Upload, Database, Users, Package, BarChart, Percent, Tag, Image, Cuboid as Cube, FileText, Shield, AlertTriangle, CheckCircle, User } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Product, Discount } from '../types';

interface AdminPanelProps {
  onClose: () => void;
  products: Product[];
  onUpdateProducts: (products: Product[]) => void;
  discounts: Discount[];
  onUpdateDiscounts: (discounts: Discount[]) => void;
}

export function AdminPanel({ onClose, products, onUpdateProducts, discounts, onUpdateDiscounts }: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<'products' | 'discounts' | 'media' | 'database' | 'analytics' | 'users'>('products');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editingDiscount, setEditingDiscount] = useState<Discount | null>(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [isAddingDiscount, setIsAddingDiscount] = useState(false);
  const [dbStatus, setDbStatus] = useState<'disconnected' | 'connecting' | 'connected'>('disconnected');
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    price: 0,
    description: '',
    image: '',
    images: [],
    category: 'gundam',
    rating: 0,
    reviews: 0,
    inStock: true,
    hasModel3D: false,
    features: [],
    specifications: {}
  });

  const [newDiscount, setNewDiscount] = useState<Partial<Discount>>({
    code: '',
    type: 'percentage',
    value: 0,
    minOrderAmount: 0,
    validFrom: new Date(),
    validTo: new Date(),
    isActive: true,
    usageLimit: 100,
    usedCount: 0
  });

  // Authority levels
  const authorityLevels = {
    viewer: 1,
    editor: 2,
    admin: 3,
    owner: 4
  };

  // Mock user authority (in real app, this would come from authentication)
  const currentUserAuthority = authorityLevels.owner; // Simulating owner access

  const hasPermission = (requiredLevel: number) => {
    return currentUserAuthority >= requiredLevel;
  };

  const connectToDatabase = async () => {
    if (!hasPermission(authorityLevels.admin)) {
      alert('Insufficient permissions to access database');
      return;
    }
    
    setDbStatus('connecting');
    // Simulate database connection
    setTimeout(() => {
      setDbStatus('connected');
    }, 2000);
  };

  const handleFileUpload = async (files: FileList, type: 'image' | '3d') => {
    if (!hasPermission(authorityLevels.editor)) {
      alert('Insufficient permissions to upload files');
      return;
    }

    setUploadStatus('uploading');
    
    // Simulate file upload process
    const uploadPromises = Array.from(files).map(file => {
      return new Promise<string>((resolve, reject) => {
        // Validate file types
        if (type === 'image' && !file.type.startsWith('image/')) {
          reject(new Error(`Invalid image file: ${file.name}`));
          return;
        }
        
        if (type === '3d' && !file.name.toLowerCase().endsWith('.glb') && !file.name.toLowerCase().endsWith('.gltf')) {
          reject(new Error(`Invalid 3D model file: ${file.name}. Only GLB and GLTF files are supported.`));
          return;
        }

        // Simulate upload delay
        setTimeout(() => {
          // In a real app, you would upload to a server and get back a URL
          const mockUrl = URL.createObjectURL(file);
          resolve(mockUrl);
        }, 1000 + Math.random() * 2000);
      });
    });

    try {
      const uploadedUrls = await Promise.all(uploadPromises);
      setUploadedFiles(prev => [...prev, ...uploadedUrls]);
      setUploadStatus('success');
      
      // Auto-reset status after 3 seconds
      setTimeout(() => setUploadStatus('idle'), 3000);
    } catch (error) {
      console.error('Upload failed:', error);
      setUploadStatus('error');
      setTimeout(() => setUploadStatus('idle'), 3000);
    }
  };

  const handleSaveProduct = () => {
    if (!hasPermission(authorityLevels.editor)) {
      alert('Insufficient permissions to modify products');
      return;
    }

    if (editingProduct) {
      const updatedProducts = products.map(p => 
        p.id === editingProduct.id ? editingProduct : p
      );
      onUpdateProducts(updatedProducts);
      setEditingProduct(null);
    } else if (isAddingProduct) {
      const productToAdd: Product = {
        ...newProduct as Product,
        id: Math.random().toString(36).substr(2, 9),
        images: newProduct.images || [newProduct.image || ''],
        features: newProduct.features || [],
        specifications: newProduct.specifications || {}
      };
      onUpdateProducts([...products, productToAdd]);
      setIsAddingProduct(false);
      setNewProduct({
        name: '',
        price: 0,
        description: '',
        image: '',
        images: [],
        category: 'gundam',
        rating: 0,
        reviews: 0,
        inStock: true,
        hasModel3D: false,
        features: [],
        specifications: {}
      });
    }
  };

  const handleSaveDiscount = () => {
    if (!hasPermission(authorityLevels.admin)) {
      alert('Insufficient permissions to modify discounts');
      return;
    }

    if (editingDiscount) {
      const updatedDiscounts = discounts.map(d => 
        d.id === editingDiscount.id ? editingDiscount : d
      );
      onUpdateDiscounts(updatedDiscounts);
      setEditingDiscount(null);
    } else if (isAddingDiscount) {
      const discountToAdd: Discount = {
        ...newDiscount as Discount,
        id: Math.random().toString(36).substr(2, 9),
      };
      onUpdateDiscounts([...discounts, discountToAdd]);
      setIsAddingDiscount(false);
      setNewDiscount({
        code: '',
        type: 'percentage',
        value: 0,
        minOrderAmount: 0,
        validFrom: new Date(),
        validTo: new Date(),
        isActive: true,
        usageLimit: 100,
        usedCount: 0
      });
    }
  };

  const handleDeleteProduct = (id: string) => {
    if (!hasPermission(authorityLevels.admin)) {
      alert('Insufficient permissions to delete products');
      return;
    }
    
    if (confirm('Are you sure you want to delete this product?')) {
      const updatedProducts = products.filter(p => p.id !== id);
      onUpdateProducts(updatedProducts);
    }
  };

  const handleDeleteDiscount = (id: string) => {
    if (!hasPermission(authorityLevels.admin)) {
      alert('Insufficient permissions to delete discounts');
      return;
    }
    
    if (confirm('Are you sure you want to delete this discount?')) {
      const updatedDiscounts = discounts.filter(d => d.id !== id);
      onUpdateDiscounts(updatedDiscounts);
    }
  };

  const applyDiscountToProduct = (productId: string, discountPercentage: number) => {
    if (!hasPermission(authorityLevels.editor)) {
      alert('Insufficient permissions to apply discounts');
      return;
    }

    const updatedProducts = products.map(p => {
      if (p.id === productId) {
        const originalPrice = p.originalPrice || p.price;
        const discountedPrice = originalPrice * (1 - discountPercentage / 100);
        return {
          ...p,
          originalPrice,
          price: discountedPrice,
          discountPercentage
        };
      }
      return p;
    });
    onUpdateProducts(updatedProducts);
  };

  const removeDiscountFromProduct = (productId: string) => {
    if (!hasPermission(authorityLevels.editor)) {
      alert('Insufficient permissions to remove discounts');
      return;
    }

    const updatedProducts = products.map(p => {
      if (p.id === productId && p.originalPrice) {
        return {
          ...p,
          price: p.originalPrice,
          originalPrice: undefined,
          discountPercentage: undefined
        };
      }
      return p;
    });
    onUpdateProducts(updatedProducts);
  };

  const renderUsersTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-slate-800 dark:text-white">User Management</h3>
        {hasPermission(authorityLevels.owner) && (
          <button className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all">
            <Plus className="w-4 h-4" />
            <span>Add User</span>
          </button>
        )}
      </div>

      {/* Authority Levels Info */}
      <div className="bg-slate-50 dark:bg-slate-700 rounded-xl p-6">
        <h4 className="font-bold text-slate-800 dark:text-white mb-4">Authority Levels</h4>
        <div className="grid grid-cols-2 gap-4">
          {[
            { level: 'Viewer', permissions: 'View products and analytics', color: 'bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200' },
            { level: 'Editor', permissions: 'Add/edit products, upload media', color: 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200' },
            { level: 'Admin', permissions: 'Manage discounts, delete items, database access', color: 'bg-orange-100 dark:bg-orange-900/20 text-orange-800 dark:text-orange-200' },
            { level: 'Owner', permissions: 'Full system access, user management', color: 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-200' }
          ].map((auth, index) => (
            <div key={index} className={`rounded-lg p-4 ${auth.color}`}>
              <h5 className="font-bold mb-2">{auth.level}</h5>
              <p className="text-sm">{auth.permissions}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Current User Status */}
      <div className="bg-white dark:bg-slate-700 rounded-xl p-6">
        <h4 className="font-bold text-slate-800 dark:text-white mb-4">Current User Status</h4>
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-xl flex items-center justify-center">
            <Shield className="w-6 h-6 text-red-600 dark:text-red-400" />
          </div>
          <div>
            <p className="font-bold text-slate-800 dark:text-white">Owner Access</p>
            <p className="text-slate-500 dark:text-slate-400 text-sm">Full system permissions</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderMediaTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-slate-800 dark:text-white">Media Management</h3>
        <div className="flex items-center space-x-2">
          <Shield className="w-4 h-4 text-slate-500 dark:text-slate-400" />
          <span className="text-sm text-slate-500 dark:text-slate-400">
            {hasPermission(authorityLevels.editor) ? 'Upload Enabled' : 'View Only'}
          </span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-6">
        {/* Image Upload */}
        <div className="bg-slate-50 dark:bg-slate-700 rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-xl flex items-center justify-center">
              <Image className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h4 className="font-bold text-slate-800 dark:text-white">Product Images</h4>
              <p className="text-slate-500 dark:text-slate-400 text-sm">Upload product gallery images</p>
            </div>
          </div>
          
          <div className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
            hasPermission(authorityLevels.editor) 
              ? 'border-slate-300 dark:border-slate-600 hover:border-blue-400 dark:hover:border-blue-500 cursor-pointer' 
              : 'border-slate-200 dark:border-slate-700 opacity-50'
          }`}>
            <Upload className={`w-12 h-12 mx-auto mb-4 ${
              hasPermission(authorityLevels.editor) ? 'text-slate-400 dark:text-slate-500' : 'text-slate-300 dark:text-slate-600'
            }`} />
            <p className="text-slate-600 dark:text-slate-300 mb-2">
              {hasPermission(authorityLevels.editor) ? 'Drag & drop images here' : 'Upload disabled'}
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">or click to browse</p>
            
            {hasPermission(authorityLevels.editor) ? (
              <div>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => e.target.files && handleFileUpload(e.target.files, 'image')}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all cursor-pointer inline-block"
                >
                  Choose Images
                </label>
              </div>
            ) : (
              <button
                disabled
                className="bg-slate-300 dark:bg-slate-600 text-slate-500 dark:text-slate-400 px-4 py-2 rounded-lg cursor-not-allowed"
              >
                Insufficient Permissions
              </button>
            )}
          </div>
          
          <div className="mt-4 text-xs text-slate-500 dark:text-slate-400">
            <p>• Supported formats: JPG, PNG, WebP</p>
            <p>• Maximum size: 5MB per image</p>
            <p>• Recommended resolution: 800x800px</p>
          </div>
        </div>

        {/* 3D Model Upload */}
        <div className="bg-slate-50 dark:bg-slate-700 rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-xl flex items-center justify-center">
              <Cube className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h4 className="font-bold text-slate-800 dark:text-white">3D Models</h4>
              <p className="text-slate-500 dark:text-slate-400 text-sm">Upload interactive 3D models</p>
            </div>
          </div>
          
          <div className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
            hasPermission(authorityLevels.editor) 
              ? 'border-slate-300 dark:border-slate-600 hover:border-purple-400 dark:hover:border-purple-500 cursor-pointer' 
              : 'border-slate-200 dark:border-slate-700 opacity-50'
          }`}>
            <Cube className={`w-12 h-12 mx-auto mb-4 ${
              hasPermission(authorityLevels.editor) ? 'text-slate-400 dark:text-slate-500' : 'text-slate-300 dark:text-slate-600'
            }`} />
            <p className="text-slate-600 dark:text-slate-300 mb-2">
              {hasPermission(authorityLevels.editor) ? 'Drag & drop 3D models here' : 'Upload disabled'}
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">or click to browse</p>
            
            {hasPermission(authorityLevels.editor) ? (
              <div>
                <input
                  type="file"
                  multiple
                  accept=".glb,.gltf"
                  onChange={(e) => e.target.files && handleFileUpload(e.target.files, '3d')}
                  className="hidden"
                  id="model-upload"
                />
                <label
                  htmlFor="model-upload"
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-all cursor-pointer inline-block"
                >
                  Choose 3D Models
                </label>
              </div>
            ) : (
              <button
                disabled
                className="bg-slate-300 dark:bg-slate-600 text-slate-500 dark:text-slate-400 px-4 py-2 rounded-lg cursor-not-allowed"
              >
                Insufficient Permissions
              </button>
            )}
          </div>
          
          <div className="mt-4 text-xs text-slate-500 dark:text-slate-400">
            <p>• Supported formats: GLB, GLTF</p>
            <p>• Maximum size: 50MB per model</p>
            <p>• Optimized for web viewing</p>
            <p>• <strong>Yes, you can import downloaded 3D models!</strong></p>
          </div>
        </div>
      </div>

      {/* Upload Status */}
      {uploadStatus !== 'idle' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-xl p-4 flex items-center space-x-3 ${
            uploadStatus === 'uploading' ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800' :
            uploadStatus === 'success' ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' :
            'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
          }`}
        >
          {uploadStatus === 'uploading' && <Upload className="w-5 h-5 text-blue-600 dark:text-blue-400 animate-pulse" />}
          {uploadStatus === 'success' && <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />}
          {uploadStatus === 'error' && <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />}
          
          <div>
            <p className={`font-semibold ${
              uploadStatus === 'uploading' ? 'text-blue-800 dark:text-blue-200' :
              uploadStatus === 'success' ? 'text-green-800 dark:text-green-200' :
              'text-red-800 dark:text-red-200'
            }`}>
              {uploadStatus === 'uploading' && 'Uploading files...'}
              {uploadStatus === 'success' && 'Upload successful!'}
              {uploadStatus === 'error' && 'Upload failed!'}
            </p>
            <p className={`text-sm ${
              uploadStatus === 'uploading' ? 'text-blue-600 dark:text-blue-400' :
              uploadStatus === 'success' ? 'text-green-600 dark:text-green-400' :
              'text-red-600 dark:text-red-400'
            }`}>
              {uploadStatus === 'uploading' && 'Please wait while files are being processed...'}
              {uploadStatus === 'success' && 'Your files have been uploaded and are ready to use.'}
              {uploadStatus === 'error' && 'Please check file format and try again.'}
            </p>
          </div>
        </motion.div>
      )}

      {/* Media Library */}
      <div className="bg-white dark:bg-slate-700 rounded-xl p-6">
        <h4 className="font-bold text-slate-800 dark:text-white mb-4">Media Library</h4>
        <div className="grid grid-cols-6 gap-4">
          {/* Sample media items + uploaded files */}
          {[...Array(6)].map((_, index) => (
            <div key={index} className="bg-slate-100 dark:bg-slate-600 rounded-lg p-4 text-center">
              <div className="w-full h-20 bg-slate-200 dark:bg-slate-500 rounded-lg mb-2 flex items-center justify-center">
                <Image className="w-8 h-8 text-slate-400 dark:text-slate-300" />
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 truncate">image_{index + 1}.jpg</p>
            </div>
          ))}
          
          {uploadedFiles.map((file, index) => (
            <div key={`uploaded-${index}`} className="bg-green-100 dark:bg-green-900/20 rounded-lg p-4 text-center border border-green-200 dark:border-green-800">
              <div className="w-full h-20 bg-green-200 dark:bg-green-800/30 rounded-lg mb-2 flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <p className="text-xs text-green-700 dark:text-green-300 truncate">uploaded_{index + 1}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Upload Instructions */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
        <div className="flex items-start space-x-3">
          <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400 mt-1" />
          <div>
            <h4 className="font-bold text-blue-800 dark:text-blue-200 mb-2">3D Model Import Guidelines</h4>
            <div className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
              <p>• <strong>Yes, you can import downloaded 3D models!</strong> Just ensure they're in GLB or GLTF format</p>
              <p>• <strong>File Conversion:</strong> Use Blender (free) to convert other formats to GLB/GLTF</p>
              <p>• <strong>Optimization:</strong> Keep models under 50MB for best web performance</p>
              <p>• <strong>Textures:</strong> Embedded textures work best for web display</p>
              <p>• <strong>Authority Required:</strong> Editor level or higher needed for uploads</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDiscountsTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-slate-800 dark:text-white">Discount Management</h3>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Shield className="w-4 h-4 text-slate-500 dark:text-slate-400" />
            <span className="text-sm text-slate-500 dark:text-slate-400">
              {hasPermission(authorityLevels.admin) ? 'Admin Access' : 'View Only'}
            </span>
          </div>
          {hasPermission(authorityLevels.admin) && (
            <button 
              onClick={() => setIsAddingDiscount(true)}
              className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Add Discount</span>
            </button>
          )}
        </div>
      </div>

      {/* Add/Edit Discount Form */}
      {(isAddingDiscount || editingDiscount) && hasPermission(authorityLevels.admin) && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-50 dark:bg-slate-700 rounded-xl p-6"
        >
          <h4 className="font-bold text-slate-800 dark:text-white mb-4">
            {isAddingDiscount ? 'Add New Discount' : 'Edit Discount'}
          </h4>
          
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Discount Code (e.g., SAVE20)"
              value={isAddingDiscount ? newDiscount.code : editingDiscount?.code || ''}
              onChange={(e) => {
                if (isAddingDiscount) {
                  setNewDiscount(prev => ({ ...prev, code: e.target.value.toUpperCase() }));
                } else if (editingDiscount) {
                  setEditingDiscount({ ...editingDiscount, code: e.target.value.toUpperCase() });
                }
              }}
              className="px-4 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-800 dark:text-white"
            />
            
            <select
              value={isAddingDiscount ? newDiscount.type : editingDiscount?.type || 'percentage'}
              onChange={(e) => {
                const type = e.target.value as 'percentage' | 'fixed';
                if (isAddingDiscount) {
                  setNewDiscount(prev => ({ ...prev, type }));
                } else if (editingDiscount) {
                  setEditingDiscount({ ...editingDiscount, type });
                }
              }}
              className="px-4 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-800 dark:text-white"
            >
              <option value="percentage">Percentage</option>
              <option value="fixed">Fixed Amount</option>
            </select>

            <input
              type="number"
              placeholder="Discount Value"
              value={isAddingDiscount ? newDiscount.value : editingDiscount?.value || 0}
              onChange={(e) => {
                const value = parseFloat(e.target.value) || 0;
                if (isAddingDiscount) {
                  setNewDiscount(prev => ({ ...prev, value }));
                } else if (editingDiscount) {
                  setEditingDiscount({ ...editingDiscount, value });
                }
              }}
              className="px-4 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-800 dark:text-white"
            />

            <input
              type="number"
              placeholder="Min Order Amount"
              value={isAddingDiscount ? newDiscount.minOrderAmount : editingDiscount?.minOrderAmount || 0}
              onChange={(e) => {
                const minOrderAmount = parseFloat(e.target.value) || 0;
                if (isAddingDiscount) {
                  setNewDiscount(prev => ({ ...prev, minOrderAmount }));
                } else if (editingDiscount) {
                  setEditingDiscount({ ...editingDiscount, minOrderAmount });
                }
              }}
              className="px-4 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-800 dark:text-white"
            />

            <input
              type="number"
              placeholder="Usage Limit"
              value={isAddingDiscount ? newDiscount.usageLimit : editingDiscount?.usageLimit || 0}
              onChange={(e) => {
                const usageLimit = parseInt(e.target.value) || 0;
                if (isAddingDiscount) {
                  setNewDiscount(prev => ({ ...prev, usageLimit }));
                } else if (editingDiscount) {
                  setEditingDiscount({ ...editingDiscount, usageLimit });
                }
              }}
              className="px-4 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-800 dark:text-white"
            />

            <input
              type="date"
              value={isAddingDiscount ? newDiscount.validTo?.toISOString().split('T')[0] : editingDiscount?.validTo?.toISOString().split('T')[0] || ''}
              onChange={(e) => {
                const validTo = new Date(e.target.value);
                if (isAddingDiscount) {
                  setNewDiscount(prev => ({ ...prev, validTo }));
                } else if (editingDiscount) {
                  setEditingDiscount({ ...editingDiscount, validTo });
                }
              }}
              className="px-4 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-800 dark:text-white"
            />
          </div>

          <div className="flex space-x-4 mt-4">
            <button
              onClick={handleSaveDiscount}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all"
            >
              <Save className="w-4 h-4" />
              <span>Save</span>
            </button>
            <button
              onClick={() => {
                setIsAddingDiscount(false);
                setEditingDiscount(null);
              }}
              className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-600 transition-all"
            >
              Cancel
            </button>
          </div>
        </motion.div>
      )}

      {/* Active Discounts */}
      <div className="grid gap-4">
        {discounts.map((discount) => (
          <motion.div
            key={discount.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white dark:bg-slate-700 rounded-xl p-6 shadow-sm border border-slate-100 dark:border-slate-600"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-xl flex items-center justify-center">
                  <Percent className="w-6 h-6 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 dark:text-white text-lg">{discount.code}</h4>
                  <p className="text-slate-500 dark:text-slate-400">
                    {discount.value}{discount.type === 'percentage' ? '% off' : ' $ off'}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  discount.isActive 
                    ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' 
                    : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                }`}>
                  {discount.isActive ? 'Active' : 'Inactive'}
                </div>
                {hasPermission(authorityLevels.admin) && (
                  <>
                    <button
                      onClick={() => setEditingDiscount(discount)}
                      className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteDiscount(discount.id)}
                      className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-slate-500 dark:text-slate-400">Usage:</span>
                <p className="font-semibold text-slate-800 dark:text-white">
                  {discount.usedCount} / {discount.usageLimit || '∞'}
                </p>
              </div>
              <div>
                <span className="text-slate-500 dark:text-slate-400">Min Order:</span>
                <p className="font-semibold text-slate-800 dark:text-white">
                  ${discount.minOrderAmount || 0}
                </p>
              </div>
              <div>
                <span className="text-slate-500 dark:text-slate-400">Valid Until:</span>
                <p className="font-semibold text-slate-800 dark:text-white">
                  {discount.validTo.toLocaleDateString()}
                </p>
              </div>
              <div>
                <span className="text-slate-500 dark:text-slate-400">Type:</span>
                <p className="font-semibold text-slate-800 dark:text-white capitalize">
                  {discount.type}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Apply Discounts to Products */}
      {hasPermission(authorityLevels.editor) && (
        <div className="bg-slate-50 dark:bg-slate-700 rounded-xl p-6">
          <h4 className="font-bold text-slate-800 dark:text-white mb-4">Apply Discounts to Products</h4>
          <div className="space-y-4">
            {products.slice(0, 5).map((product) => (
              <div key={product.id} className="flex items-center justify-between bg-white dark:bg-slate-600 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded-lg" />
                  <div>
                    <h5 className="font-semibold text-slate-800 dark:text-white">{product.name}</h5>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">
                      ${product.price.toFixed(2)}
                      {product.originalPrice && (
                        <span className="ml-2 line-through">${product.originalPrice.toFixed(2)}</span>
                      )}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  {!product.discountPercentage ? (
                    <>
                      <button
                        onClick={() => applyDiscountToProduct(product.id, 10)}
                        className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-all"
                      >
                        10% OFF
                      </button>
                      <button
                        onClick={() => applyDiscountToProduct(product.id, 20)}
                        className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition-all"
                      >
                        20% OFF
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => removeDiscountFromProduct(product.id)}
                      className="px-3 py-1 bg-gray-600 text-white rounded text-sm hover:bg-gray-700 transition-all"
                    >
                      Remove Discount
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderProductsTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-slate-800 dark:text-white">Product Management</h3>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Shield className="w-4 h-4 text-slate-500 dark:text-slate-400" />
            <span className="text-sm text-slate-500 dark:text-slate-400">
              {hasPermission(authorityLevels.editor) ? 'Edit Enabled' : 'View Only'}
            </span>
          </div>
          {hasPermission(authorityLevels.editor) && (
            <button
              onClick={() => setIsAddingProduct(true)}
              className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Add Product</span>
            </button>
          )}
        </div>
      </div>

      {(isAddingProduct || editingProduct) && hasPermission(authorityLevels.editor) && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-50 dark:bg-slate-700 rounded-xl p-6"
        >
          <h4 className="font-bold text-slate-800 dark:text-white mb-4">
            {isAddingProduct ? 'Add New Product' : 'Edit Product'}
          </h4>
          
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Product Name"
              value={isAddingProduct ? newProduct.name : editingProduct?.name || ''}
              onChange={(e) => {
                if (isAddingProduct) {
                  setNewProduct(prev => ({ ...prev, name: e.target.value }));
                } else if (editingProduct) {
                  setEditingProduct({ ...editingProduct, name: e.target.value });
                }
              }}
              className="px-4 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-800 dark:text-white"
            />
            
            <input
              type="number"
              placeholder="Price"
              value={isAddingProduct ? newProduct.price : editingProduct?.price || 0}
              onChange={(e) => {
                const price = parseFloat(e.target.value) || 0;
                if (isAddingProduct) {
                  setNewProduct(prev => ({ ...prev, price }));
                } else if (editingProduct) {
                  setEditingProduct({ ...editingProduct, price });
                }
              }}
              className="px-4 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-800 dark:text-white"
            />

            <input
              type="url"
              placeholder="Image URL"
              value={isAddingProduct ? newProduct.image : editingProduct?.image || ''}
              onChange={(e) => {
                if (isAddingProduct) {
                  setNewProduct(prev => ({ ...prev, image: e.target.value }));
                } else if (editingProduct) {
                  setEditingProduct({ ...editingProduct, image: e.target.value });
                }
              }}
              className="px-4 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-800 dark:text-white"
            />

            <input
              type="url"
              placeholder="3D Model URL (optional)"
              value={isAddingProduct ? newProduct.modelUrl : editingProduct?.modelUrl || ''}
              onChange={(e) => {
                if (isAddingProduct) {
                  setNewProduct(prev => ({ ...prev, modelUrl: e.target.value, hasModel3D: !!e.target.value }));
                } else if (editingProduct) {
                  setEditingProduct({ ...editingProduct, modelUrl: e.target.value, hasModel3D: !!e.target.value });
                }
              }}
              className="px-4 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-800 dark:text-white"
            />
          </div>

          <textarea
            placeholder="Description"
            value={isAddingProduct ? newProduct.description : editingProduct?.description || ''}
            onChange={(e) => {
              if (isAddingProduct) {
                setNewProduct(prev => ({ ...prev, description: e.target.value }));
              } else if (editingProduct) {
                setEditingProduct({ ...editingProduct, description: e.target.value });
              }
            }}
            className="w-full mt-4 px-4 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-800 dark:text-white"
            rows={3}
          />

          <div className="flex space-x-4 mt-4">
            <button
              onClick={handleSaveProduct}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all"
            >
              <Save className="w-4 h-4" />
              <span>Save</span>
            </button>
            <button
              onClick={() => {
                setIsAddingProduct(false);
                setEditingProduct(null);
              }}
              className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-600 transition-all"
            >
              Cancel
            </button>
          </div>
        </motion.div>
      )}

      <div className="space-y-4">
        {products.map((product) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-between bg-white dark:bg-slate-700 rounded-xl p-4 shadow-sm"
          >
            <div className="flex items-center space-x-4">
              <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded-lg" />
              <div>
                <h4 className="font-bold text-slate-800 dark:text-white">{product.name}</h4>
                <div className="flex items-center space-x-2">
                  <p className="text-slate-500 dark:text-slate-400">${product.price.toFixed(2)}</p>
                  {product.originalPrice && (
                    <>
                      <span className="text-slate-400 line-through text-sm">${product.originalPrice.toFixed(2)}</span>
                      <span className="bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 px-2 py-1 rounded text-xs font-semibold">
                        {product.discountPercentage}% OFF
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex space-x-2">
              {hasPermission(authorityLevels.editor) && (
                <button
                  onClick={() => setEditingProduct(product)}
                  className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all"
                >
                  <Edit className="w-4 h-4" />
                </button>
              )}
              {hasPermission(authorityLevels.admin) && (
                <button
                  onClick={() => handleDeleteProduct(product.id)}
                  className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderDatabaseTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-slate-800 dark:text-white">Database Management</h3>
        <div className="flex items-center space-x-2">
          <Shield className="w-4 h-4 text-slate-500 dark:text-slate-400" />
          <span className="text-sm text-slate-500 dark:text-slate-400">
            {hasPermission(authorityLevels.admin) ? 'Admin Access' : 'Access Denied'}
          </span>
        </div>
      </div>
      
      {hasPermission(authorityLevels.admin) ? (
        <>
          <div className="bg-slate-50 dark:bg-slate-700 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="font-bold text-slate-800 dark:text-white">SQL Server Connection</h4>
                <p className="text-slate-500 dark:text-slate-400 text-sm">Connect to your SQL Server database</p>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
                dbStatus === 'connected' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' :
                dbStatus === 'connecting' ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200' :
                'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
              }`}>
                {dbStatus === 'connected' ? 'Connected' : dbStatus === 'connecting' ? 'Connecting...' : 'Disconnected'}
              </div>
            </div>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Server Address (e.g., localhost:1433)"
                className="w-full px-4 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-800 dark:text-white"
              />
              <input
                type="text"
                placeholder="Database Name"
                className="w-full px-4 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-800 dark:text-white"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Username"
                  className="px-4 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-800 dark:text-white"
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="px-4 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-800 dark:text-white"
                />
              </div>
              
              <button
                onClick={connectToDatabase}
                disabled={dbStatus === 'connecting'}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all disabled:opacity-50"
              >
                <Database className="w-4 h-4" />
                <span>{dbStatus === 'connecting' ? 'Connecting...' : 'Connect to Database'}</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white dark:bg-slate-700 rounded-xl p-6">
              <h4 className="font-bold text-slate-800 dark:text-white mb-4">Data Backup</h4>
              <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-all">
                Export Database
              </button>
            </div>
            
            <div className="bg-white dark:bg-slate-700 rounded-xl p-6">
              <h4 className="font-bold text-slate-800 dark:text-white mb-4">Data Import</h4>
              <button className="w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 transition-all">
                Import Data
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-8 text-center">
          <AlertTriangle className="w-16 h-16 text-red-500 dark:text-red-400 mx-auto mb-4" />
          <h4 className="font-bold text-red-800 dark:text-red-200 mb-2">Access Denied</h4>
          <p className="text-red-600 dark:text-red-400">Admin privileges required to access database management.</p>
        </div>
      )}
    </div>
  );

  const renderAnalyticsTab = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-slate-800 dark:text-white">Analytics Dashboard</h3>
      
      <div className="grid grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 dark:text-blue-400 text-sm font-medium">Total Products</p>
              <p className="text-2xl font-bold text-blue-800 dark:text-blue-200">{products.length}</p>
            </div>
            <Package className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-600 dark:text-green-400 text-sm font-medium">In Stock</p>
              <p className="text-2xl font-bold text-green-800 dark:text-green-200">
                {products.filter(p => p.inStock).length}
              </p>
            </div>
            <BarChart className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-600 dark:text-purple-400 text-sm font-medium">Avg Rating</p>
              <p className="text-2xl font-bold text-purple-800 dark:text-purple-200">
                {(products.reduce((acc, p) => acc + p.rating, 0) / products.length).toFixed(1)}
              </p>
            </div>
            <Users className="w-8 h-8 text-purple-600 dark:text-purple-400" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-red-50 dark:bg-red-900/20 rounded-xl p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-600 dark:text-red-400 text-sm font-medium">On Sale</p>
              <p className="text-2xl font-bold text-red-800 dark:text-red-200">
                {products.filter(p => p.discountPercentage).length}
              </p>
            </div>
            <Tag className="w-8 h-8 text-red-600 dark:text-red-400" />
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-700 rounded-xl p-6">
          <h4 className="font-bold text-slate-800 dark:text-white mb-4">Active Discounts</h4>
          <div className="space-y-3">
            {discounts.filter(d => d.isActive).map((discount) => (
              <div key={discount.id} className="flex items-center justify-between bg-slate-50 dark:bg-slate-600 rounded-lg p-3">
                <div>
                  <span className="font-semibold text-slate-800 dark:text-white">{discount.code}</span>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {discount.value}{discount.type === 'percentage' ? '% off' : '$ off'}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-slate-800 dark:text-white">
                    {discount.usedCount}/{discount.usageLimit || '∞'}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">used</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-700 rounded-xl p-6">
          <h4 className="font-bold text-slate-800 dark:text-white mb-4">Category Distribution</h4>
          <div className="space-y-3">
            {['gundam', 'figure', 'accessories', 'tools'].map((category) => {
              const count = products.filter(p => p.category === category).length;
              const percentage = ((count / products.length) * 100).toFixed(1);
              return (
                <div key={category} className="flex items-center justify-between">
                  <span className="capitalize text-slate-800 dark:text-white font-medium">{category}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-slate-200 dark:bg-slate-600 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full" 
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-slate-600 dark:text-slate-300">{count}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-slate-800 rounded-2xl max-w-7xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
      >
        <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-700">
          <div>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Admin Panel</h2>
            <p className="text-slate-500 dark:text-slate-400">Manage your store with authority controls</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 p-2 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-xl transition-all">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex">
          <div className="w-64 bg-slate-50 dark:bg-slate-700 p-6">
            <nav className="space-y-2">
              {[
                { id: 'products', label: 'Products', icon: Package },
                { id: 'discounts', label: 'Discounts', icon: Percent },
                { id: 'media', label: 'Media', icon: Image },
                { id: 'database', label: 'Database', icon: Database },
                { id: 'analytics', label: 'Analytics', icon: BarChart },
                { id: 'users', label: 'Users', icon: User }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center space-x-3 ${
                    activeTab === tab.id 
                      ? 'bg-slate-800 dark:bg-slate-600 text-white' 
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="flex-1 p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
            {activeTab === 'products' && renderProductsTab()}
            {activeTab === 'discounts' && renderDiscountsTab()}
            {activeTab === 'media' && renderMediaTab()}
            {activeTab === 'database' && renderDatabaseTab()}
            {activeTab === 'analytics' && renderAnalyticsTab()}
            {activeTab === 'users' && renderUsersTab()}
          </div>
        </div>
      </motion.div>
    </div>
  );
}