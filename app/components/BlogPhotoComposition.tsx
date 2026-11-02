import Image from "next/image";

type Photo = { src: string; alt: string };

export function BlogPhotoComposition({ photos, variant, priority = false }: {
  photos: Photo[];
  variant: "opening" | "wide" | "layered" | "mosaic";
  priority?: boolean;
}) {
  const count = variant === "wide" ? 1 : variant === "mosaic" ? 3 : 2;
  return (
    <div className={`blog-photo-composition blog-photo-${variant}`}>
      {photos.slice(0, count).map((photo, index) => (
        <div key={`${photo.src}-${index}`} className={`blog-photo-slot blog-photo-slot-${index + 1}`}>
          <Image src={photo.src} alt={photo.alt} fill priority={priority && index === 0} sizes={variant === "wide" ? "(max-width: 767px) 100vw, 50vw" : "(max-width: 767px) 70vw, 35vw"} />
        </div>
      ))}
      {variant === "opening" && <span className="blog-photo-caption">Rooted in the soil.</span>}
    </div>
  );
}
