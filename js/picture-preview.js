import {createPosts} from './create-posts.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesData = createPosts();

const pictureListFragment = document.createDocumentFragment();


picturesData.forEach(({url, description, likes, comments}) => {
  const pictureItem = pictureTemplate.cloneNode(true);
  pictureItem.querySelector('.picture__img').src = url;
  pictureItem.querySelector('.picture__img').alt = description;
  pictureItem.querySelector('.picture__likes').textContent = likes;
  pictureItem.querySelector('.picture__comments').textContent = comments.length;

  pictureListFragment.appendChild(pictureItem);
});

export {pictureListFragment};
