import React from 'react';

const FALLBACK_IMAGE = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%231e293b'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%2394a3b8' font-family='sans-serif' font-size='16'%3EImage Unavailable%3C/text%3E%3C/svg%3E";

function Image({
  src,
  alt = "Image",
  className = "",
  onError,
  ...props
}) {
  const handleError = (e) => {
    e.target.onerror = null;
    e.target.src = FALLBACK_IMAGE;
    if (onError) onError(e);
  };

  return (
    <img
      src={src || FALLBACK_IMAGE}
      alt={alt}
      className={className}
      onError={handleError}
      loading="lazy"
      {...props}
    />
  );
}

export default Image;
