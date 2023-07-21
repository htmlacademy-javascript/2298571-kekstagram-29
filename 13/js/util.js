// const getRandomInteger = (a, b) => {
//   const lower = Math.ceil(Math.min(a, b));
//   const upper = Math.floor(Math.max(a, b));
//   const result = Math.random() * (upper - lower + 1) + lower;
//   return Math.floor(result);
// };

// function createRandomIdFromRangeGenerator (min, max) {
//   const previousValues = [];

//   return function () {
//     let currentValue = getRandomInteger(min, max);
//     while (previousValues.includes(currentValue)) {
//       currentValue = getRandomInteger(min, max);
//     }
//     previousValues.push(currentValue);
//     return currentValue;
//   };
// }

// const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

function getRandomUniqueElements(array, amount) {
  const uniqueObjects = new Set();
  const result = [];

  while (uniqueObjects.size < amount) {
    const randomIndex = Math.floor(Math.random() * array.length);
    uniqueObjects.add(array[randomIndex]);
  }

  uniqueObjects.forEach((element) => result.push(element));
  return result;
}

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export { getRandomUniqueElements, debounce};
