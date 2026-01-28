
'use client'

import { useState } from 'react'
import { Box, Button, Typography } from '@mui/material'
import { nanoid } from 'nanoid'
import { UIField } from '@/core/schema/uiTypes'

export function SchemaBuilder() {
  const [fields, setFields] = useState<UIField[]>([])

  const addField = () => {
    setFields(prev => [
      ...prev,
      {
        id: nanoid(),
        name: '',
        type: 'string',
        required: true,
      },
    ])
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Schema Builder
      </Typography>

      <Button variant="contained" onClick={addField}>
        Adicionar campo
      </Button>

      {fields.map(field => (
        <pre key={field.id}>{JSON.stringify(field, null, 2)}</pre>
      ))}
    </Box>
  )
}
