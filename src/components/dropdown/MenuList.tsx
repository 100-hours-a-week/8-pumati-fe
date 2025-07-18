import { useOutsideClick } from '@/hooks';
import { RefObject, useRef } from 'react';
import { MenuItem } from './MenuItem';
import { DropdownOption, DropdownValue } from './types';

type MenuListProps = {
  options: DropdownOption[];
  selected?: string;
  onSelect: (value: DropdownValue) => void;
  onOutsideClick: () => void;
  buttonRef: RefObject<HTMLButtonElement | null>;
};

export function MenuList({
  options,
  selected,
  onSelect,
  onOutsideClick,
  buttonRef,
}: MenuListProps) {
  const ref = useRef<HTMLUListElement>(null);

  useOutsideClick([ref, buttonRef], onOutsideClick);

  return (
    <ul
      ref={ref}
      className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg border-grey max-h-32 overflow-auto"
    >
      {options.map((option) => (
        <MenuItem
          key={option.value}
          option={option}
          onSelect={onSelect}
          isSelected={selected === option.label}
        />
      ))}
    </ul>
  );
}
