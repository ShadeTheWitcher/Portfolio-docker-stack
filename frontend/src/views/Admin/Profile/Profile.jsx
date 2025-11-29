import React, { useState, useEffect } from 'react';
import {
    Box,
    Button,
    TextField,
    Typography,
    Paper,
    Grid,
    Avatar,
    Divider,
    Card,
    CardContent,
    CardHeader,
    InputAdornment,
} from '@mui/material';
import {
    Save as SaveIcon,
    Person as PersonIcon,
    Email as EmailIcon,
    Phone as PhoneIcon,
    LinkedIn as LinkedInIcon,
    GitHub as GitHubIcon,
    Description as DescriptionIcon,
} from '@mui/icons-material';
import { toast } from 'react-toastify';
import { getInfo, updateInfo } from '../../../services/infoService';
import FileUploader from '../../../components/FileUploader';

const Profile = () => {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        email: '',
        telefono: '',
        linkedin: '',
        github: '',
        descripcion: '',
        cv_url: '',
    });

    useEffect(() => {
        fetchPersonalInfo();
    }, []);

    const fetchPersonalInfo = async () => {
        try {
            setLoading(true);
            const data = await getInfo();
            if (data && data.length > 0) {
                const info = data[0];
                setFormData({
                    nombre: info.nombre || '',
                    apellido: info.apellido || '',
                    email: info.email || '',
                    telefono: info.telefono || '',
                    linkedin: info.linkedin || '',
                    github: info.github || '',
                    descripcion: info.descripcion || '',
                    cv_url: info.cv_url || '',
                });
            }
        } catch (error) {
            toast.error('Error al cargar información personal');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.nombre.trim() || !formData.email.trim()) {
            toast.error('Nombre y email son requeridos');
            return;
        }

        try {
            setSaving(true);
            await updateInfo(formData);
            toast.success('Información actualizada exitosamente');
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Error al actualizar información');
            console.error(error);
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '70vh'
            }}>
                <Typography color="text.secondary" variant="h6">
                    Cargando información...
                </Typography>
            </Box>
        );
    }

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 1400, mx: 'auto', px: { xs: 2, sm: 3 } }}>
            {/* Header */}
            <Box sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                justifyContent: 'space-between',
                alignItems: { xs: 'flex-start', sm: 'center' },
                gap: 2,
                mb: 4,
                pt: 2
            }}>
                <Box>
                    <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
                        Mi Perfil
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Gestiona tu información personal y profesional
                    </Typography>
                </Box>
                <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    startIcon={<SaveIcon />}
                    disabled={saving}
                    sx={{
                        borderRadius: 2,
                        px: 4,
                        py: 1.2,
                        minWidth: { xs: '100%', sm: 'auto' },
                        boxShadow: 2
                    }}
                >
                    {saving ? 'Guardando...' : 'Guardar Cambios'}
                </Button>
            </Box>

            <Grid container spacing={3}>
                {/* Columna Izquierda: Información Básica */}
                <Grid item xs={12} lg={4}>
                    <Card sx={{
                        height: '100%',
                        borderRadius: 3,
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        bgcolor: 'background.paper'
                    }}>
                        <CardContent sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            p: { xs: 3, sm: 4 }
                        }}>
                            <Avatar
                                sx={{
                                    width: { xs: 100, sm: 120 },
                                    height: { xs: 100, sm: 120 },
                                    background: 'linear-gradient(135deg, #ff0077, #7700ff)',
                                    fontSize: { xs: 42, sm: 50 },
                                    mb: 2.5,
                                    boxShadow: '0 8px 24px rgba(119, 0, 255, 0.3)'
                                }}
                            >
                                <PersonIcon fontSize="inherit" />
                            </Avatar>
                            <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5, textAlign: 'center' }}>
                                {formData.nombre} {formData.apellido}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 3, textAlign: 'center' }}>
                                {formData.email}
                            </Typography>

                            <Divider sx={{ width: '100%', mb: 3 }} />

                            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                                <TextField
                                    label="Nombre"
                                    name="nombre"
                                    value={formData.nombre}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                    variant="outlined"
                                    size="medium"
                                />
                                <TextField
                                    label="Apellido"
                                    name="apellido"
                                    value={formData.apellido}
                                    onChange={handleChange}
                                    fullWidth
                                    variant="outlined"
                                    size="medium"
                                />
                                <TextField
                                    label="Bio / Descripción"
                                    name="descripcion"
                                    value={formData.descripcion}
                                    onChange={handleChange}
                                    fullWidth
                                    multiline
                                    rows={4}
                                    placeholder="Breve descripción sobre ti..."
                                    variant="outlined"
                                />
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Columna Derecha: Detalles */}
                <Grid item xs={12} lg={8}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>

                        {/* Contacto */}
                        <Card sx={{
                            borderRadius: 3,
                            border: '1px solid rgba(255, 255, 255, 0.12)',
                            bgcolor: 'background.paper'
                        }}>
                            <CardHeader
                                title="Información de Contacto"
                                subheader="Medios para que te contacten"
                                avatar={<EmailIcon color="primary" sx={{ fontSize: 28 }} />}
                                titleTypographyProps={{ variant: 'h6', fontWeight: 700 }}
                                sx={{ pb: 1 }}
                            />
                            <Divider />
                            <CardContent sx={{ pt: 3 }}>
                                <Grid container spacing={2.5}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            label="Email"
                                            name="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            fullWidth
                                            required
                                            size="medium"
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <EmailIcon fontSize="small" color="action" />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            label="Teléfono"
                                            name="telefono"
                                            value={formData.telefono}
                                            onChange={handleChange}
                                            fullWidth
                                            size="medium"
                                            placeholder="+XX XXX XXX XXX"
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <PhoneIcon fontSize="small" color="action" />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>

                        {/* Redes Sociales */}
                        <Card sx={{
                            borderRadius: 3,
                            border: '1px solid rgba(255, 255, 255, 0.12)',
                            bgcolor: 'background.paper'
                        }}>
                            <CardHeader
                                title="Redes Sociales"
                                subheader="Enlaces a tus perfiles profesionales"
                                avatar={<LinkedInIcon color="primary" sx={{ fontSize: 28 }} />}
                                titleTypographyProps={{ variant: 'h6', fontWeight: 700 }}
                                sx={{ pb: 1 }}
                            />
                            <Divider />
                            <CardContent sx={{ pt: 3 }}>
                                <Grid container spacing={2.5}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            label="LinkedIn URL"
                                            name="linkedin"
                                            value={formData.linkedin}
                                            onChange={handleChange}
                                            fullWidth
                                            size="medium"
                                            placeholder="https://linkedin.com/in/..."
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <LinkedInIcon fontSize="small" color="action" />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            label="GitHub URL"
                                            name="github"
                                            value={formData.github}
                                            onChange={handleChange}
                                            fullWidth
                                            size="medium"
                                            placeholder="https://github.com/..."
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <GitHubIcon fontSize="small" color="action" />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>

                        {/* CV */}
                        <Card sx={{
                            borderRadius: 3,
                            border: '1px solid rgba(255, 255, 255, 0.12)',
                            bgcolor: 'background.paper'
                        }}>
                            <CardHeader
                                title="Curriculum Vitae"
                                subheader="Sube tu CV en formato PDF o DOC"
                                avatar={<DescriptionIcon color="primary" sx={{ fontSize: 28 }} />}
                                titleTypographyProps={{ variant: 'h6', fontWeight: 700 }}
                                sx={{ pb: 1 }}
                            />
                            <Divider />
                            <CardContent sx={{ pt: 3 }}>
                                <FileUploader
                                    value={formData.cv_url}
                                    onChange={(url) => setFormData((prev) => ({ ...prev, cv_url: url }))}
                                    label="Archivo de CV"
                                    accept=".pdf,.doc,.docx"
                                    type="document"
                                    helperText="Máximo 5MB. Formatos permitidos: PDF, DOC, DOCX"
                                />
                            </CardContent>
                        </Card>

                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Profile;