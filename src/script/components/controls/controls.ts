import Component from "@/common";
import AddCarController from "./addCarController";
import UpdateCarController from "./updateCarController";
import ControlButtons from "./control-buttons";
import './controls.scss';
import { createCar, getCars } from "@/shared/api";
import CarsField from "../car/cars-field";
import EventObserver from "@/shared/event-observer";

export default class Controls extends Component {
  inputAdd: AddCarController;

  inputUpdate: UpdateCarController;

  controlButtons: ControlButtons;

  carsContainer: CarsField;

  pageCountObserver: EventObserver;

  constructor(parentNode: HTMLElement | null = null) {
    super(parentNode, 'div', ['controls']);

    const pagesCount = document.getElementById('page-count');

    this.pageCountObserver = new EventObserver();

    this.pageCountObserver.subscribe((text: number) => {
      pagesCount.innerText = `${text}`;
    });

    this.inputAdd = new AddCarController(this.element);
    /* this.inputAdd.onCreateClick = () => {

      const pagesCount = document.getElementById('page-count');

      this.pageCountObserver.subscribe((text: number) => {
        pagesCount.innerText = `${text}`;
      });
      let page: number = Number(pagesCount.innerText);

      this.pageCountObserver.broadcast(page);

      (async () => {
        await getCars(page);
        this.carsContainer = new CarsField();
      })();
    } */

    this.inputUpdate = new UpdateCarController(this.element);
    /* this.inputUpdate.onUpdateClick = () => {

      const pagesCount = document.getElementById('page-count');

      this.pageCountObserver.subscribe((text: number) => {
        pagesCount.innerText = `${text}`;
      });
      let page: number = Number(pagesCount.innerText);

      this.pageCountObserver.broadcast(page);

       (async () => {
        await getCars(page);
        this.carsContainer = new CarsField();
      })();
    } */

    this.controlButtons = new ControlButtons(this.element);
    /* this.controlButtons.onGenerateClick = () => {

      const pagesCount = document.getElementById('page-count');

      this.pageCountObserver.subscribe((text: number) => {
        pagesCount.innerText = `${text}`;
      });
      let page: number = Number(pagesCount.innerText);;

      this.pageCountObserver.broadcast(page);

      (async () => {
        await getCars(page);
        this.carsContainer = new CarsField();
        this.carsContainer.updateCar();
      })();
    } */
  }
}

