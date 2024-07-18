import { Section } from '@/shared/ui/section';
import { Checkbox } from '@nextui-org/react';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Monitor, Smartphone, Tablet } from 'lucide-react';
import { type WeppField } from '../lib';

const UpdateWeppDevicesSection = () => {
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<WeppField>();

  const values = watch();

  const { isDesktop, isMobile, isTablet } = values;

  const onChange =
    (name: 'isDesktop' | 'isMobile' | 'isTablet') => (isSelected: boolean) => {
      setValue(name, isSelected);
    };

  // @ts-ignore
  const error = errors.devices;

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

      {error && (
        <div data-slot="error-message" className="text-tiny text-danger mt-2">
          {error.message}
        </div>
      )}
    </Section>
  );
};

export default UpdateWeppDevicesSection;
