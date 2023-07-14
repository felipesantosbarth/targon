import { NgModule } from '@angular/core';  
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule,ReactiveFormsModule  } from '@angular/forms';

import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'app-role-list',
	templateUrl: './role-list.component.html',
	styleUrls: ['./role-list.component.scss'],
})
export class RoleListComponent implements OnInit {
	@Output() selectedLane : EventEmitter<any> = new EventEmitter();

  	public sectionModal: any = "all";

	constructor() { }

	ngOnInit() {
		this.selectedLane.emit(this.sectionModal);
	}


	modalSegmentChanged(ev: any) {
		let item: any;
		// console.log(ev, ev.detail, ev.detail.value);
		this.sectionModal = ev.detail.value;
		let val = this.sectionModal;
		this.selectedLane.emit(val);
		/*if (val != 'all') {
			let alerta = this.players.filter((jogador, index) => {
				item = document.getElementById('indice-'+index);
				item.classList.remove('visible');
				item.classList.remove('not-visible');
				if (jogador.posicao.id == val) {
					item.classList.add('visible');
					// this.item[index].style = "visible";
				} else {
					item.classList.add('not-visible');
					// this.playerListVisible = "not-visible";
				}
			});
		} else {
			let alerta = this.players.filter((jogador, index) => {
				item = document.getElementById('indice-'+index);
				// item = document.getElementsByClassName('card-player').item(index);
				item.classList.remove('visible');
				item.classList.remove('not-visible');
			});
		}*/
	}

}
