import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Home',
  },
  {
    displayName: 'Dishes',
    iconName: 'tools-kitchen-2',
    route: '/dashboard/dishes',
  },
  {
    displayName: 'Ingredients',
    iconName: 'avocado',
    route: '/dashboard/ingredients',
  }
];
