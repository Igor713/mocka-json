import { useThemeMode } from "@/theme/ThemeContext";
import { DarkMode, LightMode } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";

function ThemeToggle() {
  const { mode, toggleMode } = useThemeMode()

  return (
    <Tooltip title={mode === 'dark' ? 'Modo claro' : 'Modo escuro'}>
      <IconButton onClick={toggleMode} color='inherit'>
        {mode === 'dark' ? <LightMode /> : <DarkMode />}
      </IconButton>
    </Tooltip>
  )
}

export { ThemeToggle }