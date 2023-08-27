import React from 'react';
import { isClient } from 'src/shared/constants/env';

const getInitialItem = <
  T extends string | number | object | readonly unknown[],
>(
  hash: string,
  defaultValue: T,
): T => {
  if (isClient) {
    switch (typeof defaultValue) {
      case 'number':
        return (
          (globalThis.localStorage.getItem(hash) as T | null) ?? defaultValue
        );
      case 'string':
        return (
          (globalThis.localStorage.getItem(hash) as T | null) ?? defaultValue
        );
      case 'object':
        const item = globalThis.localStorage.getItem(hash);
        return item ? JSON.parse(item) : defaultValue;
      default:
        return defaultValue;
    }
  }
  return defaultValue;
};

export const useStorage = <
  T extends string | number | object | readonly unknown[],
>(
  hash: string,
  defaultValue: T,
) => {
  const [item, rerender] = React.useState(() =>
    getInitialItem(hash, defaultValue),
  );

  const update = React.useCallback(
    (nextItem: T) => {
      switch (typeof nextItem) {
        case 'number':
          globalThis.localStorage.setItem(hash, `${nextItem}`);
          rerender((prevItem) => {
            const item = globalThis.localStorage.getItem(hash);
            return item ? (item as T) : prevItem;
          });
          break;
        case 'string':
          globalThis.localStorage.setItem(hash, nextItem);
          rerender((prevItem) => {
            const item = globalThis.localStorage.getItem(hash);
            return item ? (item as T) : prevItem;
          });
          break;
        case 'object':
          globalThis.localStorage.setItem(hash, JSON.stringify(nextItem));
          rerender((prevItem) => {
            const item = globalThis.localStorage.getItem(hash);
            return item ? (JSON.parse(item) as T) : prevItem;
          });
          break;
        default:
          break;
      }
    },
    [hash],
  );

  React.useEffect(() => {
    if (!item) {
      update(defaultValue);
    }
  }, [item, update]);

  return { item, update };
};
