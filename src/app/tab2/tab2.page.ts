import { Component } from '@angular/core';
import {
   FormBuilder,
   FormGroup, 
   Validators } from '@angular/forms';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

	public form 		: FormGroup;
	constructor(private _FB  : FormBuilder) {
		this.form = this._FB.group({
			'email'        : ['', Validators.required],
			'password'     : ['', Validators.required]
		}); 
	}

}
