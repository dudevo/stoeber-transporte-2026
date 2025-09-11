'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useShopStore, useFavorites, useIsFavoritesOpen } from '../../stores/shop-store';
import styles from './Shop.module.scss';

export const FavoritesSidebar: React.FC = () => {
  const favorites = useFavorites();
  const isOpen = useIsFavoritesOpen();
  const { toggleFavorites, removeFromFavorites, addToCart, getCartQuantity } = useShopStore();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  };

  const handleAddToCart = (productId: string) => {
    const product = favorites.find(p => p.id === productId);
    if (product) {
      addToCart(product);
    }
  };

  const handleAddAllToCart = () => {
    favorites.forEach(product => {
      if (product.inStock) {
        addToCart(product);
      }
    });
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className={styles.backdrop} onClick={toggleFavorites} />
      
      {/* Favorites Sidebar */}
      <div className={styles.favoritesSidebar}>
        <div className={styles.favoritesHeader}>
          <h2>Favoriten</h2>
          <button className={styles.closeButton} onClick={toggleFavorites}>
            <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          </button>
        </div>

        <div className={styles.favoritesContent}>
          {!isHydrated || favorites.length === 0 ? (
            <div className={styles.emptyFavorites}>
              <div className={styles.emptyFavoritesIcon}>
                <svg viewBox="0 0 24 24" fill="currentColor" width="48" height="48">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </div>
              <h3>Keine Favoriten gespeichert</h3>
              <p>Markieren Sie Produkte als Favoriten, um sie hier wiederzufinden!</p>
              <button className={styles.continueShoppingButton} onClick={toggleFavorites}>
                Weiter einkaufen
              </button>
            </div>
          ) : (
            <>
              <div className={styles.favoritesActions}>
                <div className={styles.favoritesCount}>
                  {favorites.length} Produkt{favorites.length !== 1 ? 'e' : ''} in Favoriten
                </div>
                {favorites.some(p => p.inStock) && (
                  <button 
                    className={styles.addAllToCartButton}
                    onClick={handleAddAllToCart}
                  >
                    Alle verfügbaren in den Warenkorb
                  </button>
                )}
              </div>

              <div className={styles.favoritesItems}>
                {favorites.map((product) => {
                  const cartQuantity = getCartQuantity(product.id);
                  
                  return (
                    <div key={product.id} className={styles.favoriteItem}>
                      <div className={styles.itemImage}>
                        <Image
                          src={product.image}
                          alt={product.name}
                          width={80}
                          height={80}
                          className={styles.image}
                        />
                        {!product.inStock && (
                          <div className={styles.outOfStockOverlay}>
                            Ausverkauft
                          </div>
                        )}
                      </div>
                      
                      <div className={styles.itemDetails}>
                        <h4 className={styles.itemName}>{product.name}</h4>
                        <p className={styles.itemDescription}>{product.shortDescription}</p>
                        
                        <div className={styles.itemPrice}>
                          <span className={styles.currentPrice}>{formatPrice(product.price)}</span>
                          {product.originalPrice && (
                            <span className={styles.originalPrice}>{formatPrice(product.originalPrice)}</span>
                          )}
                        </div>

                        {product.rating && (
                          <div className={styles.itemRating}>
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
                          </div>
                        )}
                        
                        {product.stockCount && product.stockCount <= 10 && product.inStock && (
                          <span className={styles.lowStock}>
                            Nur noch {product.stockCount} verfügbar
                          </span>
                        )}
                      </div>
                      
                      <div className={styles.itemActions}>
                        <button
                          className={styles.addToCartButton}
                          onClick={() => handleAddToCart(product.id)}
                          disabled={!product.inStock}
                        >
                          {cartQuantity > 0 ? `In Warenkorb (${cartQuantity})` : 'In Warenkorb'}
                        </button>
                        
                        <button
                          className={styles.removeFromFavoritesButton}
                          onClick={() => removeFromFavorites(product.id)}
                        >
                          <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
