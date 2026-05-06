import { createContext, useContext, useState, type ReactNode } from "react";

interface UIBannerContextType {
  hasBanner: boolean;
  setHasBanner: (value: boolean) => void;
}

const UIBannerContext = createContext<UIBannerContextType>({
  hasBanner: false,
  setHasBanner: () => {},
});

export function UIBannerProvider({ children }: { children: ReactNode }) {
  const [hasBanner, setHasBanner] = useState(false);
  return (
    <UIBannerContext.Provider value={{ hasBanner, setHasBanner }}>
      {children}
    </UIBannerContext.Provider>
  );
}

export function useUIBanner() {
  return useContext(UIBannerContext);
}
