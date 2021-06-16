import Component from "@/common";
import { createCar } from "@/shared/api";
import { generateRandomCars } from "@/shared/utils";
import './controls.scss';

export default class ControlButtons extends Component {
  buttonWrapper: Component;

  buttonRace: Component;

  buttonReset: Component;

  buttonGenerate: Component;

  onRaceClick: (() => void) | null = null;

  onResetClick: (() => void) | null = null;

  onGenerateClick: (() => void) | null = null;

  constructor(parentNode: HTMLElement | null = null) {
    super(parentNode, 'div', ['controls__button-wrapper']);

    this.buttonRace = new Component(this.element, 'button', ['control-button'], 'Race');
    this.buttonRace.element.onclick = () => {
      this.onRaceClick?.();
    }

    this.buttonReset = new Component(this.element, 'button', ['control-button'], 'Reset');
    this.buttonReset.element.onclick = () => {
      this.onResetClick?.();
    }

    this.buttonGenerate = new Component(this.element, 'button', ['control-button'], 'Generate 100');
    this.buttonGenerate.element.onclick = () => {
      this.onGenerateClick?.();
      const arr = generateRandomCars();
      arr.map((car) => {
        (async () => {
          await createCar(car);
        })();
      })
    }
  }
}
