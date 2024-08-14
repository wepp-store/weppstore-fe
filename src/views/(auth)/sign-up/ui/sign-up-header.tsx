import { Button } from '@nextui-org/react';
import { ChevronLeft } from 'lucide-react';
import React from 'react';

interface Props {
  title: string;
  onBack?: () => void;
  disabled?: boolean;
}

const SignUpHeader = ({ title, disabled = false, onBack }: Props) => {
  return (
    <header className="flex items-center text-center mb-10">
      {/* back button */}
      {onBack && (
        <Button
          isIconOnly
          variant="light"
          onPress={onBack}
          isDisabled={disabled}
        >
          <ChevronLeft />
        </Button>
      )}
      <h3 className="grow text-lg font-medium text-gray-900">{title}</h3>
      {/* blank box */}
      {onBack && (
        <span className="w-10 h-10" aria-label="blank box" aria-hidden="true" />
      )}
    </header>
  );
};

export default SignUpHeader;
