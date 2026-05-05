import { useEffect, useState } from "react";
import NotificationCard from "../components/NotificationCard";
import { logger } from "../utils/logger";
import { Container, Select, MenuItem, Typography } from "@mui/material";

export default function AllNotifications() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("All");
  const [error, setError] = useState(null);

 useEffect(() => {
  fetch("http://20.207.122.201/evaluation-service/notifications")
    .then((res) => res.json())
    .then((res) => {
      logger.info("API Success", { count: res.notifications.length });

      const withState = res.notifications.map((n) => ({
        ...n,
        isRead: false
      }));

      setData(withState);
    })
    .catch((err) => {
      logger.error("API Failed, using fallback data", { error: err });

      const fallback = [
        { ID: "1", Type: "Placement", Message: "Fallback hiring", Timestamp: "2026-04-22 17:51:18", isRead: false },
        { ID: "2", Type: "Result", Message: "Fallback result", Timestamp: "2026-04-22 17:51:30", isRead: false },
        { ID: "3", Type: "Event", Message: "Fallback event", Timestamp: "2026-04-22 17:51:06", isRead: false }
      ];

      setData(fallback);
    });
}, []);
  const toggleRead = (id) => {
    setData((prev) =>
      prev.map((n) =>
        n.ID === id ? { ...n, isRead: !n.isRead } : n
      )
    );
  };

  const filtered =
    filter === "All" ? data : data.filter((n) => n.Type === filter);

  return (
    <Container>
      <Typography variant="h4">All Notifications</Typography>

      <Select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        sx={{ my: 2 }}
      >
        <MenuItem value="All">All</MenuItem>
        <MenuItem value="Placement">Placement</MenuItem>
        <MenuItem value="Result">Result</MenuItem>
        <MenuItem value="Event">Event</MenuItem>
      </Select>

      {error && <Typography color="error">{error}</Typography>}

      {filtered.map((n) => (
        <NotificationCard key={n.ID} data={n} onToggleRead={toggleRead} />
      ))}
    </Container>
  );
}