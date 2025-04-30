import { Controller, useFormContext } from 'react-hook-form';
import { TextInput } from './TextInput';
import { TextInputProps } from './types';

export function ControlledTextInput({
  name,
  label,
  required,
  ...rest
}: TextInputProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextInput
          name={name}
          label={label}
          required={required}
          value={field.value}
          onChange={field.onChange}
          {...rest}
        />
      )}
    />
  );
}
