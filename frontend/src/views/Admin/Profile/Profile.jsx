import React, { useState, useEffect } from 'react';
import './Profile.scss';
import {
    Box,
    Button,
    TextField,
    Typography,
    Grid,
    Divider,
    Card,
    CardContent,
    CardHeader,
    InputAdornment,
} from '@mui/material';
import {
    Save as SaveIcon,
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
        texto_home: '',
        cv_url: '',
        imagen_perfil: '',
    });

    useEffect(() => {
        fetchPersonalInfo();
    }, []);

    const fetchPersonalInfo = async () => {
        try {
            setLoading(true);
            const data = await getInfo();
            if (data) {
                setFormData({
                    nombre: data.nombre || '',
                    apellido: data.apellido || '',
                    email: data.email || '',
                    telefono: data.telefono || '',
                    linkedin: data.linkedin || '',
                    github: data.github || '',
                    descripcion: data.descripcion || '',
                    texto_home: data.texto_home || '',
                    cv_url: data.cv_url || '',
                    imagen_perfil: data.imagen_perfil || '',
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
        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', mx: 'auto', px: { xs: 2, sm: 3, md: 4 } }}>
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

            <Grid container spacing={3} sx={{ justifyContent: { xs: 'center', md: 'flex-start' } }}>
                {/* Columna Izquierda: Foto de perfil y datos básicos */}
                <Grid item xs={12} sm={10} md={5} lg={4} xl={4}>
                    <Card sx={{
                        borderRadius: 3,
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        bgcolor: 'background.paper',
                        height: '100%',
                        maxWidth: { xs: '100%', sm: '600px', md: '100%' },
                        mx: { xs: 'auto', md: 0 }
                    }}>
                        <CardContent sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            p: { xs: 3, sm: 4 }
                        }}>
                            {/* Foto de perfil */}
                            <Box sx={{ mb: 3, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <FileUploader
                                    value={formData.imagen_perfil}
                                    onChange={(url) => setFormData((prev) => ({ ...prev, imagen_perfil: url }))}
                                    label="Foto de Perfil"
                                    accept="image/*"
                                    type="image"
                                    helperText="Click para subir o pegar URL"
                                />
                            </Box>

                            <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5, textAlign: 'center' }}>
                                {formData.nombre} {formData.apellido}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 3, textAlign: 'center' }}>
                                {formData.email}
                            </Typography>

                            <Divider sx={{ mb: 3 }} />

                            {/* Campos básicos */}
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
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
                                    label="Bio / Descripción (About)"
                                    name="descripcion"
                                    value={formData.descripcion}
                                    onChange={handleChange}
                                    fullWidth
                                    multiline
                                    rows={4}
                                    placeholder="Breve descripción sobre ti..."
                                    variant="outlined"
                                />
                                <TextField
                                    label="Texto Home"
                                    name="texto_home"
                                    value={formData.texto_home}
                                    onChange={handleChange}
                                    fullWidth
                                    multiline
                                    rows={4}
                                    placeholder="Texto de bienvenida para el Home..."
                                    variant="outlined"
                                />
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Columna Derecha: Tarjetas más pequeñas */}
                <Grid item xs={12} sm={10} md={7} lg={8} xl={8}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, height: '100%' }}>

                        {/* Información de Contacto */}
                        <Box sx={{ maxWidth: { xs: '100%', sm: '600px', md: '100%' }, mx: { xs: 'auto', md: 0 } }}>
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
                        </Box>

                        {/* Redes Sociales */}
                        <Box sx={{ maxWidth: { xs: '100%', sm: '600px', md: '100%' }, mx: { xs: 'auto', md: 0 } }}>
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
                        </Box>

                        {/* CV */}
                        <Box sx={{ maxWidth: { xs: '100%', sm: '600px', md: '100%' }, mx: { xs: 'auto', md: 0 } }}>
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

                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Profile;