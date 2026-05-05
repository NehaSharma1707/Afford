import { useState } from "react";
import AllNotifications from "./pages/AllNotifications";
import PriorityNotifications from "./pages/PriorityNotifications";
import { Button, Container } from "@mui/material";

export default function App() {
  const [page, setPage] = useState("all");

  return (
    <Container>
      <h1>Notification System</h1>

      <Button onClick={() => setPage("all")}>All</Button>
      <Button onClick={() => setPage("priority")}>Priority</Button>

      {page === "all" ? <AllNotifications /> : <PriorityNotifications />}
    </Container>
  );
}