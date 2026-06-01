import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  aspectRatio?: string;
  containerClassName?: string;
  priority?: boolean;
}

export function OptimizedImage({
  src,
  alt,
  className = '',
  aspectRatio = 'auto',
  containerClassName = '',
  priority = false,
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

  const { onDrag: _onDrag, ...filteredProps } = props;

  return (
    <div
      className={`${baseContainerClasses} ${containerClassName}`}
      style={{ aspectRatio }}
    >
      {/* Skeleton / Placeholder */}
      <AnimatePresence>
        {!isLoaded && !priority && (
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
          isLoaded || priority ? 'opacity-100' : 'opacity-0'
        } ${className}`}
        onLoad={() => setIsLoaded(true)}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        initial={priority ? {} : { filter: 'blur(10px)', scale: 1.05 }}
        animate={(isLoaded || priority) ? { filter: 'blur(0px)', scale: 1 } : {}}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        {...(filteredProps as any)}
      />
    </div>
  );
}
