import { COMMENT_PER_CLICK } from './settings.js';

const body = document.querySelector('body');
const popup = document.querySelector('.big-picture');
const bigPicture = popup.querySelector('.big-picture__img img');
const closeButton = popup.querySelector('.big-picture__cancel');
const pictureLikes = popup.querySelector('.likes-count');
const pictureCommentsNumber = popup.querySelector('.comments-count');
const pictureDescription = popup.querySelector('.social__caption');
const commentsList = popup.querySelector('.social__comments');
const pictureCommentsCounter = popup.querySelector('.social__comment-count');
const pictureCommentsLoader = popup.querySelector('.comments-loader');
let commentsShown = [];

// Функция закрывает попап при нажатии Escape
const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closePopup();
  }
};

//Функция сбрасывает данные счетчика и загрузчика
const resetPopupData = () => {
  commentsList.innerHTML = '';
  pictureCommentsLoader.classList.remove('hidden');
  pictureCommentsCounter.classList.remove('hidden');
};

// Функция создает комментарии
const createComment = (comments) => {
  comments.forEach((comment) => {
    const commentElement = document.createElement('li');
    const commentImage = document.createElement('img');
    const commentText = document.createElement('p');

    commentImage.src = comment.avatar;
    commentImage.alt = comment.name;
    commentText.textContent = comment.message;

    commentElement.classList.add('social__comment');
    commentImage.classList.add('social__picture');
    commentText.classList.add('social__text');

    commentElement.append(commentImage);
    commentElement.append(commentText);
    commentsList.append(commentElement);
  });
};

// Функция загружает дополнительные комментарии
const getLoadComments = () => {
  if (!commentsShown.length) {
    return;
  }
  const additionalComments = commentsShown.slice(commentsList.children.length, commentsList.children.length + COMMENT_PER_CLICK);
  createComment(additionalComments);
  pictureCommentsCounter.innerHTML =
   `${commentsList.children.length} из <span class="comments-count">${commentsShown.length}</span> комментариев`;

  if (commentsShown.length <= commentsList.children.length) {
    pictureCommentsLoader.classList.add('hidden');
  }
};

// Функция загружает первый блок комментариев
const fillComments = ({comments}) => {
  const showFirstComments = comments.slice(0, COMMENT_PER_CLICK);
  createComment(showFirstComments);
  pictureCommentsCounter.innerHTML = `${showFirstComments.length} из <span class="comments-count">${comments.length}</span> комментариев`;

  if (showFirstComments.length >= comments.length) {
    pictureCommentsCounter.classList.add('hidden');
    pictureCommentsLoader.classList.add('hidden');
  }
};

// Функция открывает попап
const openPopup = (picture) => {
  commentsList.innerHTML = '';
  popup.classList.remove('hidden');

  commentsShown = picture.comments;
  body.classList.add('modal-open');
  bigPicture.src = picture.url;
  pictureLikes.textContent = picture.likes;
  pictureDescription.textContent = picture.description;
  pictureCommentsNumber.textContent = picture.comments.length;

  fillComments(picture);
  pictureCommentsLoader.addEventListener('click', getLoadComments);
  closeButton.addEventListener('click', closePopup);
  document.addEventListener('keydown', onDocumentKeydown);
};


//Функция закрывает попап
function closePopup () {
  popup.classList.add('hidden');
  body.classList.remove('modal-open');
  pictureCommentsLoader.removeEventListener('click', getLoadComments);
  closeButton.removeEventListener('click', closePopup);
  document.removeEventListener('keydown', onDocumentKeydown);
  resetPopupData();
}

export { openPopup };
