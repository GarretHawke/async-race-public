// import { createDomNode } from '@/common';
// import customButton from '@/components/button';
// import styles from './header.scss';

import Component from '@/common';
import './header.scss';

export default class Header extends Component {
  buttonGarage: Component;

  buttonWinners: Component;

  onGarageClick: (() => void) | null = null;

  enableGarage: (() => void) | null = null;

  onWinnersClick: (() => void) | null = null;

  enableWinners: (() => void) | null = null;

  constructor(parentNode: HTMLElement | null = null) {
    super(parentNode, 'header', ['header']);

    this.buttonGarage = new Component(this.element, 'button', ['page-garage', 'active-page'], 'Garage');
    this.buttonGarage.element.onclick = () => {
      this.onGarageClick?.();
      this.enableGarage();
    }

    this.enableGarage = () => {
      this.buttonGarage.element.classList.add('active-page');
      this.buttonWinners.element.classList.remove('active-page');
      this.buttonGarage.element.setAttribute('disabled', '');
      this.buttonWinners.element.removeAttribute('disabled');
    }

    this.buttonWinners = new Component(this.element, 'button', ['page-winners'], 'Winners');
    this.buttonWinners.element.onclick = () => {
      this.onWinnersClick?.();
      this.enableWinners();
    }

    this.enableWinners = () => {
      this.buttonWinners.element.classList.toggle('active-page');
      this.buttonGarage.element.classList.remove('active-page');
      this.buttonWinners.element.setAttribute('disabled', '');
      this.buttonGarage.element.removeAttribute('disabled');
    }
  }
}

/* export default class Header {
  header: HTMLElement;

  buttonWrapper: HTMLElement;

  buttonGarage: HTMLElement;

  buttonWinners: HTMLElement;

  constructor() {
    this.header = createDomNode(this.header, 'header', styles['header']);
    this.buttonWrapper = createDomNode(this.buttonWrapper, 'div', styles['button-wrapper']);


    this.buttonGarage = customButton('Garage', this.garageSwitch.bind(this), styles['page-garage']);
    this.buttonGarage.id = 'button-garage';
    this.buttonGarage.classList.add('active-page');

    this.buttonWinners = customButton('Winners', this.winnersSwitch.bind(this), styles['page-winners']);
    this.buttonWinners.id = 'button-winners';

    this.buttonWrapper.append(this.buttonGarage, this.buttonWinners);

    this.header.append(this.buttonWrapper);
  }

  getHeader(): HTMLElement {
    return this.header;
  }

  garageSwitch():void {
    if (this.buttonGarage.classList.contains('active-page')) {
      return;
    } else {
      this.buttonGarage.classList.add('active-page');
      this.buttonWinners.classList.remove('active-page');
    }
  }

  winnersSwitch():void {
    if (this.buttonWinners.classList.contains('active-page')) {
      return;
    } else {
      this.buttonWinners.classList.add('active-page');
      this.buttonGarage.classList.remove('active-page');
    }
  }
}
 */
