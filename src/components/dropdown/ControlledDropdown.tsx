'use client';

import { Controller, useFormContext } from 'react-hook-form';
import Dropdown from './Dropdown';
import { DropdownOption } from './types';

type ControlledDropdownProps = {
  label: string;
  name: string;
  options: DropdownOption[];
  placeholder: string;
  required?: boolean;
};

export default function ControlledDropdown({
  label,
  name,
  options,
  placeholder,
  required,
}: ControlledDropdownProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Dropdown
          label={label}
          name={name}
          options={options}
          placeholder={placeholder}
          required={required}
          selected={field.value}
          onSelect={(value) => field.onChange(value)}
        />
      )}
    />
  );
}
