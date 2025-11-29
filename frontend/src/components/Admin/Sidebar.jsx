import React from 'react';
import {
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Box,
    Typography,
    Divider,
    useMediaQuery,
    useTheme
} from '@mui/material';
import {
    Dashboard as DashboardIcon,
    Folder as FolderIcon,
    Build as BuildIcon,
    School as SchoolIcon,
    Person as PersonIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const DRAWER_WIDTH = 260;

const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin/dashboard' },
    { text: 'Proyectos', icon: <FolderIcon />, path: '/admin/projects' },
    { text: 'Tecnologías', icon: <BuildIcon />, path: '/admin/technologies' },
    { text: 'Educación', icon: <SchoolIcon />, path: '/admin/education' },
    { text: 'Perfil', icon: <PersonIcon />, path: '/admin/profile' },
];

const Sidebar = ({ mobileOpen, handleDrawerToggle }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const drawer = (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            {/* Logo/Header */}
            <Box
                sx={{
                    p: 3,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                    background: 'linear-gradient(135deg, rgba(255, 0, 119, 0.1), rgba(119, 0, 255, 0.1))',
                    borderBottom: '2px solid #2a2a2a',
                }}
            >
                <Box
                    sx={{
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #ff0077, #7700ff)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <DashboardIcon sx={{ color: '#fff', fontSize: 24 }} />
                </Box>
                <Box>
                    <Typography variant="h6" sx={{ fontWeight: 800, lineHeight: 1.2 }}>
                        ADMIN
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        Panel de Control
                    </Typography>
                </Box>
            </Box>

            {/* Menu Items */}
            <List sx={{ flex: 1, py: 2 }}>
                {menuItems.map((item) => {
                    const isActive = location.pathname === item.path;

                    return (
                        <ListItem key={item.text} disablePadding sx={{ px: 2, mb: 0.5 }}>
                            <ListItemButton
                                onClick={() => {
                                    navigate(item.path);
                                    if (isMobile) handleDrawerToggle();
                                }}
                                sx={{
                                    borderRadius: 2,
                                    backgroundColor: isActive ? 'rgba(255, 0, 119, 0.15)' : 'transparent',
                                    border: isActive ? '2px solid rgba(255, 0, 119, 0.3)' : '2px solid transparent',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        backgroundColor: isActive
                                            ? 'rgba(255, 0, 119, 0.2)'
                                            : 'rgba(255, 0, 119, 0.05)',
                                        borderColor: 'rgba(255, 0, 119, 0.3)',
                                        transform: 'translateX(8px)',
                                    },
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        color: isActive ? '#ff0077' : 'text.secondary',
                                        minWidth: 40,
                                    }}
                                >
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText
                                    primary={item.text}
                                    primaryTypographyProps={{
                                        fontWeight: isActive ? 700 : 500,
                                        color: isActive ? '#fff' : 'text.secondary',
                                    }}
                                />
                            </ListItemButton>
                        </ListItem>
                    );
                })}
            </List>

            {/* Footer */}
            <Box sx={{ p: 2, borderTop: '1px solid #2a2a2a' }}>
                <Typography variant="caption" sx={{ color: 'text.secondary', textAlign: 'center', display: 'block' }}>
                    Portfolio Admin v1.0
                </Typography>
            </Box>
        </Box>
    );

    return (
        <Box
            component="nav"
            sx={{ width: { md: DRAWER_WIDTH }, flexShrink: { md: 0 } }}
        >
            {/* Mobile Drawer */}
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile
                }}
                sx={{
                    display: { xs: 'block', md: 'none' },
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                        width: DRAWER_WIDTH,
                    },
                }}
            >
                {drawer}
            </Drawer>

            {/* Desktop Drawer */}
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: 'none', md: 'block' },
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                        width: DRAWER_WIDTH,
                    },
                }}
                open
            >
                {drawer}
            </Drawer>
        </Box>
    );
};

export default Sidebar;
export { DRAWER_WIDTH };
