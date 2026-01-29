'use client'

import { Paper, IconButton, Tooltip, Box } from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import DownloadIcon from '@mui/icons-material/Download'

interface Props {
  data: any
  onCopy: () => void
  onDownload: () => void
}

export function JsonPreview({ data, onCopy, onDownload }: Props) {
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
        <Tooltip title="Copiar JSON">
          <IconButton onClick={onCopy}>
            <ContentCopyIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Download .json">
          <IconButton onClick={onDownload}>
            <DownloadIcon />
          </IconButton>
        </Tooltip>
      </Box>

      <pre>{JSON.stringify(data, null, 2)}</pre>
    </Paper>
  )
}
