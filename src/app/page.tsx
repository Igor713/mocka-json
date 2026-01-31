'use client'

import { Container, Stack, Typography, Button, Paper, Grid, Snackbar, TextField } from '@mui/material'
import { ThemeToggle } from '@/components/ThemeToggle/ThemeToggle'
import { generateJson } from '@/core/generator/generateJson'
import { useEffect, useMemo, useState } from 'react'
import { SchemaBuilder } from '@/components/SchemaBuilder/SchemaBuilder'
import { JsonPreview } from '@/components/JsonPreview/JsonPreview'
import { UIField } from '@/core/schema/uiTypes'
import { convertUIToSchema } from '@/core/schema/convert'

export default function Home() {
  const [fields, setFields] = useState<UIField[]>([])
  const [json, setJson] = useState<any>(null)
  const [count, setCount] = useState(1)
  const [open, setOpen] = useState(false)

  const schema = useMemo(
    () => convertUIToSchema(fields),
    [fields],
  )

  useEffect(() => {
    setJson(generateJson(schema))
  }, [schema])

  const generate = () => {
    if (count === 1) {
      setJson(generateJson(schema))
    } else {
      setJson(
        Array.from({ length: count }, () => generateJson(schema))
      )
    }
  }

  useEffect(() => {
    generate()
  }, [schema, count])


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

  const handleRefresh = () => {
    generate()
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
            <TextField
              label="Quantidade"
              type="number"
              size="small"
              value={count}
              slotProps={{
                htmlInput: {
                  minLength: 1,
                  maxLength: 20,
                },
              }}
              onChange={(e) => setCount(Number(e.target.value) || 1)}
            />

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
              onRefresh={handleRefresh}
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
