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
    Typography,
    Paper,
    List,
    ListItem,
    ListItemText,
    Divider,
} from '@mui/material';
import {
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Close as CloseIcon,
    Category as CategoryIcon,
} from '@mui/icons-material';
import { toast } from 'react-toastify';
import {
    getAllCategories,
    createCategory,
    updateCategory,
    deleteCategory,
} from '../../../services/categoryService';

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openDialog, setOpenDialog] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [currentCategory, setCurrentCategory] = useState(null);
    const [formData, setFormData] = useState({
        descripcion: '',
    });

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            setLoading(true);
            const data = await getAllCategories();
            setCategories(data);
        } catch (error) {
            toast.error('Error al cargar categorías');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenDialog = (category = null) => {
        if (category) {
            setCurrentCategory(category);
            setFormData({
                descripcion: category.descripcion,
            });
        } else {
            setCurrentCategory(null);
            setFormData({
                descripcion: '',
            });
        }
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setCurrentCategory(null);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        if (!formData.descripcion.trim()) {
            toast.error('La descripción es requerida');
            return;
        }

        try {
            if (currentCategory) {
                await updateCategory(currentCategory.id_categoria, formData);
                toast.success('Categoría actualizada exitosamente');
            } else {
                await createCategory(formData);
                toast.success('Categoría creada exitosamente');
            }
            handleCloseDialog();
            fetchCategories();
        } catch (error) {
            toast.error(
                error?.response?.data?.message ||
                (currentCategory ? 'Error al actualizar categoría' : 'Error al crear categoría')
            );
            console.error(error);
        }
    };

    const handleOpenDeleteDialog = (category) => {
        setCurrentCategory(category);
        setOpenDeleteDialog(true);
    };

    const handleCloseDeleteDialog = () => {
        setOpenDeleteDialog(false);
        setCurrentCategory(null);
    };

    const handleDelete = async () => {
        if (!currentCategory) return;

        try {
            await deleteCategory(currentCategory.id_categoria);
            toast.success('Categoría eliminada exitosamente');
            handleCloseDeleteDialog();
            fetchCategories();
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Error al eliminar categoría');
            console.error(error);
        }
    };

    return (
        <Box>
            {/* Header */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Box>
                    <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
                        Categorías de Proyectos
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Gestiona las categorías para organizar tus proyectos
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => handleOpenDialog()}
                    sx={{ borderRadius: 2 }}
                >
                    Nueva Categoría
                </Button>
            </Box>

            {/* Categories List */}
            <Paper
                sx={{
                    border: '2px solid #2a2a2a',
                    borderRadius: 3,
                    overflow: 'hidden',
                }}
            >
                {loading ? (
                    <Box sx={{ p: 4, textAlign: 'center' }}>
                        <Typography color="text.secondary">Cargando categorías...</Typography>
                    </Box>
                ) : categories.length === 0 ? (
                    <Box sx={{ p: 4, textAlign: 'center' }}>
                        <CategoryIcon sx={{ fontSize: 60, color: 'text.disabled', mb: 2 }} />
                        <Typography variant="h6" color="text.secondary" gutterBottom>
                            No hay categorías
                        </Typography>
                        <Typography variant="body2" color="text.disabled">
                            Crea tu primera categoría para comenzar a organizar tus proyectos
                        </Typography>
                    </Box>
                ) : (
                    <List sx={{ p: 0 }}>
                        {categories.map((category, index) => (
                            <React.Fragment key={category.id_categoria}>
                                <ListItem
                                    sx={{
                                        py: 2,
                                        px: 3,
                                        '&:hover': {
                                            bgcolor: 'rgba(255, 0, 119, 0.05)',
                                        },
                                    }}
                                    secondaryAction={
                                        <Box>
                                            <IconButton
                                                size="small"
                                                onClick={() => handleOpenDialog(category)}
                                                sx={{ color: '#ff0077', mr: 1 }}
                                            >
                                                <EditIcon fontSize="small" />
                                            </IconButton>
                                            <IconButton
                                                size="small"
                                                onClick={() => handleOpenDeleteDialog(category)}
                                                sx={{ color: '#ff3b30' }}
                                            >
                                                <DeleteIcon fontSize="small" />
                                            </IconButton>
                                        </Box>
                                    }
                                >
                                    <ListItemText
                                        primary={
                                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                                {category.descripcion}
                                            </Typography>
                                        }
                                        secondary={
                                            <Typography variant="body2" color="text.secondary">
                                                ID: {category.id_categoria}
                                            </Typography>
                                        }
                                    />
                                </ListItem>
                                {index < categories.length - 1 && <Divider />}
                            </React.Fragment>
                        ))}
                    </List>
                )}
            </Paper>

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
                        {currentCategory ? 'Editar Categoría' : 'Nueva Categoría'}
                    </Typography>
                    <IconButton onClick={handleCloseDialog} size="small">
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers>
                    <Box sx={{ pt: 1 }}>
                        <TextField
                            label="Nombre de la Categoría"
                            name="descripcion"
                            value={formData.descripcion}
                            onChange={handleChange}
                            fullWidth
                            required
                            placeholder="Ej: Web Development, Mobile Apps, etc."
                            autoFocus
                        />
                    </Box>
                </DialogContent>
                <DialogActions sx={{ p: 2.5 }}>
                    <Button onClick={handleCloseDialog} variant="outlined">
                        Cancelar
                    </Button>
                    <Button onClick={handleSubmit} variant="contained">
                        {currentCategory ? 'Actualizar' : 'Crear'}
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
                        ¿Estás seguro de que deseas eliminar la categoría{' '}
                        <strong>{currentCategory?.descripcion}</strong>?
                    </Typography>
                    <Typography variant="body2" color="warning.main" sx={{ mt: 2 }}>
                        ⚠️ No se puede eliminar si hay proyectos usando esta categoría.
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

export default Categories;
