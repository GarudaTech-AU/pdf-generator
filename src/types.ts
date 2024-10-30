export interface Product {
  id: number;
  title: string;
  price: number;
  images: string[];
  description: string;
  brand: string;
  category: string;
}

export interface ProductImage extends Pick<Product, "category" | "title"> {
  fileID: string;
}
