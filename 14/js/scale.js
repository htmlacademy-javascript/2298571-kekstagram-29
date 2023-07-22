import { MAX_SCALE_VALUE, MIN_SCALE_VALUE } from './settings.js';

const plusSizeButton = document.querySelector('.scale__control--bigger');
const minusSizeButton = document.querySelector('.scale__control--smaller');
const sizeIndicator = document.querySelector('.scale__control--value');
const imagePreview = document.querySelector('.img-upload__preview img');

let currentSize = MAX_SCALE_VALUE;

// Функция увеличивает фото с шагом 25%
const increaseSize = () => {
  if (currentSize === MAX_SCALE_VALUE) {
    return;
  }
  currentSize += 25;
  sizeIndicator.value = `${currentSize}%`;
  imagePreview.style.transform = `scale(${currentSize / 100})`;
};

// Функция уменьшает фото с шагом 25%
const decreaseSize = () => {
  if (currentSize === MIN_SCALE_VALUE) {
    return;
  }
  currentSize -= 25;
  sizeIndicator.value = `${currentSize}%`;
  imagePreview.style.transform = `scale(${currentSize / 100})`;
};

// Функция добавляет обработчики событий на кнопках '+' и '-'
const onScaleButtonClick = () => {
  plusSizeButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    increaseSize();
  });
  minusSizeButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    decreaseSize();
  });
};

// Функция сбрасывает установленные значения
const resetScale = () => {
  currentSize = MAX_SCALE_VALUE;
  imagePreview.style.transform = '';
};

export { onScaleButtonClick, resetScale };
