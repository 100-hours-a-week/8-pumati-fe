'use client';

import { Controller, useFormContext } from 'react-hook-form';
import { FormFieldWrapper } from '../form';
import { TextInput } from './TextInput';

type ControlledTextInputProps = {
  name: string;
  label?: string;
  required?: boolean;
  placeholder: string;
};

export function ControlledTextInput({
  name,
  label,
  required,
  placeholder,
}: ControlledTextInputProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormFieldWrapper name={name} label={label} required={required}>
          <TextInput
            name={name}
            placeholder={placeholder}
            value={field.value}
            onChange={field.onChange}
          />
        </FormFieldWrapper>
      )}
    />
  );
}
