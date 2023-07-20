const errorTemplate = document.querySelector('#error');
const successTemplate = document.querySelector('#success');

const checkMessageOnDisplay = () => document.querySelector('.error, .success');

const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape' || evt.key === 'Enter') {
    evt.preventDefault();
    closeMessage();
  }
};

function closeMessage () {
  const message = checkMessageOnDisplay();
  if (message) {
    message.remove();
  }
  document.removeEventListener('keydown', onDocumentKeydown);
}


const showErrorMessage = () => {
  const clonedError = errorTemplate.content.cloneNode(true);
  document.body.appendChild(clonedError);

  const errorButton = document.querySelector('.error__button');
  errorButton.addEventListener('click', closeMessage);
  document.addEventListener('keydown', onDocumentKeydown);
};

const showSuccessMessage = () => {
  const clonedSuccess = successTemplate.content.cloneNode(true);
  document.body.appendChild(clonedSuccess);

  const successButton = document.querySelector('.success__button');
  successButton.addEventListener('click', closeMessage);
  document.addEventListener('keydown', onDocumentKeydown);
};


export {showErrorMessage, showSuccessMessage};
