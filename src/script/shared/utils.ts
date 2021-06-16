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

