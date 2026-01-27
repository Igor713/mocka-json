'use client'

import { Container, Stack, Typography } from '@mui/material'
import { ThemeToggle } from '@/components/ThemeToggle'

export default function Home() {
  return (
    <Container sx={{ mt: 4 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h4">JSON Mock Generator</Typography>
        <ThemeToggle />
      </Stack>
    </Container>
  )
}
