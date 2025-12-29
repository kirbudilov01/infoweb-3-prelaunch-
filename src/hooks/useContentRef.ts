import { useContext } from 'react';
import { ContentRefContext } from '../contexts/ContentRefContext';

export const useContentRef = () => {
  const context = useContext(ContentRefContext);
  if (!context) {
    throw new Error('useContentRef must be used within ContentRefProvider');
  }
  return context;
};

