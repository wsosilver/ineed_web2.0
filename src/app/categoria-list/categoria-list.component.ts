import { Component, OnInit, ElementRef, ViewChild, TemplateRef } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataBasePrefabs } from '../share/data-base';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-categoria-list',
  templateUrl: './categoria-list.component.html',
  styleUrls: ['./categoria-list.component.scss'],
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
export class CategoriaListComponent extends DataBasePrefabs implements OnInit {

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
      
      super('categoria', httpClient)

    this.TITLE = 'Categoria'

    this.HEADERLIST = [
      { key: 'id',        titulo: 'Cod',      visivel: true },
      { key: 'imagem',    titulo: 'Imagem',   visivel: true },
      { key: 'valor',     titulo: 'Nome',     visivel: true },
      { key: 'inativo',   titulo: 'Inativo',  visivel: true },
    ]

    this.filterForm = formBuilder.group({
      id: [null],
      nome: [null],
      inativo: false,
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

    const { id, inativo, imagem, valor } = event.value

    const recevied = {
      id, imagem: null, inativo, valor
    }

    this.put(recevied, `/${recevied.id}`).subscribe((data:any) => {
      this.EDITMODAL_LOADING = false;
      let x = document.getElementById('closeEditModal')
      x.click();
      this.uploadImage(data.categoria.id, imagem)
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

  uploadImage(id, obj: File) {
    const input = new FormData()
    input.append("valorimg", obj)

    console.log('FILE', obj)

    this.postImage(input, `/api/categoria/${id}/imagens`).subscribe(response => {
      this.reload()
    })
  }

  cadastrar() {
    this.ADDMODAL_LOADING = true

    const { id, inativo, imagem, valor } = this.TEMPITEM.value

    const recevied = {
      id, imagem: null, inativo, valor
    }

    this.post(recevied).subscribe((data: any) => {
      this.ADDMODAL_LOADING = false
      let x = document.getElementById('closeAddModal')
      x.click();
      this.uploadImage(data.categoria.id, imagem)
      this.reload();

      console.log('RETORNOU ISSO AQUI BARAI:', data)

      // CONTINUARAQUI
      // this.post(this.im)
    }, e => {
      let errors = e.error.error;
      this.showModalError(errors)
      this.ADDMODAL_LOADING = false
    })
  }

  // cadastrar(formCategoria, imageFile = null) {
  //   if (formCategoria.id) {
  //     return this.atualizar(formCategoria)
  //       .then((data: any) => (imageFile) ? this.salvarImagem(data.categoria.id, imageFile) : data)
  //   } else {
  //     return this.salvar(formCategoria)
  //       .then((data: any) => (imageFile) ? this.salvarImagem(data.categoria.id, imageFile) : data)
  //   }
  // }

  procurar(nome = '') {
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

    this.filterBy(z.by, z.values).subscribe((data: any) => {
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
