import Component from "@/common";
import AddCarController from "./addCarController";
import UpdateCarController from "./updateCarController";
import ControlButtons from "./control-buttons";
import './controls.scss';
import { createCar } from "@/shared/api";
import CarsField from "../car/cars-field";

export default class Controls extends Component {
  inputAdd: AddCarController;

  inputUpdate: UpdateCarController;

  controlButtons: ControlButtons;

  carsContainer: CarsField;

  constructor(parentNode: HTMLElement | null = null) {
    super(parentNode, 'div', ['controls']);

    this.inputAdd = new AddCarController(this.element);
    this.inputAdd.onCreateClick = () => {
      (async () => {
        this.carsContainer = new CarsField();
        this.carsContainer.addCar();
        console.log('\\\\\\');
      })();
    }

    this.inputUpdate = new UpdateCarController(this.element);

    this.controlButtons = new ControlButtons(this.element);
  }
}

