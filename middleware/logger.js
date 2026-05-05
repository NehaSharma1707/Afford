function log(level, message, meta = {}) {
    const logEntry = {
        timestamp: new Date().toISOString(),
        level,
        message,
        ...meta
    };

    process.stdout.write(JSON.stringify(logEntry) + "\n");
}

module.exports = {
    info: (msg, meta) => log("INFO", msg, meta),
    error: (msg, meta) => log("ERROR", msg, meta),
    warn: (msg, meta) => log("WARN", msg, meta)
};