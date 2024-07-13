import { Controller, useFormContext } from 'react-hook-form';
import { Input, InputProps } from '@nextui-org/react';

interface Props extends InputProps {
  name: string;
}

export default function RHFInput({ name, isReadOnly, ...other }: Props) {
  const { control, setValue } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Input
          labelPlacement="outside"
          // TODO: isReadOnly일 때 clear 버튼이 보이지 않도록 nextui에 요청
          isClearable={!isReadOnly}
          onClear={!isReadOnly ? () => setValue(name, '') : undefined}
          isReadOnly={isReadOnly}
          {...field}
          {...other}
        />
      )}
    />
  );
}
