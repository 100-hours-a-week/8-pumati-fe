import { drawerAtom } from '@/store';
import { useSetAtom } from 'jotai';
import Link from 'next/link';

type NavMenuItemProps = {
  label: string;
  href: string;
};

export function NavMenuItem({ label, href }: NavMenuItemProps) {
  const setDrawerOpen = useSetAtom(drawerAtom);

  const handleClick = () => {
    setDrawerOpen(false);
  };
  return (
    <li className="flex w-full h-12">
      <Link
        href={href}
        className="flex items-center px-4 w-full h-full hover:bg-light-blue rounded-md transition-colors duration-200"
        onClick={handleClick}
      >
        {label}
      </Link>
    </li>
  );
}
