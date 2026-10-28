import { Routes } from '@angular/router';
import { Container } from './componentes/container/container';
import { Lista } from './componentes/lista/lista';
import { Relatorio } from './componentes/container/relatorio/relatorio';
import { Editar } from './componentes/editar/editar';
import { Processos } from './componentes/processos/processos';
import { CadastrarGrupo } from './componentes/cadastrar-grupo/cadastrar-grupo';
import { MercadoTerras } from './mercado-terras/mercado-terras';
import { EditarMerdadoDeTerras } from './mercado-terras/editar-merdado-de-terras/editar-merdado-de-terras';
import { Oferta } from './mercado-terras/oferta/oferta';
import { Opiniao } from './mercado-terras/opiniao/opiniao';
import { Transacao } from './mercado-terras/transacao/transacao';
import { ParecerTecnicoConclusivo } from './componentes/editar/parecer-tecnico-conclusivo/parecer-tecnico-conclusivo';

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
    path: 'mercado-terras',
    component: MercadoTerras,
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
  {
    path: 'CadastrarGrupo',
    component: CadastrarGrupo,
  },
  {
    path: 'editarMercadoDeTerras',
    component: EditarMerdadoDeTerras,
  },
  {
    path: 'transacao',
    component: Transacao,
  },
  {
    path: 'oferta',
    component: Oferta,
  },
  {
    path: 'opiniao',
    component: Opiniao,
  },

  {
    path: 'parecer-tecnico-conclusivo',
    component: ParecerTecnicoConclusivo,
  },
];
