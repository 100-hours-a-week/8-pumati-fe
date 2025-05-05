'use client';

import { InputHTMLAttributes } from 'react';

export type TextInputProps = InputHTMLAttributes<HTMLInputElement>;

export function TextInput({
  name,
  placeholder,
  value,
  onChange,
  maxLength,
  disabled,
}: TextInputProps) {
  return (
    <input
      id={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      maxLength={maxLength}
      disabled={disabled}
      className="px-4 py-3 placeholder:text-grey rounded-md outline-none border focus:border-transparent border-grey focus:ring-2 focus:ring-blue focus:ring-offset-0 disabled:bg-blue-white"
    />
  );
}
