export interface CovidData {
  id: string;
  cases: {
    "1M_pop": string;
    active: number | null;
    critical: number | null;
    new: string | null;
    recovered: number | null;
    total: number ;
  };
  continent: string;
  country: string;
  covidLevel?: string;
  day: string;
  eaths: object;
  population: number;
  tests: object;
  time: string;
}