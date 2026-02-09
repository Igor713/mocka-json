'use client'

import { UIField } from "@/core/schema/uiTypes"
import {
  Box,
  Checkbox,
  FormControlLabel,
  Slider,
  Typography,
  Stack,
  Paper,
  Grid
} from "@mui/material"
import { renderTypeOptions } from "./renderTypeOptions"

interface Props {
  field: UIField
  onChange: (field: UIField) => void
}

export function FieldOptions({ field, onChange }: Props) {
  return (
    <Grid container spacing={2} sx={{ width: '100%' }}>
      {!field.required && (
        <Grid size={6}>
          <Paper variant="outlined" sx={{ p: 2, height: '100%' }}>
            <Typography variant="subtitle2" gutterBottom>
              Regras do campo
            </Typography>

            <Stack spacing={1}>
              <Box>
                <Typography variant="caption">
                  Probabilidade (%)
                </Typography>

                <Slider
                  value={field.probability ?? 100}
                  onChange={(_, value) =>
                    onChange({
                      ...field,
                      probability: value as number,
                    })
                  }
                  min={0}
                  max={100}
                  valueLabelDisplay="auto"
                />
              </Box>
            </Stack>
          </Paper>
        </Grid>
      )}

      <Grid size={6}>
        <Paper variant="outlined" sx={{ p: 2, height: '100%' }}>
          <Typography variant="subtitle2" gutterBottom>
            Opções do tipo ({field.type})
          </Typography>

          {renderTypeOptions(field, onChange)}
        </Paper>
      </Grid>
    </Grid>
  )
}

