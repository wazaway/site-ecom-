import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '../types';
import { mockUsers } from '../data/mockData';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (email: string, name: string, password: string) => Promise<boolean>;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      
      login: async (email: string, password: string) => {
        // Only allow admin login with specific email
        if (email === 'wajdi.benzayene@gmail.com') {
          const adminUser = mockUsers.find(u => u.email === email);
          if (adminUser) {
            set({ user: adminUser, isAuthenticated: true });
            return true;
          }
        }
        
        // For regular users
        const user = mockUsers.find((u) => u.email === email && u.role === 'user');
        if (user) {
          set({ user, isAuthenticated: true });
          return true;
        }
        
        return false;
      },
      
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
      
      register: async (email: string, name: string, password: string) => {
        // Prevent registration with admin email
        if (email === 'wajdi.benzayene@gmail.com') {
          return false;
        }
        
        const existingUser = mockUsers.find((u) => u.email === email);
        if (existingUser) {
          return false;
        }
        
        const newUser: User = {
          id: `user-${Date.now()}`,
          email,
          name,
          role: 'user',
          orders: [],
          createdAt: new Date().toISOString(),
        };
        
        mockUsers.push(newUser);
        set({ user: newUser, isAuthenticated: true });
        return true;
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);

export default useAuthStore;