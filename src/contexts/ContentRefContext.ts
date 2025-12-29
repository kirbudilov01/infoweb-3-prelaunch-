import { createContext } from 'react';

interface ContentRefContextType {
  contentRef: React.RefObject<HTMLDivElement | null>;
}

export const ContentRefContext = createContext<ContentRefContextType | undefined>(undefined);

