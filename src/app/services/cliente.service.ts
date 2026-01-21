import { Injectable } from '@angular/core';
import { Cliente } from '../cadastro/cliente';

@Injectable({
  providedIn: 'root'
})

export class ClienteService {
  private repoClientes = 'clientes';

  // Create
  postClient(cliente: Cliente){
    const data = this.dataClientes();
    data.push(cliente);
    this.setClientes(data);
  }
  
  // Read
  searchClient(id: string): Cliente | undefined {
    const cliente = this.dataClientes();
    return cliente.find(user => user.id === id);
  }

  getClients(nameSearched?: string): Cliente[]{
    const data = this.dataClientes();
    if(!nameSearched){
      return data
    }
    return data.filter(cliente => cliente.nome === nameSearched);
  }

  // Update
  editClient(clienteEdit: Cliente) {
    const data = this.dataClientes().map(cliente =>
      cliente.id === clienteEdit.id ? clienteEdit : cliente
    );
    this.setClientes(data);
  }

  // Delete
  deletarCliente(id: string){
    const data = this.dataClientes();
    const arrClientes = data.filter(cliente => cliente.id !== id);
    this.setClientes(arrClientes);
  }

  // Helpers
  private setClientes(clientes: Cliente[]): void {
    localStorage.setItem(this.repoClientes, JSON.stringify(clientes));
  }
 
  // Storage
  dataClientes(): Cliente[]{
    const listClients = localStorage.getItem(this.repoClientes);
    if(listClients){
      const returnedClients: Cliente[] = JSON.parse(listClients);
      return returnedClients;
    }
    const clientesSet: Cliente[] = [];
    localStorage.setItem(this.repoClientes, JSON.stringify(clientesSet));
    return clientesSet;
  }
}
