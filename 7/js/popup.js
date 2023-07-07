const body = document.querySelector('body');
const popup = document.querySelector('.big-picture');
const bigPicture = popup.querySelector('.big-picture__img img');
const closeButton = popup.querySelector('.big-picture__cancel');
const pictureLikes = popup.querySelector('.likes-count');
const pictureCommentsNumber = popup.querySelector('.comments-count');
const pictureDescription = popup.querySelector('.social__caption');
const pictureCommentsCounter = popup.querySelector('.social__comment-count');
const pictureCommentsLoader = popup.querySelector('.comments-loader');
const commentsList = popup.querySelector('.social__comments');

const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closePopup();
  }
};

const createComment = (picture) => {
  picture.comments.forEach((comment) => {
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

const closePopup = () => {
  popup.classList.add('hidden');
  body.classList.remove('modal-open');
  closeButton.removeEventListener('click', closePopup);
  document.removeEventListener('keydown', onDocumentKeydown);
};

const openPopup = (picture) => {
  popup.classList.remove('hidden');
  body.classList.add('modal-open');
  bigPicture.src = picture.url;
  pictureLikes.textContent = picture.likes;
  pictureCommentsNumber.textContent = picture.comments.length;
  createComment(picture);
  pictureDescription.textContent = picture.description;
  closeButton.addEventListener('click', closePopup);
  pictureCommentsCounter.classList.add('hidden');
  pictureCommentsLoader.classList.add('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
};

export {openPopup};
