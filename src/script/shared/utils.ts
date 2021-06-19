import Car from "@/components/car/car";

const MARKS = ['Tesla', 'Mercedes', 'BMW', 'Toyota', 'Lada', 'Volvo', 'Opel', 'Volkswagen'];
const MODELS = ['L200', 'Model-S', 'CLK-200', 'X5', 'Camry', 'X-Ray', 'XC-90', 'Vectra', 'Taureg'];

const getRandomName = () => {
  const mark = MARKS[Math.floor(Math.random() * MARKS.length)];
  const model = MODELS[Math.floor(Math.random() * MODELS.length)];

  return `${mark} ${model}`;
}

const getRandomColor = () => {
  const letters = '0123456789abcdef';
  let color = '#';
  for (let i = 0; i < 6; i = i + 1) {
    color += letters[Math.floor(Math.random() * letters.length)];
  }

  return color;
}

export const generateRandomCars = (count = 100): Car[] => {
  return new Array(count).fill(1).map(_ => ({ name: getRandomName(), color: getRandomColor() }));
}

export function getPositionAtCenter(element: HTMLElement) {
  const { top, left, width, height } = element.getBoundingClientRect();

  return {
    x: left + width / 2,
    y: top + height / 2,
  };
}

export function getDistanceBetweenElements(a: HTMLElement, b: HTMLElement) {
  const aPosition = getPositionAtCenter(a);
  const bPosition = getPositionAtCenter(b);

  return Math.hypot(aPosition.x - bPosition.x, aPosition.y - bPosition.y);
}

export function animation(car: HTMLElement, distance: number, animationTime: number) {
  let start: number | null = null;

  function step(timestamp: number) {
    if (!start) {
      start = timestamp;
    }
    const time = timestamp - start;

    const passed = Math.round(time * (distance / animationTime));


    car.style.transform = `translateX(${Math.min(passed, distance)}px)`;

    if (passed < distance) {
      window.requestAnimationFrame(step);
    }
  }

  window.requestAnimationFrame(step);
}

/* export const race = async (action) => {
  const promises =
} */

