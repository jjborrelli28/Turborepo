import {
  ThemeProvider as NextThemesProvider,
  useTheme as useNextThemes,
} from "next-themes";
import { darkThemeClass } from "~next-contentful/config";
import { ReactNode } from "react";

export const useTheme = () => useNextThemes();

export const ThemeProvider = ({
  children,
  storageKey = "theme",
  defaultTheme = "light",
}: ThemeProviderProps) => {
  return (
    <NextThemesProvider
      attribute="class"
      storageKey={storageKey}
      defaultTheme={defaultTheme}
      enableSystem={false}
      value={{
        dark: darkThemeClass,
      }}
    >
      {children}
    </NextThemesProvider>
  );
};

export type ThemeProps = "light" | "dark" | undefined;

type ThemeProviderProps = {
  children: ReactNode;
  storageKey: string;
  defaultTheme?: ThemeProps;
};
