import { Injectable } from '@angular/core';
import { Cliente } from './cadastro/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  static repoClientes = 'clientes';

  constructor() { }

  salvarCliente(cliente: Cliente){
    const data = this.dataClientes();
    data.push(cliente);
    localStorage.setItem(ClienteService.repoClientes, JSON.stringify(data));
  }

  buscarCliente(id: string): Cliente | undefined {
    const cliente = this.dataClientes();
    return cliente.find(user => user.id === id);
  }

  listarClientes(nameSearched?: string): Cliente[]{
    const data = this.dataClientes();
    if(!nameSearched){
      return data
    }
    return data.filter(cliente => cliente.nome === nameSearched);
  }

  editarCliente(clienteEdit: Cliente){
    const data = this.dataClientes();
    data.forEach((cliente) => {
      if(cliente.id === clienteEdit.id){
        Object.assign(cliente, clienteEdit);
      }
    });
    localStorage.setItem(ClienteService.repoClientes, JSON.stringify(data));
  }

  dataClientes(): Cliente[]{
    const listaClientes = localStorage.getItem(ClienteService.repoClientes);
    if(listaClientes){
      const clientesGet: Cliente[] = JSON.parse(listaClientes);
      return clientesGet;
    }
    const clientesSet: Cliente[] = [];
    localStorage.setItem(ClienteService.repoClientes, JSON.stringify(clientesSet));
    return clientesSet;
  }
}
