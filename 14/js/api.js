import { URL, Path, ErrorText } from './settings.js';

const Method = {
  POST: 'POST'
};

// Функция обрабатывает загрузку и преобразует данные с сервера
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

const getData = () => loadData(Path.GET, ErrorText.GET);
const sendData = (body) => loadData(Path.SEND, ErrorText.POST, Method.POST, body);

export { getData, sendData };
