import { useState } from "react";
import { ImageIcon } from "lucide-react";

export function ArtImage({ src, alt, label, className = "" }: { src?: string | undefined; alt: string; label: string; className?: string }) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) {
    return (
      <div role="img" aria-label={alt} className={`flex flex-col items-center justify-center gap-3 bg-muted text-muted-foreground ${className}`}>
        <div className="absolute inset-3 border border-accent/40" aria-hidden />
        <ImageIcon className="h-8 w-8 text-accent" aria-hidden />
        <span className="font-display text-lg italic">{label}</span>
      </div>
    );
  }
  return <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} className={`object-cover ${className}`} />;
}
