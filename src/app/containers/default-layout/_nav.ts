import { INavData } from '@coreui/angular';

export let navItems: INavData[] = [
  {
    title: true,
    name: 'Páginas'
  },
  {
    name: 'Login',
    url: '/theme/login',
    iconComponent: { name: 'cil-star' },
  },
  {
    name: 'Cliente',    
    url: '/theme/cliente',
    iconComponent: { name: 'cil-people' }
  },
  {
    name: 'Maps',    
    url: '/theme/maps',
    iconComponent: { name: 'cil-people' }
  },
  {
    name: 'Logout',
    url: '/theme/logout',
    iconComponent: { name: 'cil-star' },
  },
];
