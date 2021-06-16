import Component from "@/common";
import { getCar, getWinner, getWinners } from "@/shared/api";
import Winner from "./winner";
import WinnerComponent from "./winner-component";

export default class WinnerField extends Component {
  newWinner: WinnerComponent;

  constructor(parentNode: HTMLElement | null = null) {
    super(parentNode, 'div', ['winners-wrapper']);

    (async () => {
      let winnersInterface = await getWinners(1);
      winnersInterface.cars.map((car) => {
        (async () => {
          let winnerInterface = await getWinner(car.id);
          let carInterface = await getCar(car.id);
          this.newWinner = new WinnerComponent(this.element, winnerInterface, carInterface);
          this.element.append(this.newWinner.element);
        })();
      });
    })();
  }
}
