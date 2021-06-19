import Component from "@/common";
import Cars from "./cars";
import './car.scss';
import { createCar, deleteCar, getCar, getCars, startEngine } from "@/shared/api";
import CarComponent from "./car-component";
import Car from "./car";
import PageGarage from "../page-garage";
import EventObserver from "@/shared/event-observer";
import { animation, getDistanceBetweenElements, getPositionAtCenter } from "@/shared/utils";

export default class CarsField extends Component {
  newCar: CarComponent;

  nameObserver: EventObserver;

  colorObserver: EventObserver;

  countCarsObserver: EventObserver;

  buttonBack: HTMLElement;

  buttonForward: HTMLElement;

  pageCountObserver: EventObserver;

  flag: Component;

  constructor(parentNode: HTMLElement | null = null) {
    super(parentNode, 'div', ['cars-wrapper']);

    this.buttonBack = document.getElementById('back-page');
    this.buttonForward = document.getElementById('forward-page');

    this.nameObserver = new EventObserver();
    this.colorObserver = new EventObserver();
    this.countCarsObserver = new EventObserver();

    const newName = document.getElementById('name-update');
    const newColor = document.getElementById('color-update');
    const newCountCars = document.getElementById('cars-count');

    const pagesCount = document.getElementById('page-count');

    this.pageCountObserver = new EventObserver();

    this.pageCountObserver.subscribe((text: number) => {
      pagesCount.innerText = `${text}`;
    });



    (async () => {
      const pagesCount = document.getElementById('page-count');

      this.pageCountObserver.subscribe((text: number) => {
        pagesCount.innerText = `${text}`;
      });

      let page: number = Number(pagesCount.innerText);;

      this.pageCountObserver.broadcast(page);

      let carsInterface = await getCars(page);

      this.countCarsObserver.subscribe((text: number) => {
        newCountCars.innerText = `${text}`;
      });

      this.countCarsObserver.broadcast(carsInterface.carsCount);

      carsInterface.cars.map((car) => {
        (async () => {
          let carInterface = await getCar(car.id);
          this.newCar = new CarComponent(this.element, carInterface);

          //const flag = document.getElementById('flag');

          this.newCar.onStartClick = () => {
            (async () => {
              const flag = document.getElementById(`flag-${carInterface.id}`);
              const carImg = document.getElementById(`car-${carInterface.id}`)
              const { velocity, distance } = await startEngine(carInterface.id);
              const time = Math.round(distance / velocity);
              const htmlDistance = Math.floor(getDistanceBetweenElements(carImg, flag)) - 50;
              animation(carImg, htmlDistance, time);
            })();
          }

          this.newCar.onRemoveClick = () => {
            (async () => {
              await getCars(page);
              await deleteCar(car.id);
              carsInterface = await getCars(page);
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



          //drive

          //const { velocity, distance } = await startEngine(car.id);
          //const time = Math.round(distance / velocity);

          /* this.newCar.onStartClick = () => {
            (async () => {
              const { velocity, distance } = await startEngine(car.id);
              const time = Math.round(distance / velocity);
              const htmlDistance = Math.floor(getDistanceBetweenElements(this.newCar.element, flag));
              animation(this.newCar.element, htmlDistance, time);
            })(); */

            //console.log(animation(this.newCar.element, htmlDistance, time));

          //const htmlDistance = Math.floor(getDistanceBetweenElements(this.newCar.element, flag));
          //console.log('----', time);

          /* this.newCar.onStartClick = () => {
            console.log(animation(this.newCar.element, htmlDistance, time));
          } */

          //animation(this.newCar.element, htmlDistance, time);

          //
          this.element.append(this.newCar.element);

          this.countCarsObserver.broadcast(carsInterface.carsCount);
        })();
      });
    })();
  }

  addCar(): void {

    const pagesCount = document.getElementById('page-count');

    this.pageCountObserver.subscribe((text: number) => {
      pagesCount.innerText = `${text}`;
    });
    let page: number = Number(pagesCount.innerText);

    this.pageCountObserver.broadcast(page);

    (async () => {
      let cars = await getCars(page);
      let car = await getCar(cars.carsCount);
      let addedCar = new CarComponent(this.element, car);
      this.element.append(addedCar.element);
    })();
  }

  updateCar(): void {
    const pagesCount = document.getElementById('page-count');

    const newName = document.getElementById('name-update');
    const newColor = document.getElementById('color-update');
    const newCountCars = document.getElementById('cars-count');
    (async () => {

      let page: number = Number(pagesCount.innerText);
      this.pageCountObserver.broadcast(page);

      let carsInterface = await getCars(page);

      this.countCarsObserver.subscribe((text: number) => {
        newCountCars.innerText = `${text}`;
      });

      this.countCarsObserver.broadcast(carsInterface.carsCount);

      this.pageCountObserver.subscribe((text: number) => {
        pagesCount.innerText = `${text}`;
      });


      carsInterface.cars.map((car) => {
        (async () => {
          let carInterface = await getCar(car.id);
          this.newCar = new CarComponent(this.element, carInterface);
          this.newCar.onRemoveClick = () => {
            (async () => {
              await getCars(page);
              await deleteCar(car.id);
              carsInterface = await getCars(page);
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

  paginate(page: number): void {
    const newName = document.getElementById('name-update');
    const newColor = document.getElementById('color-update');
    const newCountCars = document.getElementById('cars-count');
    (async () => {
      let carsInterface = await getCars(page);

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
              await getCars(page);
              await deleteCar(car.id);
              carsInterface = await getCars(page);
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
