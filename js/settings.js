// FILTERS.JS Количество отрисовываемых картинок в фильтре RANDOM
const THUMBNAILS_RANDOM_NUMBER = 10;
//POPUP.JS  Максимально количество комментариев при клике на 'загрузить'
const COMMENT_PER_CLICK = 5;
//SCALE.JS Максимальное и минимальное значение изменения размера картинки
const MAX_SCALE_VALUE = 100;
const MIN_SCALE_VALUE = 25;
//SCALE.JS Шаг изменения размера картинки
const SCALE_STEP = 25;
// UTIL.JS Пауза между перерисовкой картинок при смене фильтра
const FILTER_CHANGE_TIME_DELAY = 500;
// MAIN.JS Время отображения сообщения об ошибке при загрузке данных с сервера
const ALERT_SHOW_TIME = 5000;
// MAIN.JS Текст сообщения об ошибке при загрузке данных с сервера
const GET_DATA_ERROR_TEXT = 'Произошла ошибка при получении данных с сервера';
// FORM-VALIDATION.JS Допустимое кол-во хэштегов в одном посте
const HASHTAGS_ALLOWED_NUMBER = 5;
// API.JS Адрес получения и загрузки данных (url)
const URL = 'https://29.javascript.pages.academy/kekstagram';

// FORM-MAIN.JS Разрешенные типы файлов для загрузки в приложение
const FILE_TYPES = ['jpg', 'jpeg', 'png'];

// API.JS Адрес получения и загрузки данных (путь)
const Path = {
  GET: '/data',
  SEND: '/'
};

// API.JS Текст сообщений об ошибке при загрузке данных
const ErrorText = {
  GET: 'Не удалось получить данные',
  POST: 'Не удалось отправить данные'
};

// FORM-MAIN.JS Текст кнопки формы по умолчанию и в процессе отправки данных
const SubmitButtonMessage = {
  REST: 'Опубликовать',
  SENDING: 'Публикую...'
};

// SLIDER.JS Настройки эффектов слайдера
const effects = [
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

// MAIN.JS Настройка окна уведомления при ошибке получения данных с сервера
const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '19px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = '#FC4C4C';
  alertContainer.textContent = message;
  document.body.append(alertContainer);
  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};


export { showAlert,
  GET_DATA_ERROR_TEXT, // main.js
  URL, Path, ErrorText, //api.js
  THUMBNAILS_RANDOM_NUMBER, // filters.js
  FILE_TYPES, SubmitButtonMessage, //form-main.js
  COMMENT_PER_CLICK, // popup.js
  MAX_SCALE_VALUE, MIN_SCALE_VALUE, SCALE_STEP, // scale.js
  effects, //slider.js
  FILTER_CHANGE_TIME_DELAY, // util.js
  HASHTAGS_ALLOWED_NUMBER // form-validation.js
};
