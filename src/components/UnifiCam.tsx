import React from 'react';

export function UnifiCam(url: string) {
    return (
      <video src={url} autoPlay muted playsInline width='100%' height='auto'>
          Your browser does not support the VIDEO tag and/or RTP streams.
      </video>
    );
}
