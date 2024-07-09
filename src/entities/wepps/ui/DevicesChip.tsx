import { Chip } from '@nextui-org/react';
import { Monitor, Smartphone, Tablet } from 'lucide-react';

export const DesktopChip = () => {
  return (
    <Chip className="py-2 px-3">
      <Monitor />
    </Chip>
  );
};

export const MobileChip = () => {
  return (
    <Chip className="py-2 px-3">
      <Smartphone />
    </Chip>
  );
};

export const TabletChip = () => {
  return (
    <Chip className="py-2 px-3">
      <Tablet />
    </Chip>
  );
};
