import Component from "@/common";
import './controls.scss';
import Car from "../car/car";
import { createCar, deleteCar, getCar, getCars } from "@/shared/api";
import CarComponent from "../car";
import PageGarage from "../page-garage";
import CarsField from "../car/cars-field";
import EventObserver from "@/shared/event-observer";

export default class AddCarController extends Component {
  inputWrapperNewCar: Component;

  inputTextNewCar: Component;

  inputColorNewCar: Component;

  buttonCreate: Component;

  onTextClick: (() => void) | null = null;

  onCreateClick: (() => void) | null = null;

  carInterface: Car;

  carsField: CarsField;

  constructor(parentNode: HTMLElement | null = null) {
    super(parentNode, 'div', ['controls__input-wrapper']);

    this.inputTextNewCar = new Component(this.element, 'input', ['input-text']);
    this.inputTextNewCar.element.setAttribute('placeholder', 'Name');
    this.inputTextNewCar.element.setAttribute('type', 'text');

    this.inputColorNewCar = new Component(this.element, 'input', ['input-color']);
    this.inputColorNewCar.element.setAttribute('value', '#008000');
    this.inputColorNewCar.element.setAttribute('type', 'color');

    this.buttonCreate = new Component(this.element, 'button', ['input-button'], 'Create');
    this.buttonCreate.element.id = 'create';
    this.buttonCreate.element.onclick = () => {
      this.onCreateClick?.();
      let carItem = this.getData();
      createCar(carItem);
    }
  }

  getData(): Car {
    const obj: Car = {
      name: (this.inputTextNewCar.element as HTMLInputElement).value,
      color: (this.inputColorNewCar.element as HTMLInputElement).value
    }

    return obj;
  }
}
