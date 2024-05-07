export type ProductsType = {
  id: string,
  title: string,
  condition: string,
  thumbnail_id: string,
  catalog_product_id: string,
  listing_type_id: string,
  permalink: string,
  buying_mode: string,
  site_id: string,
  category_id: string,
  domain_id: string,
  thumbnail: string,
  currency_id: string,
  order_backend: number,
  price: number,
  original_price: null,
  sale_price: object,
  available_quantity: string,
  official_store_id: null,
  use_thumbnail_id: boolean,
  accepts_mercadopago: boolean,
  shipping: object,
  stop_time: string,
  seller: object,
  attributes: [],
  installments: object,
  winner_item_id: null,
  catalog_listing: boolean,
  discounts: null,
  promotions: [
  ],
  differential_pricing: object,
  inventory_id: null
};

export type Product = {
  id: string;
  name: string;
};
