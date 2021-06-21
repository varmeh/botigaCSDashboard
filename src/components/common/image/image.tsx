import React, { useState } from "react";

type imageProps = {
  src: string;
  alt: string;
  className: string;
  onError?: () => void;
};

export default function Image({
  src,
  alt,
  className,
  onError,
}: imageProps): JSX.Element | null {
  const [showImage, setShowImage] = useState<boolean>(true);

  function handleError(): void {
    if (typeof onError === "function") {
      onError();
    } else {
      setShowImage(false);
    }
  }

  return showImage && src ? (
    <img className={className} src={src} alt={alt} onError={handleError} />
  ) : null;
}
