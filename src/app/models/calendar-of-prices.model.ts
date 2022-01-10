export type CalendarOfPricesModel = {
  value: number;
  trip_class: number;
  show_to_affiliates: boolean;
  origin: string;
  destination: string;
  gate: string;
  depart_date: Date;
  return_date: Date;
  number_of_changes: number;
  found_at: Date;
  duration: number;
  distance: number;
  actual: boolean;
};

export type GetCalendarOfPricesRequestModel = {
  currency: string;
  data: CalendarOfPricesModel[];
};

export interface CalendarOfPricesStateModel {
  loading: boolean;
  data: CalendarOfPricesModel[];
  currency: string;
  error: string;
}
