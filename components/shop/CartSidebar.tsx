'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useShopStore, useCart, useCartPrice, useIsCartOpen } from '../../stores/shop-store';
import styles from './Shop.module.scss';

export const CartSidebar: React.FC = () => {
  const cart = useCart();
  const totalPrice = useCartPrice();
  const isOpen = useIsCartOpen();
  const { toggleCart, updateCartQuantity, removeFromCart, clearCart } = useShopStore();
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

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
    } else {
      updateCartQuantity(productId, newQuantity);
    }
  };

  const handleCheckout = () => {
    // Here you would integrate with your checkout system
    console.log('Proceeding to checkout with:', cart);
    alert('Checkout functionality would be integrated here!');
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className={styles.backdrop} onClick={toggleCart} />
      
      {/* Cart Sidebar */}
      <div className={styles.cartSidebar}>
        <div className={styles.cartHeader}>
          <h2>Warenkorb</h2>
          <button className={styles.closeButton} onClick={toggleCart}>
            <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          </button>
        </div>

        <div className={styles.cartContent}>
          {!isHydrated || cart.length === 0 ? (
            <div className={styles.emptyCart}>
              <div className={styles.emptyCartIcon}>
                <svg viewBox="0 0 24 24" fill="currentColor" width="48" height="48">
                  <path d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12L8.1 13h7.45c.75 0 1.41-.41 1.75-1.03L21.7 4H5.21l-.94-2H1zm16 16c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                </svg>
              </div>
              <h3>Ihr Warenkorb ist leer</h3>
              <p>Fügen Sie Produkte hinzu, um loszulegen!</p>
              <button className={styles.continueShoppingButton} onClick={toggleCart}>
                Weiter einkaufen
              </button>
            </div>
          ) : (
            <>
              <div className={styles.cartItems}>
                {cart.map((item) => (
                  <div key={item.product.id} className={styles.cartItem}>
                    <div className={styles.itemImage}>
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        width={60}
                        height={60}
                        className={styles.image}
                      />
                    </div>
                    
                    <div className={styles.itemDetails}>
                      <h4 className={styles.itemName}>{item.product.name}</h4>
                      <p className={styles.itemPrice}>{formatPrice(item.product.price)}</p>
                      <div className={styles.quantityControls}>
                        <button
                          className={styles.quantityButton}
                          onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                        >
                          -
                        </button>
                        <span className={styles.quantity}>{item.quantity}</span>
                        <button
                          className={styles.quantityButton}
                          onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    
                    <div className={styles.itemActions}>
                      <div className={styles.itemTotal}>
                        {formatPrice(item.product.price * item.quantity)}
                      </div>
                      <button
                        className={styles.removeButton}
                        onClick={() => removeFromCart(item.product.id)}
                      >
                        <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                          <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.cartFooter}>
                <div className={styles.cartSummary}>
                  <div className={styles.totalRow}>
                    <span>Zwischensumme:</span>
                    <span className={styles.totalPrice}>{formatPrice(totalPrice)}</span>
                  </div>
                  <div className={styles.taxNote}>
                    <small>Inkl. 19% MwSt., zzgl. Versandkosten</small>
                  </div>
                </div>

                <div className={styles.cartActions}>
                  <button 
                    className={styles.clearCartButton}
                    onClick={clearCart}
                  >
                    Warenkorb leeren
                  </button>
                  <button 
                    className={styles.checkoutButton}
                    onClick={handleCheckout}
                  >
                    Zur Kasse ({formatPrice(totalPrice)})
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
