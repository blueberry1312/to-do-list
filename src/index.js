import './style.css';

function component() {
  const element = document.getElementById('container');
  element.classList.add('title');
  element.textContent = 'test';
  return element;
}

document.body.appendChild(component());