'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Product } from '../../lib/shop-data';
import { useShopStore } from '../../stores/shop-store';
import styles from './Shop.module.scss';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, toggleFavorite, isInFavorites, getCartQuantity } = useShopStore();
  const [isHydrated, setIsHydrated] = useState(false);
  
  const isFavorite = isInFavorites(product.id);
  const cartQuantity = getCartQuantity(product.id);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleFavorite(product);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  };

  return (
    <div className={styles.productCard}>
      <div className={styles.imageContainer}>
        <Image
          src={product.image}
          alt={product.name}
          fill
          className={styles.productImage}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        <div className={styles.productBadges}>
          {product.originalPrice && (
            <span className={styles.saleBadge}>Sale</span>
          )}
          {!product.inStock && (
            <span className={styles.outOfStockBadge}>Ausverkauft</span>
          )}
          <span className={styles.categoryBadge}>{product.category}</span>
        </div>

        <button 
          className={`${styles.favoriteButton} ${isHydrated && isFavorite ? styles.active : ''}`}
          onClick={handleToggleFavorite}
          aria-label={isHydrated && isFavorite ? "Aus Favoriten entfernen" : "Zu Favoriten hinzufügen"}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </button>
      </div>

      <div className={styles.productInfo}>
        <h3 className={styles.productName}>{product.name}</h3>
        <p className={styles.productDescription}>{product.shortDescription}</p>
        
        <div className={styles.rating}>
          {product.rating ? (
            <>
              <div className={styles.stars}>
                {Array.from({ length: 5 }, (_, i) => (
                  <span 
                    key={i} 
                    className={i < Math.floor(product.rating!) ? styles.starFilled : styles.starEmpty}
                  >
                    ★
                  </span>
                ))}
              </div>
              <span className={styles.reviewCount}>({product.reviewCount})</span>
            </>
          ) : (
            <div></div> // Empty placeholder to maintain height
          )}
        </div>

        <div className={styles.priceContainer}>
          <div className={styles.prices}>
            <span className={styles.currentPrice}>{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className={styles.originalPrice}>{formatPrice(product.originalPrice)}</span>
            )}
          </div>
          
          <div className={styles.lowStock}>
            {product.stockCount && product.stockCount <= 10 && (
              <span>
                Nur noch {product.stockCount} verfügbar
              </span>
            )}
          </div>
        </div>

        <div className={styles.actions}>
          <button
            className={styles.addToCartButton}
            onClick={handleAddToCart}
            disabled={!product.inStock}
          >
            {isHydrated && cartQuantity > 0 ? `In den Warenkorb (${cartQuantity})` : 'In den Warenkorb'}
          </button>
        </div>
      </div>
    </div>
  );
};
