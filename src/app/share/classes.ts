export class Usuario {
    cupom: string;
    tipo: Tipo;
    id: number;
    nome: string
    email: string
    senha: string
    rg: string
    cpfCnpj: string
    endereco: string
    numero: number
    cep: string
    telefone: string
    cidade: string
    imagemUrl: string
    uf: string
    perfilId: number
    tipoId: number
    dataAniversario: Date;
    contaRedeSocial: boolean;
    inativo: boolean
    complemento: string
    criadoEm: string
    cupomId: number
}

export class Tipo {
    id: number;
    valor: string;
}

export class HeaderList {
    key: string
    titulo: string
    visivel: boolean
}