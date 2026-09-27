import { useState, useEffect } from "react";

/**
 * Persists a piece of state to localStorage under `key`.

 */
export function useLocalStorage(key, initialValue) {
  // Create a state variable.
  const [value, setValue] = useState(() => {
    try {
         // Get the saved value from the browser's localStorage
      const stored = window.localStorage.getItem(key);
      if (stored !== null) return JSON.parse(stored);
      return typeof initialValue === "function" ? initialValue() : initialValue;
    } catch (err) {
      console.warn(`useLocalStorage: failed to read "${key}"`, err);
      return typeof initialValue === "function" ? initialValue() : initialValue;
    }
  });
  // It keeps localStorage synchronized with React state.
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.warn(`useLocalStorage: failed to write "${key}"`, err);
    }
  }, [key, value]);  // Run this effect again when key or value changes

  return [value, setValue];
}
