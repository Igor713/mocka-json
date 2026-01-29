
'use client'

import { Box, Button, Typography } from '@mui/material'
import { nanoid } from 'nanoid'
import { UIField } from '@/core/schema/uiTypes'
import { FieldRow } from './FieldRow'

interface Props {
  fields: UIField[]
  setFields: React.Dispatch<React.SetStateAction<UIField[]>>
}

export function SchemaBuilder({ fields, setFields }: Props) {
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
      <Typography variant="h6">Schema Builder</Typography>

      <Button onClick={addField}>
        Adicionar campo
      </Button>

      {fields.map(field => (
        <FieldRow
          key={field.id}
          field={field}
          onChange={(updated) =>
            setFields(prev =>
              prev.map(f =>
                f.id === field.id ? updated : f
              )
            )
          }
          onRemove={() =>
            setFields(prev =>
              prev.filter(f => f.id !== field.id)
            )
          }
        />
      ))}
    </Box>
  )
}

