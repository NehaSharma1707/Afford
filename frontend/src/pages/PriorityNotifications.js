import { useEffect, useState } from "react";
import NotificationCard from "../components/NotificationCard";
import { logger } from "../utils/logger";
import { Container, Typography, TextField } from "@mui/material";

const weights = {
  Placement: 3,
  Result: 2,
  Event: 1
};

export default function PriorityNotifications() {
  const [data, setData] = useState([]);
  const [topN, setTopN] = useState(10);

  useEffect(() => {
  fetch("http://20.207.122.201/evaluation-service/notifications")
    .then((res) => res.json())
    .then((res) => {
      setData(res.notifications);
      logger.info("Priority API Loaded");
    })
    .catch(() => {
      logger.error("Priority API failed, using fallback");

      setData([
        { ID: "1", Type: "Placement", Message: "Fallback hiring", Timestamp: "2026-04-22 17:51:18" },
        { ID: "2", Type: "Result", Message: "Fallback result", Timestamp: "2026-04-22 17:51:30" }
      ]);
    });
}, []);

  const sorted = [...data].sort((a, b) => {
    const weightDiff = weights[b.Type] - weights[a.Type];
    if (weightDiff !== 0) return weightDiff;

    return new Date(b.Timestamp) - new Date(a.Timestamp);
  });

  const top = sorted.slice(0, topN);

  return (
    <Container>
      <Typography variant="h4">Priority Notifications</Typography>

      <TextField
        type="number"
        label="Top N"
        value={topN}
        onChange={(e) => setTopN(e.target.value)}
        sx={{ my: 2 }}
      />

      {top.map((n) => (
        <NotificationCard key={n.ID} data={n} onToggleRead={() => {}} />
      ))}
    </Container>
  );
}