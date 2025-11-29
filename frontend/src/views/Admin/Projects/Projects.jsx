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
    Switch,
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
    getAllProjects,
    createProject,
    updateProject,
    deleteProject,
} from '../../../services/projectService';
import { getAllCategories } from '../../../services/categoryService';
import FileUploader from '../../../components/FileUploader';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openDialog, setOpenDialog] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [currentProject, setCurrentProject] = useState(null);
    const [formData, setFormData] = useState({
        name_proyect: '',
        descripcion: '',
        categoria_id: 1,
        link_github: '',
        link_web: '',
        imagen: '',
        destacado: 'NO',
    });

    useEffect(() => {
        fetchProjects();
        fetchCategories();
    }, []);

    const fetchProjects = async () => {
        try {
            setLoading(true);
            const data = await getAllProjects();
            setProjects(data);
        } catch (error) {
            toast.error('Error al cargar proyectos');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            const data = await getAllCategories();
            setCategories(data);
        } catch (error) {
            toast.error('Error al cargar categorías');
            console.error(error);
        }
    };

    const handleOpenDialog = (project = null) => {
        if (project) {
            setCurrentProject(project);
            setFormData({
                name_proyect: project.name_proyect,
                descripcion: project.descripcion || '',
                categoria_id: project.categoria_id || 1,
                link_github: project.link_github || '',
                link_web: project.link_web || '',
                imagen: project.imagen || '',
                destacado: project.destacado || 'NO',
            });
        } else {
            setCurrentProject(null);
            setFormData({
                name_proyect: '',
                descripcion: '',
                categoria_id: categories.length > 0 ? categories[0].id_categoria : 1,
                link_github: '',
                link_web: '',
                imagen: '',
                destacado: 'NO',
            });
        }
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setCurrentProject(null);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSwitchChange = (e) => {
        const { name, checked } = e.target;
        setFormData((prev) => ({ ...prev, [name]: checked ? 'SI' : 'NO' }));
    };

    const handleSubmit = async () => {
        if (!formData.name_proyect.trim()) {
            toast.error('El nombre del proyecto es requerido');
            return;
        }

        try {
            if (currentProject) {
                await updateProject(currentProject.id_proyect, formData);
                toast.success('Proyecto actualizado exitosamente');
            } else {
                await createProject(formData);
                toast.success('Proyecto creado exitosamente');
            }
            handleCloseDialog();
            fetchProjects();
        } catch (error) {
            toast.error(
                error?.response?.data?.message ||
                (currentProject ? 'Error al actualizar proyecto' : 'Error al crear proyecto')
            );
            console.error(error);
        }
    };

    const handleOpenDeleteDialog = (project) => {
        setCurrentProject(project);
        setOpenDeleteDialog(true);
    };

    const handleCloseDeleteDialog = () => {
        setOpenDeleteDialog(false);
        setCurrentProject(null);
    };

    const handleDelete = async () => {
        if (!currentProject) return;

        try {
            await deleteProject(currentProject.id_proyect);
            toast.success('Proyecto eliminado exitosamente');
            handleCloseDeleteDialog();
            fetchProjects();
        } catch (error) {
            toast.error('Error al eliminar proyecto');
            console.error(error);
        }
    };

    const columns = [
        {
            field: 'name_proyect',
            headerName: 'Nombre',
            flex: 1,
            minWidth: 200,
        },
        {
            field: 'descripcion',
            headerName: 'Descripción',
            flex: 2,
            minWidth: 250,
        },
        {
            field: 'destacado',
            headerName: 'Destacado',
            width: 120,
            renderCell: (params) => (
                <Chip
                    label={params.value === 'SI' ? 'Sí' : 'No'}
                    color={params.value === 'SI' ? 'primary' : 'default'}
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
                        Gestión de Proyectos
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Administra tus proyectos del portfolio
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => handleOpenDialog()}
                    sx={{ borderRadius: 2 }}
                >
                    Nuevo Proyecto
                </Button>
            </Box>

            {/* Data Table */}
            <Box sx={{ height: 600, width: '100%' }}>
                <DataGrid
                    rows={projects}
                    columns={columns}
                    getRowId={(row) => row.id_proyect}
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
                        {currentProject ? 'Editar Proyecto' : 'Nuevo Proyecto'}
                    </Typography>
                    <IconButton onClick={handleCloseDialog} size="small">
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
                        <TextField
                            label="Nombre del Proyecto"
                            name="name_proyect"
                            value={formData.name_proyect}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                        <TextField
                            label="Descripción"
                            name="descripcion"
                            value={formData.descripcion}
                            onChange={handleChange}
                            fullWidth
                            multiline
                            rows={3}
                        />
                        <FormControl fullWidth>
                            <InputLabel>Categoría</InputLabel>
                            <Select
                                name="categoria_id"
                                value={formData.categoria_id}
                                onChange={handleChange}
                                label="Categoría"
                            >
                                {categories.map((cat) => (
                                    <MenuItem key={cat.id_categoria} value={cat.id_categoria}>
                                        {cat.descripcion}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField
                            label="URL Repositorio (GitHub)"
                            name="link_github"
                            value={formData.link_github}
                            onChange={handleChange}
                            fullWidth
                            placeholder="https://github.com/usuario/repo"
                        />
                        <TextField
                            label="URL Deploy (Web)"
                            name="link_web"
                            value={formData.link_web}
                            onChange={handleChange}
                            fullWidth
                            placeholder="https://mi-proyecto.com"
                        />
                        <FileUploader
                            value={formData.imagen}
                            onChange={(url) => setFormData((prev) => ({ ...prev, imagen: url }))}
                            label="Imagen del Proyecto"
                            accept="image/*"
                            type="image"
                            helperText="Máximo 5MB. Formatos: jpg, png, gif, webp, svg"
                        />
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={formData.destacado === 'SI'}
                                    onChange={handleSwitchChange}
                                    name="destacado"
                                    color="primary"
                                />
                            }
                            label={
                                <Box>
                                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                        Proyecto Destacado
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        Los proyectos destacados se mostrarán primero en el portfolio
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
                        {currentProject ? 'Actualizar' : 'Crear'}
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
                        ¿Estás seguro de que deseas eliminar el proyecto{' '}
                        <strong>{currentProject?.name_proyect}</strong>? Esta acción no se puede deshacer.
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

export default Projects;