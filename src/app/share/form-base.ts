import { FormGroup } from '@angular/forms';
import { OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

export abstract class FormPrefabs implements OnInit {

    resourceForm: FormGroup;
    tempItem

    DATALIST



    constructor(){
        
    }

    ngOnInit() {
        
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