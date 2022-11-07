import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-tab3',
	templateUrl: 'tab3.page.html',
	styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

	constructor(private routes : Router) {}

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
