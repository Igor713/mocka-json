'use client'

import { Container, Stack, Typography, Button, Paper, Grid } from '@mui/material'
import { ThemeToggle } from '@/components/ThemeToggle/ThemeToggle'
import { userSchema } from '@/core/schema/example'
import { generateJson } from '@/core/generator/generateJson'
import { useState } from 'react'
import { SchemaBuilder } from '@/components/SchemaBuilder/SchemaBuilder'
import { JsonPreview } from '@/components/JsonPreview/JsonPreview'

export default function Home() {
  const [json, setJson] = useState<any>(null)

  const handleGenerate = () => {
    const result = generateJson(userSchema)
    setJson(result)
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Stack spacing={3}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h4">JSON Mock Generator</Typography>
          <ThemeToggle />
        </Stack>

        <Grid container spacing={2} sx={{ height: '100vh', p: 2 }}>
          <Grid size={6}>
            <SchemaBuilder />
          </Grid>

          <Grid size={6}>
            <JsonPreview />
          </Grid>
        </Grid>
      </Stack>
    </Container>
  )
}
