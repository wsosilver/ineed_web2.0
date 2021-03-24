import { Component, OnInit } from '@angular/core';
import { NbSidebarService } from '@nebular/theme';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-front-show',
  templateUrl: './front-show.component.html',
  styleUrls: ['./front-show.component.scss']
})
export class FrontShowComponent implements OnInit {
  title = 'ineed-web';

  loginHidders = false;
  errorShower = false;

  items = [
    {
      title: 'Painel',
      icon: 'bar-chart-outline',
      link: ['/home'],
    },
    {
      title: 'Fornecedores',
      icon: 'car-outline',
      link: ['/fornecedor/2'],
    },
    {
      title: 'Colaboradores',
      icon: 'people-outline',
      link: ['/colaborador/4'],
    },
    {
      title: 'Clientes',
      icon: { icon: 'person-outline', pack: 'eva' },
      link: ['/cliente/1'],
    },
    {
      title: 'Serviços',
      icon: 'bulb-outline',
      link: ['/servico'],
    },
    {
      title: 'Categorias',
      icon: 'menu-2-outline',
      link: ['/categoria'],
    },
    {
      title: 'Taxas',
      icon: 'percent-outline',
      link: ['/taxa'],
    },
    {
      title: 'Cupons',
      icon: 'credit-card-outline',
      link: ['/cupon'],
    },
    {
      title: 'Relatórios',
      icon: 'clipboard-outline',
      link: [''],
      expanded: false,
      children: [
        {title: 'Solicitações', link: ['/solicitacao']},
        {title: 'Visitas', link: ['/visita']},
        {title: 'Orçamentos', link: ['/orcamento']},
      ]
    },
    {
      title: 'Sair',
      icon: 'log-out-outline',
      link: [],
    },
  ];
  
  constructor(private sidebarService: NbSidebarService, private activatedRoute: ActivatedRoute) {
    
  }

  ngOnInit() {


  }

  onClose() {
    this.errorShower = false;
  }

  toggle() {
    this.sidebarService.toggle(false, 'left');
  }

}
