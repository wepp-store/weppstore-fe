import { RHFInput } from '@/shared/ui/hook-form';
import { Section } from '@/shared/ui/section';
import React from 'react';

const VersionSection = () => {
  return (
    <Section>
      <h2 className="text-xl font-semibold mb-4">버전 정보</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <RHFInput name="version" label="버전" type="text" placeholder="1.0.0" />
        {/* <RHFInput name="build" label="빌드" type="text" placeholder="1" /> */}
      </div>
    </Section>
  );
};

export default VersionSection;
