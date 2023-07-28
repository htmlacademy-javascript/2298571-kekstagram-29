const errorTemplate = document.querySelector('#error');
const successTemplate = document.querySelector('#success');

// Функция проверяет наличие открытых сообщений
const checkMessageOnDisplay = () => document.querySelector('.error, .success');

// Функция закрывает сообщение при нажатии Escape и Enter
const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape' || evt.key === 'Enter') {
    evt.preventDefault();
    onMessageClose();
  }
};

// Функция закрывает сообщение при клике на фон окна
const onOverlayClick = (evt) => {
  const messageOpen = checkMessageOnDisplay();
  const isClickOnMessage = evt.target.closest('.success__inner, .error__inner');
  const isClickOnButton = evt.target.closest('.success__button, .error__button');

  if (messageOpen && !isClickOnMessage && !isClickOnButton) {
    evt.preventDefault();
    onMessageClose();
  }
};

// Функция закрывает сообщение
function onMessageClose () {
  const messageOpen = checkMessageOnDisplay();
  if (messageOpen) {
    messageOpen.remove();
  }
  document.removeEventListener('keydown', onDocumentKeydown);
  document.removeEventListener('click', onOverlayClick);
}

// Функция закрывает сообщение при ошибке отправки данных
const showErrorMessage = () => {
  const clonedError = errorTemplate.content.cloneNode(true);
  document.body.appendChild(clonedError);
  const errorButton = document.querySelector('.error__button');
  errorButton.addEventListener('click', onMessageClose);
  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onOverlayClick);
};

// Функция закрывает сообщение при успешной отправке данных
const showSuccessMessage = () => {
  const clonedSuccess = successTemplate.content.cloneNode(true);
  document.body.appendChild(clonedSuccess);
  const successButton = document.querySelector('.success__button');
  successButton.addEventListener('click', onMessageClose);
  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onOverlayClick);
};


export { checkMessageOnDisplay, showErrorMessage, showSuccessMessage };
