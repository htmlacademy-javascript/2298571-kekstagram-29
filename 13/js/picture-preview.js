import {openPopup} from './popup.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturePreview = document.querySelector('.pictures');

const pictureListFragment = document.createDocumentFragment();

const createThumbnails = (pictures) => {

  const pictureElements = picturePreview.querySelectorAll('.picture');
  pictureElements.forEach((element) => element.remove());

  pictures.forEach((picture) => {
    const pictureItem = pictureTemplate.cloneNode(true);
    pictureItem.querySelector('.picture__img').src = picture.url;
    pictureItem.querySelector('.picture__img').alt = picture.description;
    pictureItem.querySelector('.picture__likes').textContent = picture.likes;
    pictureItem.querySelector('.picture__comments').textContent = picture.comments.length;
    pictureItem.addEventListener('click',() => {
      openPopup(picture);
    });
    pictureListFragment.appendChild(pictureItem);
  });
  picturePreview.append(pictureListFragment);
};

export {createThumbnails};
