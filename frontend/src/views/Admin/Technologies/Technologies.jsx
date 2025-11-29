import React, { useState, useEffect } from 'react';
import {
    Box,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    IconButton,
    Chip,
    Typography,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    FormControlLabel,
    Checkbox,
} from '@mui/material';
import {
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Close as CloseIcon,
} from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';
import { toast } from 'react-toastify';
import {
    getAllTechnologies,
    createTechnology,
    updateTechnology,
    deleteTechnology,
} from '../../../services/techService';
import FileUploader from '../../../components/FileUploader';

const Technologies = () => {
    const [technologies, setTechnologies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openDialog, setOpenDialog] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [currentTech, setCurrentTech] = useState(null);
    const [formData, setFormData] = useState({
        nombre_tec: '',
        categoria_id: null,
        nivel_id: null,
        imagen: '',
        es_skill: true,
    });

    // Niveles predefinidos (1=Básico, 2=Intermedio, 3=Avanzado)
    const niveles = [
        { id: 1, nombre: 'Básico' },
        { id: 2, nombre: 'Intermedio' },
        { id: 3, nombre: 'Avanzado' },
    ];

    useEffect(() => {
        fetchTechnologies();
    }, []);

    const fetchTechnologies = async () => {
        try {
            setLoading(true);
            const data = await getAllTechnologies();
            setTechnologies(data);
        } catch (error) {
            toast.error('Error al cargar tecnologías');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenDialog = (tech = null) => {
        if (tech) {
            setCurrentTech(tech);
            setFormData({
                nombre_tec: tech.nombre_tec,
                categoria_id: tech.categoria_id || null,
                nivel_id: tech.nivel_id || null,
                imagen: tech.imagen || '',
                es_skill: tech.es_skill === 'SI',
            });
        } else {
            setCurrentTech(null);
            setFormData({
                nombre_tec: '',
                categoria_id: null,
                nivel_id: null,
                imagen: '',
                es_skill: true,
            });
        }
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setCurrentTech(null);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setFormData((prev) => ({ ...prev, [name]: checked }));
    };

    const handleSubmit = async () => {
        if (!formData.nombre_tec.trim()) {
            toast.error('El nombre de la tecnología es requerido');
            return;
        }

        try {
            const dataToSend = {
                ...formData,
                es_skill: formData.es_skill ? 'SI' : 'NO',
            };

            if (currentTech) {
                await updateTechnology(currentTech.id, dataToSend);
                toast.success('Tecnología actualizada exitosamente');
            } else {
                await createTechnology(dataToSend);
                toast.success('Tecnología creada exitosamente');
            }
            handleCloseDialog();
            fetchTechnologies();
        } catch (error) {
            toast.error(
                error?.response?.data?.message ||
                (currentTech ? 'Error al actualizar tecnología' : 'Error al crear tecnología')
            );
            console.error(error);
        }
    };

    const handleOpenDeleteDialog = (tech) => {
        setCurrentTech(tech);
        setOpenDeleteDialog(true);
    };

    const handleCloseDeleteDialog = () => {
        setOpenDeleteDialog(false);
        setCurrentTech(null);
    };

    const handleDelete = async () => {
        if (!currentTech) return;

        try {
            await deleteTechnology(currentTech.id);
            toast.success('Tecnología eliminada exitosamente');
            handleCloseDeleteDialog();
            fetchTechnologies();
        } catch (error) {
            toast.error('Error al eliminar tecnología');
            console.error(error);
        }
    };

    const columns = [
        {
            field: 'nombre_tec',
            headerName: 'Nombre',
            flex: 1,
            minWidth: 200,
        },
        {
            field: 'nivel_nombre',
            headerName: 'Nivel',
            width: 130,
            renderCell: (params) => {
                const colorMap = {
                    'Básico': 'default',
                    'Intermedio': 'primary',
                    'Avanzado': 'secondary',
                };
                return params.value ? (
                    <Chip
                        label={params.value}
                        color={colorMap[params.value] || 'default'}
                        size="small"
                    />
                ) : (
                    <Typography variant="body2" color="text.secondary">-</Typography>
                );
            },
        },
        {
            field: 'es_skill',
            headerName: 'Skill',
            width: 100,
            renderCell: (params) => (
                <Chip
                    label={params.value === 'SI' ? 'Sí' : 'No'}
                    color={params.value === 'SI' ? 'success' : 'default'}
                    size="small"
                />
            ),
        },
        {
            field: 'actions',
            headerName: 'Acciones',
            width: 120,
            sortable: false,
            renderCell: (params) => (
                <Box>
                    <IconButton
                        size="small"
                        onClick={() => handleOpenDialog(params.row)}
                        sx={{ color: '#ff0077' }}
                    >
                        <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                        size="small"
                        onClick={() => handleOpenDeleteDialog(params.row)}
                        sx={{ color: '#ff3b30' }}
                    >
                        <DeleteIcon fontSize="small" />
                    </IconButton>
                </Box>
            ),
        },
    ];

    return (
        <Box>
            {/* Header */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Box>
                    <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
                        Gestión de Tecnologías
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Administra tus tecnologías y habilidades
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => handleOpenDialog()}
                    sx={{ borderRadius: 2 }}
                >
                    Nueva Tecnología
                </Button>
            </Box>

            {/* Data Table */}
            <Box sx={{ height: 600, width: '100%' }}>
                <DataGrid
                    rows={technologies}
                    columns={columns}
                    getRowId={(row) => row.id}
                    loading={loading}
                    pageSizeOptions={[10, 25, 50]}
                    initialState={{
                        pagination: { paginationModel: { pageSize: 10 } },
                    }}
                    disableRowSelectionOnClick
                    sx={{
                        border: '2px solid #2a2a2a',
                        '& .MuiDataGrid-cell:focus': {
                            outline: 'none',
                        },
                    }}
                />
            </Box>

            {/* Create/Edit Dialog */}
            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                maxWidth="sm"
                fullWidth
                PaperProps={{
                    sx: {
                        borderRadius: 3,
                    },
                }}
            >
                <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                        {currentTech ? 'Editar Tecnología' : 'Nueva Tecnología'}
                    </Typography>
                    <IconButton onClick={handleCloseDialog} size="small">
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
                        <TextField
                            label="Nombre de la Tecnología"
                            name="nombre_tec"
                            value={formData.nombre_tec}
                            onChange={handleChange}
                            fullWidth
                            required
                            placeholder="Ej: React, Node.js, Python..."
                        />
                        <FormControl fullWidth>
                            <InputLabel>Nivel de Habilidad</InputLabel>
                            <Select
                                name="nivel_id"
                                value={formData.nivel_id || ''}
                                onChange={handleChange}
                                label="Nivel de Habilidad"
                            >
                                <MenuItem value="">
                                    <em>Sin especificar</em>
                                </MenuItem>
                                {niveles.map((nivel) => (
                                    <MenuItem key={nivel.id} value={nivel.id}>
                                        {nivel.nombre}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FileUploader
                            value={formData.imagen}
                            onChange={(url) => setFormData((prev) => ({ ...prev, imagen: url }))}
                            label="Imagen/Icono de la Tecnología"
                            accept="image/*"
                            type="image"
                            helperText="Máximo 5MB. Formatos: jpg, png, gif, webp, svg"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={formData.es_skill}
                                    onChange={handleCheckboxChange}
                                    name="es_skill"
                                    color="primary"
                                />
                            }
                            label={
                                <Box>
                                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                        Marcar como Skill Principal
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        Las skills principales se mostrarán en la sección de habilidades
                                    </Typography>
                                </Box>
                            }
                        />
                    </Box>
                </DialogContent>
                <DialogActions sx={{ p: 2.5 }}>
                    <Button onClick={handleCloseDialog} variant="outlined">
                        Cancelar
                    </Button>
                    <Button onClick={handleSubmit} variant="contained">
                        {currentTech ? 'Actualizar' : 'Crear'}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog
                open={openDeleteDialog}
                onClose={handleCloseDeleteDialog}
                maxWidth="sm"
                fullWidth
                PaperProps={{
                    sx: {
                        borderRadius: 3,
                    },
                }}
            >
                <DialogTitle>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                        Confirmar Eliminación
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <Typography>
                        ¿Estás seguro de que deseas eliminar la tecnología{' '}
                        <strong>{currentTech?.nombre_tec}</strong>? Esta acción no se puede deshacer.
                    </Typography>
                </DialogContent>
                <DialogActions sx={{ p: 2.5 }}>
                    <Button onClick={handleCloseDeleteDialog} variant="outlined">
                        Cancelar
                    </Button>
                    <Button onClick={handleDelete} variant="contained" color="error">
                        Eliminar
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default Technologies;
