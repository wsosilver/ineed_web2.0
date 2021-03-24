import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ColaboradorListComponent } from './colaborador-list/colaborador-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrMaskerModule } from 'br-mask';

import { HttpModule } from '@angular/http';
import { DataTableComponent } from './data-table/data-table.component';
import { AlertComponent } from './alert/alert.component';
import { ColaboradorFormComponent } from './colaborador-form/colaborador-form.component';

import { NgbModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { NbThemeModule, NbLayoutModule, NbSidebarModule, NbSidebarService, NbMenuModule, NbUserModule, NbCardModule, NbIconModule, NbSpinnerModule, NbAlertModule, NbDatepickerModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { ServicosComponent } from './servicos-form/servicos.component';
import { ServicosListComponent } from './servicos-list/servicos-list.component';
import { CategoriaListComponent } from './categoria-list/categoria-list.component';
import { CategoriaFormComponent } from './categoria-form/categoria-form.component';
import { TaxasListComponent } from './taxas-list/taxas-list.component';
import { TaxasFormComponent } from './taxas-form/taxas-form.component';
import { SolicitacoesListComponent } from './solicitacoes-list/solicitacoes-list.component';
import { VisitasListComponent } from './visitas-list/visitas-list.component';
import { OrcamentoListComponent } from './orcamento-list/orcamento-list.component';
import { CuponsListComponent } from './cupons-list/cupons-list.component';
import { CuponsFormComponent } from './cupons-form/cupons-form.component';
import { FrontShowComponent } from './front-show/front-show.component';

import { ChartsModule } from 'ng2-charts';
import { SolicitacoesFormComponent } from './solicitacoes-form/solicitacoes-form.component';
import { VisitasFormComponent } from './visitas-form/visitas-form.component';
import { NgxMaskModule } from 'ngx-mask'

import { NgPipesModule } from 'ngx-pipes';
import { OrcamentoFormComponent } from './orcamento-form/orcamento-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ColaboradorListComponent,
    DataTableComponent,
    AlertComponent,
    ColaboradorFormComponent,
    ServicosComponent,
    ServicosListComponent,
    CategoriaListComponent,
    CategoriaFormComponent,
    TaxasListComponent,
    TaxasFormComponent,
    SolicitacoesListComponent,
    VisitasListComponent,
    OrcamentoListComponent,
    CuponsListComponent,
    CuponsFormComponent,
    FrontShowComponent,
    SolicitacoesFormComponent,
    VisitasFormComponent,
    OrcamentoFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    BrMaskerModule,
    NgbModule,
    NgbModalModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NgxMaskModule.forRoot(),
    NbMenuModule.forRoot(),
    NbLayoutModule,
    NbSidebarModule,
    NbEvaIconsModule,
    NbIconModule,
    NbUserModule,
    NbSpinnerModule,
    NbCardModule,
    NbAlertModule,
    NbDatepickerModule,
    ChartsModule,
    NgPipesModule
  ],
  providers: [NbSidebarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
