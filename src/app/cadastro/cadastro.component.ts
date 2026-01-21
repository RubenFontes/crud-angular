import { Component, inject, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from '../services/cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {
  cliente: Cliente = new Cliente().newCliente();
  updateMode: boolean = false;
  private snackBar = inject(MatSnackBar);

  private service = inject(ClienteService);  //constructor(private service: ClienteService){}
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const id = params['id'];
      if (id) {
        const foundedClient = this.service.searchClient(id);
        if (foundedClient) {
          this.cliente = foundedClient;
          this.updateMode = true;
        }
      }
    });
  }
  
  salvar(){
    if (!this.updateMode) {
      this.service.postClient(this.cliente);
      this.cliente = new Cliente().newCliente();
      this.snackBar.open('Cliente cadastrado com sucesso!', 'Fechar')
    } else {
      this.service.editClient(this.cliente);
      this.snackBar.open('Cliente atualizado com sucesso!', 'Fechar')
    }
    this.router.navigate(['/consulta']);
  }
}
