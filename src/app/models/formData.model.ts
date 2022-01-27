export type FormDataModel = {
  destinationFrom: FormDestinationModel;
  destinationTo: FormDestinationModel;
  endDate: Date;
  startDate: Date;
  transfers?: string;
  isFormValid?: boolean
};

export type FormDestinationModel = {
  cases?: FormDestinationCasesModel;
  code: string;
  coordinates?: FormDestinationCoordinatesModel;
  country_code?: string;
  name: string;
  name_translations?: FormDestinationTranslationModel;
  time_zone?: string;
};

export type FormDestinationCasesModel = {
  su: string;
};

export type FormDestinationCoordinatesModel = {
  lat: number;
  lon: number;
};

export type FormDestinationTranslationModel = {
  en: string;
};
