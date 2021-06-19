import Component from "@/common";
import { getCar, getCars } from "@/shared/api";
import EventObserver from "@/shared/event-observer";
import CarComponent from "../car";
import CarsField from "../car/cars-field";
import Controls from "../controls";
import './page-garage.scss';

export default class PageGarage extends Component {
  controlPanel: Controls;

  pageTitle: Component;

  pageSubtitle: Component;

  subtitleWrapper: Component;

  buttonWrapper: Component;

  buttonLeft: Component;

  buttonRight: Component;

  onClickLeft: (() => void) | null = null;

  onClickRight: (() => void) | null = null;

  carsContainer: CarsField;

  pageCountObserver: EventObserver;

  constructor(parentNode: HTMLElement | null = null) {
    super(parentNode, 'div', ['page']);



    (async () => {

      this.pageTitle = new Component(this.element, 'h2', ['page-title'], `Garage <span id="cars-count"></span>`);

      this.pageSubtitle = new Component(this.element, 'span', ['page-subtitle'], `Page # <span id="page-count">1</span>`);

      this.pageCountObserver = new EventObserver();

      const pagesCount = document.getElementById('page-count');

      this.pageCountObserver.subscribe((text: number) => {
        pagesCount.innerText = `${text}`;
      });

      this.buttonLeft = new Component(this.element, 'button', ['navigate-button'], '<');
      this.buttonLeft.element.id = 'back-page';
      this.buttonLeft.element.onclick = () => {
        this.onClickLeft?.();
      }

      this.buttonRight = new Component(this.element, 'button', ['navigate-button'], '>');
      this.buttonRight.element.id = 'forward-page';
      this.buttonRight.element.onclick = () => {
        this.onClickRight?.();
      }

      this.buttonWrapper = new Component(this.element, 'div', ['navigate-button-wrapper']);
      this.buttonWrapper.element.append(this.buttonLeft.element, this.buttonRight.element);

      this.subtitleWrapper = new Component(this.element, 'div', ['subtitle-wrapper']);
      this.subtitleWrapper.element.append(this.pageSubtitle.element, this.buttonWrapper.element);

      this.controlPanel = new Controls(this.element);

      this.carsContainer = new CarsField(this.element);

      const buttonCreate = document.getElementById('create');
      const buttonUpdate = document.getElementById('update');
      const buttonGenerate = document.getElementById('generate');

      buttonCreate.addEventListener('click', () => {
        (async () => {
          await getCars(page);
          this.carsContainer.addCar();
        })();
      });

      buttonUpdate.addEventListener('click', () => {
        (async () => {
          await getCars(page);
          this.carsContainer.element.innerHTML = '';
          this.carsContainer.updateCar();
        })();
      });

      buttonGenerate.addEventListener('click', () => {
        (async () => {
          await getCars(page);
          this.carsContainer.element.innerHTML = '';
          this.carsContainer.updateCar();
        })();
      });

      let page: number = Number(pagesCount.innerText);
      let pageCount: number;

      this.buttonRight.element.addEventListener('click', () => {
        (async () => {

          page = page + 1;
          let cars = await getCars(page);
          pageCount = Math.ceil(cars.carsCount / 7);

          if (page < pageCount) {
            const pagesCount = document.getElementById('page-count');

            this.pageCountObserver.subscribe((text: number) => {
              pagesCount.innerText = `${text}`;
            });

            this.carsContainer.element.innerHTML = '';
            this.carsContainer.paginate(page);
            this.pageCountObserver.broadcast(page);
          } else return;
        })();
      });

      this.buttonLeft.element.addEventListener('click', () => {
        (async () => {

          if (page > 1) {
            const pagesCount = document.getElementById('page-count');

            this.pageCountObserver.subscribe((text: number) => {
              pagesCount.innerText = `${text}`;
            });

            page = page - 1;
            await getCars(page);

            this.carsContainer.element.innerHTML = '';
            this.carsContainer.paginate(page);
            this.pageCountObserver.broadcast(page);
          } else return;
        })();
      })


    })();
  }

  enablePage(): void {
    this.element.style.display = '';
  }

  disablePage(): void {
    this.element.style.display = 'none';
  }
}
