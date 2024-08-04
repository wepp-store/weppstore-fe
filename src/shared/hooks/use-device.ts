'use client';

const useDevice = () => {
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

  const isTablet = /iPad/.test(navigator.userAgent);

  const isDesktop = !isMobile && !isTablet;

  return {
    isIOS,
    isMobile,
    isTablet,
    isDesktop,
  };
};

export default useDevice;
