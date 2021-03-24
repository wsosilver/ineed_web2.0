import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataBasePrefabs } from '../share/data-base';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-visitas-list',
  templateUrl: './visitas-list.component.html',
  styleUrls: ['./visitas-list.component.scss'],
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
export class VisitasListComponent extends DataBasePrefabs implements OnInit {

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
      
      super('visita', httpClient)

      this.TITLE = 'Visita';
      this.VIMODE = true;

    this.HEADERLIST = [
      { key: 'id',            titulo: 'Cod',        visivel: true },
      { key: 'nome',          titulo: 'Colaborador',visivel: true },
      { key: 'emailCliente',  titulo: 'Email',      visivel: true },
      { key: 'valor',         titulo: 'Valor',      visivel: true },
      { key: 'avaliacao',     titulo: 'Avaliação',  visivel: true },
      { key: 'confirmada',    titulo: 'Confirmado', visivel: true },
      { key: 'concluida',     titulo: 'Concluida',  visivel: true },

    ]

    this.filterForm = formBuilder.group({
      id: [''],
      nome: [''],
      email: [''],
      valor: [''],
      avaliacao: [''],
      confirmada: [''],
      concluida: ['']
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

  saveEditData(event, vimode = null) {
    this.TEMPITEM = event;
    this.prepareEditModal();
  }

  adicionar(event) {
    this.TEMPITEM = event;
    this.cadastrar()
  }

  atualizar(event) {
    console.log(event)
    this.EDITMODAL_LOADING = true;

    this.patch(event.value, 'atualizarservico').subscribe((data:any) => {
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
    this.delete(`deletarservico?id=${event.id}`).subscribe((data: any) => {
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

  procurar(nome = '') {
    var z = 'nome'

    if (nome == '') {
      z = ''
    }

    this.TABLE_LOADING = true;
    this.get(`/${nome}`).subscribe((data: any) => {
      this.DATALIST = data
      this.TABLE_LOADING = false;
    }, e => {
      console.log(e); this.TABLE_LOADING = false;
      this.TABLE_LOADING = false;
      let errors = e.error.error;
      this.showModalError(errors)
    })

    // this.TABLE_LOADING = true;
    // this.filterBy(z, nome, true).subscribe((data: any) => {
    //   this.DATALIST = data;
    //   this.TABLE_LOADING = false;
    // }, e => {
    //   console.log(e); this.TABLE_LOADING = false;
    //   this.TABLE_LOADING = false;
    //   let errors = e.error.error;
    //   this.showModalError(errors)
    // })
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

    this.filterByVisita(z.by, z.values).subscribe((data: any) => {
      this.FILTERMODAL_LOADING = false;
      let x = document.getElementById('closeFilterModal')
      x.click();

      if(data.visitas.visitaList) {
        var temp = {
          visitas: data.visitas.visitaList
        }

        this.DATALIST = temp;
      } else {
        this.DATALIST = data;
      }

      console.log('JUSTONEDAY', this.DATALIST)
    }, e => {
      this.FILTERMODAL_LOADING = false;
      let errors = e.error.error;
      this.showModalError(errors)
    })
  }
}

