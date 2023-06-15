// Проверка длины строки

const checkLength = function(string, maxLength){
  return (string.length <= maxLength);
}

// Полиндром
const checkPalindrome = function(string) {
  const normalString = string.replaceAll(' ','').toLowerCase();
  let reversedString = '';
  for (i = 0; i < normalString.length; i++){
    reversedString += normalString[(normalString.length - 1) - i];
  }
  return (normalString === reversedString);
}

// Извлечение чисел
const getNumber = function (string){
  const normalString = string.toString();
  let result = '';
  for(let i = 0; i < normalString.length; i++){
    if (!Number.isNaN(parseInt(normalString[i], 10))){
      result += normalString[i];
    }
  }
  return parseInt(result, 10);
}
