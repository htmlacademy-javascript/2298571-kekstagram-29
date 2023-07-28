import { setSlider, setDefaultSlider } from './slider.js';
import { onScaleButtonClick, resetScale } from './scale.js';
import { checkMessageOnDisplay } from './messages.js';
import { pristine } from './form-validation.js';
import { FILE_TYPES, SubmitButtonMessage } from './settings.js';

const body = document.querySelector('body');
const popupForm = document.querySelector('.img-upload__form');
const NewPictureForm = popupForm.querySelector('.img-upload__overlay');
const ImageUploadButton = popupForm.querySelector('.img-upload__input');
const FormCloseButton = popupForm.querySelector('.img-upload__cancel');
const hashtagInput = popupForm.querySelector('.text__hashtags');
const commentInput = popupForm.querySelector('.text__description');
const imagePreview = popupForm.querySelector('.img-upload__preview img');
const submitButton = popupForm.querySelector('.img-upload__submit');
const effectPreview = document.querySelectorAll('.effects__preview');

// Функция закрывает форму при нажатии Escape (после проверки на активность полей хэштег, комментарий и открытых ошибок)
const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape') {
    const errorMessageOpen = checkMessageOnDisplay();
    if (hashtagInput === document.activeElement || commentInput === document.activeElement || errorMessageOpen) {
      return;
    }
    evt.preventDefault();
    onFormClose();
  }
};

// Функция сбрасывает заполненные поля, слайдер, скейл, валидацию и закрывает форму
function onFormClose () {
  NewPictureForm.classList.add('hidden');
  body.classList.remove('modal-open');
  FormCloseButton.removeEventListener('click', onFormClose);
  document.removeEventListener('keydown', onDocumentKeydown);

  setDefaultSlider();
  resetScale();
  pristine.reset();
  popupForm.reset();
}

// Функция открывает форму
const openForm = () => {
  NewPictureForm.classList.remove('hidden');
  body.classList.add('modal-open');
  FormCloseButton.addEventListener('click', onFormClose);
  document.addEventListener('keydown', onDocumentKeydown);
  onScaleButtonClick();
  setSlider();
};

// Функция проверяет тип файла и загружает фото в форму и в миниатюры фильтров
const uploadPhoto = () =>{
  const file = ImageUploadButton.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((i) => fileName.endsWith(i));

  if (matches) {
    imagePreview.src = URL.createObjectURL(file);
    effectPreview.forEach((preview) => {
      preview.style.backgroundImage = `url('${imagePreview.src}')`;
    });
  }
};

// Обработчик вызывает функцию открытия формы и загрузки фото
ImageUploadButton.addEventListener('change',(evt) => {
  evt.preventDefault();
  openForm();
  uploadPhoto();
});

// Функция блокирует кнопку отправки формы
const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonMessage.SENDING;
};

// Функция разблокирует кнопку отправки формы
const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonMessage.REST;
};

// Функция валидирует данные и отправляет форму
const sendForm = (cb) => {
  popupForm.addEventListener('submit', async(evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      const formData = new FormData(evt.target);
      await cb(formData);
    }
    unblockSubmitButton();
  });
};

export { imagePreview, sendForm, onFormClose };
