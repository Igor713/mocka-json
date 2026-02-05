'use client'

import { UIField } from "@/core/schema/uiTypes"
import {
  Box,
  Checkbox,
  FormControlLabel,
  Slider,
  Typography,
  Stack,
  Paper
} from "@mui/material"
import { renderTypeOptions } from "./renderTypeOptions"

interface Props {
  field: UIField
  onChange: (field: UIField) => void
}

export function FieldOptions({ field, onChange }: Props) {
  return (
    <Stack spacing={2} ml={4} mt={1}>

      <Paper variant="outlined" sx={{ p: 2 }}>
        <Typography variant="subtitle2" gutterBottom>
          Regras do campo
        </Typography>

        <Stack spacing={1}>
          {!field.required && (
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
          )}

        </Stack>
      </Paper>

      <Paper variant="outlined" sx={{ p: 2 }}>
        <Typography variant="subtitle2" gutterBottom>
          Opções do tipo ({field.type})
        </Typography>

        {renderTypeOptions(field, onChange)}
      </Paper>

    </Stack>
  )
}
