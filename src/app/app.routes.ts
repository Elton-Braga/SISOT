import { Routes } from '@angular/router';
import { Container } from './componentes/container/container';
import { Lista } from './componentes/lista/lista';
import { Relatorio } from './componentes/container/relatorio/relatorio';

export const routes: Routes = [
  {
    path: '',
    component: Container,
    pathMatch: 'full', // garante correspondência exata do caminho vazio
  },
  {
    path: 'lista',
    component: Lista,
    pathMatch: 'full', // garante correspondência exata do caminho vazio
  },

  {
    path: 'relatorio',
    component: Relatorio,
  },
];
