export type FilterModel = {
  flightClass: string | number | null;
  gate: string | null;
  transfers: string | null;
  minPrice: number | null;
  maxPrice: number | null;
  priceRange?: number[];
  airline?: string | null;
};
