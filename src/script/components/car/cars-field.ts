import Component from "@/common";
import Cars from "./cars";
import './car.scss';
import { createCar, deleteCar, getCar, getCars } from "@/shared/api";
import CarComponent from "./car-component";
import Car from "./car";

export default class CarsField extends Component {
  newCar: CarComponent;

  //selectCar: (() => void) | null = null;

  constructor(parentNode: HTMLElement | null = null) {
    super(parentNode, 'div', ['cars-wrapper']);

    (async () => {
      let carsInterface = await getCars(1);
      carsInterface.cars.map((car) => {
        (async () => {
          let carInterface = await getCar(car.id);
          this.newCar = new CarComponent(this.element, carInterface);
          this.newCar.onRemoveClick = () => {
            (async () => {
              await deleteCar(car.id);
            })();
          }

          this.newCar.onSelectClick = () => {
            console.log('select');
            this.selectCar.bind(carInterface);
          }


          this.element.append(this.newCar.element);
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


  /* getData(): Car {
    const obj: Car = {
      name: (this.inputTextUpdateCar.element as HTMLInputElement).value,
      color: (this.inputColorUpdateCar.element as HTMLInputElement).value
    }

    return obj;
  } */
  selectCar(obj: Car): Car  {
    const newObj: Car = {
      name: obj.name,
      color: obj.color,
      id: obj.id
    }
    console.log(newObj);

    return newObj;
  }
}
