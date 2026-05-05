export const logger = {
  info: (message, meta = {}) => {
    const log = {
      timestamp: new Date().toISOString(),
      level: "INFO",
      message,
      ...meta
    };
    console.info(JSON.stringify(log));
  },
  error: (message, meta = {}) => {
    console.error(JSON.stringify({
      timestamp: new Date().toISOString(),
      level: "ERROR",
      message,
      ...meta
    }));
  }
};