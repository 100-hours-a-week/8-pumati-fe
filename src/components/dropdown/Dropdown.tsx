'use client';

import { ArrowIcon } from '@/components/icons';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import MenuList from './MenuList';
import { DropdownOption, DropdownValue } from './types';

type DropdownProps = {
  label: string;
  name: string;
  options: DropdownOption[];
  placeholder: string;
  required?: boolean;
  selected?: DropdownValue;
  onSelect: (value: DropdownValue) => void;
};

export default function Dropdown({
  label,
  options = [],
  name,
  required,
  placeholder,
  selected,
  onSelect,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const {
    formState: { errors },
  } = useFormContext();

  const errorMessage = errors[name]?.message;

  const selectedLabel = options.find((opt) => opt.value === selected)?.label;

  const handleMenuToggle = () => {
    setIsOpen((prev) => !prev);
  };
  const handleSelect = (optionValue: DropdownValue) => {
    handleMenuToggle();
    onSelect(optionValue);
  };
  return (
    <article className="relative flex flex-col gap-2 px-5 pt-3 pb-7 max-w-[540px] w-full">
      <label className="font-medium" htmlFor={name}>
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <button
          type="button"
          onClick={handleMenuToggle}
          className="flex items-center justify-between w-full px-4 py-3 text-left border rounded-md border-grey focus:border-transparent focus:ring-2 focus:ring-blue focus:ring-offset-0 outline-none cursor-pointer"
        >
          <p className={selectedLabel ? '' : 'text-grey'}>
            {selectedLabel || placeholder}
          </p>
          <ArrowIcon
            width={24}
            height={24}
            fill="var(--color-grey)"
            className={`${isOpen ? 'rotate-0' : 'rotate-180'} transition-transform duration-200 ease-in-out`}
          />
        </button>
        {isOpen && <MenuList options={options} onSelect={handleSelect} />}
      </div>
      {errorMessage && (
        <p className="absolute bottom-0 text-sm text-red-500">
          {String(errorMessage)}
        </p>
      )}
    </article>
  );
}
