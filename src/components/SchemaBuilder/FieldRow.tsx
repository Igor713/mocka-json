'use client'

import { UIField } from "@/core/schema/uiTypes";
import { CheckBox, Delete } from "@mui/icons-material";
import { Box, Checkbox, FormControlLabel, IconButton, MenuItem, Select, TextField } from "@mui/material";
import { FieldOptions } from "./FIeldOptions";

interface Props {
  field: UIField,
  onChange: (field: UIField) => void,
  onRemove: () => void
}

export function FieldRow({ field, onChange, onRemove }: Props) {
  return (
    <Box display={'flex'} gap={2} alignItems={'center'} mb={2}>
      <TextField
        label="Nome"
        size="small"
        value={field.name}
        onChange={(e) =>
          onChange({ ...field, name: e.target.value })
        }
      />

      <Select
        size="small"
        value={field.type}
        onChange={(e) =>
          onChange({ ...field, type: e.target.value as any })
        }
      >
        <MenuItem value="string">string</MenuItem>
        <MenuItem value="number">number</MenuItem>
        <MenuItem value="boolean">boolean</MenuItem>
        <MenuItem value="date">date</MenuItem>
        <MenuItem value="array">array</MenuItem>
      </Select>

      <FormControlLabel
        control={
          <Checkbox
            checked={field.required}
            onChange={(e) =>
              onChange({ ...field, required: e.target.checked })
            }
          />
        }
        label="Required"
      />

      <IconButton color="error" onClick={onRemove}>
        <Delete />
      </IconButton>

      <FieldOptions field={field} onChange={onChange} />
    </Box>
  )
}