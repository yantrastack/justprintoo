import { useEffect, useState } from "react";
import type { CartItem } from "./cart-store";

export const ORDER_STAGES = [
  { id: "placed", label: "Order Placed" },
  { id: "file-check", label: "File Checked" },
  { id: "printing", label: "Printing" },
  { id: "quality", label: "Quality Check" },
  { id: "shipped", label: "Shipped" },
] as const;

export type StageId = (typeof ORDER_STAGES)[number]["id"];

export type Order = {
  id: string;
  items: CartItem[];
  total: number;
  address: { name: string; line1: string; city: string; pincode: string; phone: string };
  shippingMethod: string;
  createdAt: number;
  currentStage: StageId;
};

const KEY = "printoo:orders:v1";
const EVT = "printoo:orders:updated";

function read(): Order[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw) as Order[];
  } catch {}
  return seed();
}

function write(orders: Order[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(orders));
  window.dispatchEvent(new CustomEvent(EVT));
}

function seed(): Order[] {
  const demo: Order[] = [
    {
      id: "PRN-10428",
      items: [
        { id: "d1", slug: "wedding-cards", name: "Wedding Cards", emoji: "💍",
          options: { quantity: 250, paperId: "pearl", finishId: "foil", turnaroundId: "standard" },
          unitLabel: "250 × Pearl · Gold Foil", price: 14250, fileName: "wedding-final.pdf" },
      ],
      total: 14250,
      address: { name: "Anika Sharma", line1: "12 MG Road", city: "Bengaluru", pincode: "560001", phone: "+91 98xxx" },
      shippingMethod: "Express Courier",
      createdAt: Date.now() - 86400_000 * 2,
      currentStage: "printing",
    },
    {
      id: "PRN-10429",
      items: [
        { id: "d2", slug: "tshirt-printing", name: "T-Shirt Printing", emoji: "👕",
          options: { quantity: 50, paperId: "biopique", finishId: "double", turnaroundId: "express" },
          unitLabel: "50 × Bio-Pique · Front+Back", price: 26400, fileName: "team-logo.png" },
      ],
      total: 26400,
      address: { name: "Rahul Menon", line1: "Sector 21", city: "Gurugram", pincode: "122016", phone: "+91 99xxx" },
      shippingMethod: "Standard",
      createdAt: Date.now() - 3600_000 * 6,
      currentStage: "file-check",
    },
  ];
  return demo;
}

export const orders = {
  list: read,
  add(order: Order) {
    const list = read();
    list.unshift(order);
    write(list);
  },
  advance(id: string) {
    write(
      read().map((o) => {
        if (o.id !== id) return o;
        const idx = ORDER_STAGES.findIndex((s) => s.id === o.currentStage);
        const next = ORDER_STAGES[Math.min(idx + 1, ORDER_STAGES.length - 1)].id;
        return { ...o, currentStage: next };
      }),
    );
  },
};

export function useOrders() {
  const [list, setList] = useState<Order[]>([]);
  useEffect(() => {
    setList(read());
    const h = () => setList(read());
    window.addEventListener(EVT, h);
    window.addEventListener("storage", h);
    return () => {
      window.removeEventListener(EVT, h);
      window.removeEventListener("storage", h);
    };
  }, []);
  return list;
}

export function stageIndex(id: StageId) {
  return ORDER_STAGES.findIndex((s) => s.id === id);
}

export function newOrderId() {
  return "PRN-" + Math.floor(10000 + Math.random() * 89999);
}
