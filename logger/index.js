import { createLogger, format, transports } from 'winston';

// Логгер для сохранения данных о работе приложения

const logger = createLogger({
  transports: new transports.File({
    filename: 'logger/server.log',
    format: format.combine(
      format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
      format.align(),
      format.printf(
        (info) => `${info.level}: ${info.timestamp}: ${info.message}: ${info}`
      )
    ),
  }),
});
export default logger;
