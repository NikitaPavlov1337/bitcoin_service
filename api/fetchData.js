import axios from 'axios';
import config from '../config/config.js';

/** Инициализируется класс для колла во внешний API источника данных по ценнам биткоина
 * @param {Object} options
 */
class FetchData {
  constructor(options) {
    this.options = options;
  }
  async getResponse() {
    return axios.request(this.options);
  }
}

const options = {
  method: 'GET',
  url: config.get('api.url'),
  params: {
    referenceCurrencyUuid: 'yhjMzLPhuIDl',
    timePeriod: '5y',
  },
  headers: {
    'X-RapidAPI-Key': config.get('api.key'),
    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com',
  },
};

export default new FetchData(options);
