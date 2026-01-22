import { v4 as uuid } from 'uuid';

export class Cliente {
    id?: string;
    nome?: string;
    email?: string;
    cpf?: string;
    dataNascimento?: string;
    telefone?: string;
    uf?: string;
    municipio?: string;
    newCliente(){
        let cliente = new Cliente();
        cliente.id = uuid();
        return cliente
    }
}