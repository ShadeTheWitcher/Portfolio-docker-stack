import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProjectById } from '../../services/projectService';
import ImageLightbox from '../../components/ImageLightbox';
import './ProjectDetails.scss';

const ProjectDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                setLoading(true);
                const data = await getProjectById(id);
                setProject(data);
                setSelectedImage(data.imagen);
            } catch (err) {
                console.error('Error al cargar proyecto:', err);
                setError('No se pudo cargar el proyecto');
            } finally {
                setLoading(false);
            }
        };

        fetchProject();
    }, [id]);

    if (loading) {
        return (
            <div className="project-details-loading">
                <div className="loader"></div>
            </div>
        );
    }

    if (error || !project) {
        return (
            <div className="project-details-error">
                <h2>Proyecto no encontrado</h2>
                <button onClick={() => navigate('/proyectos')} className="btn-back">
                    Volver a Proyectos
                </button>
            </div>
        );
    }

    // Helper para extraer ID de YouTube
    const getYoutubeId = (url) => {
        if (!url) return null;
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    const youtubeId = getYoutubeId(project.video_url);

    const handleImageClick = (index) => {
        setLightboxIndex(index);
        setLightboxOpen(true);
    };

    const handleLightboxClose = () => {
        setLightboxOpen(false);
    };

    const handleLightboxNext = () => {
        if (project.imagenes_adicionales) {
            setLightboxIndex((prev) =>
                prev === project.imagenes_adicionales.length - 1 ? 0 : prev + 1
            );
        }
    };

    const handleLightboxPrev = () => {
        if (project.imagenes_adicionales) {
            setLightboxIndex((prev) =>
                prev === 0 ? project.imagenes_adicionales.length - 1 : prev - 1
            );
        }
    };

    return (
        <div className="project-details-container">
            <button onClick={() => navigate('/proyectos')} className="btn-back-floating">
                <i className="fas fa-arrow-left"></i> Volver
            </button>

            <div className="project-header">
                <div className="project-meta">
                    <span className="project-category">{project.categoria_nombre}</span>
                    <h1 className="project-title">{project.name_proyect}</h1>
                    <div className="project-tech-stack">
                        {project.tecnologias && project.tecnologias.map((tech, index) => (
                            <div key={index} className="tech-badge" title={tech.nombre}>
                                {tech.imagen ? (
                                    <img src={tech.imagen} alt={tech.nombre} />
                                ) : (
                                    <i className="fas fa-code"></i>
                                )}
                                <span>{tech.nombre}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="project-actions">
                    {project.link_web && (
                        <a href={project.link_web} target="_blank" rel="noopener noreferrer" className="btn-primary">
                            <i className="fas fa-external-link-alt"></i> Ver Demo
                        </a>
                    )}
                    {project.link_github && (
                        <a href={project.link_github} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                            <i className="fab fa-github"></i> Código
                        </a>
                    )}
                </div>
            </div>

            <div className="project-content">
                <div className="media-section">
                    {/* Video Section */}
                    {youtubeId && (
                        <div className="video-container">
                            <iframe
                                src={`https://www.youtube.com/embed/${youtubeId}`}
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    )}

                    {/* Main Image (if no video or as fallback) */}
                    {!youtubeId && project.imagen && (
                        <div className="main-image-container">
                            <img src={project.imagen} alt={project.name_proyect} className="main-image" />
                        </div>
                    )}

                    {/* Screenshots Gallery */}
                    {project.imagenes_adicionales && project.imagenes_adicionales.length > 0 && (
                        <div className="gallery-section">
                            <h3>Galería</h3>
                            <div className="gallery-grid">
                                {project.imagenes_adicionales.map((img, index) => (
                                    <div
                                        key={index}
                                        className="gallery-item"
                                        onClick={() => handleImageClick(index)}
                                    >
                                        <img src={img.url} alt={`Screenshot ${index + 1}`} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className="info-section">
                    <div className="description-card">
                        <h3>Sobre el Proyecto</h3>
                        <p className="project-description">{project.descripcion}</p>
                    </div>
                </div>
            </div>

            {lightboxOpen && project.imagenes_adicionales && (
                <ImageLightbox
                    images={project.imagenes_adicionales}
                    currentIndex={lightboxIndex}
                    onClose={handleLightboxClose}
                    onNext={handleLightboxNext}
                    onPrev={handleLightboxPrev}
                />
            )}
        </div>
    );
};

export default ProjectDetails;
