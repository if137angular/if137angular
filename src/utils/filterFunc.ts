import { CalendarOfPricesModel } from 'src/app/models/calendar-of-prices.model';
import { FilterModel } from 'src/app/models/filter.model';

//FIXME: optimize
const filterArray = (
  array: CalendarOfPricesModel[],
  { flightClass, minPrice, maxPrice, transfers, gate }: FilterModel
) => {
  let copy = [...array];
  if (flightClass !== null && flightClass !== 'All') {
    copy = copy.filter(({ trip_class }) => trip_class === flightClass);
  }
  if (transfers === 'Directly') {
    copy = copy.filter(({ number_of_changes }) => number_of_changes === 0);
  }
  if (transfers === 'Transfers') {
    copy = copy.filter(({ number_of_changes }) => number_of_changes >= 1);
  }
  if (gate !== null && gate !== 'All') {
    copy = copy.filter(({ gate: flightGate }) => flightGate === gate);
  }
  if (minPrice && maxPrice) {
    copy = copy.filter(({ value }) => value >= minPrice && value <= maxPrice);
  }
  if (minPrice) {
    copy = copy.filter(({ value }) => value >= minPrice);
  }
  if (maxPrice) {
    copy = copy.filter(({ value }) => value <= maxPrice);
  }

  return copy;
};

export default filterArray;
