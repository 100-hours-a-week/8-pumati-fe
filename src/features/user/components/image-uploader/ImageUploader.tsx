'use client';

import { PlusIcon, ProfileIcon } from '@/components/icons';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';

type ImageUploaderProps = {
  name: string;
  label: string;
  required?: boolean;
  value?: File | null;
  onChange: (file: File | null) => void;
};

export function ImageUploader({
  name,
  
  label,
  required,
  value,
  onChange,
}: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const {
    formState: { errors },
  } = useFormContext();

  const errorMessage = errors[name]?.message;

  const handleClick = () => {
    fileInputRef.current?.click();
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;

    onChange(file);
  };

  useEffect(() => {
    if (value) {
      const url = URL.createObjectURL(value);
      setPreview(url);

      return () => URL.revokeObjectURL(url);
    } else {
      setPreview(null);
    }
  }, [value]);
  return (
    <article className="relative flex flex-col gap-2 px-5 pt-3 pb-7 w-full max-w-[540px]">
      <label className="font-medium" htmlFor={name}>
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative self-center w-[120px] h-[120px]">
        <div
          onClick={handleClick}
          className="w-full h-full bg-light-grey rounded-full overflow-hidden flex items-end justify-center cursor-pointer"
        >
          {preview ? (
            <Image
              src={preview}
              alt="미리보기"
              width={120}
              height={120}
              className="w-full h-full object-cover"
            />
          ) : (
            <ProfileIcon width={88} height={88} fill="var(--color-soft-grey)" />
          )}
        </div>
        <button
          type="button"
          onClick={handleClick}
          className="absolute bottom-0 right-1 w-[28px] h-[28px] bg-soft-grey border-2 border-white rounded-full flex items-center justify-center"
        >
          <PlusIcon width={24} height={24} fill="var(--color-white)" />
        </button>
        <input
          ref={fileInputRef}
          id={name}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleChange}
        />
      </div>
      {errorMessage && (
        <p className="absolute bottom-0 text-sm text-red-500">
          {String(errorMessage)}
        </p>
      )}
    </article>
  );
}
