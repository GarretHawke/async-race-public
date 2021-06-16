import { renderCarImage } from './carImage';
import './ui.scss';
import store from './store';

import {
  getCars,
  getCar,
  createCar,
  deleteCar,
  updateCar,
  startEngine,
  stopEngine,
  drive,
  getSortOrder,
  getWinners,
  getWinner,
  getWinnerStatus,
  deleteWinner,
  createWinner,
  updateWinner,
  saveWinner
} from '@/shared/api';

let selectedCar = null;

export const renderCar = ({ id, name, color, isEngineStarted }: {
  id: number,
  name?: string,
  color?: string,
  isEngineStarted?: boolean,
}): string => {
  return `
    <div class="car-wrapper">
      <div class="car-header-wrapper">
        <div class="car-header-button-wrapper">
          <button class="button select-button" id="select-car-${id}">Select</button>
          <button class="button remove-button" id="remove-car-${id}">Remove</button>
        </div>
        <span class="car-name">${name}</span>
      </div>
      <div class="car-field-wrapper">
        <div class="car-controls-wrapper">
          <button class="button start-engine-button" id="start-engine-car-${id}" ${isEngineStarted ? 'disabled' : ''}>Start</button>
          <button class="button stop-engine-button" id="stop-engine-car-${id}" ${isEngineStarted ? 'disabled' : ''}>Stop</button>
        </div>
        <div class="road-wrapper">
          <div class="car" id="car-${id}">
            ${renderCarImage(color)}
          </div>
        </div>
      </div>
    </div>
  `;
}



 export const renderGarage = (): string => {
  return `
    <ul class="garage-list">
      <li>${renderCar({ id: 2 })}</li>
    </ul>
  `;
}


/* ${store.cars.map((car) => '
      <li>${renderCar(car)}</li>
      ').join('')} */

