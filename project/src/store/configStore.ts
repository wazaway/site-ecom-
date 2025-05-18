import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { SiteConfig } from '../types';
import { mockSiteConfig } from '../data/mockData';

interface ConfigState {
  config: SiteConfig;
  language: string;
  updateSiteName: (name: string) => void;
  updateLogo: (logoUrl: string) => void;
  updateTheme: (theme: SiteConfig['theme']) => void;
  setLanguage: (lang: string) => void;
}

const useConfigStore = create<ConfigState>()(
  persist(
    (set) => ({
      config: mockSiteConfig,
      language: mockSiteConfig.defaultLanguage,
      
      updateSiteName: (name: string) => {
        set((state) => ({
          config: {
            ...state.config,
            siteName: name,
          },
        }));
      },
      
      updateLogo: (logoUrl: string) => {
        set((state) => ({
          config: {
            ...state.config,
            logo: logoUrl,
          },
        }));
      },
      
      updateTheme: (theme: SiteConfig['theme']) => {
        set((state) => ({
          config: {
            ...state.config,
            theme,
          },
        }));
      },
      
      setLanguage: (lang: string) => {
        set({ language: lang });
      },
    }),
    {
      name: 'config-storage',
    }
  )
);

export default useConfigStore;