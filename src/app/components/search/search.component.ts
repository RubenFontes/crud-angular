import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  nameSearch: string = '';
  @Output() searchComp = new EventEmitter<string>();

  performSearch() {
    this.searchComp.emit(this.nameSearch);
  }
}