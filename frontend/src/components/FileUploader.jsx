import React, { useState } from 'react';
import {
    Box,
    TextField,
    Button,
    Typography,
    IconButton,
    LinearProgress,
    Alert,
    Paper,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    FormLabel,
} from '@mui/material';
import {
    CloudUpload as UploadIcon,
    Delete as DeleteIcon,
    Link as LinkIcon,
    Image as ImageIcon,
} from '@mui/icons-material';
import { toast } from 'react-toastify';
import api from '../services/api';

const FileUploader = ({
    value,
    onChange,
    label = "Archivo",
    accept = "image/*",
    type = "image", // "image" o "document"
    helperText = ""
}) => {
    const [mode, setMode] = useState(value && value.startsWith('http') ? 'url' : 'file');
    const [uploading, setUploading] = useState(false);
    const [preview, setPreview] = useState(value || '');

    const handleModeChange = (event) => {
        setMode(event.target.value);
        setPreview('');
        onChange('');
    };

    const handleUrlChange = (e) => {
        const url = e.target.value;
        setPreview(url);
        onChange(url);
    };

    const handleFileSelect = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Validar tamaño (5MB máx)
        if (file.size > 5 * 1024 * 1024) {
            toast.error('El archivo no debe superar los 5MB');
            return;
        }

        try {
            setUploading(true);

            const formData = new FormData();
            if (type === 'image') {
                formData.append('imagen', file);
            } else {
                formData.append('cv', file);
            }

            const endpoint = type === 'image' ? '/upload/image' : '/upload/document';
            const response = await api.post(endpoint, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            // Detectar si es URL completa (Supabase) o ruta relativa (local)
            let fileUrl = response.data.url;
            if (!fileUrl.startsWith('http')) {
                // Es ruta local, concatenar con URL del backend
                fileUrl = `${api.defaults.baseURL.replace('/api', '')}${fileUrl}`;
            }

            setPreview(fileUrl);
            onChange(fileUrl);
            toast.success('Archivo subido exitosamente');

        } catch (error) {
            console.error('Error al subir archivo:', error);
            toast.error(error?.response?.data?.error || 'Error al subir archivo');
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async () => {
        // Solo intentar eliminar del servidor si es una URL de Supabase o local
        if (preview && (preview.includes('supabase.co') || preview.includes('/uploads/'))) {
            try {
                await api.delete('/upload/file', {
                    data: { filepath: preview }
                });

                toast.success('Archivo eliminado del servidor');
            } catch (error) {
                console.error('Error al eliminar archivo:', error);
                toast.error('Error al eliminar archivo del servidor');
            }
        }

        setPreview('');
        onChange('');
    };

    return (
        <Box>
            <FormControl component="fieldset" sx={{ mb: 2 }}>
                <FormLabel component="legend">{label}</FormLabel>
                <RadioGroup row value={mode} onChange={handleModeChange}>
                    <FormControlLabel
                        value="url"
                        control={<Radio size="small" />}
                        label="URL Externa"
                    />
                    <FormControlLabel
                        value="file"
                        control={<Radio size="small" />}
                        label="Subir Archivo"
                    />
                </RadioGroup>
            </FormControl>

            {mode === 'url' ? (
                <TextField
                    fullWidth
                    label="URL del archivo"
                    value={preview}
                    onChange={handleUrlChange}
                    placeholder="https://ejemplo.com/archivo.jpg"
                    helperText={helperText}
                    InputProps={{
                        startAdornment: <LinkIcon sx={{ mr: 1, color: 'text.secondary' }} />
                    }}
                />
            ) : (
                <Box>
                    <Button
                        variant="outlined"
                        component="label"
                        startIcon={<UploadIcon />}
                        disabled={uploading}
                        fullWidth
                        sx={{ mb: 1 }}
                    >
                        {uploading ? 'Subiendo...' : 'Seleccionar Archivo'}
                        <input
                            type="file"
                            hidden
                            accept={accept}
                            onChange={handleFileSelect}
                        />
                    </Button>
                    {helperText && (
                        <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 1 }}>
                            {helperText}
                        </Typography>
                    )}
                    {uploading && <LinearProgress sx={{ mb: 1 }} />}
                </Box>
            )}

            {/* Preview */}
            {preview && !uploading && (
                <Paper
                    sx={{
                        mt: 2,
                        p: 2,
                        border: '2px dashed #2a2a2a',
                        borderRadius: 2,
                        position: 'relative'
                    }}
                >
                    <IconButton
                        size="small"
                        onClick={handleDelete}
                        sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            bgcolor: 'rgba(0,0,0,0.7)',
                            color: '#fff',
                            '&:hover': { bgcolor: '#ff3b30' }
                        }}
                    >
                        <DeleteIcon fontSize="small" />
                    </IconButton>

                    {type === 'image' ? (
                        <Box
                            component="img"
                            src={preview}
                            alt="Preview"
                            sx={{
                                width: '100%',
                                maxHeight: 200,
                                objectFit: 'contain',
                                borderRadius: 1
                            }}
                            onError={(e) => {
                                e.target.style.display = 'none';
                            }}
                        />
                    ) : (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <ImageIcon color="primary" />
                            <Typography variant="body2" sx={{ wordBreak: 'break-all' }}>
                                {preview}
                            </Typography>
                        </Box>
                    )}
                </Paper>
            )}
        </Box>
    );
};

export default FileUploader;
