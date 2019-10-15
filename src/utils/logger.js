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


const { createLogger, format, transports } = require('winston');


const accessFormatter = format.printf(({
  level, message, label, timestamp,
}) => `[ ${timestamp} ] [ ${level.toUpperCase()} ] ${label} : ${message}`);

const accessLogger = createLogger({
  level: 'info',
  format: format.combine(
    format.label({ label: 'access' }),
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    accessFormatter,
  ),
  transports: [
    new transports.File({ filename: 'combined.log' }),
  ],
});

module.exports = {
  accessLogger,
};
