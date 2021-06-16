import Component from "@/common";
import { renderCarImage } from "@/shared/carImage";
import Car from "../car/car";
import Winner from "./winner";
import './winner.scss';

export default class WinnerComponent extends Component {
  tableHeader: Component;

  columnNumber: Component;

  columnImage: Component;

  columnName: Component;

  columnWins: Component;

  columnTime: Component;

  constructor(parentNode: HTMLElement | null = null, winnerInterface: Winner, carInterface: Car) {
    super(parentNode, 'div', ['winner-wrapper']);

    this.columnNumber = new Component(this.element, 'div', ['column-number'], `${winnerInterface.id}`);

    this.columnImage = new Component(this.element, 'div', ['column-image'], `${renderCarImage(carInterface.color)}`);

    this.columnName = new Component(this.element, 'div', ['column-name'], `${carInterface.name}`);

    this.columnWins = new Component(this.element, 'div', ['column-wins'], `${winnerInterface.wins}`);

    this.columnTime = new Component(this.element, 'div', ['column-time'], `${winnerInterface.time}`);

    this.tableHeader = new Component(this.element, 'div', ['table-header']);
    this.tableHeader.element.append(
      this.columnNumber.element,
      this.columnImage.element,
      this.columnName.element,
      this.columnWins.element,
      this.columnTime.element
    );
  }
}
