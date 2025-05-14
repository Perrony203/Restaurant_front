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
  }
];
