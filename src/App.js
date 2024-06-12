import React from 'react';
import DashPlayer from './DashPlayer';

const App = () => {
  const source = {
    url: 'https://turbofinn-dev.s3.ap-south-1.amazonaws.com/3209828-uhd_3840_2160_25fps.mpd',
    type: 'application/dash+xml',
    drmProtected: true
  };

  const license = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1cmxzIjpbIjovL2Nhc3RsYWJzLmNvbSJdLCJ0eXBlIjoiV2ViIiwia2lkIjoxOTUwLCJpbHYiOmZhbHNlfQ.jzGGRcbFr_2QET-4tbMcpR5pSaj7eV7X2d1HWw_VKQpPg3zCwSZSDuqw225dIYyAYwLSiElbozbZPSArkBXOsoUm-KZRUPF4m7WG0T7Uza5G-QaQw57BbbfcSsooSpatC997kHKLMTjO71By9Olcu5ykN164nZpGQtZNzQjYag-bnUaMVI5vvhzjlvDihORQ9V_qRlEh0-mpoz6W0-36HGAbWIXWq0kxPh6inbovby-ZmFpqGrVjWOEFa55EARZXPNW9ERupW5xrrYHZdwwTpdRTY5IwEnobS85yTrLhK8Y2MV4jlQLTtQp372fKDsuU6q6_4XvmNq1SgAoKoaf41g';

  const drmConfig = {
    serverURL: 'https://lic.staging.drmtoday.com/license-proxy-widevine/cenc/?specConform=true',
    abr: {
      enabled: true,
      defaultBandwidthEstimate: 1000,
      switchInterval: 8,
      bandwidthUpgradeTarget: 0.85,
      bandwidthDowngradeTarget: 0.95,
      restrictions: {
        minWidth: 0,
        maxWidth: null,
        minHeight: 0,
        maxHeight: null,
        minPixels: 0,
        maxPixels: null,
        minBandwidth: 0,
        maxBandwidth: null
      }
    },
    manifest: {
      attemptParameters: {
        maxAttempts: 1,
        baseDelay: 1000,
        backoffFactor: 2,
        fuzzFactor: 0.5,
        timeout: 0,
        fatalStatusCodes: [403, 401]
      }
    },
    streaming: {
      bufferingGoal: 10,
      rebufferingGoal: 2,
      bufferBehind: 30,
      stallThreshold: 3,
      stallSkip: 0.5
    }
  };

  return (
    <div>
      <h1>DASH.js Player in React with DRM</h1>
      <DashPlayer source={source} license={license} drmConfig={drmConfig} />
    </div>
  );
};

export default App;
