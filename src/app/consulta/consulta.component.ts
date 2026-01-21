import { Component, inject, OnInit } from '@angular/core';
import { ClienteService } from '../services/cliente.service';
import { Cliente } from '../cadastro/cliente';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit {
  nameSearch: string = '';
  arrClientes: Cliente[] = [];
  delete: boolean = false;

  private service = inject(ClienteService);
  private router = inject(Router);

  ngOnInit() {
    this.arrClientes = this.service.getClients();
  }
  search(){
    this.arrClientes = this.service.getClients(this.nameSearch);
  }
  editCliente(id: string){
    this.router.navigate(['/cadastro'], { queryParams: { id: id } });
  }
  deleteCliente(id: string){
    this.service.deletarCliente(id);
    this.arrClientes = this.service.getClients();
  }
}
