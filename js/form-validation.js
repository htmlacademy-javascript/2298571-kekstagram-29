const popupForm = document.querySelector('.img-upload__form');
const hashtagInput = popupForm.querySelector('.text__hashtags');

// Инициализация Pristine
const pristine = new Pristine (popupForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__error-text',
});

// Функция проверяет хэштег на разрешенную длину и символы.
const checkSymbolsAndLength = (array) =>{
  const regexp = /^#[a-zа-яё0-9]{1,19}$/i;
  const allElementsMatch = array.every((item) => regexp.test(item));
  return allElementsMatch;
};

// Функция проверяет хэштег на дубли.
const checkDuplicates = (array) => {
  if (array.length !== new Set(array).size){
    return true;
  }
  return false;
};

// Функция модифицирует полученный хэштег (убирает лишние пробелы, приводит в нижний регистр) в массив
// и запускает общую проверку на соответствие.
const validateHashtag = () => {
  const hashtagArray = hashtagInput.value.trim().toLowerCase().split(/\s+/);

  if (hashtagInput.value === '' ||
    hashtagArray.length <= 5 &&
    checkSymbolsAndLength(hashtagArray) &&
    !checkDuplicates(hashtagArray)){
    return true;
  }
  return false;
};

// Функция отрисовывает ошибки для невалидных комментариев
const renderHashtagErrors = () => {
  const hashtagArray = hashtagInput.value.trim().toLowerCase().split(/\s+/);
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

export { pristine };
