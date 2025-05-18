import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem } from '../types';

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: (products: any[]) => number;
}

const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (item: CartItem) => {
        set((state) => {
          const existingItemIndex = state.items.findIndex(
            (i) => i.productId === item.productId
          );
          
          if (existingItemIndex >= 0) {
            const updatedItems = [...state.items];
            updatedItems[existingItemIndex].quantity += item.quantity;
            return { items: updatedItems };
          }
          
          return { items: [...state.items, item] };
        });
      },
      
      removeItem: (productId: string) => {
        set((state) => ({
          items: state.items.filter((item) => item.productId !== productId),
        }));
      },
      
      updateQuantity: (productId: string, quantity: number) => {
        set((state) => ({
          items: state.items.map((item) => 
            item.productId === productId 
              ? { ...item, quantity } 
              : item
          ),
        }));
      },
      
      clearCart: () => set({ items: [] }),
      
      getTotal: (products) => {
        const { items } = get();
        return items.reduce((total, item) => {
          const product = products.find((p) => p.id === item.productId);
          if (!product) return total;
          const price = product.salePrice || product.price;
          return total + price * item.quantity;
        }, 0);
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);

export default useCartStore;