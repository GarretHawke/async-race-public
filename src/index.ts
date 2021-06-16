import Component from "@/common";
import Header from "@/components/header";
import PageGarage from "@/components/page-garage";
import PageWinners from "@/components/page-winners";
import './style/index.scss';

class App extends Component {
  header: Header;

  pageGarage: PageGarage;

  pageWinners: PageWinners;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', ['application']);

    this.header = new Header(this.element);
    this.header.onWinnersClick = () => {
      this.pageWinners.enablePage();
      this.pageGarage.disablePage();
    }

    this.header.onGarageClick = () => {
      this.pageGarage.enablePage();
      this.pageWinners.disablePage();
    }

    this.pageGarage = new PageGarage(this.element);
    this.pageWinners = new PageWinners(this.element);
  }
}

const rootDiv = document.getElementById('root');

const app = new App(rootDiv);
//(window as any).app = app;


/* import { GamePage } from '@/pages';
import './style/index.scss';

const rootDiv = document.getElementById('root');

const gamePage = new GamePage().render();

rootDiv.append(gamePage); */

//toggle rout buttons

/* const buttonGarage = document.querySelector('.page-garage');
const buttonWinners = document.querySelector('.page-winners');

buttonGarage.addEventListener('click', () => {
  if (buttonGarage.classList.contains('active-page')) return;
  else {
    buttonGarage.classList.add('active-page');
    buttonWinners.classList.remove('active-page');
  }
});

buttonWinners.addEventListener('click', () => {
  if (buttonWinners.classList.contains('active-page')) return;
  else {
    buttonWinners.classList.add('active-page');
    buttonGarage.classList.remove('active-page');
  }
});

//

const garagePage = document.getElementById('garage');
const winnersPage = document.getElementById('winners');

const getActivePage = () => {
  if (buttonGarage.classList.contains('active-page')) {
    winnersPage.style.display = 'none';
    garagePage.style.display = '';
  } else {
    winnersPage.style.display = '';
    garagePage.style.display = 'none';
  }
  if (buttonWinners.classList.contains('active-page')) {
    winnersPage.style.display = '';
    garagePage.style.display = 'none';
  } else {
    winnersPage.style.display = 'none';
    garagePage.style.display = '';
  }
}

buttonGarage.addEventListener('click', getActivePage);
buttonWinners.addEventListener('click', getActivePage); */



