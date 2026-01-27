'use client'

import { Button, Container, Typography } from '@mui/material'

export default function Home() {
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        JSON Mock Generator
      </Typography>

      <Button variant="contained">
        It works 🚀
      </Button>
    </Container>
  )
}
