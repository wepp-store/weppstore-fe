'use client';

import React from 'react';

const useDevice = () => {
  const [isIOS, setIsIOS] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);
  const [isTablet, setIsTablet] = React.useState(false);
  const [isDesktop, setIsDesktop] = React.useState(false);

  React.useEffect(() => {
    setIsIOS(/iPad|iPhone|iPod/.test(navigator.userAgent));

    setIsMobile(
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    );

    setIsTablet(/iPad/.test(navigator.userAgent));

    setIsDesktop(!isMobile && !isTablet);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    isIOS,
    isMobile,
    isTablet,
    isDesktop,
  };
};

export default useDevice;
