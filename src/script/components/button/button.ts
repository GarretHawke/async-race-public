const customButton = (
  name: string,
  handlerClick: () => void,
  ...classes: string[]
): HTMLElement => {
  const button = document.createElement('button');
  button.innerText = name;
  button.classList.add(...classes);
  button.onclick = () => handlerClick();
  return button;
};

export default customButton;
