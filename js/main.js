import './popup.js';
import './form-main.js';
import './slider.js';
import './new-picture-scale.js';
import './api.js';

import {createPosts} from './create-posts.js';

import {pictureListFragment} from './picture-preview.js';

const picturePreview = document.querySelector('.pictures');
picturePreview.append(pictureListFragment);


