import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Product, CartItem } from '../lib/shop-data';

interface ShopState {
  // Cart state
  cart: CartItem[];
  favorites: Product[];
  isCartOpen: boolean;
  isFavoritesOpen: boolean;

  // Cart actions
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;

  // Favorites actions
  addToFavorites: (product: Product) => void;
  removeFromFavorites: (productId: string) => void;
  toggleFavorite: (product: Product) => void;

  // UI actions
  toggleCart: () => void;
  toggleFavorites: () => void;
  closeAll: () => void;

  // Helper functions
  getTotalItems: () => number;
  getTotalPrice: () => number;
  isInCart: (productId: string) => boolean;
  isInFavorites: (productId: string) => boolean;
  getCartQuantity: (productId: string) => number;
}

export const useShopStore = create<ShopState>()(
  persist(
    (set, get) => ({
      // Initial state
      cart: [],
      favorites: [],
      isCartOpen: false,
      isFavoritesOpen: false,

      // Cart actions
      addToCart: (product: Product, quantity = 1) => {
        const { cart } = get();
        const existingItem = cart.find(item => item.product.id === product.id);
        
        if (existingItem) {
          set({
            cart: cart.map(item =>
              item.product.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            ),
          });
        } else {
          set({
            cart: [...cart, { product, quantity }],
          });
        }
      },

      removeFromCart: (productId: string) => {
        set(state => ({
          cart: state.cart.filter(item => item.product.id !== productId),
        }));
      },

      updateCartQuantity: (productId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeFromCart(productId);
          return;
        }
        
        set(state => ({
          cart: state.cart.map(item =>
            item.product.id === productId
              ? { ...item, quantity }
              : item
          ),
        }));
      },

      clearCart: () => {
        set({ cart: [] });
      },

      // Favorites actions
      addToFavorites: (product: Product) => {
        const { favorites } = get();
        if (!favorites.some(fav => fav.id === product.id)) {
          set({
            favorites: [...favorites, product],
          });
        }
      },

      removeFromFavorites: (productId: string) => {
        set(state => ({
          favorites: state.favorites.filter(product => product.id !== productId),
        }));
      },

      toggleFavorite: (product: Product) => {
        const { isInFavorites, addToFavorites, removeFromFavorites } = get();
        
        if (isInFavorites(product.id)) {
          removeFromFavorites(product.id);
        } else {
          addToFavorites(product);
        }
      },

      // UI actions
      toggleCart: () => {
        set(state => ({
          isCartOpen: !state.isCartOpen,
          isFavoritesOpen: false, // Close favorites when opening cart
        }));
      },

      toggleFavorites: () => {
        set(state => ({
          isFavoritesOpen: !state.isFavoritesOpen,
          isCartOpen: false, // Close cart when opening favorites
        }));
      },

      closeAll: () => {
        set({
          isCartOpen: false,
          isFavoritesOpen: false,
        });
      },

      // Helper functions
      getTotalItems: () => {
        const { cart } = get();
        return cart.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        const { cart } = get();
        return cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
      },

      isInCart: (productId: string) => {
        const { cart } = get();
        return cart.some(item => item.product.id === productId);
      },

      isInFavorites: (productId: string) => {
        const { favorites } = get();
        return favorites.some(product => product.id === productId);
      },

      getCartQuantity: (productId: string) => {
        const { cart } = get();
        const item = cart.find(item => item.product.id === productId);
        return item ? item.quantity : 0;
      },
    }),
    {
      name: 'shop-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
      partialize: (state) => ({ 
        cart: state.cart, 
        favorites: state.favorites 
      }), // Only persist cart and favorites, not UI state
    }
  )
);

// Export selectors for better performance
export const useCart = () => useShopStore(state => state.cart);
export const useFavorites = () => useShopStore(state => state.favorites);
export const useCartTotal = () => useShopStore(state => state.getTotalItems());
export const useCartPrice = () => useShopStore(state => state.getTotalPrice());
export const useFavoritesTotal = () => useShopStore(state => state.favorites.length);
export const useIsCartOpen = () => useShopStore(state => state.isCartOpen);
export const useIsFavoritesOpen = () => useShopStore(state => state.isFavoritesOpen);
