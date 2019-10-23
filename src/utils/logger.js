// // const path = require('path');
// // const { format, Container, transports } = require('winston');
// // require('winston-daily-rotate-file');
// // const { NODE_ENV } = require('../config');

// // const logPath = path.resolve(__dirname, '../../logs');
// // const logModules = {};

// // const container = new Container();

// // const logFormatter = format.printf(
// //   ({
// //     message, level, service, timestamp,
// //   }) => `[ ${timestamp} ] [ ${level} ] ${service} -  : ${message}`,
// // );

// // const logTransports = [
// //   new transports.Console({ colorize: format.colorize() }),
// //   new transports.DailyRotateFile({
// //     filename: `${logPath}/info-%DATE%.log`,
// //     datePattern: 'YYYY-MM-DD',
// //   }),
// // ];

// // if (NODE_ENV !== 'development') {
// //   logTransports.shift();
// // }

// // const exceptionHandlers = [
// //   new transports.DailyRotateFile({
// //     filename: `${logPath}/exceptions-%DATE%.log`,
// //     datePattern: 'YYYY-MM-DD',
// //   }),
// // ];

// // const getFormatter = () => format.combine(
// //   format.timestamp({
// //     format: 'YYYY-MM-DD HH:mm:ss',
// //   }),
// //   logFormatter,
// // );

// // const createCategory = (category) => {
// //   container.add(category, {
// //     level: 'info',
// //     format: getFormatter(),
// //     defaultMeta: { service: category },
// //     transports: logTransports,
// //     exceptionHandlers,
// //   });
// //   logModules[category] = true;
// // };

// // const getLogger = (category) => {
// //   if (!logModules[category]) {
// //     createCategory(category);
// //   }
// //   return container.get(category);
// // };

// // module.exports = getLogger;

const path = require('path');
const Winston = require('winston');
require('winston-daily-rotate-file');
// const { NODE_ENV } = require('../config');


const { createLogger, format, transports } = Winston;
const LEVEL = Symbol.for('level');
const logPath = path.resolve(__dirname, '../../logs');

const logFormatter = format.printf(
  ({
    level, message, timestamp, stack,
  }) => `[ ${timestamp} ] [ ${level.toUpperCase()} ] : ${stack || message} `,
);
function filterOnly(level) {
  return format((info) => {
    if (info[LEVEL] === level) {
      return info;
    }
    return false;
  })();
}

const logger = createLogger({
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss:SSS',
    }),
    logFormatter,
  ),
  transports: [
    new transports.DailyRotateFile({
      filename: `${logPath}/access-%DATE%.log`,
      datePattern: 'YYYY-MM-DD',
      level: 'http',
      format: filterOnly('http'),
    }),
    new transports.DailyRotateFile({
      filename: `${logPath}/application-%DATE%.log`,
      datePattern: 'YYYY-MM-DD',
      level: 'info',
      format: filterOnly('info'),
    }),
    new transports.DailyRotateFile({
      filename: `${logPath}/error-%DATE%.log`,
      datePattern: 'YYYY-MM-DD',
      level: 'error',
    }),
  ],
  exceptionHandlers: [
    new transports.DailyRotateFile({
      filename: `${logPath}/exception-%DATE%.log`,
      datePattern: 'YYYY-MM-DD',
    }),
  ],
});


module.exports = {
  logger,
};
