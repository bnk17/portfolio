import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  aspectRatio?: string;
  containerClassName?: string;
}

export function OptimizedImage({
  src,
  alt,
  className = '',
  aspectRatio = 'auto',
  containerClassName = '',
  ...props
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  // Only apply relative if no other positioning is provided
  const isPositioned =
    containerClassName.includes('absolute') ||
    containerClassName.includes('fixed') ||
    containerClassName.includes('relative') ||
    containerClassName.includes('sticky');

  const baseContainerClasses = `${!isPositioned ? 'relative' : ''} overflow-hidden w-full h-full`;

  return (
    <div
      className={`${baseContainerClasses} ${containerClassName}`}
      style={{ aspectRatio }}
    >
      {/* Skeleton / Placeholder */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-10 bg-zinc-100 animate-pulse"
          />
        )}
      </AnimatePresence>

      <motion.img
        src={src}
        alt={alt || ''}
        className={`block h-full w-full object-cover transition-opacity duration-500 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${className}`}
        onLoad={() => setIsLoaded(true)}
        loading="lazy"
        decoding="async"
        initial={{ filter: 'blur(10px)', scale: 1.05 }}
        animate={isLoaded ? { filter: 'blur(0px)', scale: 1 } : {}}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        {...props}
      />
    </div>
  );
}
