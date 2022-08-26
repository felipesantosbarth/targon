import { Component } from '@angular/core';
// import { NavController } from '@ionic/angular/providers/nav-controller';
// import { NavController } from 'ionic-angular';
import { Router } from '@angular/router';
import { Deeplinks } from '@awesome-cordova-plugins/deeplinks/ngx';
import { Tab1Page } from '../tab1/tab1.page';
import { Tab2Page } from '../tab2/tab2.page';
import { Tab3Page } from '../tab3/tab3.page';
import { LoginPage } from '../login/login.page';
// import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']	
})
export class TabsPage {
	tab1Root = Tab1Page;
	tab2Root = Tab2Page;
	tab3Root = Tab3Page;
	constructor(private routes : Router) {}
	//constructor(private _AUTH : AuthService, private _NAV : Deeplinks, private route : Router) {}
	// constructor(private _NAV : NavController, private _AUTH : AuthService) {}
	/**
	* Log out from Firebase/set the rootPage value to
	* the LoginPage component
	* @method logOut
	* @return {none}
	*/
	logOut()
	{
		console.log("Saiu");
		this.routes.navigateByUrl('');
		/*
		this._AUTH.logOut()
		.then((data : any) =>
		{
			// console.log('Should Quit');
			// this.route.navigateByUrl('../login/login.page', {replaceUrl: true});
			this.route.navigate(['/login']);
		})
		.catch((error : any) =>
		{
			console.dir(error);
		});
		*/
	}

}
