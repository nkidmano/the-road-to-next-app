import { ThemeProvider as BaseThemeProvider } from "next-themes";
import React from "react";

type ThemeProviderProps = Readonly<{
  children: React.ReactNode;
}>;

export function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <BaseThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </BaseThemeProvider>
  );
}
