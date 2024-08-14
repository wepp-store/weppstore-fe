import { Button, ButtonProps } from '@nextui-org/react';
import React from 'react';

interface Props extends ButtonProps {
  children: React.ReactNode;
}

const KeyboardAdjustButton = ({
  style,
  onPress,
  children,
  ...other
}: Props) => {
  const [keyboardHeight, setKeyboardHeight] = React.useState(0);

  React.useEffect(() => {
    const adjustButton = () => {
      if (window.visualViewport) {
        const newKeyboardHeight =
          window.visualViewport.height < window.innerHeight
            ? window.innerHeight - window.visualViewport.height
            : 0;
        setKeyboardHeight(newKeyboardHeight);
      } else {
        setKeyboardHeight(0);
      }
    };

    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', adjustButton);
    } else {
      window.addEventListener('resize', adjustButton);
    }

    return () => {
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', adjustButton);
      } else {
        window.removeEventListener('resize', adjustButton);
      }
    };
  }, []);

  const onPressEnd = (e: any) => {
    onPress?.(e);
  };

  return (
    <Button
      style={{ marginBottom: `${keyboardHeight}px`, ...style }}
      onPressEnd={onPressEnd}
      {...other}
    >
      {children}
    </Button>
  );
};

export default KeyboardAdjustButton;
