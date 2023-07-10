const COMMENT_PER_CLICK = 5;

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
let commentsShowArray = [];

const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closePopup();
  }
};

function closePopup () {
  popup.classList.add('hidden');
  body.classList.remove('modal-open');
  closeButton.removeEventListener('click', closePopup);
  document.removeEventListener('keydown', onDocumentKeydown);
  pictureCommentsLoader.removeEventListener('click', getLoadComments);
}

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

const getLoadComments = () => {
  if (!commentsShowArray.length) {
    return;
  }
  const additionalComments = commentsShowArray.slice(commentsList.children.length, commentsList.children.length + COMMENT_PER_CLICK);
  // createComment(additionalComments);
  createComment({ comments: additionalComments });
  pictureCommentsCounter.textContent =
   `${commentsList.children.length} из ${commentsShowArray.length} комментариев`;

  if (commentsShowArray.length <= commentsList.children.length) {
    pictureCommentsLoader.classList.add('hidden');
  }
};

function fillComments({comments}) {
  const showFirstComments = comments.slice(0, COMMENT_PER_CLICK);

  createComment(showFirstComments);

  pictureCommentsCounter.textContent = `${showFirstComments.length} из ${comments.length} комментариев`;

  if (showFirstComments.length >= comments.length) {
    pictureCommentsCounter.classList.add('hidden');
    pictureCommentsLoader.classList.add('hidden');
  }
}

const openPopup = (picture) => {
  commentsList.innerHTML = '';
  popup.classList.remove('hidden');

  commentsShowArray = picture.comments;
  body.classList.add('modal-open');
  bigPicture.src = picture.url;
  pictureLikes.textContent = picture.likes;
  pictureDescription.textContent = picture.description;
  pictureCommentsNumber.textContent = picture.comments.length;

  pictureCommentsLoader.addEventListener('click', getLoadComments);

  fillComments();
  closeButton.addEventListener('click', closePopup);
  document.addEventListener('keydown', onDocumentKeydown);
};

export {openPopup};
