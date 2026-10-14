import { useLayoutEffect, useRef, useState } from 'react'
import type { ImgHTMLAttributes } from 'react'
import { clsx } from 'clsx'

export type ProgressiveImageProps = {
  src: string
  alt: string
  className?: string
  wrapperClassName?: string
} & Pick<
  ImgHTMLAttributes<HTMLImageElement>,
  'loading' | 'decoding' | 'srcSet' | 'sizes'
>

export function ProgressiveImage({
  src,
  alt,
  className,
  wrapperClassName,
  srcSet,
  sizes,
  loading = 'lazy',
  decoding = 'async',
}: ProgressiveImageProps) {
  const [loaded, setLoaded] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  useLayoutEffect(() => {
    setLoaded(false)
  }, [src])

  useLayoutEffect(() => {
    const el = imgRef.current
    if (el?.complete && el.naturalHeight > 0) setLoaded(true)
  }, [src])

  return (
    <div className={clsx('relative overflow-hidden', wrapperClassName)}>
      {!loaded ? (
        <div
          className="absolute inset-0 z-0 bg-muted/55 animate-pulse"
          aria-hidden
        />
      ) : null}
      <img
        ref={imgRef}
        src={src}
        srcSet={srcSet}
        sizes={sizes}
        alt={alt}
        loading={loading}
        decoding={decoding}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
        className={clsx(
          'relative z-[1] w-full outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10 transition-opacity duration-500 ease-out',
          loaded ? 'opacity-100' : 'opacity-0',
          className,
        )}
      />
    </div>
  )
}
