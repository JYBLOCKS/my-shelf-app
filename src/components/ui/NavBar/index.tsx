import { ModeTheme } from '@/components/ui';
import {
  AutoStories,
  Cancel,
  Favorite,
  List,
  MenuSharp,
  Person,
  PowerSettingsNew,
  Search,
  Star,
} from '@mui/icons-material';
import {
  AppBar,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  TextField,
  Toolbar,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useState, type MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router';

function NavBar({
  searchTerm,
  setSearchTerm,
}: {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}) {
  const path = window.location.pathname;
  const navigate = useNavigate();
  const { t } = useTranslation();
  const md = useMediaQuery((theme) => theme.breakpoints.down('md'));
  const isLoggedIn = true;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleGoTo = (page: string) => {
    // Navigate to profile
    navigate(`/${page}`);
    handleClose();
  };

  const Logout = () => {
    // Handle logout
    localStorage.clear();
    navigate('/login');
    handleClose();
  };

  const MenuButtons = () => {
    return (
      <>
        <IconButton
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          <MenuSharp />
        </IconButton>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          slotProps={{
            list: {
              'aria-labelledby': 'basic-button',
            },
          }}
        >
          <MenuItem
            onClick={() => handleGoTo('profile')}
            selected={path.includes('profile')}
          >
            <Button>
              <Stack direction="row" gap={1}>
                <Person />
                {t('navBar.profile')}
              </Stack>
            </Button>
          </MenuItem>

          <MenuItem
            onClick={() => handleGoTo('wishlist')}
            selected={path.includes('wishlist')}
          >
            <Button>
              <Stack direction="row" gap={1}>
                <List />
                {t('navBar.wishlist')}
              </Stack>
            </Button>
          </MenuItem>
          <MenuItem
            onClick={() => handleGoTo('favorites')}
            selected={path.includes('favorites')}
          >
            <Button>
              <Stack direction="row" gap={1}>
                <Favorite />
                {t('navBar.favorites')}
              </Stack>
            </Button>
          </MenuItem>
          <MenuItem
            onClick={() => handleGoTo('ranks')}
            selected={path.includes('ranks')}
          >
            <Button>
              <Stack direction="row" gap={1}>
                <Star />
                {t('navBar.myRanks')}
              </Stack>
            </Button>
          </MenuItem>
          <MenuItem>
            <ModeTheme />
          </MenuItem>
          <MenuItem onClick={() => Logout()}>
            <Button>
              <Stack direction="row" gap={1}>
                <PowerSettingsNew />
                {t('navBar.logout')}
              </Stack>
            </Button>
          </MenuItem>
        </Menu>
      </>
    );
  };
  return (
    <AppBar position="sticky" color="inherit" sx={{ py: 1 }}>
      <Toolbar
        component={Stack}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        spacing={2}
      >
        <Typography
          component={Link}
          to="/"
          variant="h6"
          sx={{ textDecoration: 'none', color: 'inherit' }}
        >
          <Stack direction="row" alignItems="center" gap={1}>
            <AutoStories />
            {t('navBar.title')}
          </Stack>
        </Typography>
        <Stack width={md ? '80%' : '40%'}>
          <TextField
            placeholder="Search books..."
            variant="outlined"
            type="text"
            fullWidth
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <IconButton>
                    <Search />
                  </IconButton>
                ),
                endAdornment: searchTerm && (
                  <IconButton onClick={() => setSearchTerm('')}>
                    <Cancel />
                  </IconButton>
                ),
                sx: { borderRadius: '50px', paddingLeft: '10px' },
              },
            }}
          />
        </Stack>
        <Stack direction="row" spacing={2} alignItems="center">
          {isLoggedIn ? (
            MenuButtons()
          ) : (
            <Button component={Link} to="/login" color="inherit">
              {t('navBar.login')}
            </Button>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
