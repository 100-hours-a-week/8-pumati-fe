'use client';

import { FormFieldWrapper } from '@/components';
import { Controller, useFormContext } from 'react-hook-form';
import { ImageUploader } from './ImageUploader';

type ControlledImageUploaderProps = {
  name: string;
  label?: string;
  required?: boolean;
  maxImages?: number;
};

export function ControlledImageUploader({
  name,
  label,
  required,
  maxImages = 5,
}: ControlledImageUploaderProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormFieldWrapper name={name} label={label} required={required}>
          <ImageUploader
            name={name}
            value={field.value || []}
            onChange={field.onChange}
            maxImages={maxImages}
          />
        </FormFieldWrapper>
      )}
    />
  );
}
