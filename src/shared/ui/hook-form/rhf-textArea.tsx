import { Controller, useFormContext } from 'react-hook-form';
import React from 'react';
import { TextAreaProps, Textarea } from '@nextui-org/react';

interface Props extends TextAreaProps {
  name: string;
  loading?: boolean;
}

export default function RHFTextarea({
  name,
  loading = false,
  ...other
}: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Textarea labelPlacement="outside" {...field} {...other} />
      )}
    />
  );
}
