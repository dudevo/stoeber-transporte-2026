'use client';

import React from 'react';
import { ProductGrid } from '../../../../components/shop/ProductGrid';
import { CartSidebar } from '../../../../components/shop/CartSidebar';
import { FavoritesSidebar } from '../../../../components/shop/FavoritesSidebar';
import { CartButton, FavoritesButton } from '../../../../components/shop/CartButton';
import styles from '../../../../components/shop/Shop.module.scss';

const ShopPage: React.FC = () => {
  return (
    <div className={styles.shopPage}>
      <div className={styles.container}>
        <header className={styles.pageHeader}>
          <h1>Stöber Transporte Shop</h1>
          <p>
            Entdecken Sie unser umfangreiches Sortiment an Umzugsmaterialien, Verpackungen und Services. 
            Alles was Sie für Ihren Umzug benötigen - professionell und zuverlässig.
          </p>
        </header>

        <div className={styles.shopActions}>
          <FavoritesButton />
          <CartButton />
        </div>

        <ProductGrid />
      </div>

      {/* Sidebars */}
      <CartSidebar />
      <FavoritesSidebar />
    </div>
  );
};

export default ShopPage;
