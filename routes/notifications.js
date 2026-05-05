const express = require("express");
const router = express.Router();
const logger = require("../middleware/logger");

router.post("/", (req, res) => {
    logger.info("Create Notification API called", { body: req.body });

    const notification = {
        id: Date.now().toString(),
        ...req.body,
        isRead: false,
        createdAt: new Date()
    };

    logger.info("Notification created", notification);

    res.status(201).json(notification);
});


router.get("/", (req, res) => {
    logger.info("Fetch Notifications API called", { query: req.query });

    const data = [
        {
            id: "1",
            title: "Placement",
            message: "You are shortlisted",
            isRead: false,
            createdAt: new Date()
        }
    ];

    logger.info("Notifications fetched", { count: data.length });

    res.json({ notifications: data });
});


router.patch("/:id/read", (req, res) => {
    logger.info("Mark as read", { id: req.params.id });

    res.json({ id: req.params.id, isRead: true });
});

router.delete("/:id", (req, res) => {
    logger.warn("Notification deleted", { id: req.params.id });

    res.json({ status: "deleted" });
});

module.exports = router;