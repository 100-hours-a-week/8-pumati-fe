'use client';

import { useEffect, useRef, useState } from 'react';

export function useImageUploader(
  value: File[],
  onChange: (files: File[]) => void,
  maxImages: number,
) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previews, setPreviews] = useState<string[]>([]);

  const handleFileInputClick = () => {
    if (value.length >= maxImages) return;

    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newFiles = Array.from(files);
    const currentFiles = [...value];

    const combinedFiles = [...currentFiles, ...newFiles].slice(0, maxImages);

    onChange(combinedFiles);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeImage = (index: number) => {
    const newFiles = [...value];
    newFiles.splice(index, 1);
    onChange(newFiles);
  };

  // URL 해제에 대한 최적화 필요
  useEffect(() => {
    previews.forEach((url) => URL.revokeObjectURL(url));

    const newPreviews = value.map((file) => URL.createObjectURL(file));
    setPreviews(newPreviews);

    return () => {
      newPreviews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [value]);

  return {
    fileInputRef,
    previews,
    handleFileInputClick,
    handleFileChange,
    removeImage,
  };
}
