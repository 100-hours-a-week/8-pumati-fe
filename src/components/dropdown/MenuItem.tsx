import { DropdownOption, DropdownValue } from './types';

type MenuItemProps = {
  option: DropdownOption;
  onSelect: (value: DropdownValue) => void;
};

export function MenuItem({ option, onSelect }: MenuItemProps) {
  const handleSelect = () => {
    onSelect(option.value);
  };

  return (
    <li
      role="option"
      aria-label={option.label}
      tabIndex={0}
      className="px-4 py-3 cursor-pointer hover:bg-light-grey transition-colors duration-150 ease-in-out"
      onClick={handleSelect}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          handleSelect();
        }
      }}
    >
      {option.label}
    </li>
  );
}
