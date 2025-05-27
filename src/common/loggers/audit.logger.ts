import { createLogger, format, transports } from 'winston';
export const auditLogger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format((info) => {
      if (info.message && typeof info.message === 'object') {
        info = { ...info.message, ...info, ...('timestamp' in info ? { timestamp: info.timestamp } : {}) };
        delete info.message;
      }
      delete (info as any).level;
      return info;
    })(),
    format.printf((info) => JSON.stringify(info)),
  ),
  transports: [new transports.File({ filename: 'logs/audit.log' })],
});
