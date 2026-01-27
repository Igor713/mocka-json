import { ThemeProvider as MuiThemeProvider, createTheme } from "@mui/material"
import { createContext, useContext, useEffect, useMemo, useState } from "react"

type ThemeMode = 'light' | 'dark'

interface ThemeContextProps {
  mode: ThemeMode,
  toggleMode: () => void
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>('dark')

  useEffect(() => {
    const savedMode = localStorage.getItem('theme-mode') as ThemeMode | null
    if (savedMode) {
      setMode(savedMode)
    }
  }, [])

  const toggleMode = () => {
    setMode((prev) => {
      const next = prev === 'light' ? 'dark' : 'light'
      localStorage.setItem('theme-mode', next)
      return next
    })
  }

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: mode === 'dark' ? '#90caf9' : '#1976d2',
          },
          background: {
            default: mode === 'dark' ? '#121212' : '#fafafa',
            paper: mode === 'dark' ? '#1e1e1e' : '#fff',
          },
        },
        shape: {
          borderRadius: 8,
        },
      }),
    [mode],
  )

  return (
    <ThemeContext.Provider value={{ mode, toggleMode }}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  )
}

export function useThemeMode() {
  const context = useContext(ThemeContext)

  if (!context) {
    throw new Error('useThemeMode must be used within ThemeProvider')
  }

  return context
}