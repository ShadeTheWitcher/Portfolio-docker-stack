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
    getAllEducation,
    createEducation,
    updateEducation,
    deleteEducation,
} from '../../../services/educationService';
import FileUploader from '../../../components/FileUploader';

const Education = () => {
    const [education, setEducation] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openDialog, setOpenDialog] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [currentEdu, setCurrentEdu] = useState(null);
    const [formData, setFormData] = useState({
        institucion: '',
        titulo: '',
        descripcion: '',
        fecha_inicio: '',
        fecha_fin: '',
        en_curso: false,
        certificado_url: '',
    });

    useEffect(() => {
        fetchEducation();
    }, []);

    const fetchEducation = async () => {
        try {
            setLoading(true);
            const data = await getAllEducation();
            setEducation(data);
        } catch (error) {
            toast.error('Error al cargar educación');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenDialog = (edu = null) => {
        if (edu) {
            setCurrentEdu(edu);
            setFormData({
                institucion: edu.institucion,
                titulo: edu.titulo,
                descripcion: edu.descripcion || '',
                fecha_inicio: edu.fecha_inicio || '',
                fecha_fin: edu.fecha_fin || '',
                en_curso: edu.en_curso === 'SI',
                certificado_url: edu.certificado_url || '',
            });
        } else {
            setCurrentEdu(null);
            setFormData({
                institucion: '',
                titulo: '',
                descripcion: '',
                fecha_inicio: '',
                fecha_fin: '',
                en_curso: false,
                certificado_url: '',
            });
        }
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setCurrentEdu(null);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: checked,
            // Si está en curso, limpiar fecha de fin
            ...(name === 'en_curso' && checked ? { fecha_fin: '' } : {}),
        }));
    };

    const handleSubmit = async () => {
        if (!formData.institucion.trim() || !formData.titulo.trim()) {
            toast.error('Institución y título son requeridos');
            return;
        }

        try {
            const dataToSend = {
                ...formData,
                en_curso: formData.en_curso ? 'SI' : 'NO',
            };

            if (currentEdu) {
                await updateEducation(currentEdu.id, dataToSend);
                toast.success('Educación actualizada exitosamente');
            } else {
                await createEducation(dataToSend);
                toast.success('Educación creada exitosamente');
            }
            handleCloseDialog();
            fetchEducation();
        } catch (error) {
            toast.error(
                error?.response?.data?.message ||
                (currentEdu ? 'Error al actualizar educación' : 'Error al crear educación')
            );
            console.error(error);
        }
    };

    const handleOpenDeleteDialog = (edu) => {
        setCurrentEdu(edu);
        setOpenDeleteDialog(true);
    };

    const handleCloseDeleteDialog = () => {
        setOpenDeleteDialog(false);
        setCurrentEdu(null);
    };

    const handleDelete = async () => {
        if (!currentEdu) return;

        try {
            await deleteEducation(currentEdu.id);
            toast.success('Educación eliminada exitosamente');
            handleCloseDeleteDialog();
            fetchEducation();
        } catch (error) {
            toast.error('Error al eliminar educación');
            console.error(error);
        }
    };

    const columns = [
        {
            field: 'titulo',
            headerName: 'Título',
            flex: 1,
            minWidth: 200,
        },
        {
            field: 'institucion',
            headerName: 'Institución',
            flex: 1,
            minWidth: 200,
        },
        {
            field: 'fecha_inicio',
            headerName: 'Inicio',
            width: 120,
        },
        {
            field: 'fecha_fin',
            headerName: 'Fin',
            width: 120,
            renderCell: (params) =>
                params.row.en_curso === 'SI' ? (
                    <Chip label="En curso" color="primary" size="small" />
                ) : (
                    params.value || '-'
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
                        Gestión de Educación
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Administra tu formación académica
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => handleOpenDialog()}
                    sx={{ borderRadius: 2 }}
                >
                    Nueva Educación
                </Button>
            </Box>

            {/* Data Table */}
            <Box sx={{ height: 600, width: '100%' }}>
                <DataGrid
                    rows={education}
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
                maxWidth="md"
                fullWidth
                PaperProps={{
                    sx: {
                        borderRadius: 3,
                    },
                }}
            >
                <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                        {currentEdu ? 'Editar Educación' : 'Nueva Educación'}
                    </Typography>
                    <IconButton onClick={handleCloseDialog} size="small">
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
                        <TextField
                            label="Título/Carrera"
                            name="titulo"
                            value={formData.titulo}
                            onChange={handleChange}
                            fullWidth
                            required
                            placeholder="Ej: Licenciatura en Informática"
                        />
                        <TextField
                            label="Institución"
                            name="institucion"
                            value={formData.institucion}
                            onChange={handleChange}
                            fullWidth
                            required
                            placeholder="Ej: Universidad Nacional"
                        />
                        <TextField
                            label="Descripción"
                            name="descripcion"
                            value={formData.descripcion}
                            onChange={handleChange}
                            fullWidth
                            multiline
                            rows={3}
                            placeholder="Descripción breve de tu formación..."
                        />
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <TextField
                                label="Fecha Inicio"
                                name="fecha_inicio"
                                type="month"
                                value={formData.fecha_inicio}
                                onChange={handleChange}
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                            />
                            <TextField
                                label="Fecha Fin"
                                name="fecha_fin"
                                type="month"
                                value={formData.fecha_fin}
                                onChange={handleChange}
                                fullWidth
                                disabled={formData.en_curso}
                                InputLabelProps={{ shrink: true }}
                            />
                        </Box>
                        <FileUploader
                            value={formData.certificado_url}
                            onChange={(url) => setFormData((prev) => ({ ...prev, certificado_url: url }))}
                            label="Certificado"
                            accept=".pdf,.jpg,.jpeg,.png"
                            type="document"
                            helperText="Máximo 5MB. Formatos: PDF, JPG, PNG"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={formData.en_curso}
                                    onChange={handleCheckboxChange}
                                    name="en_curso"
                                    color="primary"
                                />
                            }
                            label={
                                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                    Actualmente estudiando
                                </Typography>
                            }
                        />
                    </Box>
                </DialogContent>
                <DialogActions sx={{ p: 2.5 }}>
                    <Button onClick={handleCloseDialog} variant="outlined">
                        Cancelar
                    </Button>
                    <Button onClick={handleSubmit} variant="contained">
                        {currentEdu ? 'Actualizar' : 'Crear'}
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
                        ¿Estás seguro de que deseas eliminar{' '}
                        <strong>{currentEdu?.titulo}</strong> de{' '}
                        <strong>{currentEdu?.institucion}</strong>? Esta acción no se puede deshacer.
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

export default Education;
