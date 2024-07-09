import { Section } from '@/shared/ui/section';
import { Checkbox } from '@nextui-org/react';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { WeppField } from '../../types';
import { Monitor, Smartphone, Tablet } from 'lucide-react';

const UpdateWeppDevicesSection = () => {
  const { watch, setValue } = useFormContext<WeppField>();

  const values = watch();

  const { isDesktop, isMobile, isTablet } = values;

  const onChange =
    (name: 'isDesktop' | 'isMobile' | 'isTablet') => (isSelected: boolean) => {
      setValue(name, isSelected);
    };

  return (
    <Section>
      <h2 className="text-xl font-semibold mb-4">기기 호환성</h2>

      <div className="flex gap-4">
        <Checkbox isSelected={isDesktop} onValueChange={onChange('isDesktop')}>
          <div className="flex gap-2">
            <Monitor />
            데스크탑
          </div>
        </Checkbox>
        <Checkbox isSelected={isMobile} onValueChange={onChange('isMobile')}>
          <div className="flex gap-2">
            <Smartphone />
            모바일
          </div>
        </Checkbox>
        <Checkbox isSelected={isTablet} onValueChange={onChange('isTablet')}>
          <div className="flex gap-2">
            <Tablet />
            태블릿
          </div>
        </Checkbox>
      </div>
    </Section>
  );
};

export default UpdateWeppDevicesSection;
