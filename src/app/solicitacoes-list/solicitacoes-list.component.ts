import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataBasePrefabs } from '../share/data-base';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { StatusIneed } from './status';

@Component({
  selector: 'app-solicitacoes-list',
  templateUrl: './solicitacoes-list.component.html',
  styleUrls: ['./solicitacoes-list.component.scss'],
  providers: [],
  animations: [
    trigger('fadein', [
      state('void', style({opacity: 0})),
      transition('void => *', [
        style({ opacity: 0}),
        animate('900ms 300ms ease-out', style({opacity: 1}))
      ])
    ])
  ]
})
export class SolicitacoesListComponent extends DataBasePrefabs implements OnInit {

  closeResult: string;

  searchValue = ''
  filterValue = ''

  page = 1;
  pageSize = 10;

  PROFILE_ID = null;

  filterForm: FormGroup;

  categoriaList

  @ViewChild('filters', null)
  private FilterModal: TemplateRef<any>;

  @ViewChild('submitForm', null)
  private AddModal: TemplateRef<any>;

  @ViewChild('editForm', null)
  private EditModal: TemplateRef<any>;

  constructor(
    private modalService: NgbModal,
    private routeStorage: ActivatedRoute,
    public httpClient: HttpClient,
    private formBuilder: FormBuilder) { 
      
      super('solicitacao', httpClient)

      this.TITLE = 'Solicitação';
      this.VIMODE = true;

    this.HEADERLIST = [
      { key: 'id',            titulo: 'Cod',        visivel: true },
      { key: 'nomeCliente',   titulo: 'Cliente',    visivel: true },
      { key: 'emailCliente',  titulo: 'E-mail',     visivel: true },
      { key: 'endereco',      titulo: 'Categorias', visivel: true },
      { key: 'endereco',      titulo: 'Endereço',   visivel: true },
      { key: 'ativo',         titulo: 'Ativo',      visivel: true },
      { key: 'status',        titulo: 'Status',      visivel: true },
      { key: 'dataFinal',     titulo: 'Prazo',      visivel: true }
    ]

    this.filterForm = formBuilder.group({
      id: [ '' ],
      nomeCliente: [ '' ],
      emailCliente: [ '' ],
      endereco: [ '' ],
      observacao: [ '' ],
      ativo: [ '' ],
      status: [ '' ],
      categoria: [''],
      dataFinal: [''],
    })
  }
  
  openModal(modal) {    
    switch(modal) {
      case 'add' : 
        this.prepareAddModal();
      break;
      case 'filter' : 
        this.prepareFilterModal();
      break;
    }
  }

  prepareAddModal() {
    this.modalService.open(this.AddModal, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {

    }, (reason) => {
      
    })
  }

  prepareFilterModal() {
    this.modalService.open(this.FilterModal, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {

    }, (reason) => {
      
    })
  }

  prepareEditModal() {
    this.modalService.open(this.EditModal, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {

    }, (reason) => {
      
    })
  }

  clearFilterForm() {
    const keys = Object.keys(this.filterForm.value)

    for (let key of keys) {
      this.filterForm.get(key).setValue(null)
    }
  }

