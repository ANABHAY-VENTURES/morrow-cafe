export interface MenuItem {
  id: string;
  category: 'coffee' | 'tea' | 'plates' | 'pastry';
  name: string;
  japanese: string;
  price: number;
  tags: string[];
  description: string;
  notes: string;
  origin: string;
  elevation: string;
  brewMethod: string;
  image: string;
  pairing: string;
  badge?: string;
}
