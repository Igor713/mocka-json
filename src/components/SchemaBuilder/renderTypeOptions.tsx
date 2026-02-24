import { UIField } from "@/core/schema/uiTypes"
import { Box, TextField, Select, MenuItem, Typography, Button, Checkbox, FormControlLabel } from "@mui/material"
import { FieldRow } from "./FieldRow"
import { nanoid } from 'nanoid'


export function renderTypeOptions(
  field: UIField,
  onChange: (field: UIField) => void
) {
  switch (field.type) {
    case "id":
      return (
        <Box>
          <Select
            size="small"
            value={field.idFormat ?? "number"}
            onChange={(e) =>
              onChange({
                ...field,
                idFormat: e.target.value as "number" | "uuid" | "alphanumeric",
              })
            }
            sx={{ width: '100%' }}
          >
            <MenuItem value="number">Número</MenuItem>
            <MenuItem value="uuid">UUID</MenuItem>
            <MenuItem value="alphanumeric">Alfanumérico</MenuItem>
          </Select>
        </Box>
      );

    case 'string':
      return (
        <Box
          display={'flex'}
          gap={2}
        >
          <TextField
            label='Tamanho min'
            type="number"
            size="small"
            value={field.minLength ?? ''}
            onChange={(e) =>
              onChange({ ...field, minLength: Number(e.target.value) })
            }
          />

          <TextField
            label='Tamanho max'
            type="number"
            size="small"
            value={field.maxLength ?? ''}
            onChange={(e) =>
              onChange({ ...field, maxLength: Number(e.target.value) })
            }
          />
        </Box>
      )

    case 'number':
      return (
        <Box
          display={'flex'}
          gap={2}

        >
          <TextField
            label='Min'
            type="number"
            size="small"
            value={field.min ?? ''}
            onChange={(e) =>
              onChange({ ...field, min: Number(e.target.value) })
            }
          />

          <TextField
            label='Max'
            type="number"
            size="small"
            value={field.max ?? ''}
            onChange={(e) =>
              onChange({ ...field, max: Number(e.target.value) })
            }
          />
        </Box>
      )

    case 'date':
      return (
        <Box>
          <Select
            size="small"
            value={field.format ?? 'iso'}
            onChange={(e) =>
              onChange({
                ...field,
                format: e.target.value as 'iso' | 'timestamp',
              })
            }
          >
            <MenuItem value="iso">ISO</MenuItem>
            <MenuItem value="timestamp">Timestamp</MenuItem>
          </Select>
        </Box>
      )

    case 'array':
      return (
        <Box >
          <TextField
            label="Length"
            type="number"
            size="small"
            value={field.length ?? 1}
            onChange={(e) =>
              onChange({
                ...field,
                length: Number(e.target.value),
              })
            }
          />

          <Box mt={2}>
            <Typography variant="subtitle2">
              Item do array
            </Typography>

            {field.item ? (
              <FieldRow
                field={field.item}
                onChange={(item) =>
                  onChange({ ...field, item })
                }
                onRemove={() =>
                  onChange({ ...field, item: undefined })
                }
              />
            ) : (
              <Button
                size="small"
                onClick={() =>
                  onChange({
                    ...field,
                    item: {
                      id: nanoid(),
                      name: 'item',
                      type: 'string',
                      required: true,
                    },
                  })
                }
              >
                Definir item
              </Button>
            )}
          </Box>
        </Box>
      )

    default:
      return null
  }
}
