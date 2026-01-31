'use client'

import { Paper, IconButton, Tooltip, Box } from '@mui/material'
import { ContentCopy, Download, Refresh } from '@mui/icons-material'

interface Props {
  data: any
  onCopy: () => void
  onDownload: () => void
  onRefresh: () => void
}

export function JsonPreview({ data, onCopy, onDownload, onRefresh }: Props) {
  return (
    <Paper
      sx={{
        p: 2,
        height: '100%',
        overflow: 'auto',
        position: 'relative',
        fontFamily: 'monospace',
        fontSize: 14,
      }}
    >
      <Box position="absolute" top={8} right={8}>
        <Tooltip title="Atualizar JSON">
          <IconButton onClick={onRefresh}>
            <Refresh />
          </IconButton>
        </Tooltip>

        <Tooltip title="Copiar JSON">
          <IconButton onClick={onCopy}>
            <ContentCopy />
          </IconButton>
        </Tooltip>

        <Tooltip title="Download .json">
          <IconButton onClick={onDownload}>
            <Download />
          </IconButton>
        </Tooltip>
      </Box>

      <pre>{JSON.stringify(data, null, 2)}</pre>
    </Paper>
  )
}
