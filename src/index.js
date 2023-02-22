import './style.css';

function component() {
  const element = document.querySelector('.container');
  element.classList.add('title');
  element.textContent = 'test';
  return element;
}

document.body.appendChild(component());