import { Controller, useFormContext } from 'react-hook-form';
import { Input, InputProps } from '@nextui-org/react';

interface Props extends InputProps {
  name: string;
}

export default function RHFInput({ name, ...other }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className="flex w-full">
          <Input
            type="text"
            labelPlacement="outside"
            errorMessage={error?.message}
            isInvalid={!!error}
            {...field}
            {...other}
            endContent={<input type="color" {...field} />}
          />
        </div>
      )}
    />
  );
}
