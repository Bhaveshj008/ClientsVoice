import { useCallback } from 'react';
import { createDebounce } from '../utils/debounce';

export const useDebounce = (callback, delay) => {
  return useCallback(createDebounce(callback, delay), []);
};
