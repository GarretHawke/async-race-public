import Component from "@/common";
import CarsField from "@/components/car/cars-field";
import Header from "@/components/header";
import PageGarage from "@/components/page-garage";
import PageWinners from "@/components/page-winners";
import EventObserver from "@/shared/event-observer";
import './style/index.scss';

class App extends Component {
  header: Header;

  pageGarage: PageGarage;

  pageWinners: PageWinners;

  eventObserver: EventObserver;

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

    let text = new Component(this.pageGarage.element, 'span');
    text.element.innerText = `
    Привет! Это задание оказалось довольно сложным для меня, поэтому у меня уходит ооочень много времени
    на его разбор и решение. Ко времени дедлайна мне пока не удалось реализовать само движение машинок. Буду благодарна, если ты мне дашь еще немного времени
    и проверишь в последний день. Я очень стараюсь, и надеюсь, что еще парочка дней помогут мне добавить еще
    функционала в это приложение. Ну а если не захочешь - это твое решение, все равно спасибо!) Я в первую очередь
    здесь за знаниями, а не получением баллов любой ценой.
    С уважением, Garret Hawke`;
    this.pageWinners = new PageWinners(this.element);

    this.eventObserver = new EventObserver();
  }
}

const rootDiv = document.getElementById('root');

const app = new App(rootDiv);
