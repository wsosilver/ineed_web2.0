import { Component, OnInit, ElementRef, ViewChild, TemplateRef } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataBasePrefabs } from '../share/data-base';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-colaborador-list',
  templateUrl: './colaborador-list.component.html',
  styleUrls: ['./colaborador-list.component.scss'],
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
export class ColaboradorListComponent extends DataBasePrefabs implements OnInit {

  closeResult: string;

  searchValue = ''
  filterValue = ''

  page = 1;
  pageSize = 10;

  PROFILE_ID;

  filterForm: FormGroup;

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
      
      super('usuario', httpClient)

    this.routeStorage.params.subscribe(data => {
      switch(data.id) {
        case "1" :
          this.TITLE = 'Cliente'
          this.PROFILE_ID = 1;
          break;
        case "2" :
          this.TITLE = 'Fornecedor' 
          this.PROFILE_ID = 2;
          break;
        case "3" : 
          this.TITLE = 'Administrador' 
          this.PROFILE_ID = 3;
          break;
        case "4" : 
          this.TITLE = 'Colaborador'
          this.PROFILE_ID = 4;
          break;
      }
    })

    this.HEADERLIST = [
      { key: 'id',      titulo: 'Cod',      visivel: true },
      { key: 'nome',    titulo: 'Nome',     visivel: true },
      { key: 'email',   titulo: 'E-mail',   visivel: true },
      { key: 'inativo', titulo: 'Inativo',  visivel: true },
      { key: 'tipoId',  titulo: 'Tipo',     visivel: true },
    ]

    this.filterForm = formBuilder.group({
      id: [null],
      nome: [null],
      email: [null],
      cpfCnpj: [null],
      tipoId: [null],
      inativo: [null]
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

  reload(nome = '') {
    const perfilId = this.PROFILE_ID;
    let extra;
    perfilId ? 
      extra = `/listarTodos?nome=${nome}&profileId=${perfilId}` :
      extra = `/listarTodos?nome=${nome}`;

    this.TABLE_LOADING = true;

    this.get(extra).subscribe((data: any) => {
      this.DATALIST = data;
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
    console.log('[Lobo Info:] iniciando o servico: ngOnInit');
    this.reload();
  }

  saveEditData(event) {
    this.TEMPITEM = event;
    this.prepareEditModal();
  }

  adicionar(event) {
    this.TEMPITEM = event;
    this.cadastrar()
  }

  atualizar(event) {
    this.EDITMODAL_LOADING = true;

    if(event.value.ativo == 'true')
      event.value.ativo = true
    else
      event.value.ativo = false

      event.value.email = this.TEMPITEM.email
      //event.value.cpf = this.TEMPITEM.cpf
    
    this.put(event.value, '/atualizar').subscribe((data:any) => {
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
    this.delete(`/deletar?id=${event.id}`).subscribe((data: any) => {
      this.showSuccessMensage(data.message);
      this.reload();
    }, e => {
      let errors = e.error.error;
      this.showModalError(errors)
    })
  }

  cadastrar() {
    this.post(this.TEMPITEM.value, '/Cadastrar').subscribe(data => {
      let x = document.getElementById('closeAddModal')
      x.click();
      this.reload();
    }, e => {
      let errors = e.error.error;
      this.showModalError(errors)
    })
  }

  procurar(nome = '') {
    const perfilId = this.PROFILE_ID;
    let extra;
    perfilId ? 
      extra = `/listarTodos?filtrarPor=nome,perfilId&filtrarValor=${nome},${perfilId}` :
      extra = `/listarTodos?filtrarPor=nome&filtrarValor=${nome}`;

    this.TABLE_LOADING = true;

    this.get(extra).subscribe((data: any) => {
      this.DATALIST = data;
      this.TABLE_LOADING = false;
    }, e => { console.log(e); this.TABLE_LOADING = false; })
  }

  getFiltredValues() {
    var keys = Object.keys(this.filterForm.value)
    var result = {
      by: '',
      values: ''
    }

    for (let key of keys) {
       if (this.filterForm.value[key] != null && this.filterForm.value[key] != "") {
        result.by += `profileId,${key},`
        result.values += `${this.PROFILE_ID},${this.filterForm.value[key]},`
      }
    }
 
    var count = result.by.length;
    result.by = result.by.substr(0, count - 1);
    count = result.values.length;
    result.values = result.values.substr(0, count - 1);

     return result
  }

  filtrar() {
    console.log('[Lobo Info:] iniciando o servico: filtrar');

    this.FILTERMODAL_LOADING = true;
    var z = this.getFiltredValues();

    var bool = false

    if(z.by == '' && z.values == '')
      bool = true


      this.filterBy(z.by, z.values, false, false, `&profileId=${this.PROFILE_ID}`).subscribe((data: any) => {
        this.FILTERMODAL_LOADING = false;
        let x = document.getElementById('closeFilterModal');
        x.click();
        this.DATALIST = data;
      }, e => {
        this.FILTERMODAL_LOADING = false;
        let errors = e.error.error;
        this.showModalError(errors)
      })
  

  }
}
