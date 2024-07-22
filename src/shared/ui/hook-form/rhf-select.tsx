import {
  Button,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownTrigger,
} from '@nextui-org/react';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

interface Props {
  name: string;
  label: string;
  description?: string;
  defaultValue?: any;
  options: { label: string; value: any }[];
}

const RHFSelect = ({
  label,
  name,
  description,
  defaultValue,
  options,
  ...other
}: Props) => {
  const { control, setValue } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className="flex flex-col w-full">
          <label className="text-sm mb-1">{label}</label>
          <Dropdown>
            <DropdownTrigger>
              <Button variant="bordered" className="justify-start">
                {field.value || defaultValue}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label={label}
              variant="flat"
              disallowEmptySelection
              selectionMode="single"
              selectedKeys={[field.value || defaultValue]}
              {...other}
            >
              {options.map((option) => (
                <DropdownItem
                  key={option.value}
                  onPress={() => setValue(name, option.value)}
                >
                  {option.label}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          <div className="p-1 text-tiny text-foreground-400">{description}</div>
        </div>
      )}
    />
  );
};

export default RHFSelect;
