import React, { useEffect } from 'react';

const AdSenseScript: React.FC = () => {
  useEffect(() => {
    const loadScript = () => {
      const script = document.createElement('script');
      script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=YOUR_ADSENSE_CLIENT_ID"; // IMPORTANT: Replace with your client ID
      script.async = true;
      script.crossOrigin = "anonymous";
      document.body.appendChild(script);
    };

    // Delay loading the script until after the initial page load to improve performance
    if (window.requestIdleCallback) {
      window.requestIdleCallback(loadScript);
    } else {
      // Fallback for older browsers
      setTimeout(loadScript, 3000);
    }
  }, []);

  return null;
};

export default AdSenseScript;
