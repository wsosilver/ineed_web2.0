import { HeaderList } from './classes';
import { HttpFactory } from './http-factory';
import { HttpClient } from '@angular/common/http';

export abstract class DataBasePrefabs extends HttpFactory {

    TITLE = 'Indefinido'
    TEMPITEM: any

    HEADERLIST: HeaderList[]
    DATALIST
    VIMODE = false;

    SEARCH_VALUE: string
    FILTER_VALUE: string

    TABLE_LOADING = false;

    ERROR_MENSAGES
    SUCCESS_MENSAGES
    ERROR_MODAL_MENSAGES

    REMOVEMODAL_LOADING = false;
    ADDMODAL_LOADING = false;
    EDITMODAL_LOADING = false;
    FILTERMODAL_LOADING = false;

    constructor(public SERVICENAME = '', public httpClient: HttpClient){
        super(SERVICENAME, httpClient);
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
    initFormData(id) {

    }
}