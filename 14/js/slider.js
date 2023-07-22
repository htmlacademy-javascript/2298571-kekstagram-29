import { Effects } from './settings.js';

const sliderContainer = document.querySelector('.img-upload__effect-level');
const slider = document.querySelector('.effect-level__slider');
const effectLevel = document.querySelector('.effect-level__value');
const effectButtons = document.querySelectorAll('.effects__radio');
const imagePreview = document.querySelector('.img-upload__preview img');

const DEFAULT_EFFECT = Effects[0];
let chosenEffect = DEFAULT_EFFECT;

// Функция проверяет текущий эффект на соответствие значениям по умолчанию
const isDefault = () => chosenEffect === DEFAULT_EFFECT;

// Функция сбрасывает слайдер до значений по умолчанию
const defoltSlider = () => {
  chosenEffect = DEFAULT_EFFECT;
  imagePreview.style.filter = 'none';
  imagePreview.className = '';
  sliderContainer.classList.add('hidden');
  sliderContainer.classList.add('hidden');
};

// Функция накладывает и регулирует эффект в зависимости от положения слайдера
const applyEffect = () => {
  if (isDefault()) {
    defoltSlider();
  }
  const sliderPosition = slider.noUiSlider.get();
  effectLevel.value = sliderPosition;
  imagePreview.style.filter = `${chosenEffect.style}(${sliderPosition}${chosenEffect.unit})`;
  imagePreview.classList.add(`effects__preview--${chosenEffect.name}`);
};

// Функция отображает и настраивает слайдер
const updateSlider = () => {
  sliderContainer.classList.remove('hidden');
  slider.noUiSlider.updateOptions({
    range: {
      min: chosenEffect.min,
      max: chosenEffect.max,
    },
    step: chosenEffect.step,
    start: chosenEffect.max,
  });
};

// Функция определяет эффект на миниатюре
const findClickEffect = (evt) => {
  imagePreview.classList.remove(`effects__preview--${chosenEffect.name}`);
  const button = evt.target;
  const index = Array.from(effectButtons).indexOf(button);
  chosenEffect = Effects[index];
  updateSlider();
  applyEffect();
};

// Инициализация слайдера
noUiSlider.create(slider, {
  range: {
    min: DEFAULT_EFFECT.min,
    max: DEFAULT_EFFECT.max,
  },
  start: DEFAULT_EFFECT.max,
  step: DEFAULT_EFFECT.step,
  connect: 'lower',
});

const setSlider = () => {
  defoltSlider();
  slider.noUiSlider.on('update', applyEffect);
  effectButtons.forEach((button) => {
    button.addEventListener('change', findClickEffect);
  });
};

export { defoltSlider, setSlider};
