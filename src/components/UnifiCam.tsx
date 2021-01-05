import React, {useEffect, useRef} from 'react';
import videojs from 'video.js';

export function UnifiCam(url: string) {
    // const videoJsOptions: videojs.PlayerOptions = {
    //   autoplay: true,
    //   controls: true,
    //   sources: [{
    //     src: url,
    //     type: 'application/x-mpegURL',
    //   }]
    // };

    const playerRef = useRef();

    useEffect(() => {
      const player = videojs(playerRef.current, { autoplay: true, muted: true }, () => {
        player.src(url);
      });
  
      return () => {
        player.dispose();
      };
    }, []);
  
    return (
      <div data-vjs-player>
        <video ref={playerRef.current} className="video-js vjs-16-9" playsInline />
      </div>
    );
}
