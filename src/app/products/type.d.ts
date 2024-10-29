export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
}

export interface Column extends Product {
  actions?: string;
}
