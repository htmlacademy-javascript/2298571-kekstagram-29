const URL = 'https://29.javascript.pages.academy/kekstagram';
const path = {
  GET: '/',
  SEND: '/data'
};

const errorText = {
  GET: 'Не удалось получить данные',
  POST: 'Не удалось отправить данные'
};

const Method = {
  POST: 'POST'
};

const loadData = async (path, errorText, Method, body = null) => {
  try {
    const response = await fetch(`${URL}${path}`, { Method, body });
    if (!response.ok) {
      throw new Error(errorText);
    }
    return response.json();
  } catch (error) {
    throw new Error(errorText);
  }
};

const getData = () => loadData(path.GET, errorText.GET);
const sendData = (body) => loadData(path.SEND, errorText.POST, Method.POST);

export {getData, sendData};
