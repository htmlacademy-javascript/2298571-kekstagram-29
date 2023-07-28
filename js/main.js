import {getData, sendData} from './api.js';
import {createThumbnails} from './picture-preview.js';
import {sendForm, onFormClose} from './form-main.js';
import { showAlert, GET_DATA_ERROR_TEXT } from './settings.js';
import {showErrorMessage, showSuccessMessage} from './messages.js';
import {addFilters} from './filters.js';
import {debounce} from './util.js';

const sendCallback = async(data) => {
  try{
    await sendData(data);
    onFormClose();
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
  showAlert(GET_DATA_ERROR_TEXT);
}
