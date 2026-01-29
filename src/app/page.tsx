'use client'

import { Container, Stack, Typography, Button, Paper, Grid, Snackbar } from '@mui/material'
import { ThemeToggle } from '@/components/ThemeToggle/ThemeToggle'
import { userSchema } from '@/core/schema/example'
import { generateJson } from '@/core/generator/generateJson'
import { useMemo, useState } from 'react'
import { SchemaBuilder } from '@/components/SchemaBuilder/SchemaBuilder'
import { JsonPreview } from '@/components/JsonPreview/JsonPreview'
import { UIField } from '@/core/schema/uiTypes'
import { convertUIToSchema } from '@/core/schema/convert'

export default function Home() {
  const [fields, setFields] = useState<UIField[]>([])

  const schema = useMemo(
    () => convertUIToSchema(fields),
    [fields],
  )

  const json = useMemo(
    () => generateJson(schema),
    [schema],
  )

  const [open, setOpen] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(
      JSON.stringify(json, null, 2),
    )
    setOpen(true)
  }

  const handleDownload = () => {
    const blob = new Blob(
      [JSON.stringify(json, null, 2)],
      { type: 'application/json' },
    )

    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'mock.json'
    a.click()
    URL.revokeObjectURL(url)
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
            <SchemaBuilder
              fields={fields}
              setFields={setFields}
            />
          </Grid>

          <Grid size={6}>
            <JsonPreview
              data={json}
              onCopy={handleCopy}
              onDownload={handleDownload}
            />

            <Snackbar
              open={open}
              autoHideDuration={2000}
              message="JSON copiado!"
              onClose={() => setOpen(false)}
            />
          </Grid>
        </Grid>
      </Stack>
    </Container>
  )
}
