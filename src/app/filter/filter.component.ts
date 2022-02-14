import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
	selector: 'app-filter',
	templateUrl: './filter.component.html',
	styleUrls: [ './filter.component.scss' ]
})
export class FilterComponent implements OnInit {
  @Output() filterEvent = new EventEmitter<string>();

	filterForm = new FormGroup({
		title: new FormControl(),
		publisher: new FormControl(),
		dateSort: new FormControl('ascending'),
	});

	constructor() {
	}

	ngOnInit(): void {

	}

  filter(){
    this.filterEvent.emit(this.filterForm.value);
  }
}
