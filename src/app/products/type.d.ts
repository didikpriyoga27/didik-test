export interface Category {
  id: number;
  name: string;
  image: string;
  creationAt: string;
  updatedAt: string;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  category: Category;
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
