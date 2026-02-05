
'use client'

import { Button, Grid, Typography } from '@mui/material'
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
    <Grid
      id='schema-builder'
      container
      mt={2}
    >
      <Grid size={6}>
        <Typography
          variant="h6"
        >
          Schema Builder
        </Typography>
      </Grid>

      <Grid size={6}>
        <Button
          variant='contained'
          onClick={addField}
        >
          Adicionar campo
        </Button>
      </Grid>

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
    </Grid>
  )
}

