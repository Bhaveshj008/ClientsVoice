import { debounce } from 'lodash';

export const createDebounce = (callback, delay = 300) => {
  return debounce(callback, delay);
};