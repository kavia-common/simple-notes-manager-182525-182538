/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';

/**
 * PUBLIC_INTERFACE
 * useLocalStorage - sync a state value with localStorage key.
 * This is provided for potential future use by components.
 */
export function useLocalStorage(key, defaultValue) {
  const [value, setValue] = useState(() => {
    try {
      const raw = window.localStorage.getItem(key);
      return raw ? JSON.parse(raw) : defaultValue;
    } catch {
      return defaultValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // ignore quota errors
    }
  }, [key, value]);

  return [value, setValue];
}
