import React, { createContext, useContext } from 'react';
import { useMotionCapabilities, type MotionCapabilities } from './useMotionCapabilities';

const MotionContext = createContext<MotionCapabilities | undefined>(undefined);

export const MotionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const capabilities = useMotionCapabilities();

  return (
    <MotionContext.Provider value={capabilities}>
      {children}
    </MotionContext.Provider>
  );
};

export const useMotion = () => {
  const context = useContext(MotionContext);
  if (!context) {
    throw new Error('useMotion must be used within a MotionProvider');
  }
  return context;
};
