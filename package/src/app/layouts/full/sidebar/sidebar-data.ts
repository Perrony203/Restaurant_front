import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Opciones',
  },
  {
    displayName: 'Dishes',
    iconName: 'tools-kitchen-2',
    route: '/dashboard/dishes',
  },
  {
    displayName: 'Services',
    iconName: 'briefcase',
    route: '/dashboard/services',
  },
  {
    displayName: 'Ingredients',
    iconName: 'avocado',
    route: '/dashboard/ingredients',
  },
  {
    displayName: 'Empleados',
    iconName: 'users',
    route: '/dashboard/employees',
  },
];
