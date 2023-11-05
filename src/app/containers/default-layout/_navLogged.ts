import { INavData } from '@coreui/angular';

export let navItemsLogged: INavData[] = [
  {
    title: true,
    name: 'Páginas'
  },
  {
    name: 'Login',
    attributes: {hidden: true},
    url: '/theme/login',
    iconComponent: { name: 'cil-star' }
  },
  {
    name: 'Cliente',    
    attributes: {hidden: false},
    url: '/theme/cliente',
    iconComponent: { name: 'cil-people' }
  },
  {
    name: 'Maps',    
    attributes: {hidden: false},
    url: '/theme/maps',
    iconComponent: { name: 'cil-people' }
  },
];
