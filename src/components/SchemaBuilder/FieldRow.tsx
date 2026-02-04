'use client'

import { UIField } from "@/core/schema/uiTypes";
import { Delete, ExpandMore } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Box, Checkbox, FormControlLabel, IconButton, MenuItem, Select, TextField, Typography } from "@mui/material";
import { FieldOptions } from "./FIeldOptions";

interface Props {
  field: UIField,
  onChange: (field: UIField) => void,
  onRemove: () => void
}

export function FieldRow({ field, onChange, onRemove }: Props) {
  return (
    <Accordion defaultExpanded>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <Typography component="span">{field.name}</Typography>
      </AccordionSummary>
      <AccordionDetails>

        <Box display={'flex'} gap={2} alignItems={'center'} mb={2}>
          <Box display={'flex'} flexDirection={'column'}>
            <TextField
              label="Nome"
              size="small"
              value={field.name}
              onChange={(e) => onChange({ ...field, name: e.target.value })} />

            <Select
              size="small"
              value={field.type}
              onChange={(e) => onChange({ ...field, type: e.target.value as any })}
            >
              <MenuItem value="id">id</MenuItem>
              <MenuItem value="string">string</MenuItem>
              <MenuItem value="number">number</MenuItem>
              <MenuItem value="boolean">boolean</MenuItem>
              <MenuItem value="date">date</MenuItem>
              <MenuItem value="array">array</MenuItem>
            </Select>

            <FormControlLabel
              control={<Checkbox
                checked={field.required}
                onChange={(e) => onChange({ ...field, required: e.target.checked })} />}
              label="Required" />

            <IconButton color="error" onClick={onRemove}>
              <Delete />
            </IconButton>
          </Box>

          <FieldOptions field={field} onChange={onChange} />
        </Box>
      </AccordionDetails>
    </Accordion>
  )
}