import { Home, NotFound } from '@/pages';
import { routes } from '@/routes';
import '@/styles/App.css';
import { darkTheme, lightTheme } from '@/styles/theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router';

const App = () => {
  const mode = localStorage.getItem('mui-mode') === 'dark' ? 'dark' : 'light';
  return (
    <ThemeProvider theme={mode === 'dark' ? darkTheme : lightTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path={routes.notFound} element={<NotFound />} />
          <Route path={routes.home} element={<Home />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
