import React, { useEffect, useRef } from 'react';
import dashjs from 'dashjs';

const VideoPlayer = () => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    const initApp = () => {
      const url = "https://turbofinn-dev.s3.ap-south-1.amazonaws.com/3209828-uhd_3840_2160_25fps.mpd";
      const protData = {
        "com.widevine.alpha": {
          "serverURL": "https://lic.staging.drmtoday.com/license-proxy-widevine/cenc/?specConform=true",
          "httpRequestHeaders": {
            // "x-dt-auth-token": "your upfront token goes here"
            "x-dt-custom-data": "eyJ1c2VySWQiOiAicHVyY2hhc2UiLCAibWVyY2hhbnQiOiAiY2xpZW50X2RldiIsICJzZXNzaW9uSWQiOiAiZGVmYXVsdCJ9"
          }
        },
        "com.microsoft.playready": {
          "serverURL": "https://lic.staging.drmtoday.com/license-proxy-headerauth/drmtoday/RightsManager.asmx",
          "httpRequestHeaders": {
            // "x-dt-auth-token": "your upfront token goes here"
            "x-dt-custom-data": "eyJ1c2VySWQiOiAicHVyY2hhc2UiLCAibWVyY2hhbnQiOiAiY2xpZW50X2RldiIsICJzZXNzaW9uSWQiOiAiZGVmYXVsdCJ9"
          }
        }
      };

      if (videoRef.current) {
        const player = dashjs.MediaPlayer().create();
        playerRef.current = player;
        player.initialize(videoRef.current, url, true);
        player.setProtectionData(protData);
      }
    };

    initApp();

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, []);

  return (
    <video ref={videoRef} height="480" muted controls></video>
  );
};

export default VideoPlayer;
