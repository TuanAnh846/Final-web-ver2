import React from 'react';
import { X, Shield, Award, Users, Globe, Package, Truck, Star } from 'lucide-react';

interface AboutModalProps {
  onClose: () => void;
}

export function AboutModal({ onClose }: AboutModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="flex items-center justify-between p-8 border-b border-slate-100 dark:border-slate-700">
          <div>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white">About GundamVerse</h2>
            <p className="text-slate-500 dark:text-slate-400 mt-1">Your premier destination for authentic collectibles</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 p-2 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-xl transition-all">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-8 space-y-12">
          {/* Hero Section */}
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-slate-800 to-slate-600 dark:from-slate-600 dark:to-slate-400 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-slate-800 dark:text-white mb-4">Premium Collectibles Since 2015</h3>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
              GundamVerse is the world's leading marketplace for authentic Gundam models, premium figures, and collectible accessories. 
              We've been serving passionate collectors worldwide with the highest quality products and exceptional service.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center bg-slate-50 dark:bg-slate-700 rounded-2xl p-6">
              <div className="text-3xl font-bold text-slate-800 dark:text-white mb-2">50K+</div>
              <div className="text-slate-600 dark:text-slate-300 font-medium">Happy Customers</div>
            </div>
            <div className="text-center bg-slate-50 dark:bg-slate-700 rounded-2xl p-6">
              <div className="text-3xl font-bold text-slate-800 dark:text-white mb-2">1000+</div>
              <div className="text-slate-600 dark:text-slate-300 font-medium">Products</div>
            </div>
            <div className="text-center bg-slate-50 dark:bg-slate-700 rounded-2xl p-6">
              <div className="text-3xl font-bold text-slate-800 dark:text-white mb-2">95%</div>
              <div className="text-slate-600 dark:text-slate-300 font-medium">Satisfaction Rate</div>
            </div>
            <div className="text-center bg-slate-50 dark:bg-slate-700 rounded-2xl p-6">
              <div className="text-3xl font-bold text-slate-800 dark:text-white mb-2">8</div>
              <div className="text-slate-600 dark:text-slate-300 font-medium">Years Experience</div>
            </div>
          </div>

          {/* Our Mission */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">Our Mission</h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                We believe that every collector deserves access to authentic, high-quality products. Our mission is to bridge 
                the gap between passionate collectors and the premium models they desire, while providing an exceptional 
                shopping experience that builds lasting relationships.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-slate-800 dark:bg-slate-300 rounded-full"></div>
                  <span className="text-slate-600 dark:text-slate-300">100% Authentic Products Guaranteed</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-slate-800 dark:bg-slate-300 rounded-full"></div>
                  <span className="text-slate-600 dark:text-slate-300">Expert Curation & Quality Control</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-slate-800 dark:bg-slate-300 rounded-full"></div>
                  <span className="text-slate-600 dark:text-slate-300">Worldwide Shipping & Support</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 dark:bg-slate-700 rounded-2xl p-6 text-center">
                <Award className="w-8 h-8 text-slate-600 dark:text-slate-300 mx-auto mb-3" />
                <h4 className="font-bold text-slate-800 dark:text-white mb-2">Premium Quality</h4>
                <p className="text-sm text-slate-600 dark:text-slate-300">Only authentic products from official distributors</p>
              </div>
              <div className="bg-slate-50 dark:bg-slate-700 rounded-2xl p-6 text-center">
                <Globe className="w-8 h-8 text-slate-600 dark:text-slate-300 mx-auto mb-3" />
                <h4 className="font-bold text-slate-800 dark:text-white mb-2">Global Reach</h4>
                <p className="text-sm text-slate-600 dark:text-slate-300">Serving collectors in over 50 countries</p>
              </div>
              <div className="bg-slate-50 dark:bg-slate-700 rounded-2xl p-6 text-center">
                <Package className="w-8 h-8 text-slate-600 dark:text-slate-300 mx-auto mb-3" />
                <h4 className="font-bold text-slate-800 dark:text-white mb-2">Secure Packaging</h4>
                <p className="text-sm text-slate-600 dark:text-slate-300">Professional packaging for safe delivery</p>
              </div>
              <div className="bg-slate-50 dark:bg-slate-700 rounded-2xl p-6 text-center">
                <Users className="w-8 h-8 text-slate-600 dark:text-slate-300 mx-auto mb-3" />
                <h4 className="font-bold text-slate-800 dark:text-white mb-2">Expert Team</h4>
                <p className="text-sm text-slate-600 dark:text-slate-300">Passionate collectors helping collectors</p>
              </div>
            </div>
          </div>

          {/* Team */}
          <div>
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-8 text-center">Meet Our Team</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">AK</span>
                </div>
                <h4 className="font-bold text-slate-800 dark:text-white mb-2">Akira Tanaka</h4>
                <p className="text-slate-600 dark:text-slate-300 text-sm mb-2">Founder & CEO</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">20+ years in collectibles industry</p>
              </div>
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">SM</span>
                </div>
                <h4 className="font-bold text-slate-800 dark:text-white mb-2">Sarah Mitchell</h4>
                <p className="text-slate-600 dark:text-slate-300 text-sm mb-2">Head of Operations</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Expert in logistics & customer service</p>
              </div>
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">RY</span>
                </div>
                <h4 className="font-bold text-slate-800 dark:text-white mb-2">Ryu Yamamoto</h4>
                <p className="text-slate-600 dark:text-slate-300 text-sm mb-2">Product Curator</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Gundam expert & quality specialist</p>
              </div>
            </div>
          </div>

          {/* Values */}
          <div className="bg-slate-50 dark:bg-slate-700 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-8 text-center">Our Values</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <Shield className="w-6 h-6 text-slate-600 dark:text-slate-300" />
                  <h4 className="font-bold text-slate-800 dark:text-white">Authenticity First</h4>
                </div>
                <p className="text-slate-600 dark:text-slate-300 text-sm">
                  Every product is verified for authenticity. We work directly with official distributors and manufacturers 
                  to ensure you receive genuine collectibles.
                </p>
              </div>
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <Star className="w-6 h-6 text-slate-600 dark:text-slate-300" />
                  <h4 className="font-bold text-slate-800 dark:text-white">Customer Excellence</h4>
                </div>
                <p className="text-slate-600 dark:text-slate-300 text-sm">
                  Your satisfaction is our priority. From browsing to delivery, we strive to provide an exceptional 
                  experience at every touchpoint.
                </p>
              </div>
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <Users className="w-6 h-6 text-slate-600 dark:text-slate-300" />
                  <h4 className="font-bold text-slate-800 dark:text-white">Community Focus</h4>
                </div>
                <p className="text-slate-600 dark:text-slate-300 text-sm">
                  We're collectors too. We understand the passion and dedication that drives this community, 
                  and we're here to support fellow enthusiasts.
                </p>
              </div>
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <Truck className="w-6 h-6 text-slate-600 dark:text-slate-300" />
                  <h4 className="font-bold text-slate-800 dark:text-white">Reliable Service</h4>
                </div>
                <p className="text-slate-600 dark:text-slate-300 text-sm">
                  Fast, secure shipping with professional packaging. We treat your collectibles with the same care 
                  you would, ensuring they arrive in perfect condition.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}