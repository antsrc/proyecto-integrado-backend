import { createLogger, format, transports } from 'winston';

export const errorLogger = createLogger({
  level: 'error',
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }),
    format((info) => {
      delete (info as any).level;
      return info;
    })(),
    format.printf((info) => JSON.stringify(info)),
  ),
  transports: [
    new transports.File({ filename: 'logs/error.log' }),
  ],
});
