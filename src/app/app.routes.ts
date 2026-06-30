import { Routes } from '@angular/router';
import { Container } from './componentes/container/container';

export const routes: Routes = [
  {
    path: '',
    component: Container,
    pathMatch: 'full', // garante correspondência exata do caminho vazio
  },
];
