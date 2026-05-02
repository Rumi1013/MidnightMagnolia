import Image from 'next/image';

/**
 * Decorative magnolia artwork for inner pages.
 * @param {{ src: string, alt: string, caption?: string, objectPosition?: string }} illustration
 */
export default function PageIllustration({ illustration }) {
  if (!illustration?.src) {
    return null;
  }
  const imgStyle = {
    objectFit: 'cover',
    ...(illustration.objectPosition ? { objectPosition: illustration.objectPosition } : {}),
  };
  return (
    <figure className="page-illustration">
      <div className="page-illustration__frame">
        <Image
          src={illustration.src}
          alt={illustration.alt}
          fill
          sizes="(max-width: 768px) 100vw, min(720px, 90vw)"
          style={imgStyle}
        />
      </div>
      {illustration.caption ? (
        <figcaption className="page-illustration__caption">{illustration.caption}</figcaption>
      ) : null}
    </figure>
  );
}
