import { Controller, useFormContext } from 'react-hook-form';
import { Input, InputProps } from '@nextui-org/react';

interface Props extends InputProps {
  name: string;
}

export default function RHFInput({
  name,
  isInvalid,
  isReadOnly,
  isClearable = true,
  ...other
}: Props) {
  const { control, setValue } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Input
          labelPlacement="outside"
          // TODO: isReadOnly일 때 clear 버튼이 보이지 않도록 nextui에 요청
          isClearable={isClearable && !isReadOnly}
          onClear={
            isClearable && !isReadOnly ? () => setValue(name, '') : undefined
          }
          isReadOnly={isReadOnly}
          isInvalid={!!error || isInvalid}
          errorMessage={error?.message}
          {...field}
          {...other}
        />
      )}
    />
  );
}
