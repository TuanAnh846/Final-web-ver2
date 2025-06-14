import React, { useState } from 'react';
import { X, Palette, Wrench, Sparkles, PenTool as Tool, Clock, Star, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import type { CustomService } from '../types';

interface CustomServicesModalProps {
  onClose: () => void;
}

export function CustomServicesModal({ onClose }: CustomServicesModalProps) {
  const [selectedService, setSelectedService] = useState<CustomService | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const customServices: CustomService[] = [
    {
      id: '1',
      name: 'Professional Assembly',
      description: 'Expert assembly of your Gunpla with perfect panel lining and detail work.',
      price: 29.99,
      category: 'assembly',
      duration: '3-5 business days',
      features: ['Professional assembly', 'Panel line accent', 'Sticker application', 'Quality inspection']
    },
    {
      id: '2',
      name: 'Custom Paint Job',
      description: 'Transform your model with custom colors and weathering effects.',
      price: 89.99,
      category: 'painting',
      duration: '7-10 business days',
      features: ['Custom color scheme', 'Primer and base coat', 'Detail painting', 'Clear coat finish']
    },
    {
      id: '3',
      name: 'LED Installation',
      description: 'Add stunning LED lighting effects to compatible models.',
      price: 49.99,
      category: 'customization',
      duration: '5-7 business days',
      features: ['LED strip installation', 'Battery pack setup', 'Switch mechanism', 'Wire management']
    },
    {
      id: '4',
      name: 'Weathering Effects',
      description: 'Realistic battle damage and weathering for authentic appearance.',
      price: 39.99,
      category: 'painting',
      duration: '4-6 business days',
      features: ['Dry brushing', 'Wash application', 'Chipping effects', 'Rust simulation']
    },
    {
      id: '5',
      name: 'Pose Customization',
      description: 'Create dynamic action poses with custom base and effects.',
      price: 34.99,
      category: 'customization',
      duration: '3-5 business days',
      features: ['Action base setup', 'Effect parts', 'Dynamic posing', 'Stability optimization']
    },
    {
      id: '6',
      name: 'Repair Service',
      description: 'Fix broken parts and restore your precious collectibles.',
      price: 24.99,
      category: 'repair',
      duration: '2-4 business days',
      features: ['Part replacement', 'Joint tightening', 'Crack repair', 'Color matching']
    },
    {
      id: '7',
      name: 'Premium Detail Package',
      description: 'Complete transformation with painting, weathering, and custom details.',
      price: 149.99,
      category: 'painting',
      duration: '10-14 business days',
      features: ['Full disassembly', 'Custom paint scheme', 'Weathering effects', 'Detail enhancement', 'LED installation', 'Custom base']
    },
    {
      id: '8',
      name: 'Speed Assembly',
      description: 'Quick professional assembly for immediate display.',
      price: 19.99,
      category: 'assembly',
      duration: '1-2 business days',
      features: ['Fast assembly', 'Basic panel lining', 'Sticker application', 'Quality check']
    }
  ];

  const categories = [
    { id: 'all', name: 'All Services', icon: Sparkles },
    { id: 'assembly', name: 'Assembly', icon: Tool },
    { id: 'painting', name: 'Painting', icon: Palette },
    { id: 'customization', name: 'Customization', icon: Wrench },
    { id: 'repair', name: 'Repair', icon: Tool }
  ];

  const filteredServices = selectedCategory === 'all' 
    ? customServices 
    : customServices.filter(service => service.category === selectedCategory);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'assembly': return 'from-blue-500 to-blue-600';
      case 'painting': return 'from-purple-500 to-purple-600';
      case 'customization': return 'from-green-500 to-green-600';
      case 'repair': return 'from-orange-500 to-orange-600';
      default: return 'from-slate-500 to-slate-600';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'assembly': return Tool;
      case 'painting': return Palette;
      case 'customization': return Wrench;
      case 'repair': return Tool;
      default: return Sparkles;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-slate-800 rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
      >
        {/* Header */}
        <div className="bg-slate-800 dark:bg-slate-700 text-white p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Custom Services</h2>
                <p className="text-slate-300 text-sm">Professional customization for your collectibles</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-slate-300 p-2 hover:bg-white/10 rounded-lg transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Category Filter */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-semibold transition-all ${
                      selectedCategory === category.id
                        ? 'bg-slate-800 dark:bg-slate-600 text-white shadow-lg'
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span>{category.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => {
              const IconComponent = getCategoryIcon(service.category);
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-slate-50 dark:bg-slate-700 rounded-xl p-6 hover:shadow-lg transition-all cursor-pointer group"
                  onClick={() => setSelectedService(service)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-r ${getCategoryColor(service.category)} rounded-xl flex items-center justify-center text-white`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-slate-800 dark:text-white">${service.price}</p>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span className="text-xs text-slate-500 dark:text-slate-400">{service.duration}</span>
                      </div>
                    </div>
                  </div>

                  <h3 className="font-bold text-slate-800 dark:text-white mb-2 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 text-sm mb-4 line-clamp-2">
                    {service.description}
                  </p>

                  <div className="space-y-2">
                    {service.features.slice(0, 3).map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Check className="w-3 h-3 text-green-500" />
                        <span className="text-xs text-slate-600 dark:text-slate-300">{feature}</span>
                      </div>
                    ))}
                    {service.features.length > 3 && (
                      <p className="text-xs text-slate-600 dark:text-slate-400">+{service.features.length - 3} more features</p>
                    )}
                  </div>

                  <button className="w-full mt-4 bg-slate-800 dark:bg-slate-600 text-white py-2 rounded-lg font-semibold hover:bg-slate-700 dark:hover:bg-slate-500 transition-all shadow-lg hover:shadow-xl">
                    Select Service
                  </button>
                </motion.div>
              );
            })}
          </div>

          {/* Service Details Modal */}
          {selectedService && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="fixed inset-0 bg-black/50 z-60 flex items-center justify-center p-4"
              onClick={() => setSelectedService(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white dark:bg-slate-800 rounded-2xl max-w-2xl w-full p-6 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 bg-gradient-to-r ${getCategoryColor(selectedService.category)} rounded-xl flex items-center justify-center text-white`}>
                      {React.createElement(getCategoryIcon(selectedService.category), { className: "w-6 h-6" })}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-800 dark:text-white">{selectedService.name}</h3>
                      <p className="text-slate-500 dark:text-slate-400 capitalize">{selectedService.category} Service</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedService(null)}
                    className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 p-2 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg transition-all"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-slate-800 dark:text-white mb-2">Description</h4>
                    <p className="text-slate-600 dark:text-slate-300">{selectedService.description}</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-slate-800 dark:text-white mb-2">Pricing</h4>
                      <p className="text-3xl font-bold text-slate-800 dark:text-white">${selectedService.price}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800 dark:text-white mb-2">Duration</h4>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-slate-400" />
                        <span className="text-slate-600 dark:text-slate-300">{selectedService.duration}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-slate-800 dark:text-white mb-3">What's Included</h4>
                    <div className="grid md:grid-cols-2 gap-2">
                      {selectedService.features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <Check className="w-4 h-4 text-green-500" />
                          <span className="text-slate-600 dark:text-slate-300 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <button
                      onClick={() => setSelectedService(null)}
                      className="flex-1 py-3 border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 rounded-xl font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"
                    >
                      Cancel
                    </button>
                    <button className="flex-1 py-3 bg-slate-800 dark:bg-slate-600 text-white rounded-xl font-semibold hover:bg-slate-700 dark:hover:bg-slate-500 transition-all shadow-lg hover:shadow-xl">
                      Book Service
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}