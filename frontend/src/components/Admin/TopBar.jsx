import React, { useState } from 'react';
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Box,
    Avatar,
    Menu,
    MenuItem,
    ListItemIcon,
    Breadcrumbs,
    Link,
    useMediaQuery,
    useTheme
} from '@mui/material';
import {
    Menu as MenuIcon,
    Logout as LogoutIcon,
    Person as PersonIcon,
    NavigateNext as NavigateNextIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { DRAWER_WIDTH } from './Sidebar';

const pathTitles = {
    '/admin/dashboard': 'Dashboard',
    '/admin/projects': 'Proyectos',
    '/admin/technologies': 'Tecnologías',
    '/admin/education': 'Educación',
    '/admin/profile': 'Perfil',
};

const TopBar = ({ handleDrawerToggle }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        logout();
        navigate('/admin/login');
        handleMenuClose();
    };

    const handleProfile = () => {
        navigate('/admin/profile');
        handleMenuClose();
    };

    const currentPath = location.pathname;
    const pageTitle = pathTitles[currentPath] || 'Admin';

    return (
        <AppBar
            position="fixed"
            sx={{
                width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
                ml: { md: `${DRAWER_WIDTH}px` },
                backgroundImage: 'none',
                backgroundColor: '#1a1a1a',
                borderBottom: '2px solid #2a2a2a',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
            }}
        >
            <Toolbar>
                {/* Mobile Menu Button */}
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ mr: 2, display: { md: 'none' } }}
                >
                    <MenuIcon />
                </IconButton>

                {/* Page Title & Breadcrumbs */}
                <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 700, mb: 0.5 }}>
                        {pageTitle}
                    </Typography>
                    <Breadcrumbs
                        separator={<NavigateNextIcon fontSize="small" />}
                        aria-label="breadcrumb"
                        sx={{
                            display: { xs: 'none', sm: 'flex' },
                            '& .MuiBreadcrumbs-separator': {
                                color: 'text.secondary',
                            },
                        }}
                    >
                        <Link
                            underline="hover"
                            color="text.secondary"
                            href="/admin/dashboard"
                            onClick={(e) => {
                                e.preventDefault();
                                navigate('/admin/dashboard');
                            }}
                            sx={{
                                fontSize: '0.85rem',
                                '&:hover': { color: '#ff0077' },
                            }}
                        >
                            Admin
                        </Link>
                        <Typography color="text.primary" sx={{ fontSize: '0.85rem', fontWeight: 600 }}>
                            {pageTitle}
                        </Typography>
                    </Breadcrumbs>
                </Box>

                {/* User Menu */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ display: { xs: 'none', sm: 'block' }, textAlign: 'right' }}>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {user?.usuario || 'Admin'}
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                            {user?.email || 'admin@portfolio.com'}
                        </Typography>
                    </Box>

                    <IconButton onClick={handleMenuOpen} sx={{ p: 0 }}>
                        <Avatar
                            sx={{
                                width: 40,
                                height: 40,
                                background: 'linear-gradient(135deg, #ff0077, #7700ff)',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    transform: 'scale(1.1)',
                                    boxShadow: '0 4px 12px rgba(255, 0, 119, 0.4)',
                                },
                            }}
                        >
                            <PersonIcon />
                        </Avatar>
                    </IconButton>

                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                        onClick={handleMenuClose}
                        PaperProps={{
                            elevation: 0,
                            sx: {
                                overflow: 'visible',
                                filter: 'drop-shadow(0px 4px 12px rgba(0,0,0,0.3))',
                                mt: 1.5,
                                minWidth: 180,
                                '& .MuiAvatar-root': {
                                    width: 32,
                                    height: 32,
                                    ml: -0.5,
                                    mr: 1,
                                },
                                '&:before': {
                                    content: '""',
                                    display: 'block',
                                    position: 'absolute',
                                    top: 0,
                                    right: 14,
                                    width: 10,
                                    height: 10,
                                    bgcolor: 'background.paper',
                                    transform: 'translateY(-50%) rotate(45deg)',
                                    zIndex: 0,
                                },
                            },
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                        <MenuItem onClick={handleProfile}>
                            <ListItemIcon>
                                <PersonIcon fontSize="small" sx={{ color: '#ff0077' }} />
                            </ListItemIcon>
                            Mi Perfil
                        </MenuItem>
                        <MenuItem onClick={handleLogout}>
                            <ListItemIcon>
                                <LogoutIcon fontSize="small" sx={{ color: '#ff0077' }} />
                            </ListItemIcon>
                            Cerrar Sesión
                        </MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default TopBar;
