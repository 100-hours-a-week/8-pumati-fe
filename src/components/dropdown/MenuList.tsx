import MenuItem from './MenuItem';
import { DropdownOption, DropdownValue } from './types';

type MenuListProps = {
  options: DropdownOption[];
  onSelect: (value: DropdownValue) => void;
};

export default function MenuList({ options, onSelect }: MenuListProps) {
  return (
    <ul className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg border-grey overflow-hidden">
      {options.map((option) => (
        <MenuItem key={option.value} option={option} onSelect={onSelect} />
      ))}
    </ul>
  );
}
