'use client';

import { ChangeEvent, KeyboardEvent, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { tagSchema } from '../schemas';

export function useTagInput(
  value: string[],
  onChange: (tags: string[]) => void,
  maxTags: number,
) {
  const [tagValue, setTagValue] = useState('');
  const {
    setError,
    clearErrors,
    trigger,
    setFocus,
    formState: { errors },
  } = useFormContext();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTagValue(e.target.value);

    if (!errors.tags) return;

    const trimmedTag = e.target.value.trim();
    if (trimmedTag !== '') {
      const result = tagSchema.safeParse(trimmedTag);
      if (result.success) {
        clearErrors('tags');
      }
    }
  };

  const addTag = async (tag: string) => {
    const result = tagSchema.safeParse(tag);
    if (!result.success) {
      setError('tags', {
        type: 'manual',
        message: result.error.errors[0].message,
      });
      return;
    }

    // 2) 중복/빈값/최대 개수 검증
    if (value.includes(tag) || value.length >= maxTags) {
      setTagValue('');
      setFocus('tags');
      return;
    }

    // 3) 성공 시: 기존 에러 제거, 값 변경, tags 배열 전체 검증 트리거
    clearErrors('tags');
    onChange([...value, tag]);
    setTagValue('');
    await trigger('tags');
  };

  const removeTag = (index: number) => {
    const newTags = [...value];
    newTags.splice(index, 1);
    onChange(newTags);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();

      if (e.nativeEvent.isComposing) return;

      const trimmedTag = tagValue.trim();
      if (trimmedTag === '') return;

      addTag(trimmedTag);
    }
  };

  return {
    tagValue,
    handleChange,
    handleKeyDown,
    removeTag,
  };
}
