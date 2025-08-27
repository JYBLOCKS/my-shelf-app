import { DarkMode, LightMode } from '@mui/icons-material';
import { Button, useColorScheme } from '@mui/material';
import { Stack } from '@mui/system';

const ModeTheme = () => {
  const { mode, setMode } = useColorScheme();

  if (!mode) {
    return null;
  }

  return (
    <form>
      {mode === 'light' ? (
        <Button type="submit" onClick={() => setMode('dark')}>
          <Stack direction="row" gap={1}>
            <DarkMode /> Dark Mode
          </Stack>
        </Button>
      ) : (
        <Button type="submit" onClick={() => setMode('light')}>
          <Stack direction="row" gap={1}>
            <LightMode /> Light Mode
          </Stack>
        </Button>
      )}
    </form>
  );
};

export default ModeTheme;
