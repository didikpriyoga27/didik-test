export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  category: {
    id: number;
    name: string;
    image: string;
    creationAt: string;
    updatedAt: string;
  };
  creationAt: string;
  updatedAt: string;
}

export interface Column extends Product {
  actions?: string;
}

export interface CreateProductParams {
  title: string;
  price: number;
  description: string;
  categoryId: number;
  images: string[];
}
