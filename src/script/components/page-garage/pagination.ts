import { getCar, getCars } from "@/shared/api";
import PageGarage from "./page-garage";



const pageGarage = new PageGarage();

let page: number = 1;

pageGarage.onClickLeft = () => {
  if (page > 1) {
    page--;
  }
}

pageGarage.onClickRight = () => {
  page++;
}

export const paginate = (page: number = 1): void => {
  (async () => {
    const carsPerPage = await getCars(page);
  })
}
