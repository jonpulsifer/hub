import React, {useRef, useState, useEffect} from 'react';
import videojs, { VideoJsPlayer } from 'video.js';

const usePlayer = ({ sources, controls, autoplay }: videojs.PlayerOptions) => {
  const options = {
    fill: true,
    fluid: true,
    preload: 'auto',
    html5: {
      vhs: {
        enableLowInitialPlaylist: true,
        smoothQualityChange: true,
        overrideNative: true,
      },
    },
  };
  const videoRef = useRef(null);
  const [player, setPlayer] = useState<VideoJsPlayer>();

  useEffect(() => {
    const vjsPlayer = videojs(videoRef.current, {
      ...options,
      controls,
      autoplay,
      sources,
    });
    setPlayer(vjsPlayer);

    return () => {
      if (player && player !== null) {
        player.dispose();
      }
    };
  }, []);
  useEffect(() => {
    if (player && player !== null && sources) {
      player.src(sources);
    }
  }, [sources]);

  return videoRef;
};

export function UnifiCam() {  
    const videoJsOptions: Partial<videojs.PlayerOptions> = {
      autoplay: true,
      controls: true,
      sources: [{
        src: "/video/video.m3u8",
        type: 'application/x-mpegURL',
      }]
    };
  
    const playerRef = usePlayer(videoJsOptions);

    return (
      <div data-vjs-player>
        <video ref={playerRef} className="video-js" />
      </div>
    );
}
