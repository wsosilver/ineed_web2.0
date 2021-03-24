import { Component, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { FormPrefabs } from '../share/form-base';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-solicitacoes-form',
  templateUrl: './solicitacoes-form.component.html',
  styleUrls: ['./solicitacoes-form.component.scss'],
  providers: []
})
export class SolicitacoesFormComponent extends FormPrefabs {

  @Input() isEditMode = false;
  @Input() EditFormData: FormGroup
  @Input() CATEGORIALIST 

  @Input() VISUALIZATIONMODE = false;

  @Output() RecourceFormData = new EventEmitter<FormGroup>();
  @Output() EditElement = new EventEmitter<FormGroup>();
  @Output() ReactiveElement = new EventEmitter<FormGroup>();

  resourceForm: FormGroup;
  tempItem

  DATALIST

  imgList = []

  imgEnvr = environment.imageUrl

  constructor(private formBuilder: FormBuilder, private routeStorage: ActivatedRoute) { 
    super()

    this.resourceForm = this.formBuilder.group({
      id: [ 0 ],
      nomeCliente: [ '' ],
      emailCliente: [ '' ],
      observacao: [ '' ],
      endereco: [ '' ],
      servicoNome: [ '' ],
      servicoCategoria: [ '' ],
      material: [ '' ],
      urgente: [ '' ],
      categoria: [''],
      dataInicial: [''],
      dataFinal: [''],
      ativo: [''],
      imagem: null,
    })
  }

  getImgSrc() {
    return `${this.imgEnvr}${this.resourceForm.get('imagem').value}`
  }

  initFormData() {
    console.log(this.resourceForm.value)
    
    const FormKeys = Object.keys(this.resourceForm.value)

    for (let key of FormKeys) {
        this.resourceForm.get(key).setValue(this.tempItem[key]);
    }

    let i = this.resourceForm.get('imagem').value

    i.forEach(element => {
      this.imgList.push(element)
    });

    console.log('teste', this.imgList)

    let dataFim: string = this.resourceForm.get('dataFinal').value
    let dataInicio: string = this.resourceForm.get('dataInicial').value
    let horast = ''
    if (dataFim != null && dataFim != undefined) {
      let adata = dataFim.split('T')
      dataFim = adata[0]
      horast = adata[1]
      console.log('xSas', adata)
      console.log('xSas2', horast)
      adata = dataFim.split('-')
      dataFim = `${adata[2]}/${adata[1]}/${adata[0]}`
    }
    console.log('d', horast)

    this.resourceForm.get('dataFinal').setValue(`${dataFim} de - às ${horast}`)
    this.resourceForm.get('servicoNome').setValue(this.tempItem.servicoSolicitacao[0].servico.nome)
    this.resourceForm.get('servicoCategoria').setValue(this.tempItem.servicoSolicitacao[0].servico.categoria.valor)
    // this.resourceForm.get('imagem').setValue(`${dataFim} de - às ${horast}`)

    console.log('Buraga', this.resourceForm.value)
  }
  
  imageExist() {
    return this.resourceForm.get('imagem').value ? true : false
  }

  ngOnInit() {
    if(this.isEditMode) {
      console.log(this.EditFormData)
      this.tempItem = this.EditFormData;
      this.initFormData()
    }
    this.resourceForm.disable()
    this.resourceForm.get('ativo').enable()
  }

  enviar() {
    this.RecourceFormData.emit(this.resourceForm)
  }

  atualizar() {
    this.EditElement.emit(this.resourceForm)
  }
  
  reactivate() {
    this.ReactiveElement.emit(this.tempItem)
  }
}

