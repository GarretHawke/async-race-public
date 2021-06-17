import Component from "@/common";
import { getCar, getCars } from "@/shared/api";
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

  constructor(parentNode: HTMLElement | null = null) {
    super(parentNode, 'div', ['page']);

    (async () => {

      let carsInterface = await getCars(1);
      this.pageTitle = new Component(this.element, 'h2', ['page-title'], `Garage <span id="cars-count"></span> `);

      this.pageSubtitle = new Component(this.element, 'span', ['page-subtitle'], `Page # ${carsInterface.page}`);

      this.buttonLeft = new Component(this.element, 'button', ['navigate-button'], '<');
      this.buttonLeft.element.onclick = () => {
        this.onClickLeft?.();
      }

      this.buttonRight = new Component(this.element, 'button', ['navigate-button'], '>');
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

      buttonCreate.addEventListener('click', () => {
        (async () => {
          await getCars(1);
          this.carsContainer.addCar();
        })();
      });

      buttonUpdate.addEventListener('click', () => {
        (async () => {
          await getCars(1);
          this.carsContainer.element.innerHTML = '';
          this.carsContainer.updateCar();
        })();
      });


    })();
  }

  enablePage(): void {
    this.element.style.display = '';
  }

  disablePage(): void {
    this.element.style.display = 'none';
  }
}
