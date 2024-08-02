import { Chip, Tooltip } from '@nextui-org/react';
import { Monitor, Smartphone, Tablet } from 'lucide-react';

export const DesktopChip = () => {
  return (
    <Tooltip content="데스크탑 호환">
      {/* <Chip className="py-2 px-3"> */}
      <Monitor size={16} className="text-gray-500" />
      {/* </Chip> */}
    </Tooltip>
  );
};

export const MobileChip = () => {
  return (
    <Tooltip content="모바일 호환">
      {/* <Chip className="py-2 px-3"> */}
      <Smartphone size={16} className="text-gray-500" />
      {/* </Chip> */}
    </Tooltip>
  );
};

export const TabletChip = () => {
  return (
    <Tooltip content="태블릿 호환">
      {/* <Chip className="py-2 px-3"> */}
      <Tablet size={16} className="text-gray-500" />
      {/* </Chip> */}
    </Tooltip>
  );
};
