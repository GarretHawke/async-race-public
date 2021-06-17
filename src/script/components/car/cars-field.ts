import Component from "@/common";
import Cars from "./cars";
import './car.scss';
import { createCar, deleteCar, getCar, getCars } from "@/shared/api";
import CarComponent from "./car-component";
import Car from "./car";
import PageGarage from "../page-garage";
import EventObserver from "@/shared/event-observer";

export default class CarsField extends Component {
  newCar: CarComponent;

  nameObserver: EventObserver;

  colorObserver: EventObserver;

  countCarsObserver: EventObserver;

  constructor(parentNode: HTMLElement | null = null) {
    super(parentNode, 'div', ['cars-wrapper']);

    this.nameObserver = new EventObserver();
    this.colorObserver = new EventObserver();
    this.countCarsObserver = new EventObserver();

    const newName = document.getElementById('name-update');
    const newColor = document.getElementById('color-update');
    const newCountCars = document.getElementById('cars-count');

    (async () => {
      let carsInterface = await getCars(1);

      this.countCarsObserver.subscribe((text: number) => {
        newCountCars.innerText = `${text}`;
      });

      this.countCarsObserver.broadcast(carsInterface.carsCount);

      carsInterface.cars.map((car) => {
        (async () => {
          let carInterface = await getCar(car.id);
          this.newCar = new CarComponent(this.element, carInterface);
          this.newCar.onRemoveClick = () => {
            (async () => {
              await getCars(1);
              await deleteCar(car.id);
              carsInterface = await getCars(1);
              this.countCarsObserver.broadcast(carsInterface.carsCount);
            })();
          }

          this.newCar.onSelectClick = () => {
            this.nameObserver.subscribe((text: string) => {
              (newName as HTMLInputElement).value = text;
            });
            this.colorObserver.subscribe((text: string) => {
              (newColor as HTMLInputElement).value = text;
            });

            this.nameObserver.broadcast(carInterface.name);
            this.colorObserver.broadcast(carInterface.color);
            localStorage.setItem('id', `${carInterface.id}`);
          };

          this.element.append(this.newCar.element);

          this.countCarsObserver.broadcast(carsInterface.carsCount);
        })();
      });
    })();
  }

  addCar(): void {
    (async () => {
      let cars = await getCars(1);
      let car = await getCar(cars.carsCount);
      let addedCar = new CarComponent(this.element, car);
      this.element.append(addedCar.element);
    })();
  }

  /* updateCar(): void {
    (async () => {
      const carId = Number(localStorage.getItem('id'));
      let carInterface = await getCar(carId);

      //this.newCar = new CarComponent(this.element, carInterface);
    })();
  } */

  updateCar(): void {
    const newName = document.getElementById('name-update');
    const newColor = document.getElementById('color-update');
    const newCountCars = document.getElementById('cars-count');
    (async () => {
      let carsInterface = await getCars(1);

      this.countCarsObserver.subscribe((text: number) => {
        newCountCars.innerText = `${text}`;
      });

      this.countCarsObserver.broadcast(carsInterface.carsCount);

      carsInterface.cars.map((car) => {
        (async () => {
          let carInterface = await getCar(car.id);
          this.newCar = new CarComponent(this.element, carInterface);
          this.newCar.onRemoveClick = () => {
            (async () => {
              await getCars(1);
              await deleteCar(car.id);
              carsInterface = await getCars(1);
              this.countCarsObserver.broadcast(carsInterface.carsCount);
            })();
          }

          this.newCar.onSelectClick = () => {
            this.nameObserver.subscribe((text: string) => {
              (newName as HTMLInputElement).value = text;
            });
            this.colorObserver.subscribe((text: string) => {
              (newColor as HTMLInputElement).value = text;
            });

            this.nameObserver.broadcast(carInterface.name);
            this.colorObserver.broadcast(carInterface.color);
            localStorage.setItem('id', `${carInterface.id}`);
          };

          this.element.append(this.newCar.element);

          this.countCarsObserver.broadcast(carsInterface.carsCount);
        })();
      });
    })();
  }
}
