'use client'

import { UIField } from "@/core/schema/uiTypes";
import { Delete, ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  MenuItem,
  Select,
  TextField,
  Typography,
  Chip
} from "@mui/material";
import { FieldOptions } from "./FIeldOptions";

interface Props {
  field: UIField
  onChange: (field: UIField) => void
  onRemove: () => void
}

export function FieldRow({ field, onChange, onRemove }: Props) {
  return (
    <Accordion defaultExpanded sx={{ mt: 2 }}>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          width="100%"
          gap={2}
        >
          <Box display="flex" alignItems="center" gap={1}>
            <Typography fontWeight={600}>
              {field.name || 'Campo sem nome'}
            </Typography>

            <Chip
              size="small"
              label={field.type}
              variant="outlined"
            />
          </Box>

          <IconButton
            size="small"
            color="error"
            onClick={(e) => {
              e.stopPropagation()
              onRemove()
            }}
          >
            <Delete />
          </IconButton>
        </Box>
      </AccordionSummary>

      <AccordionDetails>
        <Grid container spacing={2}>
          <Typography variant="subtitle2" mb={1}>
            Configurações do campo
          </Typography>

          <Grid container size={12} spacing={2}>
            <Grid size={6}>
              <TextField
                label="Nome"
                size="small"
                sx={{ width: '100%' }}
                value={field.name}
                onChange={(e) =>
                  onChange({ ...field, name: e.target.value })
                }
              />
            </Grid>

            <Grid size={6}>
              <Select
                size="small"
                sx={{ width: '100%' }}
                value={field.type}
                onChange={(e) =>
                  onChange({ ...field, type: e.target.value as any })
                }
              >
                <MenuItem value="id">ID</MenuItem>
                <MenuItem value="string">String</MenuItem>
                <MenuItem value="number">Number</MenuItem>
                <MenuItem value="boolean">Boolean</MenuItem>
                <MenuItem value="date">Date</MenuItem>
                <MenuItem value="array">Array</MenuItem>
              </Select>
            </Grid>

            <Grid size={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={field.required}
                    onChange={(e) =>
                      onChange({
                        ...field,
                        required: e.target.checked
                      })
                    }
                  />
                }
                label="Campo obrigatório"
              />
            </Grid>

            <Grid size={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={field.nullable ?? false}
                    onChange={(e) =>
                      onChange({
                        ...field,
                        nullable: e.target.checked,
                      })
                    }
                  />
                }
                label="Pode ser null"
              />
            </Grid>
          </Grid>

          <Grid size={6}>
            <Typography variant="subtitle2" mb={1}>
              Opções avançadas
            </Typography>

            <Box minWidth={300}>
              <FieldOptions field={field} onChange={onChange} />
            </Box>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  )
}
