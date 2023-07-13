import {popupForm, imagePreview} from './form-main.js';

const plusSizeButton = popupForm.querySelector('.scale__control--bigger');
const minusSizeButton = popupForm.querySelector('.scale__control--smaller');
const sizeIndicator = popupForm.querySelector('.scale__control--value');

const maxValue = 100;
const minValue = 25;

let currentSize = maxValue;

const increaseSize = () => {
  if (currentSize === maxValue) {
    return;
  }
  currentSize += 25;
  sizeIndicator.value = `${currentSize}%`;
  imagePreview.style.transform = `scale(${currentSize / 100})`;
};

const decreaseSize = () => {
  if (currentSize === minValue) {
    return;
  }
  currentSize -= 25;
  sizeIndicator.value = `${currentSize}%`;
  imagePreview.style.transform = `scale(${currentSize / 100})`;
};

plusSizeButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  increaseSize();
});

minusSizeButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  decreaseSize();
});
