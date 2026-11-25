import { MenuItem } from './cafe';

export interface CartItem {
  id: string;
  name: string;
  japanese: string;
  price: number;
  image: string;
  category: string;
  quantity: number;
}

export interface PastOrder {
  orderId: string;
  timestamp: string;
  date: string;
  items: CartItem[];
  orderType: 'table' | 'counter';
  tableNumber: string;
  customerName: string;
  subtotal: number;
  tax: number;
  total: number;
  notes?: string;
}
