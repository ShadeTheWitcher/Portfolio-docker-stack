import React from 'react';
import './ImageLightbox.scss';

const ImageLightbox = ({ images, currentIndex, onClose, onNext, onPrev }) => {
    if (!images || images.length === 0) return null;

    const handleBackdropClick = (e) => {
        if (e.target.className === 'lightbox-backdrop') {
            onClose();
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Escape') onClose();
        if (e.key === 'ArrowLeft') onPrev();
        if (e.key === 'ArrowRight') onNext();
    };

    React.useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'unset';
        };
    }, [currentIndex]);

    return (
        <div className="lightbox-backdrop" onClick={handleBackdropClick}>
            <button className="lightbox-close" onClick={onClose}>
                <i className="fas fa-times"></i>
            </button>

            {images.length > 1 && (
                <>
                    <button className="lightbox-nav lightbox-prev" onClick={onPrev}>
                        <i className="fas fa-chevron-left"></i>
                    </button>
                    <button className="lightbox-nav lightbox-next" onClick={onNext}>
                        <i className="fas fa-chevron-right"></i>
                    </button>
                </>
            )}

            <div className="lightbox-content">
                <img
                    src={images[currentIndex].url}
                    alt={`Screenshot ${currentIndex + 1}`}
                    className="lightbox-image"
                />
                {images.length > 1 && (
                    <div className="lightbox-counter">
                        {currentIndex + 1} / {images.length}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ImageLightbox;
