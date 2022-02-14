import { FilterModel } from 'src/app/models/filter.model';
import { UniversalComponentModel } from 'src/app/models/universal-component.model';

const priceDurationFilter = (
  array: UniversalComponentModel[],
  min: number | null,
  max: number | null,
  type: 'price' | 'duration'
) => {
  return min && max
    ? array.filter((item) => item[type] >= min && item[type] <= max)
    : array;
};

const filterArray = (
  array: UniversalComponentModel[],
  {
    flightClass,
    minPrice,
    maxPrice,
    transfers,
    gate,
    airline_titles,
    minDuration,
    maxDuration,
  }: FilterModel
) => {
  let copy = [...array];

  if (flightClass !== null && flightClass !== 'All') {
    copy = copy.filter(({ trip_class }) => trip_class === flightClass);
  }

  if (transfers === 'Directly') {
    copy = copy.filter(
      ({ number_of_changes }) => (number_of_changes as number) === 0
    );
  } else if (transfers === 'Transfers') {
    copy = copy.filter(
      ({ number_of_changes }) => (number_of_changes as number) >= 1
    );
  }

  if (gate !== null && gate !== 'All') {
    copy = copy.filter(({ gate: flightGate }) => flightGate === gate);
  }

  if (
    airline_titles !== null &&
    airline_titles !== 'All' &&
    airline_titles !== undefined
  ) {
    copy = copy.filter(({ airline_title }) => airline_title === airline_titles);
  }

  copy = priceDurationFilter(copy, minPrice, maxPrice, 'price');

  copy = priceDurationFilter(copy, minDuration, maxDuration, 'duration');

  return copy;
};

export default filterArray;