  reload(id = '') {
    const perfilId = this.PROFILE_ID;
    let extra;
    perfilId ? 
      extra = `` :
      extra = ``;

    this.TABLE_LOADING = true;

    this.get(extra).subscribe((data: any) => {

      this.DATALIST = { solicit: [] }

      data.solicit.forEach(element => {
        element.status = this.getSolicitationStatus(element)
        this.DATALIST.solicit.push(element)
      });

      // data.status = this.getSolicitationStatus(data)
      // this.DATALIST = data;
      console.log('SOL ICI TATIOn',data)
      this.TABLE_LOADING = false;
    }, e => { console.log(e); this.TABLE_LOADING = false; })
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  ngOnInit() {
    this.reload();
    this.getCategoriaList();
  }

  getCategoriaList() {
    this.get('/categoria').subscribe((data:any) => {
      this.categoriaList = data;
    })
  }

  saveEditData(event, vimode = null) {
    this.TEMPITEM = event;
    this.prepareEditModal();
  }
  
  getSolicitationStatus(solicitation) { 
    // Visit cycle verification
    if(!solicitation.ativo)
      return StatusIneed.SolicitationStatus.CANCELED

    if(!solicitation.visita)
      return StatusIneed.VisitStatus.Pending

    if(!solicitation.visita.pago)
      return StatusIneed.VisitStatus.PendingConfirmation
    
    if(solicitation.visita.pago && !solicitation.visita.concluida)
      return StatusIneed.VisitStatus.WaitingVisit

    if(solicitation.visita.pago && solicitation.visita.concluida  && !solicitation.visita.avaliacao && !solicitation.orcamento)
      return StatusIneed.VisitStatus.WaytingAvaliation

    if(solicitation.visita.pago && solicitation.visita.concluida && solicitation.visita.avaliacao && !solicitation.orcamento)
      return StatusIneed.EstimateStatus.Pending

    // Estimate cycle verification
    if(solicitation.visita && !solicitation.orcamento)
      return StatusIneed.EstimateStatus.Pending

    if(!solicitation.orcamento.pago) {
      return StatusIneed.EstimateStatus.PendingConfirmation
    }
  
    if(solicitation.orcamento.pago &&
      !solicitation.orcamento.concluido &&
      solicitation.orcamento.taxasExtras.length &&
      !solicitation.orcamento.taxasExtras[0].pago)
        return StatusIneed.EstimateStatus.ExtraTaxConfirmartion

    if(solicitation.orcamento.pago && !solicitation.orcamento.concluido)
      return StatusIneed.EstimateStatus.WaitingEstimate
  
    if(solicitation.orcamento.pago && solicitation.orcamento.concluido && !solicitation.orcamento.avaliacao)
      return StatusIneed.EstimateStatus.WaytingAvaliation
  
    if(solicitation.orcamento.pago && solicitation.orcamento.concluido && solicitation.orcamento.avaliacao)
      return StatusIneed.EstimateStatus.Finished
  }

  getElementColor(element) {
    switch(element) {
      case 'Pendente':
        return '#b60707'; 
      case 'Aguardando Avaliação':
        return '#0770b6';
      case 'Confirmação Pendente':
        return '#580786';
      case 'Cancelado':
          return '#b60707';
      case 'Aguardando Serviço':
        return '#b65607';
      default:
        return '#07b670'
    }
  }

  adicionar(event) {
    this.TEMPITEM = event;
    this.cadastrar()
  }

  atualizar(event) {
    console.log(event)
    this.EDITMODAL_LOADING = true;

    this.patch(event.value, '/atualizarservico').subscribe((data:any) => {
      this.EDITMODAL_LOADING = false;
      let x = document.getElementById('closeEditModal')
      x.click();
      this.showSuccessMensage(data.message);
      this.reload();
    }, e => {
      this.EDITMODAL_LOADING = false;
      let errors = e.error.error;
      this.showModalError(errors)
    })
  }

  deletar(event) {
    this.delete(`?id=${event.id}`).subscribe((data: any) => {
      this.showSuccessMensage(data.message);
      this.reload();
    }, e => {
      let errors = e.error.error;
      this.showModalError(errors)
    })
  }

  cadastrar() {
    this.post(this.TEMPITEM.value, 'cadastrarservico').subscribe(data => {
      let x = document.getElementById('closeAddModal')
      x.click();
      this.reload();
    }, e => {
      let errors = e.error.erro;
      this.showModalError(errors)
    })
  }

  reativar(event) {
    console.log('REATIVA', event)
    this.EDITMODAL_LOADING = true

    this.updatePatch(null, `/reativarsolicitacao?id=${event.id}`, true).subscribe()

    setTimeout(() => {
      this.EDITMODAL_LOADING = false
      this.reload()
    }, 3000)
  }

  procurar(nome = '') {
    var z = 'nomeCliente'

    if (nome == '') {
      z = ''
    }

    this.TABLE_LOADING = true;
    this.filterBy(z, nome, true).subscribe((data: any) => {
      this.DATALIST = data;
      this.TABLE_LOADING = false;
    }, e => {
      console.log(e); this.TABLE_LOADING = false;
      this.TABLE_LOADING = false;
      let errors = e.error.error;
      this.showModalError(errors)
    })
  }

  getFiltredValues() {
    var keys = Object.keys(this.filterForm.value)
    var result = {
      by: '',
      values: ''
    }

    for (let key of keys) {
      if (this.filterForm.value[key] !== null && this.filterForm.value[key] !== "") {
        result.by += `${key},`
        result.values += `${this.filterForm.value[key]},`
      }
    }
 
    var count = result.by.length;
    result.by = result.by.substr(0, count - 1);
    count = result.values.length;
    result.values = result.values.substr(0, count - 1);

    return result
  }

  filtrar() {
    this.FILTERMODAL_LOADING = true;
    var z = this.getFiltredValues();

    this.filterBySolicitacao(z.by, z.values).subscribe((data: any) => {
      this.FILTERMODAL_LOADING = false;
      let x = document.getElementById('closeFilterModal')
      x.click();

      
      this.DATALIST = { solicit: [] }

      data.solicit.forEach(element => {
        element.status = this.getSolicitationStatus(element)
        this.DATALIST.solicit.push(element)
      });
    }, e => {
      this.FILTERMODAL_LOADING = false;
      let errors = e.error.error;
      this.showModalError(errors)
    })
  }
}
