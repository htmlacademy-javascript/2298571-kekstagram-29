const URL = 'https://29.javascript.pages.academy/kekstagram';
const PATH = {
  GET: '/data',
  SEND: '/',
};

const ERROR_TEXT = {
  GET: 'Не удалось получить данные',
  POST: 'Не удалось отправить данные'
};

const Method = {
  POST: 'POST'
};

const loadData = async (path, errorText, method = Method.GET, body = null) => {
  try {
    const response = await fetch(`${URL}${path}`, { method, body });
    if (!response.ok) {
      throw new Error(errorText);
    }
    return response.json();
  } catch (error) {
    throw new Error(errorText);
  }
};

const getData = () => loadData(PATH.GET, ERROR_TEXT.GET);
const sendData = (body) => loadData(PATH.SEND, ERROR_TEXT.POST, Method.POST, body);

export {getData, sendData};
