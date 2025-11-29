import React, { useState, useEffect } from 'react';
import {
    Grid,
    Card,
    CardContent,
    Typography,
    Box,
    Paper,
} from '@mui/material';
import {
    Folder as FolderIcon,
    Build as BuildIcon,
    School as SchoolIcon,
    TrendingUp as TrendingUpIcon,
} from '@mui/icons-material';
import { getAllProjects } from '../../../services/projectService';
import { getAllTechnologies } from '../../../services/techService';
import { getAllEducation } from '../../../services/educationService';

const StatCard = ({ title, value, icon: Icon, color }) => (
    <Card
        sx={{
            height: '100%',
            position: 'relative',
            overflow: 'visible',
            transition: 'all 0.3s ease',
            '&:hover': {
                transform: 'translateY(-8px)',
            },
        }}
    >
        <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                    <Typography color="text.secondary" gutterBottom variant="overline">
                        {title}
                    </Typography>
                    <Typography variant="h3" component="div" sx={{ fontWeight: 800, color }}>
                        {value}
                    </Typography>
                </Box>
                <Box
                    sx={{
                        width: 60,
                        height: 60,
                        borderRadius: 3,
                        background: `linear-gradient(135deg, ${color}15, ${color}05)`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: `2px solid ${color}30`,
                    }}
                >
                    <Icon sx={{ fontSize: 32, color }} />
                </Box>
            </Box>
        </CardContent>
    </Card>
);

const Dashboard = () => {
    const [stats, setStats] = useState({
        projects: 0,
        technologies: 0,
        education: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [projects, technologies, education] = await Promise.all([
                    getAllProjects(),
                    getAllTechnologies(),
                    getAllEducation(),
                ]);

                setStats({
                    projects: projects.length,
                    technologies: technologies.length,
                    education: education.length,
                });
            } catch (error) {
                console.error('Error fetching stats:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    return (
        <Box>
            {/* Welcome Header */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
                    Bienvenido al Dashboard 👋
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Gestiona el contenido de tu portfolio desde aquí
                </Typography>
            </Box>

            {/* Stats Cards */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard
                        title="Total Proyectos"
                        value={loading ? '...' : stats.projects}
                        icon={FolderIcon}
                        color="#ff0077"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard
                        title="Tecnologías"
                        value={loading ? '...' : stats.technologies}
                        icon={BuildIcon}
                        color="#7700ff"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard
                        title="Educación"
                        value={loading ? '...' : stats.education}
                        icon={SchoolIcon}
                        color="#00bcd4"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard
                        title="Crecimiento"
                        value="+12%"
                        icon={TrendingUpIcon}
                        color="#4caf50"
                    />
                </Grid>
            </Grid>

            {/* Activity Card */}
            <Card>
                <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                        Acceso Rápido
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={3}>
                            <Paper
                                sx={{
                                    p: 2,
                                    textAlign: 'center',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    border: '2px solid #2a2a2a',
                                    '&:hover': {
                                        borderColor: '#ff0077',
                                        transform: 'translateY(-4px)',
                                    },
                                }}
                                onClick={() => window.location.href = '/admin/projects'}
                            >
                                <FolderIcon sx={{ fontSize: 40, color: '#ff0077', mb: 1 }} />
                                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                    Gestionar Proyectos
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Paper
                                sx={{
                                    p: 2,
                                    textAlign: 'center',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    border: '2px solid #2a2a2a',
                                    '&:hover': {
                                        borderColor: '#7700ff',
                                        transform: 'translateY(-4px)',
                                    },
                                }}
                                onClick={() => window.location.href = '/admin/technologies'}
                            >
                                <BuildIcon sx={{ fontSize: 40, color: '#7700ff', mb: 1 }} />
                                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                    Gestionar Tecnologías
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Paper
                                sx={{
                                    p: 2,
                                    textAlign: 'center',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    border: '2px solid #2a2a2a',
                                    '&:hover': {
                                        borderColor: '#00bcd4',
                                        transform: 'translateY(-4px)',
                                    },
                                }}
                                onClick={() => window.location.href = '/admin/education'}
                            >
                                <SchoolIcon sx={{ fontSize: 40, color: '#00bcd4', mb: 1 }} />
                                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                    Gestionar Educación
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Paper
                                sx={{
                                    p: 2,
                                    textAlign: 'center',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    border: '2px solid #2a2a2a',
                                    '&:hover': {
                                        borderColor: '#4caf50',
                                        transform: 'translateY(-4px)',
                                    },
                                }}
                                onClick={() => window.location.href = '/admin/profile'}
                            >
                                <TrendingUpIcon sx={{ fontSize: 40, color: '#4caf50', mb: 1 }} />
                                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                    Editar Perfil
                                </Typography>
                            </Paper>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Box>
    );
};

export default Dashboard;
