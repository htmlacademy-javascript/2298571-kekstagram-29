const body = document.querySelector('body');
const popupForm = document.querySelector('.img-upload__form');
const NewPictureForm = popupForm.querySelector('.img-upload__overlay');
const ImageUploadButton = popupForm.querySelector('.img-upload__input');
const FormCloseButton = popupForm.querySelector('.img-upload__cancel');
const hashtagInput = popupForm.querySelector('.text__hashtags');
const commentInput = popupForm.querySelector('.text__description');

// Закрытие формы по клику и esc
const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape') {
    if (hashtagInput === document.activeElement || commentInput === document.activeElement) {
      return;
    }
    evt.preventDefault();
    closeForm();
  }
};

function closeForm () {
  ImageUploadButton.value = '';
  hashtagInput.value = '';
  commentInput.value = '';
  NewPictureForm.classList.add('hidden');
  body.classList.remove('modal-open');
  FormCloseButton.removeEventListener('click', closeForm);
  document.removeEventListener('keydown', onDocumentKeydown);
}

// Открытие формы

const openForm = () =>{
  NewPictureForm.classList.remove('hidden');
  body.classList.add('modal-open');
  FormCloseButton.addEventListener('click', closeForm);
  document.addEventListener('keydown', onDocumentKeydown);
};

ImageUploadButton.addEventListener('change',(evt) => {
  evt.preventDefault();
  openForm();
});

// Валидация

// экспортируем (
//   переменные: popupForm, hashtagInput, commentInput, pristine
//   функции: renderHashtagErrors
// )

const pristine = new Pristine (popupForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__error-text',
});

const checkSymbolsAndLength = (array) =>{
  if (array.length === ''){
    return true;
  }
  const regexp = /^#[a-zа-яё0-9]{1,19}$/i;
  const allElementsMatch = array.every((item) => regexp.test(item));

  return allElementsMatch;
};

const checkDuplicates = (array) => {
  for (let i = 0; i < array.length; i++) {
    for (let j = i + 1; j < array.length; j++) {
      if (array[i] === array[j]) {
        return true;
      }
    }
  }
  return false;
};

const validateHashtag = () => {
  const lowerCaseHashtagInput = hashtagInput.value.toLowerCase();
  const hashtagArray = lowerCaseHashtagInput.split(' ');
  if (hashtagInput.value === '' ||
    hashtagArray.length <= 5 &&
    checkSymbolsAndLength(hashtagArray) &&
    !checkDuplicates(hashtagArray)){
    return true;
  }
  return false;
};

const renderHashtagErrors = () => {
  const lowerCaseHashtagInput = hashtagInput.value.toLowerCase();
  const hashtagArray = lowerCaseHashtagInput.split(' ');
  let errorMessage = '';

  if (!checkSymbolsAndLength(hashtagArray)) {
    errorMessage = 'Введён невалидный хэш-тег';
  } else if (checkDuplicates(hashtagArray)) {
    errorMessage = 'Хэш-теги повторяются';
  } else if (hashtagArray.length > 5) {
    errorMessage = 'Превышено количество хэш-тегов';
  }
  return errorMessage;
};

pristine.addValidator(hashtagInput, validateHashtag, renderHashtagErrors);

popupForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

