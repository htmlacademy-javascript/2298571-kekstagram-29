import './popup.js';
import './form-main.js';
import './slider.js';
import './new-picture-scale.js';
import './api.js';
import {getData, sendData} from './api.js';
import {createThumbnails} from './picture-preview.js';
import {sendForm, closeForm} from './form-main.js';
import {showAlert} from './alert.js';
import {showErrorMessage, showSuccessMessage} from './messages.js';

const sendCallback = async(data) => {
  try{
    await sendData(data);
    closeForm();
    showSuccessMessage();
  } catch{
    showErrorMessage();
  }
};

sendForm(sendCallback);

try {
  const data = await getData();
  createThumbnails(data);
} catch (err) {
  showAlert('Произошла ошибка при получении данных с сервера');
}
