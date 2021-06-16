/* import Header from '@/components/header';
import PageGarage from '@/components/page-garage';
import PageWinners from '@/components/page-winners';


import {
  getCars,
  getCar,
  createCar,
  deleteCar,
  updateCar,
  startEngine,
  stopEngine,
  drive,
  getSortOrder,
  getWinners,
  getWinner,
  getWinnerStatus,
  deleteWinner,
  createWinner,
  updateWinner,
  saveWinner,
} from '@/shared/api';

export default class GamePage {
  header: Header;

  pageGarage: PageGarage;
  pageWinners: PageWinners;

  render():HTMLElement {
    const wrapper = document.createElement('div');

    this.header = new Header();
    this.pageGarage = new PageGarage();
    this.pageWinners = new PageWinners();

    wrapper.append(this.header.getHeader(), this.pageGarage.getPageGarage(), this.pageWinners.getPageWinners());

    setTimeout(() => {
      this.pageWinners.enablePage();
      this.pageGarage.enablePage();
    }, 100);

    //this.pageWinners.enablePage();

    return wrapper;
  }
} */


