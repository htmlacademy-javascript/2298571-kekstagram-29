import { THUMBMAILS_RANDOM_NUMBER } from './settings.js';

const filterContainer = document.querySelector('.img-filters');
const Filters = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed'
};

let chosenFilter = Filters.DEFAULT;
let pictures = [];

// Функция получает случайные значения
const getRandomFilterNumber = () => Math.random() - 0.5;

// Функция сортирует картинки в зависимости от кол-ва комментариев
const createDiscussedFilter = (pictureA, pictureB) => pictureB.comments.length - pictureA.comments.length;

// Функция создает массив картинок в зависимости от выбранного фильтра
const getFilteredPicture = () => {
  switch (chosenFilter) {
    case Filters.RANDOM:
      return [...pictures].sort(getRandomFilterNumber).slice(0, THUMBMAILS_RANDOM_NUMBER);
    case Filters.DISCUSSED:
      return [...pictures].sort(createDiscussedFilter);
    default:
      return [...pictures];
  }
};

// Функция добавляет обработчик событий на кнопки фильтров
const handleFilterClick = (cb) => {
  filterContainer.addEventListener ('click', (evt) => {
    const clickedButton = evt.target;
    if (!evt.target.classList.contains('img-filters__button')) {
      return;
    } else if (clickedButton.id === chosenFilter){
      return;
    }
    filterContainer
      .querySelector('.img-filters__button--active')
      .classList.remove('img-filters__button--active');
    clickedButton.classList.add('img-filters__button--active');
    chosenFilter = clickedButton.id;
    cb(getFilteredPicture());
  });
};

// Функция инициализирует кнопки фильтров, создает копию массива для дальнейшей фильтрации
const addFilters = (data, cb) => {
  filterContainer.classList.remove('img-filters--inactive');
  pictures = [...data];
  handleFilterClick(cb);
};

export { addFilters };
