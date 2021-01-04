import React from 'react';

export function NestCam(url: string) {
  return (
    <iframe
      allowFullScreen
      seamless
      frameBorder={0}
      loading="lazy"
      src={url}
      width="100%"
      height="315"
    />
  );
}
