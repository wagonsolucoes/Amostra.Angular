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
    url: '/theme/cliente'
  },
  {
    name: 'Emprestado',
    url: '/theme/emprestado'
  },
  {
    name: 'Livro',
    url: '/theme/livro'
  }
];
