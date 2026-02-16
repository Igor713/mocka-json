'use client'

import { UIField } from "@/core/schema/uiTypes";
import { Delete, ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  MenuItem,
  Select,
  TextField,
  Typography,
  Chip,
  Tooltip,
  Divider
} from "@mui/material";
import { FieldOptions } from "./FIeldOptions";

interface Props {
  field: UIField
  onChange: (field: UIField) => void
  onRemove: () => void
}

export function FieldRow({ field, onChange, onRemove }: Props) {
  return (
    <>
      <Accordion
        defaultExpanded
        sx={{
          position: 'relative',
          mt: 2,
          border: 'none',
          '&::before': {
            content: '""',
            display: 'none'
          },
          borderRadius: '4px',
          '&.MuiCollapse-root': {
            visibility: 'visible',
          },
        }}
      >
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
                variant="outlined" />
            </Box>
          </Box>
        </AccordionSummary>

        <Box
          sx={{
            position: 'absolute',
            top: 12,
            right: 50,
            zIndex: 1,
            display: 'inline-block'
          }}
        >
          <Tooltip title='Deletar'>
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
          </Tooltip>
        </Box>

        <AccordionDetails>
          <Grid container spacing={2} sx={{ width: '100%' }}>
            <Typography variant="subtitle2" mb={1}>
              Configurações do campo
            </Typography>

            <Grid container size={12} spacing={2} sx={{ width: '100%' }}>
              <Grid size={6}>
                <TextField
                  label="Nome"
                  size="small"
                  sx={{ width: '100%' }}
                  value={field.name}
                  onChange={(e) => onChange({ ...field, name: e.target.value })} />
              </Grid>

              <Grid size={6}>
                <Select
                  size="small"
                  sx={{ width: '100%' }}
                  value={field.type}
                  onChange={(e) => onChange({ ...field, type: e.target.value as any })}
                  MenuProps={{
                    disableScrollLock: true,
                  }}
                >
                  <MenuItem value="id">ID</MenuItem>
                  <MenuItem value="string">String</MenuItem>
                  <MenuItem value="number">Number</MenuItem>
                  <MenuItem value="boolean">Boolean</MenuItem>
                  <MenuItem value="date">Date</MenuItem>
                  <MenuItem value="array">Array</MenuItem>

                  <Divider />

                  <MenuItem value="name">name</MenuItem>
                  <MenuItem value="email">email</MenuItem>
                  <MenuItem value="phone">phone</MenuItem>
                  <MenuItem value="address">address</MenuItem>
                </Select>
              </Grid>

              <Grid size={6}>
                <FormControlLabel
                  control={<Checkbox
                    checked={field.required}
                    onChange={(e) => onChange({
                      ...field,
                      required: e.target.checked
                    })} />}
                  label="Campo obrigatório" />
              </Grid>

              <Grid size={6}>
                <FormControlLabel
                  control={<Checkbox
                    checked={field.nullable ?? false}
                    onChange={(e) => onChange({
                      ...field,
                      nullable: e.target.checked,
                    })} />}
                  label="Pode ser null" />
              </Grid>
            </Grid>

            <Grid size={6} sx={{ width: '100%' }}>
              <Typography variant="subtitle2" mb={1}>
                Opções avançadas
              </Typography>

              <Box>
                <FieldOptions field={field} onChange={onChange} />
              </Box>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </>
  )
}
