'use client';

import React, { useState, useEffect } from 'react';
import { useShopStore, useCartTotal, useFavoritesTotal } from '../../stores/shop-store';
import styles from './Shop.module.scss';

export const CartButton: React.FC = () => {
  const totalItems = useCartTotal();
  const { toggleCart } = useShopStore();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return (
    <button className={styles.cartButton} onClick={toggleCart}>
      <div className={styles.cartIcon}>
        <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
          <path d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12L8.1 13h7.45c.75 0 1.41-.41 1.75-1.03L21.7 4H5.21l-.94-2H1zm16 16c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
        </svg>
        {isHydrated && totalItems > 0 && (
          <span className={styles.cartBadge}>{totalItems > 99 ? '99+' : totalItems}</span>
        )}
      </div>
      <span className={styles.cartLabel}>Warenkorb</span>
    </button>
  );
};

export const FavoritesButton: React.FC = () => {
  const totalFavorites = useFavoritesTotal();
  const { toggleFavorites } = useShopStore();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return (
    <button className={styles.favoritesButton} onClick={toggleFavorites}>
      <div className={styles.favoritesIcon}>
        <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
        {isHydrated && totalFavorites > 0 && (
          <span className={styles.favoritesBadge}>{totalFavorites > 99 ? '99+' : totalFavorites}</span>
        )}
      </div>
      <span className={styles.favoritesLabel}>Favoriten</span>
    </button>
  );
};
