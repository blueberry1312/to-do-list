import './style.css';

function component() {
  const element = document.getElementById('title');
  element.classList.add('title');
  return element;
}

document.body.appendChild(component());