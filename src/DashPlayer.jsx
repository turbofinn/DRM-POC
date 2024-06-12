import React, { useEffect, useRef } from 'react';
import dashjs from 'dashjs';

const DashPlayer = ({ source, license, drmConfig }) => {
    const videoRef = useRef(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const player = dashjs.MediaPlayer().create();

        // DRM configuration
        player.setProtectionData({
            'com.widevine.alpha': {
                serverURL: drmConfig.serverURL,
                httpRequestHeaders: {
                    'authorization': `Bearer ${license}`
                },
                robustnessLevel: 'SW_SECURE_DECODE'  // Example robustness level
            }
        });

        player.initialize(video, source.url, true);

        // Player settings based on provided configurations
        player.updateSettings({
            streaming: {
                abr: drmConfig.abr,
                bufferingGoal: drmConfig.streaming.bufferingGoal,
                rebufferingGoal: drmConfig.streaming.rebufferingGoal,
                bufferBehind: drmConfig.streaming.bufferBehind,
                stallThreshold: drmConfig.streaming.stallThreshold,
                stallSkip: drmConfig.streaming.stallSkip
            },
            manifest: {
                retryAttempts: drmConfig.manifest.attemptParameters.maxAttempts,
                retryInterval: drmConfig.manifest.attemptParameters.baseDelay
            }
        });

        // Event listener for license request errors
        player.on(dashjs.MediaPlayer.events.ERROR, (e) => {
            if (e.error === 'key_session') {
                console.error('DRM license request failed', e);
            }
        });

        return () => {
            player.reset();
        };
    }, [source, license, drmConfig]);

    return (
        <video
            ref={videoRef}
            controls
            style={{ width: '100%', height: 'auto' }}
            crossOrigin="anonymous"
        />
    );
};

export default DashPlayer;
