import Car from "@/components/car/car";
import Cars from "@/components/car/cars";
import Winner from "@/components/winners/winner";

const base: string = 'http://localhost:3000';

const garage: string = `${base}/garage`;
const winners: string = `${base}/winners`;
const engine: string = `${base}/engine`;


export const getCars = async (page: number = 1, limit: number = 7): Promise<Cars> => {
  let response = await fetch(`${garage}?_page=${page}&_limit=${limit}`);

  let cars = await response.json();
  let carsCount = Number(response.headers.get('X-Total-Count'));

return {
    cars,
    carsCount,
    page
  };
}


export const getCar = async (id: number): Promise<Car> => {
  return (await fetch(`${garage}/${id}`)).json();
}


export const createCar = async (body: object): Promise<Car> => {
  return (await fetch(garage, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    },
  })).json();
}

export const deleteCar = async (id: number): Promise<Car> => {
  return (await fetch(`${garage}/${id}`, { method: 'DELETE' })).json();
}

export const updateCar = async (id: number, body: object): Promise<Car> => {
  return (await fetch(`${garage}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    },
  })).json();
}

export const startEngine = async (id: number) => {
  return (await fetch(`${engine}?id=${id}&status=started`)).json();
}

export const stopEngine = async (id: number) => {
  return (await fetch(`${engine}?id=${id}&status=stopped`)).json();
}

export const drive = async (id: number) => {
  const res = await fetch(`${engine}?id=${id}&status=drive`).catch();
  return res.status !== 200 ? { success: false } : { ...(await res.json()) };
}

export const getSortOrder = (sort: number, order: number) => {
  if (sort && order) {
    return `&_sort=${sort}&_order=${order}`;
  }
  return '';
}

export const getWinners = async ({ page, limit = 10, sort, order }: {
  page: number,
  limit?: number,
  sort?: number,
  order?: number,
}) => {
  const response = await fetch(`${winners}?_page=${page}&_limit=${limit}${getSortOrder(sort, order)}`);
  const items = await response.json();

  return {
    items: await Promise.all(items.map(async (winner: any) => ({ ...winner, car: await getCar(winner.id) }))),
    count: Number(response.headers.get('X-Total-Count')),
  };
}

export const getWinner = async (id: number): Promise<Winner> => {
  return (await fetch(`${winners}/${id}`)).json();
}

export const getWinnerStatus = async (id: number) => {
  return (await fetch(`${winners}/${id}`)).status;
}

export const deleteWinner = async (id: number) => {
  return (await fetch(`${winners}/${id}`, { method: 'DELETE' })).json();
}

export const createWinner = async (body: object) => {
  return (await fetch(winners, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    },
  })).json();
}

export const updateWinner = async (id: number, body: object) => {
  return (await fetch(`${winners}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    }
  })).json();
}

export const saveWinner = async ({ id, time }: {
  id: number,
  time: number
}) => {
  const winnerStatus = await getWinnerStatus(id);

  if (winnerStatus === 404) {
    await createWinner({
      id,
      wins: 1,
      time,
    });
  } else {
    const winner = await getWinner(id);
    await updateWinner(id, {
      id,
      wins: winner.wins + 1,
      time: time < winner.time ? time : winner.time,
    });
  }
}

