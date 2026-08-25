import { useEffect, useState } from "react";
import type { SelectedOptions } from "./products";

export type CartItem = {
  id: string;
  slug: string;
  name: string;
  emoji: string;
  options: SelectedOptions;
  unitLabel: string;
  price: number;
  fileName?: string;
};

const KEY = "printoo:cart:v1";
const EVT = "printoo:cart:updated";

function read(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
}

function write(items: CartItem[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(items));
  window.dispatchEvent(new CustomEvent(EVT));
}

export const cart = {
  get: read,
  add(item: CartItem) {
    const items = read();
    items.push(item);
    write(items);
  },
  remove(id: string) {
    write(read().filter((i) => i.id !== id));
  },
  clear() {
    write([]);
  },
  updateQty(id: string, quantity: number) {
    write(
      read().map((i) =>
        i.id === id
          ? { ...i, options: { ...i.options, quantity }, price: Math.round((i.price / i.options.quantity) * quantity) }
          : i,
      ),
    );
  },
};

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  useEffect(() => {
    setItems(read());
    const h = () => setItems(read());
    window.addEventListener(EVT, h);
    window.addEventListener("storage", h);
    return () => {
      window.removeEventListener(EVT, h);
      window.removeEventListener("storage", h);
    };
  }, []);
  const total = items.reduce((s, i) => s + i.price, 0);
  return { items, total, count: items.length };
}
