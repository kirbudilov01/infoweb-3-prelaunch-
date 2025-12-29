import { useRef, type ReactNode } from 'react';
import { ContentRefContext } from './ContentRefContext';

export const ContentRefProvider = ({ children }: { children: ReactNode }) => {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <ContentRefContext.Provider value={{ contentRef }}>
      {children}
    </ContentRefContext.Provider>
  );
};

