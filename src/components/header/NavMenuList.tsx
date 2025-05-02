import { NavMenuItem } from './NavMenuItem';

const MENU_LIST = [
  {
    label: '홈으로',
    href: '/',
  },
  {
    label: '프로젝트',
    href: '/projects',
  },
];

export function NavMenuList() {
  return (
    <nav className="px-8 pb-4 bg-white border-b border-soft-grey">
      <ul>
        {MENU_LIST.map((menu) => (
          <NavMenuItem key={menu.href} label={menu.label} href={menu.href} />
        ))}
      </ul>
    </nav>
  );
}
