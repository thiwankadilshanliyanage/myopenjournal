import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Drawer,
  IconButton,
  Stack,
  Menu,
  MenuItem
} from '@mui/material';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import LanguageToggle from './LanguageToggle';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
  const { t } = useLanguage();
  const { user, isAdmin, logout } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const links = [
    { label: t('home'), to: '/' },
    { label: t('blogs'), to: '/blogs' },
    { label: t('privacy'), to: '/privacy' },
    { label: t('terms'), to: '/terms' },
    { label: t('contact'), to: '/contact' }
  ];

  const handleLogout = () => {
    logout();
    setAnchorEl(null);
    navigate('/');
  };

  return (
    <AppBar
      position="sticky"
      color="inherit"
      elevation={0}
      sx={{
        borderBottom: '1px solid',
        borderColor: 'divider',
        backdropFilter: 'blur(10px)'
      }}
    >
      <Toolbar sx={{ minHeight: 72 }}>
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{ textDecoration: 'none', color: 'text.primary', fontWeight: 700 }}
        >
          {t('brand')}
        </Typography>

        <Box sx={{ flexGrow: 1 }} />

        <Stack
          direction="row"
          spacing={1.5}
          sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}
        >
          {links.map((item) => (
            <Button key={item.to} component={RouterLink} to={item.to} color="inherit">
              {item.label}
            </Button>
          ))}
          <LanguageToggle />
          <ThemeToggle />

          {!user ? (
            <>
              <Button component={RouterLink} to="/login" color="inherit">
                {t('login')}
              </Button>
              <Button component={RouterLink} to="/register" variant="contained">
                {t('register')}
              </Button>
            </>
          ) : (
            <>
              <Button onClick={(e) => setAnchorEl(e.currentTarget)} color="inherit">
                {user.name}
              </Button>
              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
                <MenuItem component={RouterLink} to="/profile" onClick={() => setAnchorEl(null)}>
                  {t('profile')}
                </MenuItem>
                {isAdmin && (
                  <MenuItem component={RouterLink} to="/admin" onClick={() => setAnchorEl(null)}>
                    {t('dashboard')}
                  </MenuItem>
                )}
                <MenuItem onClick={handleLogout}>{t('logout')}</MenuItem>
              </Menu>
            </>
          )}
        </Stack>

        <IconButton
          sx={{ display: { xs: 'inline-flex', md: 'none' }, ml: 1 }}
          onClick={() => setDrawerOpen(true)}
        >
          <MenuRoundedIcon />
        </IconButton>

        <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
          <Box sx={{ width: 280, p: 3 }}>
            <Stack spacing={2}>
              {links.map((item) => (
                <Button
                  key={item.to}
                  component={RouterLink}
                  to={item.to}
                  color="inherit"
                  onClick={() => setDrawerOpen(false)}
                >
                  {item.label}
                </Button>
              ))}
              <LanguageToggle />
              <ThemeToggle />
              {!user ? (
                <>
                  <Button component={RouterLink} to="/login" onClick={() => setDrawerOpen(false)}>
                    {t('login')}
                  </Button>
                  <Button
                    variant="contained"
                    component={RouterLink}
                    to="/register"
                    onClick={() => setDrawerOpen(false)}
                  >
                    {t('register')}
                  </Button>
                </>
              ) : (
                <>
                  <Button component={RouterLink} to="/profile" onClick={() => setDrawerOpen(false)}>
                    {t('profile')}
                  </Button>
                  {isAdmin && (
                    <Button component={RouterLink} to="/admin" onClick={() => setDrawerOpen(false)}>
                      {t('dashboard')}
                    </Button>
                  )}
                  <Button onClick={handleLogout}>{t('logout')}</Button>
                </>
              )}
            </Stack>
          </Box>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
}
