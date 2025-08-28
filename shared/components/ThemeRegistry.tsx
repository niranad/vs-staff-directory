'use client'

import { CacheProvider, ThemeProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import responsiveTheme from "@/shared/lib/mui-theme";
import { CssBaseline } from "@mui/material";

const muiCache = createCache({ key: 'mui', prepend: true });

export const ThemeRegistry = ({ children }: { children: React.ReactNode }) => {
  return (
    <CacheProvider value={muiCache}>
      <ThemeProvider theme={responsiveTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
}