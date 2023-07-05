import {pictureListFragment} from './picture-preview.js';

const popup = document.querySelector('.big-picture');
const bigPicture = document.querySelector('.big-picture__img img');
const closeButton = document.querySelector('.big-picture__cancel');
const body = document.querySelector('body');
const pictureDataArray = document.querySelectorAll('.pictures');

pictureDataArray.forEach((picture) => {
  picture.addEventListener('click', () => {
    popup.classList.remove('hidden');
    body.classList.add('modal-open');
  });
});

closeButton.addEventListener('click', () => {
  popup.classList.add('hidden');
  body.classList.remove('modal-open');
});
