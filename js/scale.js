import { MAX_SCALE_VALUE, MIN_SCALE_VALUE, SCALE_STEP } from './settings.js';

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
  currentSize += SCALE_STEP;
  sizeIndicator.value = `${currentSize}%`;
  imagePreview.style.transform = `scale(${currentSize / 100})`;
};

// Функция уменьшает фото с шагом 25%
const decreaseSize = () => {
  if (currentSize === MIN_SCALE_VALUE) {
    return;
  }
  currentSize -= SCALE_STEP;
  sizeIndicator.value = `${currentSize}%`;
  imagePreview.style.transform = `scale(${currentSize / 100})`;
};

const onSizeIncrease = (evt) => {
  evt.preventDefault();
  increaseSize();
};

const onSizeDecrease = (evt) => {
  evt.preventDefault();
  decreaseSize();
};

// Функция добавляет обработчики событий на кнопках '+' и '-'
const onScaleButtonClick = () => {
  plusSizeButton.addEventListener('click', onSizeIncrease);
  minusSizeButton.addEventListener('click', onSizeDecrease);
};

// Функция сбрасывает установленные значения
const resetScale = () => {
  currentSize = MAX_SCALE_VALUE;
  imagePreview.style.transform = '';
  plusSizeButton.removeEventListener('click', onSizeIncrease);
  minusSizeButton.removeEventListener('click', onSizeDecrease);
};

export { onScaleButtonClick, resetScale };
