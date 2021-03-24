import { Component, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { FormPrefabs } from '../share/form-base';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-categoria-form',
  templateUrl: './categoria-form.component.html',
  styleUrls: ['./categoria-form.component.scss'],
  providers: []
})
export class CategoriaFormComponent extends FormPrefabs {

  @Input() isEditMode = false;
  @Input() EditFormData: FormGroup

  @Output() RecourceFormData = new EventEmitter<FormGroup>();
  @Output() EditElement = new EventEmitter<FormGroup>();

  PROFILE_ID
  imageFile

  constructor(private formBuilder: FormBuilder, private routeStorage: ActivatedRoute) { 
    super()

    this.routeStorage.params.subscribe(data => {
      this.PROFILE_ID = Number.parseInt(data.id)
    })

    this.resourceForm = this.formBuilder.group({
      id: [0, Validators.required],
      valor: ['', Validators.required],
      imagem: [null, Validators.required],
      inativo: false
    })
  }
  
  onFileChange(event) {
    console.log('TERE', event.target.files)
    
    if(event.target.files.length > 0) {
      this.imageFile = <File>event.target.files[0]
      this.resourceForm.get('imagem').setValue(this.imageFile)
    }
  }

  putImage(event) {
    console.log('TERE', event.target.files)
  }

  ngOnInit() {
    if(this.isEditMode) {
      console.log(this.EditFormData)
      this.tempItem = this.EditFormData;
      this.initFormData()
    }

    console.log(this.resourceForm.value)
  }

  enviar() {
    this.RecourceFormData.emit(this.resourceForm)
  }

  atualizar() {
    this.EditElement.emit(this.resourceForm)
  }
}
