import {createPosts} from './create-posts.js';
import {openPopup} from './popup.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesData = createPosts();

const pictureListFragment = document.createDocumentFragment();


picturesData.forEach((picture) => {
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

export {pictureListFragment};
