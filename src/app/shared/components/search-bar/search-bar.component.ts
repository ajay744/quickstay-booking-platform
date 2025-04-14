import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
  @Input() placeholder: string = 'Search...';

  private _searchText: string = '';
  @Input() get searchText(): string {
    return this._searchText;
  }
  @Output() searchTextChange = new EventEmitter<string>();

  set searchText(val: string) {
    this._searchText = val;
    this.searchTextChange.emit(this._searchText);
  }

  private _sortOption: string = '';
  @Input() get sortOption(): string {
    return this._sortOption;
  }
  @Output() sortOptionChange = new EventEmitter<string>();

  set sortOption(val: string) {
    this._sortOption = val;
    this.sortOptionChange.emit(this._sortOption);
  }

  onSearchChange(value: string): void {
    this.searchText = value;
  }

  onSortChange(value: string): void {
    this.sortOption = value;
  }
  handleInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.onSearchChange(inputElement.value);
  }
  
}
