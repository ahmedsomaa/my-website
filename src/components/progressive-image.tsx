import {
  useLayoutEffect,
  useRef,
  useState,
  type ImgHTMLAttributes,
} from "react";
import { cn } from "@/lib/utils";

export type ProgressiveImageProps = {
  src: string;
  alt: string;
  className?: string;
  wrapperClassName?: string;
} & Pick<ImgHTMLAttributes<HTMLImageElement>, "loading" | "decoding">;

export function ProgressiveImage({
  src,
  alt,
  className,
  wrapperClassName,
  loading = "lazy",
  decoding = "async",
}: ProgressiveImageProps) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useLayoutEffect(() => {
    setLoaded(false);
  }, [src]);

  useLayoutEffect(() => {
    const el = imgRef.current;
    if (el?.complete && el.naturalHeight > 0) setLoaded(true);
  }, [src]);

  return (
    <div className={cn("relative overflow-hidden", wrapperClassName)}>
      {!loaded ? (
        <div
          className="absolute inset-0 z-0 bg-muted/55 animate-pulse"
          aria-hidden
        />
      ) : null}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        loading={loading}
        decoding={decoding}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
        className={cn(
          "relative z-[1] w-full transition-opacity duration-500 ease-out",
          loaded ? "opacity-100" : "opacity-0",
          className,
        )}
      />
    </div>
  );
}
