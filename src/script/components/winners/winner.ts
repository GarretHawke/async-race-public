import Car from "../car/car";

export default interface Winner extends Car {
  wins: number,
  time: number
}

/* export default interface Winner {
  id: number,
  wins: number,
  time: number,
  color?: string,
  name?: string
} */
