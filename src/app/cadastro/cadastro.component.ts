import { Component, inject, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from '../cliente.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {
  cliente: Cliente = new Cliente().newCliente();
  updateMode: boolean = false;

  private service = inject(ClienteService);  //constructor(private service: ClienteService){}
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const id = params['id'];
      if (id) {
        const foundedClient = this.service.buscarCliente(id);
        if (foundedClient) {
          this.cliente = foundedClient;
          this.updateMode = true;
        }
      }
    });
  }
  
  salvar(){
    if (!this.updateMode) {
      this.service.salvarCliente(this.cliente);
      this.cliente = new Cliente().newCliente();
    } else {
      this.service.editarCliente(this.cliente);
      this.router.navigate(['/consulta']);
    }
  }
}
