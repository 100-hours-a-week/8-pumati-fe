'use client';

import { PlusIcon, ProfileIcon } from '@/components/icons';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

type ImageUploaderProps = {
  name: string;
  value?: File | null;
  onChange: (file: File | null) => void;
};

export function ImageUploader({ name, value, onChange }: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

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
  );
}
