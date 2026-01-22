import { Component, inject, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from '../services/cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UfApiService } from '../services/uf-api.service';
import { EstadoApiResponse, MunicipioApiResponse } from '../uf-api.model';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {
  cliente: Cliente = new Cliente().newCliente();
  updateMode: boolean = false;
  estados: EstadoApiResponse[] = [];
  municipios: MunicipioApiResponse[] = [];

  private snackBar = inject(MatSnackBar);
  private service = inject(ClienteService);  //constructor(private service: ClienteService){}
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private ufService = inject(UfApiService);

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const id = params['id'];
      if (id) {
        const foundedClient = this.service.searchClient(id);
        if (foundedClient) {
          this.cliente = foundedClient;
          this.updateMode = true;
          if (this.cliente.uf) {
            this.loadMunicipios({ value: this.cliente.uf } as MatSelectChange);
          }
        }
      }
    });
    this.loadUFs();
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

loadUFs(): void {
    this.ufService.getEstados().subscribe({
      next: (data) => {
        this.estados = data;
        console.log('UFs carregadas:', this.estados);
      },
      error: (error) => {
        console.error('Erro ao carregar UFs', error);
      }
    });
  }
  loadMunicipios(event: MatSelectChange): void {
    this.ufService.getMunicipios(event.value).subscribe({
      next: (data) => {
        this.municipios = data;
        console.log('Municípios carregados:', this.municipios);
      },
      error: (error) => {
        console.error('Erro ao carregar municípios', error);
      }
    });
  }
}
