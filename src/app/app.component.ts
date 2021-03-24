import { Component, OnInit } from '@angular/core';
import { NbMenuService, NbMenuItem, NbSidebarService } from '@nebular/theme';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [NbMenuService]
})
export class AppComponent implements OnInit {
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
    // {
    //   title: 'XD',
    //   icon: 'credit-card-outline',
    //   link: ['/relatorios'],
    // },
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
      link: ['/login'],
    },
  ];
  
  constructor(private sidebarService: NbSidebarService, private router: Router) {
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {

        if(event.url == '/') {
          event.url = '/login'
          this.router.navigateByUrl('/login')
        }
        
        if (event.url == '/login') {
          this.loginHidders = true;
        } else {
          this.loginHidders = false;
        }
      }
    });
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
