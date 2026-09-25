import { useState, useEffect } from "react";

/**
 * Persists a piece of state to localStorage under `key`.
 * Falls back to `initialValue` (or the result of calling it) the first time
 * the key doesn't exist yet — this is what lets us "seed" mock data once.
 */
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key);
      if (stored !== null) return JSON.parse(stored);
      return typeof initialValue === "function" ? initialValue() : initialValue;
    } catch (err) {
      console.warn(`useLocalStorage: failed to read "${key}"`, err);
      return typeof initialValue === "function" ? initialValue() : initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.warn(`useLocalStorage: failed to write "${key}"`, err);
    }
  }, [key, value]);

  return [value, setValue];
}
