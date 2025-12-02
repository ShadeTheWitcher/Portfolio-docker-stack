import React from 'react';
import './Skeleton.scss';

const Skeleton = ({ variant = 'text', width, height, className = '', count = 1 }) => {
    const skeletons = Array.from({ length: count }, (_, index) => (
        <div
            key={index}
            className={`skeleton skeleton-${variant} ${className}`}
            style={{
                width: width || undefined,
                height: height || undefined,
            }}
        />
    ));

    return count === 1 ? skeletons[0] : <>{skeletons}</>;
};

export default Skeleton;
