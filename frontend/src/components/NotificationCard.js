import { Card, CardContent, Typography, Button, Chip } from "@mui/material";

export default function NotificationCard({ data, onToggleRead }) {
  return (
    <Card sx={{ mb: 2, backgroundColor: data.isRead ? "#f5f5f5" : "#fff" }}>
      <CardContent>
        <Typography variant="h6">{data.Type}</Typography>

        <Chip label={data.Type} color="primary" size="small" />

        <Typography sx={{ mt: 1 }}>{data.Message}</Typography>

        <Typography variant="caption">{data.Timestamp}</Typography>

        <Button
          sx={{ mt: 1 }}
          variant="contained"
          onClick={() => onToggleRead(data.ID)}
        >
          {data.isRead ? "Mark Unread" : "Mark Read"}
        </Button>
      </CardContent>
    </Card>
  );
}