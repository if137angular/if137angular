export type CalendarOfPricesModel = {
  value: number;
  start?: Date;
  title?: string;
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
  currency?: string;
};

export type GetCalendarOfPricesRequestModel = {
  currency: string;
  data: CalendarOfPricesModel[];
};

export interface CalendarOfPricesStateModel {
  data: CalendarOfPricesModel[];
  currency: string;
  error?: string;
}

export type CalendarOfPricesPayload = {
  destination?: string;
  origin?: string;
  return_date: string;
  depart_date: string;
  originCode: string;
  destinationCode: string;
};
