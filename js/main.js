import './popup.js';
import { createPosts } from './create-posts.js';

import {pictureListFragment} from './picture-preview.js';

const picturePreview = document.querySelector('.pictures');
picturePreview.append(pictureListFragment);


