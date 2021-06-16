import Component from "@/common";
import Car from "./car";
import { renderCarImage } from "@/shared/carImage";
import './car.scss';
import { deleteCar, getCar } from "@/shared/api";

export default class CarComponent extends Component {
  carHeaderWrapper: Component;

  buttonWrapperCarHeader: Component;

  selectButton: Component;

  removeButton: Component;

  onSelectClick: (() => void) | null = null;

  onRemoveClick: (() => void) | null = null;

  carName: Component;

  carField: Component;

  carControls: Component;

  buttonStart: Component;

  buttonStop: Component;

  onStartClick: (() => void) | null = null;

  onStopClick: (() => void) | null = null;

  roadWrapper: Component;

  car: Component;

  constructor(parentNode: HTMLElement | null = null, carInterface: Car) {
    super(parentNode, 'div', ['car-wrapper']);

    this.carHeaderWrapper = new Component(this.element, 'div', ['car-header-wrapper']);

    this.buttonWrapperCarHeader = new Component(this.carHeaderWrapper.element, 'div', ['car-header-button-wrapper']);

    this.selectButton = new Component(this.buttonWrapperCarHeader.element, 'button', ['button', 'select-button'], 'Select');
    this.selectButton.element.onclick = () =>{
      this.onSelectClick?.();
    }

    this.removeButton = new Component(this.buttonWrapperCarHeader.element, 'button', ['button', 'remove-button'], 'Remove');
    this.removeButton.element.onclick = () =>{
      this.onRemoveClick?.();
      (async () => {
        await this.destroy();
      })();
    }

    this.carName = new Component(this.carHeaderWrapper.element, 'span', ['car-name'], `${carInterface.name}`);

    this.carField = new Component(this.element, 'div', ['car-field-wrapper']);

    this.carControls = new Component(this.carField.element, 'div', ['car-controls-wrapper']);

    this.buttonStart = new Component(this.carControls.element, 'button', ['button', 'start-engine-button'], 'Start');
    this.buttonStart.element.onclick = () => {
      this.onStartClick?.();
    }

    this.buttonStop = new Component(this.carControls.element, 'button', ['button', 'stop-engine-button'], 'Stop');
    this.buttonStop.element.onclick = () => {
      this.onStopClick?.();
    }

    this.roadWrapper = new Component(this.carField.element, 'div', ['road-wrapper']);

    this.car = new Component(this.roadWrapper.element, 'div', ['car'], `${renderCarImage(carInterface.color)}`);
  }
}
