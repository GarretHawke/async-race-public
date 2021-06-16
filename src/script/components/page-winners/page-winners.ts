import Component from '@/common';
import './page-winners.scss';

export default class PageWinners extends Component {
  pageTitle: Component;

  pageSubtitle: Component;

  subtitleWrapper: Component;

  buttonWrapper: Component;

  buttonLeft: Component;

  buttonRight: Component;

  onClickLeft: (() => void) | null = null;

  onClickRight: (() => void) | null = null;

  tableWrapper: Component;

  tableHeader: Component;

  columnNumber: Component;

  columnImage: Component;

  columnName: Component;

  columnWins: Component;

  columnTime: Component;

  constructor(parentNode: HTMLElement | null = null) {
    super(parentNode, 'div', ['page']);

    this.element.style.display = 'none';

    this.pageTitle = new Component(this.element, 'h2', ['page-title'], `Winners (1)`);

    this.pageSubtitle = new Component(this.element, 'span', ['page-subtitle'], `Page # 1`);

    this.buttonLeft = new Component(this.element, 'button', ['navigate-button'], '<');
    this.buttonLeft.element.onclick = () => {
      this.onClickLeft?.();
    }

    this.buttonRight = new Component(this.element, 'button', ['navigate-button'], '>');
    this.buttonRight.element.onclick = () => {
      this.onClickRight?.();
    }

    this.buttonWrapper = new Component(this.element, 'div', ['navigate-button-wrapper']);
    this.buttonWrapper.element.append(
      this.buttonLeft.element,
      this.buttonRight.element
    );

    this.subtitleWrapper = new Component(this.element, 'div', ['subtitle-wrapper']);
    this.subtitleWrapper.element.append(
      this.pageSubtitle.element,
      this.buttonWrapper.element
    );

    this.columnNumber = new Component(this.element, 'div', ['column-number'], '№');

    this.columnImage = new Component(this.element, 'div', ['column-image'], 'Image');

    this.columnName = new Component(this.element, 'div', ['column-name'], 'Name');

    this.columnWins = new Component(this.element, 'div', ['column-wins'], 'Wins ↕');

    this.columnTime = new Component(this.element, 'div', ['column-time'], 'Best time ↕');

    this.tableHeader = new Component(this.element, 'div', ['table-header']);
    this.tableHeader.element.append(
      this.columnNumber.element,
      this.columnImage.element,
      this.columnName.element,
      this.columnWins.element,
      this.columnTime.element
    );

    this.tableWrapper = new Component(this.element, 'div', ['table-wrapper']);
    this.tableWrapper.element.append(this.tableHeader.element);
  }

  enablePage(): void {
    this.element.style.display = '';
  }

  disablePage(): void {
    this.element.style.display = 'none';
  }
}

/* import { createDomNode } from '@/common';
import customButton from'../button';
import styles from './page-winners.scss';

export default class PageWinners {
  pageWinners: HTMLElement;

  pageTitle: HTMLElement;

  subtitleWrapper: HTMLElement;

  pageSubtitle: HTMLElement;

  navigateButtonWrapper: HTMLElement;

  navigateButtonLeft: HTMLElement;

  navigateButtonRight: HTMLElement;

  constructor() {
    this.pageWinners = createDomNode(this.pageWinners, 'div', styles['page']);
    this.pageWinners.id = 'winners';
    this.pageWinners.style.display = 'none';

    this.pageTitle = createDomNode(this.pageTitle, 'h2', styles['page-title']);
    this.pageTitle.textContent = `Winners (1)`;

    this.subtitleWrapper = createDomNode(this.subtitleWrapper, 'div', styles['subtitle-wrapper']);

    this.pageSubtitle = createDomNode(this.pageSubtitle, 'span', styles['page-subtitle']);
    this.pageSubtitle.textContent = `Page # 1`;

    this.navigateButtonWrapper = createDomNode(this.navigateButtonWrapper, 'div', styles['navigate-button-wrapper']);

    this.navigateButtonLeft = customButton('<', this.turnBack, styles['navigate-button']);
    this.navigateButtonLeft.id = 'page-back';
    this.navigateButtonRight = customButton('>', this.turnForward, styles['navigate-button']);
    this.navigateButtonRight.id = 'page-forward';

    this.navigateButtonWrapper.append(this.navigateButtonLeft, this.navigateButtonRight);

    this.subtitleWrapper.append(this.pageSubtitle, this.navigateButtonWrapper);

    this.pageWinners.append(this.pageTitle, this.subtitleWrapper);
  }

  getPageWinners(): HTMLElement {
    return this.pageWinners;
  }

  turnBack(): void {
    console.log('back');
  }

  turnForward(): void {
    console.log('forward');
  }

  enablePage(): void {
    const buttonWinners = document.getElementById('button-winners');
    const buttonGarage = document.getElementById('button-garage');

    buttonWinners.addEventListener('click', () => {
      if (buttonWinners.classList.contains('active-page')) {
        this.pageWinners.style.display = '';
      } else {
        this.pageWinners.style.display = 'none';
      }
    });

    buttonGarage.addEventListener('click', () => {
      if (buttonGarage.classList.contains('active-page')) {
        this.pageWinners.style.display = 'none';
      } else {
        this.pageWinners.style.display = '';
      }
    });
  }

} */
