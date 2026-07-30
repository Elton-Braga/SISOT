import { Routes } from '@angular/router';
import { Container } from './componentes/container/container';
import { Lista } from './componentes/lista/lista';
import { Relatorio } from './componentes/container/relatorio/relatorio';
import { Editar } from './componentes/editar/editar';
import { Processos } from './componentes/processos/processos';

export const routes: Routes = [
  {
    path: '',
    component: Container,
    pathMatch: 'full',
  },
  {
    path: 'lista',
    component: Lista,
    pathMatch: 'full',
  },
  {
    path: 'relatorio',
    component: Relatorio,
  },
  {
    path: 'editar',
    component: Editar,
  },
  {
    path: 'processos',
    component: Processos,
  },
];
