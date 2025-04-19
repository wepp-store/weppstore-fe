'use client';

import { Tabs, Tab } from '@nextui-org/react';
import React from 'react';
import ManifestStep from './step/manifest-step';
import ServiceWorkerStep from './step/service-worker-step';

const MakePWAPage = () => {
  return (
    <div className="p-4">
      <Tabs variant="underlined" aria-label="Tabs variants">
        <Tab key="manifest" title="Manifest">
          <ManifestStep />
        </Tab>
        <Tab key="serviceWorker" title="Service worker">
          <ServiceWorkerStep />
        </Tab>
      </Tabs>
    </div>
  );
};

export default MakePWAPage;
