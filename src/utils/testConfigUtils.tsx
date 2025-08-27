import { queries, render, type RenderOptions } from "@testing-library/react";
import type { ReactNode } from "react";
//styles
import i18n from "@/i18n";
import theme from "@/styles/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { I18nextProvider } from "react-i18next";
import { BrowserRouter } from "react-router";

const AllTheProviders = ({ children }: { children: ReactNode }) => {
  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          {/* Add any other necessary providers here */}
          {children}
        </BrowserRouter>
      </ThemeProvider>
    </I18nextProvider>
  );
};

const customRender = (
  ui: ReactNode,
  options?: Omit<RenderOptions, "queries">
) => render(ui, { queries, wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };
