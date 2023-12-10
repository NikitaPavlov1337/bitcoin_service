import BtcService from '../service/BtcService.js';
import logger from '../logger/index.js';

/** Вспомогательные функции, которые служат для выполнения различных задач
 * @param {Object} response
 * @param {Object} data
 * @param {String} UNIX_timestamp
 */

function onSuccess(response) {
  logger.info('successfully fetched the data');
  let data = response.data.data.history;
  data.forEach((element) => {
    element.date = element.timestamp;
    element.price = Number(element.price);
    element.date = timeConverter(element.date);
    delete element.timestamp;
  });
  let date = [];
  data.forEach((element) => {
    date.push(element.date);
  });
  if (new Set(data).size <= 1) {
    return assignData(data.slice(-1));
  }
  return assignData(data);
}

async function assignData(data) {
  await BtcService.createMany(data).then((res) => {
    logger.info('successfully writted data to db...');
  });
}

function timeConverter(UNIX_timestamp) {
  return new Date(UNIX_timestamp * 1000).toDateString();
}

async function lastDateChecker() {
  let lastDayinDB = await BtcService.getLastDate();
  if (lastDayinDB instanceof Date) {
    let dayMillisec = 86400000;
    let yesterday = new Date(Date.now()) - dayMillisec;

    let diffMillisec = yesterday - lastDayinDB.getTime();

    return diffMillisec > dayMillisec;
  }
  logger.info('...do not need to fetch data...all data uptime');
  return true;
}

export { onSuccess, assignData, lastDateChecker };
