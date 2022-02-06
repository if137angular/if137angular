import { FilterModel } from 'src/app/models/filter.model';
import { UniversalComponentModel } from 'src/app/models/Universal-component.model';

// FIXME: optimize
const filterArray = (
  array: UniversalComponentModel[],
  { flightClass, minPrice, maxPrice, transfers, gate, airline_titles, minDuration, maxDuration }: FilterModel
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

  if (airline_titles !== null && airline_titles !== 'All' && airline_titles !== undefined) {
    copy = copy.filter(({ airline_title }) => airline_title === airline_titles);
  }

  if (minDuration && maxDuration) {
    copy = copy.filter(
      ({ duration }) => duration >= minDuration && duration <= maxDuration
    );
  }

  if (minDuration) {
    copy = copy.filter(({ duration }) => duration >= minDuration);
  }
  if (maxDuration) {
    copy = copy.filter(({ duration }) => duration <= maxDuration);
  }


  copy.forEach((item: any) => {
    let keys = Object.keys(item);
    keys.forEach((key: string) => {
      if (key === 'value') {
        if (minPrice && maxPrice) {
          copy = copy.filter(
            ({ value }) => value >= minPrice && value <= maxPrice
          );
        }

        if (minPrice) {
          copy = copy.filter(({ value }) => value >= minPrice);
        }
        if (maxPrice) {
          copy = copy.filter(({ value }) => value <= maxPrice);
        }
      }

      if (key === 'price') {
        if (minPrice && maxPrice) {
          copy = copy.filter(
            ({ price }) => price >= minPrice && price <= maxPrice
          );
        }

        if (minPrice) {
          copy = copy.filter(({ price }) => price >= minPrice);
        }
        if (maxPrice) {
          copy = copy.filter(({ price }) => price <= maxPrice);
        }
      }
    });
  });

  return copy;
};

export default filterArray;
