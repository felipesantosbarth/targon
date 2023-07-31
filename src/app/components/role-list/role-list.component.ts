import { NgModule } from '@angular/core';  
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule,ReactiveFormsModule  } from '@angular/forms';

import { Component, OnInit, Output, Input, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
	selector: 'app-role-list',
	templateUrl: './role-list.component.html',
	styleUrls: ['./role-list.component.scss'],
})
export class RoleListComponent implements OnInit {
	@Input() isFiltering : boolean = false;
	@Output() selectedLane : EventEmitter<any> = new EventEmitter();

  	public sectionModal: any = "all";

	constructor() { }

	ngOnInit() {
		this.selectedLane.emit(this.sectionModal);
	}

	ngOnChanges(changes: SimpleChanges) {
		// Verifica se o Campo de filtro foi ativado
		if (changes.isFiltering) {
			let changed = changes.isFiltering.currentValue;
			if (changed === true) {
				// Define evento artificial para passagem de parâmetro solicitada na função original
				let fakeEv = new CustomEvent('filteringEvent', {detail: {value: 'all'},});
				// Evecuta a função original para troca do segmento
				this.modalSegmentChanged(fakeEv);
			}
		}
	}

	modalSegmentChanged(ev: any) {
		let item: any;
		this.sectionModal = ev.detail.value;
		let val = this.sectionModal;
		this.selectedLane.emit(val);
	}

}
