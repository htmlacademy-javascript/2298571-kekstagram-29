import './popup.js';
import './form-main.js';
import './slider.js';
import './scale.js';
import './api.js';
import './filters.js';

import {getData, sendData} from './api.js';
import {createThumbnails} from './picture-preview.js';
import {sendForm, closeForm} from './form-main.js';
import {showAlert} from './alert.js';
import {showErrorMessage, showSuccessMessage} from './messages.js';
import {addFilters} from './filters.js';
import {debounce} from './util.js';

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
  const debouncedThumbnails = debounce(createThumbnails);
  addFilters(data, debouncedThumbnails);
} catch (err) {
  showAlert('Произошла ошибка при получении данных с сервера');
}
