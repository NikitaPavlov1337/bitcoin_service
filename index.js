import express from 'express';
import config from './config/config.js';
import logger from './logger/index.js';
import fetchData from './api/fetchData.js';
import { onSuccess, lastDateChecker } from './api/helpFunctions.js';
import DB from './db/db.js';
import router from './router/index.js';

// Entry point приложения. Здесь описана вся логика.

const app = express();
app.use(express.json());
app.use('/api', router);

async function startApp() {
  try {
    let aliveConnection;
    await DB.dbConnecting().then((res) => {
      logger.info('successfully connected to the database');
      aliveConnection = true;
      app.listen(config.get('server.port'), () => {
        logger.info('api server up...');
      });
    });
    if (aliveConnection) {
      let statusData = await lastDateChecker();
      return statusData
        ? await fetchData.getResponse().then((res) => {
            onSuccess(res);
          })
        : logger.info('no need to fetch new data....api working for demand');
    }
  } catch (error) {
    logger.error('Error has happen...');
  }
}
startApp();
