import React, { useState } from 'react';
import { Filter, X, ChevronDown, ChevronUp, Sliders, Star, Package, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { FilterOptions } from '../types';

interface FilterPanelProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  onClose: () => void;
  isOpen: boolean;
}

export function FilterPanel({ filters, onFiltersChange, onClose, isOpen }: FilterPanelProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>(['category', 'price']);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const updateFilter = (key: keyof FilterOptions, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const toggleTag = (tag: string) => {
    const newTags = filters.tags.includes(tag)
      ? filters.tags.filter(t => t !== tag)
      : [...filters.tags, tag];
    updateFilter('tags', newTags);
  };

  const clearFilters = () => {
    onFiltersChange({
      category: 'all',
      subcategory: 'all',
      priceRange: 'all',
      manufacturer: 'all',
      difficulty: 'all',
      series: 'all',
      tags: [],
      inStock: false,
      hasModel3D: false,
      minPrice: 0,
      maxPrice: 1000,
      sortBy: 'name',
      sortOrder: 'asc'
    });
  };

  const categories = ['all', 'gundam', 'figure', 'accessories', 'tools'];
  const subcategories = ['all', 'High Grade', 'Real Grade', 'Master Grade', 'Perfect Grade', 'Nendoroid', 'Figma', 'Scale Figure', 'Display', 'LED', 'Detailing', 'Painting', 'Cutting'];
  const priceRanges = ['all', 'budget', 'standard', 'premium', 'luxury'];
  const manufacturers = ['all', 'Bandai', 'Good Smile Company', 'Max Factory', 'Kotobukiya', 'Tamiya', 'Mr. Color'];
  const difficulties = ['all', 'Beginner', 'Intermediate', 'Advanced', 'Expert'];
  const series = ['all', 'Mobile Suit Gundam', 'Gundam SEED Destiny', 'Gundam Unicorn', 'Iron-Blooded Orphans', 'Char\'s Counterattack', 'Gundam Wing', 'Fate/stay night', 'Neon Genesis Evangelion', 'DARLING in the FRANXX'];
  const popularTags = ['UC', 'CE', 'AC', 'PD', 'Federation', 'ZAFT', 'Neo Zeon', 'Protagonist', 'Antagonist', 'Wings', 'Funnels', 'Transform', 'LED', 'Premium', 'Classic', 'Anime'];

  const FilterSection = ({ title, children, sectionKey }: { title: string; children: React.ReactNode; sectionKey: string }) => (
    <div className="border-b border-slate-200 dark:border-slate-600 last:border-b-0">
      <button
        onClick={() => toggleSection(sectionKey)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
      >
        <span className="font-semibold text-slate-800 dark:text-white">{title}</span>
        {expandedSections.includes(sectionKey) ? (
          <ChevronUp className="w-4 h-4 text-slate-500" />
        ) : (
          <ChevronDown className="w-4 h-4 text-slate-500" />
        )}
      </button>
      <AnimatePresence>
        {expandedSections.includes(sectionKey) && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="p-4 pt-0 space-y-3">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        exit={{ x: -300 }}
        className="absolute left-0 top-0 h-full w-80 bg-white dark:bg-slate-800 shadow-2xl overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-slate-800 dark:bg-slate-700 text-white p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <Filter className="w-4 h-4" />
              </div>
              <h2 className="text-lg font-bold">Advanced Filters</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filter Content */}
        <div className="p-4">
          {/* Quick Actions */}
          <div className="mb-6 space-y-3">
            <button
              onClick={clearFilters}
              className="w-full bg-red-500 text-white py-2 px-4 rounded-xl font-semibold hover:bg-red-600 transition-all"
            >
              Clear All Filters
            </button>
            
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => updateFilter('inStock', !filters.inStock)}
                className={`flex items-center justify-center space-x-2 py-2 px-3 rounded-lg text-sm font-semibold transition-all ${
                  filters.inStock
                    ? 'bg-green-500 text-white'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-600'
                }`}
              >
                <Package className="w-4 h-4" />
                <span>In Stock</span>
              </button>
              
              <button
                onClick={() => updateFilter('hasModel3D', !filters.hasModel3D)}
                className={`flex items-center justify-center space-x-2 py-2 px-3 rounded-lg text-sm font-semibold transition-all ${
                  filters.hasModel3D
                    ? 'bg-blue-500 text-white'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-600'
                }`}
              >
                <Zap className="w-4 h-4" />
                <span>3D Model</span>
              </button>
            </div>
          </div>

          {/* Filter Sections */}
          <div className="bg-slate-50 dark:bg-slate-700 rounded-xl overflow-hidden">
            <FilterSection title="Category" sectionKey="category">
              <div className="space-y-2">
                {categories.map(category => (
                  <label key={category} className="flex items-center space-x-3 cursor-pointer group">
                    <input
                      type="radio"
                      name="category"
                      checked={filters.category === category}
                      onChange={() => updateFilter('category', category)}
                      className="w-4 h-4 text-slate-600 border-slate-300 focus:ring-slate-500"
                    />
                    <span className="text-sm text-slate-700 dark:text-slate-300 group-hover:text-slate-800 dark:group-hover:text-white transition-colors capitalize">
                      {category === 'all' ? 'All Categories' : category}
                    </span>
                  </label>
                ))}
              </div>
            </FilterSection>

            <FilterSection title="Subcategory" sectionKey="subcategory">
              <div className="space-y-2">
                {subcategories.map(subcategory => (
                  <label key={subcategory} className="flex items-center space-x-3 cursor-pointer group">
                    <input
                      type="radio"
                      name="subcategory"
                      checked={filters.subcategory === subcategory}
                      onChange={() => updateFilter('subcategory', subcategory)}
                      className="w-4 h-4 text-slate-600 border-slate-300 focus:ring-slate-500"
                    />
                    <span className="text-sm text-slate-700 dark:text-slate-300 group-hover:text-slate-800 dark:group-hover:text-white transition-colors">
                      {subcategory === 'all' ? 'All Subcategories' : subcategory}
                    </span>
                  </label>
                ))}
              </div>
            </FilterSection>

            <FilterSection title="Price Range" sectionKey="price">
              <div className="space-y-3">
                <div className="space-y-2">
                  {priceRanges.map(range => (
                    <label key={range} className="flex items-center space-x-3 cursor-pointer group">
                      <input
                        type="radio"
                        name="priceRange"
                        checked={filters.priceRange === range}
                        onChange={() => updateFilter('priceRange', range)}
                        className="w-4 h-4 text-slate-600 border-slate-300 focus:ring-slate-500"
                      />
                      <span className="text-sm text-slate-700 dark:text-slate-300 group-hover:text-slate-800 dark:group-hover:text-white transition-colors capitalize">
                        {range === 'all' ? 'All Prices' : `${range} ($${range === 'budget' ? '0-25' : range === 'standard' ? '25-50' : range === 'premium' ? '50-100' : '100+'})`}
                      </span>
                    </label>
                  ))}
                </div>
                
                <div className="pt-3 border-t border-slate-200 dark:border-slate-600">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Custom Range</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={filters.minPrice}
                      onChange={(e) => updateFilter('minPrice', Number(e.target.value))}
                      className="w-20 px-2 py-1 text-sm border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-slate-500 bg-white dark:bg-slate-800 text-slate-800 dark:text-white"
                    />
                    <span className="text-slate-500 dark:text-slate-400">-</span>
                    <input
                      type="number"
                      placeholder="Max"
                      value={filters.maxPrice}
                      onChange={(e) => updateFilter('maxPrice', Number(e.target.value))}
                      className="w-20 px-2 py-1 text-sm border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-slate-500 bg-white dark:bg-slate-800 text-slate-800 dark:text-white"
                    />
                  </div>
                </div>
              </div>
            </FilterSection>

            <FilterSection title="Manufacturer" sectionKey="manufacturer">
              <div className="space-y-2">
                {manufacturers.map(manufacturer => (
                  <label key={manufacturer} className="flex items-center space-x-3 cursor-pointer group">
                    <input
                      type="radio"
                      name="manufacturer"
                      checked={filters.manufacturer === manufacturer}
                      onChange={() => updateFilter('manufacturer', manufacturer)}
                      className="w-4 h-4 text-slate-600 border-slate-300 focus:ring-slate-500"
                    />
                    <span className="text-sm text-slate-700 dark:text-slate-300 group-hover:text-slate-800 dark:group-hover:text-white transition-colors">
                      {manufacturer === 'all' ? 'All Manufacturers' : manufacturer}
                    </span>
                  </label>
                ))}
              </div>
            </FilterSection>

            <FilterSection title="Difficulty" sectionKey="difficulty">
              <div className="space-y-2">
                {difficulties.map(difficulty => (
                  <label key={difficulty} className="flex items-center space-x-3 cursor-pointer group">
                    <input
                      type="radio"
                      name="difficulty"
                      checked={filters.difficulty === difficulty}
                      onChange={() => updateFilter('difficulty', difficulty)}
                      className="w-4 h-4 text-slate-600 border-slate-300 focus:ring-slate-500"
                    />
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-slate-700 dark:text-slate-300 group-hover:text-slate-800 dark:group-hover:text-white transition-colors">
                        {difficulty === 'all' ? 'All Difficulties' : difficulty}
                      </span>
                      {difficulty !== 'all' && (
                        <div className="flex">
                          {Array.from({ length: difficulties.indexOf(difficulty) }, (_, i) => (
                            <Star key={i} className="w-3 h-3 text-amber-400 fill-current" />
                          ))}
                        </div>
                      )}
                    </div>
                  </label>
                ))}
              </div>
            </FilterSection>

            <FilterSection title="Series" sectionKey="series">
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {series.map(s => (
                  <label key={s} className="flex items-center space-x-3 cursor-pointer group">
                    <input
                      type="radio"
                      name="series"
                      checked={filters.series === s}
                      onChange={() => updateFilter('series', s)}
                      className="w-4 h-4 text-slate-600 border-slate-300 focus:ring-slate-500"
                    />
                    <span className="text-sm text-slate-700 dark:text-slate-300 group-hover:text-slate-800 dark:group-hover:text-white transition-colors">
                      {s === 'all' ? 'All Series' : s}
                    </span>
                  </label>
                ))}
              </div>
            </FilterSection>

            <FilterSection title="Tags" sectionKey="tags">
              <div className="flex flex-wrap gap-2">
                {popularTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`px-3 py-1 text-xs font-semibold rounded-full transition-all ${
                      filters.tags.includes(tag)
                        ? 'bg-slate-800 dark:bg-slate-600 text-white'
                        : 'bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-500'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </FilterSection>

            <FilterSection title="Sort Options" sectionKey="sort">
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Sort By</label>
                  <select
                    value={filters.sortBy}
                    onChange={(e) => updateFilter('sortBy', e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-slate-500 bg-white dark:bg-slate-800 text-slate-800 dark:text-white"
                  >
                    <option value="name">Name</option>
                    <option value="price">Price</option>
                    <option value="rating">Rating</option>
                    <option value="newest">Newest</option>
                    <option value="popular">Most Popular</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Order</label>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => updateFilter('sortOrder', 'asc')}
                      className={`flex-1 py-2 px-3 text-sm font-semibold rounded-lg transition-all ${
                        filters.sortOrder === 'asc'
                          ? 'bg-slate-800 dark:bg-slate-600 text-white'
                          : 'bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      Ascending
                    </button>
                    <button
                      onClick={() => updateFilter('sortOrder', 'desc')}
                      className={`flex-1 py-2 px-3 text-sm font-semibold rounded-lg transition-all ${
                        filters.sortOrder === 'desc'
                          ? 'bg-slate-800 dark:bg-slate-600 text-white'
                          : 'bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      Descending
                    </button>
                  </div>
                </div>
              </div>
            </FilterSection>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}