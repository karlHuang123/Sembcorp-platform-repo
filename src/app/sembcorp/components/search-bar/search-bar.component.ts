import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent {

  @Input() titles: string[];
  @Output() clicked = new EventEmitter<any>();
  
  constructor() {
		this.searchSubject.pipe(
			debounceTime(300),
			distinctUntilChanged()
		).subscribe(term => {
			this.searchResults = this.getSearchResults(term);
		});
	}

	searchTerm: string = '';
	searchResults: string[] = [];
	searchSubject = new Subject<string>();

	onSearch() {
	  console.log('Searching for:', this.searchTerm);
	}
	onInputChange() {
		this.searchSubject.next(this.searchTerm);
	}
    onBlur() {
		// this.searchResults = [];
	}
  onResultClick(result: string) {
	this.searchTerm = result;
    this.clicked.emit({title: result})
		this.searchResults = [];
	}

	
	getSearchResults(term: string): string[] {
		if (!term) return []
		return this.titles.filter(item =>
		  item.toLowerCase().includes(term.toLowerCase())
		);
	}

	clearSearch() { // allow clear
		this.searchTerm = ''
		this.searchResults = []
	}
}
