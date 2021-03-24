import { Component, OnInit, ElementRef, ViewChild, TemplateRef } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataBasePrefabs } from '../share/data-base';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cupons-list',
  templateUrl: './cupons-list.component.html',
  styleUrls: ['./cupons-list.component.scss'],
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
export class CuponsListComponent extends DataBasePrefabs implements OnInit {

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
      
      super('', httpClient)

      this.TITLE = 'Cupom';

    this.HEADERLIST = [
      { key: 'id',            titulo: 'Cod',        visivel: true },
      { key: 'codigo',        titulo: 'Código',     visivel: true },
      { key: 'usoMaximo',     titulo: 'Uso Máximo', visivel: true },
      { key: 'utilizado',     titulo: 'Ultilizado', visivel: true },
      // { key: 'desconto',      titulo: 'Desconto', visivel: true },
      { key: 'desconto',      titulo: 'Desconto',   visivel: true },
      { key: 'ativo',         titulo: 'Ativo',      visivel: true }
    ]

    this.filterForm = formBuilder.group({
      id: [ '' ],
      codigo: [ '' ],
      usoMaximo: [ '' ],
      utilizado: [ '' ],
      desconto: [''],
      // ativo: [''],
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
      extra = `cupom` :
      extra = `cupom`;

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
    this.reload();
  }

  getCategoriaList() {
    this.get('categoria').subscribe((data:any) => {
      this.categoriaList = data;
    })
  }

  saveEditData(event) {
    this.TEMPITEM = event;

    console.log('DSADASI', this.TEMPITEM)
    this.prepareEditModal();
  }

  adicionar(event) {
    this.TEMPITEM = event;
    this.cadastrar();
  }

  atualizar(event) {
    console.log(event)
    this.EDITMODAL_LOADING = true;

    this.put(event.value, 'cupom').subscribe((data:any) => {
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
    this.delete(`cupom?id=${event.id}`).subscribe((data: any) => {
      this.showSuccessMensage(data.message);
      this.reload();
    }, e => {
      let errors = e.error.error;
      this.showModalError(errors)
    })
  }

  cadastrar() {
    this.ADDMODAL_LOADING = true

    this.post(this.TEMPITEM.value, 'cupom').subscribe(data => {
      let x = document.getElementById('closeAddModal')
      x.click();
      this.ADDMODAL_LOADING = false
      this.reload();
    }, e => {
      this.ADDMODAL_LOADING = false
      let errors = e.error.erro;
      this.showModalError(errors)
    })
  }

  procurar(nome = '') {
    this.TABLE_LOADING = true;

    var z = 'codigo';

    if (nome == '') {
      z = '';
    }

    this.filterByCupom(z, nome).subscribe((data: any) => {
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

    this.filterByCupom(z.by, z.values).subscribe((data: any) => {
      this.FILTERMODAL_LOADING = false;
      let x = document.getElementById('closeFilterModal')
      x.click();
      this.DATALIST = data;
    }, e => {
      this.FILTERMODAL_LOADING = false;
      let errors = e.error.error;
      this.showModalError(errors)
    })
  }
}
