import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';

import {
   FormBuilder,
   FormGroup, 
   Validators } from '@angular/forms';

//import { AuthService } from '../services/auth/auth.service';

// Import the TabsPage component
import { TabsPage } from '../tabs/tabs.page';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
	/**
	* Create reference for FormGroup object
	*/
	public notification	:any;
	public failure		:any;
	public message		:any;
	public loginForm 		: FormGroup;
	@ViewChild(IonModal) modal: IonModal;
	@ViewChild('popover') popover;
	isOpen = false;
	presentPopover(e: Event, id:number) {
		this.popover.event = e;
		this.isOpen = true;
		this.message = this.failure[id];
	}
	// constructor(public navCtrl    : NavController, private _FB       : FormBuilder, private _AUTH     : AuthService) {
	// constructor() {}
	constructor(private _FB : FormBuilder, private routes : Router) {
	// constructor(private _FB       : FormBuilder, private _AUTH : AuthService) {
		// Define FormGroup object using Angular's FormBuilder
		this.loginForm = this._FB.group({
			'email'        : ['', Validators.required],
			'password'     : ['', Validators.required]
		});
		this.notification=[{
				title:'Transferências de conta indisponíveis',
				description:'As transferências de contas estão indisponíveis enquanto trabalhamos na solução de um problema.',
				date:'22/02/2022 12:22'
			},{
				title:'Presentes',
				description:'As transferências de contas estão indisponíveis enquanto trabalhamos na solução de um problema.',
				date:'22/02/2022 12:22'
			}
		];
		this.failure=[
			'Não foi possível realizar o login. \nTente novamente mais tarde.',
			'Login ou senha não informados. \nVerifique o dados informados e tente novamente.',
			'Login ou senha errados. \nVerifique o dados informados e tente novamente.',
			'Nosso serviço de autenticação não está funcional ainda. \nTente novamente mais tarde.',
		];
	}

	/**
	* Log in using the loginWithEmailAndPassword method 
	* from the AuthService service (supplying the email 
	* and password FormControls from the template via the 
	* FormBuilder object
	* @method logIn
	* @return {none}
	*/
	logIn()
	{
		console.log("Tentou entrar");
		// console.log("Entrou");
		let email      : any        = this.loginForm.controls['email'].value;
		let password   : any        = this.loginForm.controls['password'].value;
		console.log('Login: '+email, 'Senha: '+password);
		if ((email=="") || (password=="")) {
			this.presentPopover(event,1);
		} else {
			this.loginForm.reset();
			console.log("Conseguiu");
			this.routes.navigateByUrl('/tabs');
		}
		/*this._AUTH.loginWithEmailAndPassword(email, password)
		.then((auth : any) => 
		{
			// this.navCtrl.setRoot(TabsPage);
			console.log("Should Log In");
		})
		.catch((error : any) => 
		{
			console.log(error.message);
		});*/
	}

	cancel() {
		this.modal.dismiss(null, 'cancel');
	}

	// confirm() {
	// 	this.modal.dismiss(this.name, 'confirm');
	// }

	onWillDismiss(event: Event) {
		// const ev = event as CustomEvent<OverlayEventDetail<string>>;
		// if (ev.detail.role === 'confirm') {
		// 	this.message = `Hello, ${ev.detail.data}!`;
		// }
	}

	ngOnInit() {
	}


	cantStart()
	{
		console.log("Não consegue entrar");
		// console.log("Entrou");
		this.presentPopover(event,3);
		/*this._AUTH.loginWithEmailAndPassword(email, password)
		.then((auth : any) => 
		{
			// this.navCtrl.setRoot(TabsPage);
			console.log("Should Log In");
		})
		.catch((error : any) => 
		{
			console.log(error.message);
		});*/
	}
	createAccount()
	{
		// console.log("Entrou");
		this.presentPopover(event,3);
		// this.routes.navigateByUrl('/tabs');
		/*this._AUTH.loginWithEmailAndPassword(email, password)
		.then((auth : any) => 
		{
			// this.navCtrl.setRoot(TabsPage);
			console.log("Should Log In");
		})
		.catch((error : any) => 
		{
			console.log(error.message);
		});*/
	}
}
