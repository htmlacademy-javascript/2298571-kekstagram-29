const THUMBMAILS_RANDOM_NUMBER = 10;
const FILTERS = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed'
};

const filterContainer = document.querySelector('.img-filters');

let chosenFilter = FILTERS.DEFAULT;
let pictures = [];

const createRandomFilter = () => Math.random() - 0.5;

const createDiscussedFilter = (pictureA, pictureB) => pictureB.comments.length - pictureA.comments.length;

const getFilteredPicture = () => {
  switch (chosenFilter) {
    case FILTERS.RANDOM:
      return [...pictures].sort(createRandomFilter).slice(0, THUMBMAILS_RANDOM_NUMBER);
    case FILTERS.DISCUSSED:
      return [...pictures].sort(createDiscussedFilter);
    default:
      return [...pictures];
  }
};

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

const addFilters = (data, cb) => {
  filterContainer.classList.remove('img-filters--inactive');
  pictures = [...data];
  handleFilterClick(cb);
};

export {addFilters};
