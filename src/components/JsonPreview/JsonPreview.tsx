import { Paper, Typography } from "@mui/material";

export function JsonPreview() {
  return (
    <Paper sx={{ p: 2, height: '100%', overflow: 'auto' }}>
      <Typography variant="h6">
        Json preview
      </Typography>

      <pre>
        {'{}'}
      </pre>
    </Paper>
  )
}