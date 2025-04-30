'use client';

import { useFormContext } from 'react-hook-form';

export interface TextInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  required?: boolean;
}

export function TextInput({ name, label, required, ...rest }: TextInputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const errorMessage = errors[name]?.message;

  return (
    <article className="relative flex flex-col gap-2 px-5 pt-3 pb-7 max-w-[540px] w-full">
      <label className="font-medium" htmlFor={name}>
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        {...register(name)}
        id={name}
        className={`px-4 py-3 placeholder:text-grey rounded-md outline-none border focus:border-transparent border-grey focus:ring-2 focus:ring-blue focus:ring-offset-0`}
        {...rest}
      />
      {errorMessage && (
        <p className="absolute bottom-0 text-sm text-red-500">
          {String(errorMessage)}
        </p>
      )}
    </article>
  );
}
