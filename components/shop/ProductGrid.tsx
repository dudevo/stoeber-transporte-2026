'use client';

import React, { useState, useMemo } from 'react';
import { ProductCard } from './ProductCard';
import { productCategories, getProductsByCategory } from '../../lib/shop-data';
import styles from './Shop.module.scss';

export const ProductGrid: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'rating'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const filteredAndSortedProducts = useMemo(() => {
    const products = getProductsByCategory(selectedCategory);
    
    // Sort products
    products.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'price':
          comparison = a.price - b.price;
          break;
        case 'rating':
          const ratingA = a.rating || 0;
          const ratingB = b.rating || 0;
          comparison = ratingA - ratingB;
          break;
        default:
          break;
      }
      
      return sortOrder === 'desc' ? -comparison : comparison;
    });
    
    return products;
  }, [selectedCategory, sortBy, sortOrder]);

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const handleSortChange = (newSortBy: 'name' | 'price' | 'rating') => {
    if (sortBy === newSortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(newSortBy);
      setSortOrder('asc');
    }
  };

  return (
    <div className={styles.productGrid}>
      <div className={styles.gridHeader}>
        <div className={styles.filters}>
          <div className={styles.categoryFilter}>
            <h3>Kategorien</h3>
            <div className={styles.categoryButtons}>
              {productCategories.map((category) => (
                <button
                  key={category.id}
                  className={`${styles.categoryButton} ${
                    selectedCategory === category.id ? styles.active : ''
                  }`}
                  onClick={() => handleCategoryChange(category.id)}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.sortFilter}>
            <h3>Sortieren nach</h3>
            <div className={styles.sortButtons}>
              <button
                className={`${styles.sortButton} ${sortBy === 'name' ? styles.active : ''}`}
                onClick={() => handleSortChange('name')}
              >
                Name {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
              </button>
              <button
                className={`${styles.sortButton} ${sortBy === 'price' ? styles.active : ''}`}
                onClick={() => handleSortChange('price')}
              >
                Preis {sortBy === 'price' && (sortOrder === 'asc' ? '↑' : '↓')}
              </button>
              <button
                className={`${styles.sortButton} ${sortBy === 'rating' ? styles.active : ''}`}
                onClick={() => handleSortChange('rating')}
              >
                Bewertung {sortBy === 'rating' && (sortOrder === 'asc' ? '↑' : '↓')}
              </button>
            </div>
          </div>
        </div>

        <div className={styles.resultsCount}>
          {filteredAndSortedProducts.length} Produkt{filteredAndSortedProducts.length !== 1 ? 'e' : ''} gefunden
        </div>
      </div>

      <div className={styles.productsContainer}>
        {filteredAndSortedProducts.length === 0 ? (
          <div className={styles.noResults}>
            <h3>Keine Produkte gefunden</h3>
            <p>Versuchen Sie eine andere Kategorie oder kontaktieren Sie uns für spezielle Anfragen.</p>
          </div>
        ) : (
          <div className={styles.productsGrid}>
            {filteredAndSortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
