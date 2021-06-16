import Winner from "./winner";

export default interface Winners {
  cars: Winner[],
  carsCount: number,
  page: number
}
