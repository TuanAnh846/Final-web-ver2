import React, { useState } from 'react';
import { X, Package, Truck, MapPin, Clock, CheckCircle, AlertCircle, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import type { TrackingInfo } from '../types';

interface TrackingModalProps {
  onClose: () => void;
}

export function TrackingModal({ onClose }: TrackingModalProps) {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [trackingInfo, setTrackingInfo] = useState<TrackingInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Mock tracking data
  const mockTrackingData: Record<string, TrackingInfo> = {
    'GV2024001': {
      trackingNumber: 'GV2024001',
      status: 'delivered',
      estimatedDelivery: new Date('2024-01-15'),
      currentLocation: 'Your Address',
      updates: [
        {
          timestamp: new Date('2024-01-15T14:30:00'),
          status: 'Delivered',
          location: 'Your Address',
          description: 'Package delivered successfully'
        },
        {
          timestamp: new Date('2024-01-15T09:15:00'),
          status: 'Out for Delivery',
          location: 'Local Delivery Facility',
          description: 'Package is out for delivery'
        },
        {
          timestamp: new Date('2024-01-14T18:45:00'),
          status: 'In Transit',
          location: 'Regional Distribution Center',
          description: 'Package arrived at regional facility'
        },
        {
          timestamp: new Date('2024-01-13T12:00:00'),
          status: 'Shipped',
          location: 'GundamVerse Warehouse',
          description: 'Package shipped from our facility'
        },
        {
          timestamp: new Date('2024-01-12T16:30:00'),
          status: 'Processing',
          location: 'GundamVerse Warehouse',
          description: 'Order is being prepared for shipment'
        }
      ]
    },
    'GV2024002': {
      trackingNumber: 'GV2024002',
      status: 'in-transit',
      estimatedDelivery: new Date('2024-01-18'),
      currentLocation: 'Regional Distribution Center',
      updates: [
        {
          timestamp: new Date('2024-01-16T10:20:00'),
          status: 'In Transit',
          location: 'Regional Distribution Center',
          description: 'Package arrived at regional facility'
        },
        {
          timestamp: new Date('2024-01-15T14:00:00'),
          status: 'Shipped',
          location: 'GundamVerse Warehouse',
          description: 'Package shipped from our facility'
        },
        {
          timestamp: new Date('2024-01-14T11:15:00'),
          status: 'Processing',
          location: 'GundamVerse Warehouse',
          description: 'Order is being prepared for shipment'
        }
      ]
    }
  };

  const handleTrack = async () => {
    if (!trackingNumber.trim()) {
      setError('Please enter a tracking number');
      return;
    }

    setIsLoading(true);
    setError('');

    // Simulate API call
    setTimeout(() => {
      const data = mockTrackingData[trackingNumber.toUpperCase()];
      if (data) {
        setTrackingInfo(data);
      } else {
        setError('Tracking number not found. Please check and try again.');
      }
      setIsLoading(false);
    }, 1000);
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'out for delivery':
      case 'out-for-delivery':
        return <Truck className="w-5 h-5 text-blue-500" />;
      case 'in transit':
      case 'in-transit':
        return <Package className="w-5 h-5 text-orange-500" />;
      case 'shipped':
        return <Package className="w-5 h-5 text-blue-500" />;
      case 'processing':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'text-green-600 dark:text-green-400';
      case 'out for delivery':
      case 'out-for-delivery':
        return 'text-blue-600 dark:text-blue-400';
      case 'in transit':
      case 'in-transit':
        return 'text-orange-600 dark:text-orange-400';
      case 'shipped':
        return 'text-blue-600 dark:text-blue-400';
      case 'processing':
        return 'text-yellow-600 dark:text-yellow-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-slate-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
      >
        {/* Header */}
        <div className="bg-slate-800 dark:bg-slate-700 text-white p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Package className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Package Tracking</h2>
                <p className="text-slate-300 text-sm">Track your GundamVerse orders</p>
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
          {/* Tracking Input */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
              Tracking Number
            </label>
            <div className="flex space-x-3">
              <input
                type="text"
                placeholder="Enter tracking number (e.g., GV2024001)"
                value={trackingNumber}
                onChange={(e) => {
                  setTrackingNumber(e.target.value.toUpperCase());
                  setError('');
                }}
                className="flex-1 px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-slate-500 bg-white dark:bg-slate-700 text-slate-800 dark:text-white transition-all"
              />
              <button
                onClick={handleTrack}
                disabled={isLoading}
                className="px-6 py-3 bg-slate-800 dark:bg-slate-600 text-white rounded-xl font-semibold hover:bg-slate-700 dark:hover:bg-slate-500 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                <Search className="w-4 h-4" />
                <span>{isLoading ? 'Tracking...' : 'Track'}</span>
              </button>
            </div>
            
            {/* Sample tracking numbers */}
            <div className="mt-3 text-xs text-slate-500 dark:text-slate-400">
              <p>Sample tracking numbers: GV2024001 (delivered), GV2024002 (in transit)</p>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4"
            >
              <div className="flex items-center space-x-3">
                <AlertCircle className="w-5 h-5 text-red-500" />
                <p className="text-red-700 dark:text-red-300">{error}</p>
              </div>
            </motion.div>
          )}

          {/* Tracking Results */}
          {trackingInfo && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Status Overview */}
              <div className="bg-slate-50 dark:bg-slate-700 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(trackingInfo.status)}
                    <div>
                      <h3 className="font-bold text-slate-800 dark:text-white text-lg">
                        {trackingInfo.trackingNumber}
                      </h3>
                      <p className={`font-semibold capitalize ${getStatusColor(trackingInfo.status)}`}>
                        {trackingInfo.status.replace('-', ' ')}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-slate-500 dark:text-slate-400">Estimated Delivery</p>
                    <p className="font-bold text-slate-800 dark:text-white">
                      {trackingInfo.estimatedDelivery.toLocaleDateString()}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-300">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">Current Location: {trackingInfo.currentLocation}</span>
                </div>
              </div>

              {/* Progress Timeline */}
              <div className="bg-slate-50 dark:bg-slate-700 rounded-xl p-6">
                <h4 className="font-bold text-slate-800 dark:text-white mb-4 text-lg">Tracking History</h4>
                <div className="space-y-4">
                  {trackingInfo.updates.map((update, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start space-x-4"
                    >
                      <div className="flex-shrink-0 mt-1">
                        {getStatusIcon(update.status)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className={`font-semibold ${getStatusColor(update.status)}`}>
                            {update.status}
                          </p>
                          <p className="text-sm text-slate-500 dark:text-slate-400">
                            {update.timestamp.toLocaleDateString()} {update.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                        <p className="text-slate-600 dark:text-slate-300 text-sm">{update.description}</p>
                        <p className="text-slate-500 dark:text-slate-400 text-xs">{update.location}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Delivery Information */}
              <div className="bg-slate-50 dark:bg-slate-700 rounded-xl p-6">
                <h4 className="font-bold text-slate-800 dark:text-white mb-3">Delivery Information</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-slate-500 dark:text-slate-400">Carrier</p>
                    <p className="font-semibold text-slate-800 dark:text-white">GundamVerse Express</p>
                  </div>
                  <div>
                    <p className="text-slate-500 dark:text-slate-400">Service Type</p>
                    <p className="font-semibold text-slate-800 dark:text-white">Standard Shipping</p>
                  </div>
                  <div>
                    <p className="text-slate-500 dark:text-slate-400">Weight</p>
                    <p className="font-semibold text-slate-800 dark:text-white">0.5 kg</p>
                  </div>
                  <div>
                    <p className="text-slate-500 dark:text-slate-400">Dimensions</p>
                    <p className="font-semibold text-slate-800 dark:text-white">25 x 15 x 8 cm</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}