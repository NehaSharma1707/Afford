const logger = require("./middleware/logger");

const weights = {
    Placement: 3,
    Result: 2,
    Event: 1
};

function getTopNotifications(notifications, k = 10) {
    logger.info("Calculating top notifications", { total: notifications.length });

    const sorted = notifications.sort((a, b) => {
        const weightDiff = weights[b.Type] - weights[a.Type];

        if (weightDiff !== 0) {
            return weightDiff;
        }

        return new Date(b.Timestamp) - new Date(a.Timestamp);
    });

    const result = sorted.slice(0, k);

    logger.info("Top notifications calculated", { count: result.length });

    return result;
}

const notifications = [
    { ID: "1", Type: "Result", Message: "mid-sem", Timestamp: "2026-04-22 17:51:30" },
    { ID: "2", Type: "Placement", Message: "CSX hiring", Timestamp: "2026-04-22 17:51:18" },
    { ID: "3", Type: "Event", Message: "farewell", Timestamp: "2026-04-22 17:51:06" },
    { ID: "4", Type: "Placement", Message: "AMD hiring", Timestamp: "2026-04-22 17:49:42" },
    { ID: "5", Type: "Result", Message: "project-review", Timestamp: "2026-04-22 17:50:42" }
];

const top10 = getTopNotifications(notifications);

logger.info("Top Notifications Output", { data: top10 });