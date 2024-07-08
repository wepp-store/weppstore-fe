import { Controller, useFormContext } from 'react-hook-form';
import { Input, InputProps } from '@nextui-org/react';

interface Props extends InputProps {
  name: string;
  loading?: boolean;
}

export default function RHFInput({ name, loading = false, ...other }: Props) {
  const { control, setValue } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Input
          isClearable
          labelPlacement="outside"
          onClear={() => setValue(name, '')}
          {...field}
          {...other}
        />
      )}
    />
  );
}
