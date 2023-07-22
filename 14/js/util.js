import { FILTER_CHANGE_TIME_DELAY } from './settings.js';

// Функция устраняет дребезг
const debounce = (callback, timeoutDelay = FILTER_CHANGE_TIME_DELAY) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export { debounce };
