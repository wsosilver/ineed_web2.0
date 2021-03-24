import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export abstract class HttpFactory {

    API_URL = environment.apiUrl
    API_URL_UNMODIFIED = environment.apiUrl
   
    IMAGE_URL = environment.imageUrl
    HEADERS = new HttpHeaders();
    IMAGEHEADERS = new HttpHeaders();

    constructor(public serviceName, public http: HttpClient){
        this.API_URL = `${this.API_URL}/${serviceName}`

        this.HEADERS = this.HEADERS
                            .append('Content-type', 'application/json')
                            // .append('Access-Control-Allow-Origin', '*')
                            .append('Authorization', localStorage.getItem('token'))
                            .append('Page', '1')

        this.IMAGEHEADERS = this.IMAGEHEADERS
                            .append('Authorization', localStorage.getItem('token'))
    }

    get(urlExtra = null) {
      
        let url;
        urlExtra ? url = `${this.API_URL}${urlExtra}` : url = this.API_URL
    
        return this.http.get(url, { headers: this.HEADERS })
    }

    getUnmodifield(urlExtra = null) {
        let url;
        urlExtra ? url = `${this.API_URL_UNMODIFIED}${urlExtra}` : url = this.API_URL_UNMODIFIED
    
        return this.http.get(url, { headers: this.HEADERS })
    }

    post(body, urlExtra = null) {
        let url;
        urlExtra ? url = `${this.API_URL}${urlExtra}` : url = this.API_URL

        return this.http.post(url, body, { headers: this.HEADERS })
    }

    postImage(body, urlExtra = null) {
        let url;
        urlExtra ? url = `${this.IMAGE_URL}${urlExtra}` : url = this.IMAGE_URL

        return this.http.post(url, body, { headers: this.IMAGEHEADERS })
    }

    delete(urlExtra = null) {
        let url;
        urlExtra ? url = `${this.API_URL}${urlExtra}` : url = this.API_URL

        return this.http.delete(url, {headers: this.HEADERS})
    }

    put(body, urlExtra = null) {
        let url;
        urlExtra ? url = `${this.API_URL}${urlExtra}` : url = this.API_URL

        return this.http.put(url, body, {headers: this.HEADERS})
    }

    patch(body, urlExtra = null) {
        let url;
        urlExtra ? url = `${this.API_URL}${urlExtra}` : url = this.API_URL

        const usuarioId = localStorage.getItem('usuarioId');
        body['IdUsuarioCadastro'] = Number.parseInt(usuarioId);

        return this.http.patch(url, body, {headers: this.HEADERS})
    }

    patchUnmodifield(body, urlExtra = null) {
        let url;
        urlExtra ? url = `${this.API_URL_UNMODIFIED}${urlExtra}` : url = this.API_URL_UNMODIFIED

        const usuarioId = localStorage.getItem('usuarioId');
        body['IdUsuarioCadastro'] = Number.parseInt(usuarioId);

        return this.http.patch(url, body, {headers: this.HEADERS})
    }

    updatePatch(body, urlExtra = null, remove = false) {
        let url;
        urlExtra ? url = `${this.API_URL}${urlExtra}` : url = this.API_URL

        if (remove) {
            url = environment.apiUrl + urlExtra
        }

        return this.http.patch(url, body, {headers: this.HEADERS})
    }

    // PREPARE-SE PARA AS GAMBIARRAS!!! 
    filterBy(por = 'nome', oque = '', decorator = false, servico = false, extra = null) {
        let url

        url = `${this.API_URL}/listartodos?filtrarPor=${por}&filtrarValor=${oque}`;

        if (decorator) {
            url = `${this.API_URL}?filtrarPor=${por}&filtrarValor=${oque}`
        }

        if (servico) {
            url = `${this.API_URL}filtrarServico?filtrarPor=${por}&filtrarValor=${oque}`
        }

        if (extra) {
            url += extra
        }

        return this.http.get(url, { headers: this.HEADERS })
    }

    // PREPARE-SE PARA AS GAMBIARRAS!!! 
    filterByCupom(por = '', oque = '') {  
        let url = `${this.API_URL_UNMODIFIED}/filtrarcupom?filtrarPor=${por}&filtrarValor=${oque}`
        return this.http.get(url, { headers: this.HEADERS })
    }

    filterByOrcamento(por = '', oque = '') {  
        let url = `${this.API_URL_UNMODIFIED}/filtrarorcamento?filtrarPor=${por}&filtrarValor=${oque}`
        return this.http.get(url, { headers: this.HEADERS })
    }

    filterBySolicitacao(por = '', oque = '') {  
        let url = `${this.API_URL_UNMODIFIED}/filtrarsolicitacao?filtrarPor=${por}&filtrarValor=${oque}`
        return this.http.get(url, { headers: this.HEADERS })
    }

    filterByVisita(por = '', oque = '') {  
        let url = `${this.API_URL_UNMODIFIED}/filtrarvisita?filtrarPor=${por}&filtrarValor=${oque}`
        return this.http.get(url, { headers: this.HEADERS })
    }
      
    public salvarImagem(id, imagem) {
        const input = new FormData()
        input.append('valorimg', imagem, imagem.name)

        const url = `${environment.apiUrl}/categoria/${id}/imagens`

        return this.http.post(url, input, { headers: this.HEADERS })
    }
}

