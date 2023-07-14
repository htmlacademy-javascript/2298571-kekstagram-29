import {imagePreview, popupForm} from './form-main.js';

const sliderContainer = popupForm.querySelector('.img-upload__effect-level');
const slider = popupForm.querySelector('.effect-level__slider');
const effectLevel = popupForm.querySelector('.effect-level__value');
const effectButtons = popupForm.querySelectorAll('.effects__radio');

const EFFECTS = [
  {
    name: 'none',
    min: 0,
    max: 100,
    step: 1,
  },
  {
    name: 'chrome',
    style: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  {
    name: 'sepia',
    style: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  {
    name: 'marvin',
    style: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
  },
  {
    name: 'phobos',
    style: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
  },
  {
    name: 'heat',
    style: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: '',
  },
];

const DEFAULT_EFFECT = EFFECTS[0];
let chosenEffect = DEFAULT_EFFECT;

const isDefault = () => chosenEffect === DEFAULT_EFFECT;

const defoltSlider = () => {
  imagePreview.style.filter = 'none';
  imagePreview.className = '';
  sliderContainer.classList.add('hidden');
  sliderContainer.classList.add('hidden');
};

const applyEffect = () => {
  if (isDefault()) {
    defoltSlider();
  }
  const sliderPosition = slider.noUiSlider.get();
  effectLevel.value = sliderPosition;
  imagePreview.style.filter = `${chosenEffect.style}(${sliderPosition}${chosenEffect.unit})`;
  imagePreview.classList.add(`effects__preview--${chosenEffect.name}`);
};

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

const findClickEffect = (evt) => {
  const button = evt.target;
  const index = Array.from(effectButtons).indexOf(button);
  chosenEffect = EFFECTS[index];
  updateSlider();
  applyEffect();
};

noUiSlider.create(slider, {
  range: {
    min: DEFAULT_EFFECT.min,
    max: DEFAULT_EFFECT.max,
  },
  start: DEFAULT_EFFECT.max,
  step: DEFAULT_EFFECT.step,
  connect: 'lower',
});

slider.noUiSlider.on('update', applyEffect);

effectButtons.forEach((button) => {
  button.addEventListener('change', findClickEffect);
});
