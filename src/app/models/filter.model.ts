export type FilterModel = {
  flightClass?: string | number | null;
  gate?: string | null;
  transfers?: string | null;
  airline?: string | null;
  airline_titles?: string | null;
  minPrice: number | null;
  maxPrice: number | null;
  minDuration: number | null;
  maxDuration: number | null;
  priceRange?: number[];
  durationRange?: number[];
};
