import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Opciones',
  },
  {
    displayName: 'Servicios',
    iconName: 'tools',
    route: '/dashboard/servicios',
  },
  {
    displayName: 'Empleados',
    iconName: 'users',
    route: '/dashboard/empleados',
  },
  {
    displayName: 'Services',
    iconName: 'settings',
    route: '/dashboard/services',
  },
  {
    displayName: 'Employees',
    iconName: 'user-check',
    route: '/dashboard/employees',
  }
];
