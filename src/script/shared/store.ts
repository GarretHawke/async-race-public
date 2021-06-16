
import { getCars, getWinners } from './api';

let carsCount;
let carColor;

//getCars(1).then(response => response.count);

//carsCount = getCars(1).then(result => result.count);

/* getCars(1).then(result => {
  carsCount = result.count;
  return carsCount;
}); */

//(await getCars(1).then(result => result.count)).valueOf()

//carsCount = getCars(1).then(response => response.count);

//const { items: cars, count: carsCount } = await getCars(1);
//const { items: winners, count: winnersCount } = await getWinners({ page: 1 });

//carsCount = Number(localStorage.getItem('carsCount'));

carColor = localStorage.getItem('color');

let cars = carColor;

export default {
  carsPage: 1,
  cars,
  carsCount,
  winnersPage: 1,
  //winnersCount,
  animation: {},
  view: 'garage',
  sortBy: null,
  sortOrder: null,
};

