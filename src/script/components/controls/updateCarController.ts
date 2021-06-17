import Component from "@/common";
import { updateCar } from "@/shared/api";
import EventObserver from "@/shared/event-observer";
import { getAllJSDocTags } from "typescript";
import Car from "../car/car";
import './controls.scss';

export default class UpdateCarController extends Component {
  inputWrapperUpdateCar: Component;

  inputTextUpdateCar: Component;

  inputColorUpdateCar: Component;

  buttonUpdate: Component;

  onUpdateClick: (() => void) | null = null;

  nameObserver: EventObserver;

  constructor(parentNode: HTMLElement | null = null) {
    super(parentNode, 'div', ['controls__input-wrapper']);

    this.inputTextUpdateCar = new Component(this.element, 'input', ['input-text']);
    this.inputTextUpdateCar.element.id = 'name-update';
    this.inputTextUpdateCar.element.setAttribute('placeholder', 'Name');
    this.inputTextUpdateCar.element.setAttribute('type', 'text');

    this.inputColorUpdateCar = new Component(this.element, 'input', ['input-color']);
    this.inputColorUpdateCar.element.id = 'color-update';
    this.inputColorUpdateCar.element.setAttribute('value', '#008000');
    this.inputColorUpdateCar.element.setAttribute('type', 'color');

    this.buttonUpdate = new Component(this.element, 'button', ['input-button'], 'Update');
    this.buttonUpdate.element.id = 'update';
    this.buttonUpdate.element.onclick = () => {
      this.onUpdateClick?.();
      const carId = Number(localStorage.getItem('id'));
      const carItem = this.getData();
      updateCar(carId, carItem);

    }

  }

  getData(): Car {
    const obj: Car = {
      name: (this.inputTextUpdateCar.element as HTMLInputElement).value,
      color: (this.inputColorUpdateCar.element as HTMLInputElement).value
    }

    return obj;
  }
}
