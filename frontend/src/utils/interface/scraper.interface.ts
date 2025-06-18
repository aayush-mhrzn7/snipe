export interface ProductData {
  image: string;
  href: string;
  price: string;
  title: string;
  normalizedPrice: {
    currency: string;
    amount: number;
    display: string;
  };
}
