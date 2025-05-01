'use client';

type TextInputProps = {
  name: string;
  placeholder: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function TextInput({
  name,
  placeholder,
  value,
  onChange,
}: TextInputProps) {
  return (
    <input
      id={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`px-4 py-3 placeholder:text-grey rounded-md outline-none border focus:border-transparent border-grey focus:ring-2 focus:ring-blue focus:ring-offset-0`}
    />
  );
}
