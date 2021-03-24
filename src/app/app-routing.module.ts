import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ColaboradorListComponent } from './colaborador-list/colaborador-list.component';
import { ServicosListComponent } from './servicos-list/servicos-list.component';
import { CategoriaListComponent } from './categoria-list/categoria-list.component';
import { TaxasListComponent } from './taxas-list/taxas-list.component';
import { TaxasFormComponent } from './taxas-form/taxas-form.component';
import { SolicitacoesListComponent } from './solicitacoes-list/solicitacoes-list.component';
import { VisitasListComponent } from './visitas-list/visitas-list.component';
import { OrcamentoListComponent } from './orcamento-list/orcamento-list.component';
import { CuponsListComponent } from './cupons-list/cupons-list.component';

const routes: Routes = [
  {path: '*', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: 'colaborador/:id', component: ColaboradorListComponent},
  {path: 'fornecedor/:id', component: ColaboradorListComponent},
  {path: 'cliente/:id', component: ColaboradorListComponent},
  {path: 'servico', component: ServicosListComponent},
  {path: 'categoria', component: CategoriaListComponent},
  {path: 'taxa', component: TaxasFormComponent},
  {path: 'solicitacao', component: SolicitacoesListComponent},
  {path: 'visita', component: VisitasListComponent},
  {path: 'orcamento', component: OrcamentoListComponent},
  {path: 'cupon', component: CuponsListComponent},
  // {path: 'relatorios', component: RelatoriosComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
