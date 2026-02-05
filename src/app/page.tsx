'use client'

import { Container, Stack, Typography, Button, Paper, Grid, Snackbar, TextField, InputAdornment, Tooltip } from '@mui/material'
import { ThemeToggle } from '@/components/ThemeToggle/ThemeToggle'
import { generateJson } from '@/core/generator/generateJson'
import { useEffect, useMemo, useState } from 'react'
import { SchemaBuilder } from '@/components/SchemaBuilder/SchemaBuilder'
import { JsonPreview } from '@/components/JsonPreview/JsonPreview'
import { UIField } from '@/core/schema/uiTypes'
import { convertUIToSchema } from '@/core/schema/convert'
import { createRandom } from '@/core/generator/random'
import { Refresh } from '@mui/icons-material'

export default function Home() {
  const [fields, setFields] = useState<UIField[]>([])
  const [json, setJson] = useState<any>(null)
  const [count, setCount] = useState(1)
  const [open, setOpen] = useState(false)

  const [seed, setSeed] = useState(() =>
    Math.floor(Math.random() * 1_000_000)
  )

  const random = useMemo(
    () => createRandom(seed),
    [seed],
  )

  const schema = useMemo(
    () => convertUIToSchema(fields),
    [fields],
  )

  useEffect(() => {
    setJson(generateJson(schema, random));
  }, [schema, random]);

  const generate = () => {
    if (count === 1) {
      setJson(generateJson(schema, random));
    } else {
      setJson(
        Array.from({ length: count }, () =>
          generateJson(schema, random)
        )
      );
    }
  };

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

        <Grid container spacing={2} sx={{ height: '100vh' }}>
          <Grid size={6}>
            <Grid container spacing={2}>
              <Grid size={6}>
                <TextField
                  label="Quantidade de JSONs"
                  type="number"
                  size="small"
                  sx={{ width: '100%' }}
                  value={count}
                  slotProps={{
                    htmlInput: {
                      minLength: 1,
                      maxLength: 20,
                    },
                  }}
                  onChange={(e) => setCount(Number(e.target.value) || 1)}
                />
              </Grid>

              <Grid size={6}>
                <TextField
                  label="Seed"
                  size="small"
                  value={seed}
                  sx={{ width: '100%' }}
                  onChange={(e) =>
                    setSeed(Number(e.target.value) || 0)
                  }
                  slotProps={{
                    input: {
                      endAdornment:
                        <InputAdornment
                          position='end'
                          onClick={() => setSeed(Math.floor(Math.random() * 1_000_000))}
                          sx={{ cursor: 'pointer' }}
                        >
                          <Tooltip title='Atualizar seed'>
                            <Refresh />
                          </Tooltip>
                        </InputAdornment>
                    }
                  }}
                />
              </Grid>
            </Grid>

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
