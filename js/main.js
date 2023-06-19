const NAME = [
  'Гарик Харламов',
  'Джеймс Бонд',
  'Дин Винчестер',
  'Полумна Лавгуд',
  'Виктор Гюго',
  'Ким Кардашьян',
  'Владимир Жириновский',
  'Грета Тунберг',
  'Ким Чён Ын',
  'Иванка Трамп',
];

const DESCRIPTION = [
  'Это я был в отпуске, но уже дома.',
  'Это на даче, но уже дома.',
  'Это выходные с котом, но он уже дома. Я еще нет.',
  'Это я отдыхал, но уже дома. Дома не отдыхаю.',
  'Это я в ресторане, но уже дома. Снова проголодался.',
];

const MESSAGE = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const POST_NUMBER = 25;

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

function createRandomIdFromRangeGenerator (min, max) {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];


// Элементы поста

const getRandomPostId = createRandomIdFromRangeGenerator(1, 25);
const getRandomPictureURL = createRandomIdFromRangeGenerator(1, 25);
const getRandomPictureLikes = getRandomInteger(15, 200);
const getRandomCommentId = createRandomIdFromRangeGenerator(1, 1000);

// Массив объектов COMMENT

const createComment = () => ({
  id: getRandomCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: getRandomArrayElement(MESSAGE),
  name: getRandomArrayElement(NAME)
});

// Пост
const createPost = () => ({
  id: getRandomPostId(),
  url: `photos/{getRandomPictureURL()}.jpg`,
  description: getRandomArrayElement(DESCRIPTION),
  likes: getRandomPictureLikes,
  comments: Array.from({length: getRandomInteger (1, 30)}, createComment)
});

// Итоговый массив постов
const POSTS = Array.from({length: POST_NUMBER}, createPost);
