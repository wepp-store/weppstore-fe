'use client';

import React from 'react';

const useDevice = () => {
  const [isIOS, setIsIOS] = React.useState(false);

  React.useEffect(() => {
    setIsIOS(/iPad|iPhone|iPod/.test(navigator.userAgent));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { isIOS };
};

export default useDevice;
