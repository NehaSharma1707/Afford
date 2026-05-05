const express = require("express");
const logger = require("./middleware/logger");

const app = express();
app.use(express.json());

/**
 * NOTE:
 * Authentication is NOT implemented.
 * Users are assumed pre-authorized.
 */

// Request logging middleware
app.use((req, res, next) => {
    logger.info("Incoming Request", {
        method: req.method,
        url: req.url
    });
    next();
});

// Routes
const notificationRoutes = require("./routes/notifications");
app.use("/api/v1/notifications", notificationRoutes);

// Start server
app.listen(3000, () => {
    logger.info("Server started", { port: 3000 });
});