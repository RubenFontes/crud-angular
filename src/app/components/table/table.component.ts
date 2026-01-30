import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Cliente } from '../cadastro/cliente';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  @Input() dataSource: Cliente[] = [];
  @Output() edit = new EventEmitter<string>();
  @Output() delete = new EventEmitter<string>();

  onEdit(id: string) {
    this.edit.emit(id);
  }

  onDelete(id: string) {
    this.delete.emit(id);
  }
}