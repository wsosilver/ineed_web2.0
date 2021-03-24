import { Component, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { FormPrefabs } from '../share/form-base';
import { ActivatedRoute } from '@angular/router';
import { HttpFactory } from '../share/http-factory';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-taxas-form',
  templateUrl: './taxas-form.component.html',
  styleUrls: ['./taxas-form.component.scss'],
  providers: []
})
export class TaxasFormComponent extends HttpFactory {

  @Input() isEditMode = false;
  @Input() EditFormData: FormGroup

  @Output() RecourceFormData = new EventEmitter<FormGroup>();
  @Output() EditElement = new EventEmitter<FormGroup>();

  PROFILE_ID
  imageFile

  resourceForm: FormGroup;
  tempItem

  DATALIST

  ERROR_MENSAGES
  SUCCESS_MENSAGES
  ERROR_MODAL_MENSAGES

  constructor(private formBuilder: FormBuilder, private routeStorage: ActivatedRoute, public http: HttpClient) { 
    super('', http)

    this.routeStorage.params.subscribe(data => {
      this.PROFILE_ID = Number.parseInt(data.id)
    })

    this.resourceForm = this.formBuilder.group({
      id: [0, Validators.required],
      taxaVisitasUrgentes: ['', Validators.required],
      maximoParcelas: [0, Validators.required]
    })
  }

  ngOnInit() {
    if(this.isEditMode) {
      console.log(this.EditFormData)
      this.tempItem = this.EditFormData;
      this.initFormData()
    }

    console.log(this.resourceForm.value)
  }

  send() {
    var obj = {
      id: this.resourceForm.get('id').value,
      taxaVisitasUrgentes: Number.parseFloat(this.resourceForm.get('taxaVisitasUrgentes').value),
      maximoParcelas: Number.parseFloat(this.resourceForm.get('maximoParcelas').value)
    }

    this.put(obj, 'configuracao').subscribe((data: any) => {
      const keys = Object.keys(data.configuracao)
      var message = ["As definições de taxas foram atualizadas!"]


      this.showSuccessMensage(message);
    }, e => {
      this.showErrorMensage(e.error.error);
    })
  }

  atualizar() {
    this.EditElement.emit(this.resourceForm)
  }
    
  showSuccessMensage(event) {
    this.SUCCESS_MENSAGES = event

    setTimeout(() => {
        this.SUCCESS_MENSAGES = null
    },10000);
}

showErrorMensage(event) {
    //console.log(event)
    this.ERROR_MENSAGES = event

    setTimeout(() => {
        this.ERROR_MENSAGES = null
    },10000);
}


showModalError(event) {
    this.ERROR_MODAL_MENSAGES = event

    setTimeout(() => {
        this.ERROR_MODAL_MENSAGES = null
    },10000);
}

  
    // APLICA OS DADOS AO FORMULÁRIO
  initFormData() {
    console.log(this.resourceForm.value)
    
    const FormKeys = Object.keys(this.resourceForm.value)

    for (let key of FormKeys) {
        this.resourceForm.get(key).setValue(this.tempItem[key]);
    }

    console.log(this.resourceForm.value)
  }

}
