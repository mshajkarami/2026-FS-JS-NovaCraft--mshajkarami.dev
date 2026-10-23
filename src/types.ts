export type ProductCategory = 'all' | 'apparel' | 'fragrance' | 'accessories';

export interface FragranceNotes {
  top: string[];
  heart: string[];
  base: string[];
  concentration: string; // e.g. "اکستریت د پرفیوم" or "ادو پرفیوم نیش"
  longevity: string; // e.g. "۱۰ الی ۱۲ ساعت"
  sillage: string; // e.g. "قوی و ماندگار"
  season: string; // e.g. "پاییز و زمستان"
}

export interface ApparelDetails {
  fabric: string; // e.g. "۹۰٪ پشم ویرجین، ۱۰٪ کشمیر"
  fit: string; // e.g. "اورسایز کپسولی"
  colors: { id: string; name: string; hex: string; inStock: boolean }[];
  sizes: { size: string; inStock: boolean; stockCount: number }[];
  care: string; // e.g. "فقط خشک‌شویی تخصصی"
}

export interface AccessoryDetails {
  material: string;
  dimensions: string;
  hardware: string;
  colors: { id: string; name: string; hex: string; inStock: boolean }[];
}

export interface Product {
  id: string;
  title: string;
  latinTitle: string;
  category: 'apparel' | 'fragrance' | 'accessories';
  categoryLabel: string;
  price: number; // base price in Tomans
  price100ml?: number; // for fragrance 100ml
  imageType: 'wool_coat' | 'santal' | 'leather_bag' | 'amber_bergamot' | 'cashmere_sweater' | 'rose_papyrus' | 'leather_belt' | 'flannel_trousers';
  shortDesc: string;
  fullDesc: string;
  isNew?: boolean;
  isLimited?: boolean;
  stockStatus: 'in_stock' | 'low_stock' | 'out_of_stock';
  fragranceNotes?: FragranceNotes;
  apparelDetails?: ApparelDetails;
  accessoryDetails?: AccessoryDetails;
}

export interface CartItem {
  id: string; // generated unique cart item id
  productId: string;
  title: string;
  category: 'apparel' | 'fragrance' | 'accessories';
  imageType: Product['imageType'];
  unitPrice: number;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
  selectedVolume?: '50ml' | '100ml';
}

export interface OrderDetails {
  orderId: string;
  customerName: string;
  phone: string;
  province: string;
  city: string;
  address: string;
  postalCode: string;
  shippingMethod: 'standard' | 'express';
  paymentMethod: 'zarinpal' | 'saman' | 'cod';
  items: CartItem[];
  subtotal: number;
  discount: number;
  shippingCost: number;
  total: number;
  orderDate: string;
}
