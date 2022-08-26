import { Injectable } from '@angular/core';
// import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

// DON'T forget to import the Firebase node package!
// import * as Firebase from '@awesome-cordova-plugins/firebase/ngx';
// import * as { firebase } from 'firebase';
// import { getAuth, onAuthStateChanged } from "firebase/auth";
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import firebase from 'firebase/compat/app';

// import { AngularFireModule } from '@angular/fire/compat';
// import { AngularFireAuthModule } from '@angular/fire/compat/auth';
// import { AngularFireStorageModule } from '@angular/fire/compat/storage';
// import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
// import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
// import { Firebase } from '@firebase';
// import { Firebase } from '@awesome-cordova-plugins/firebase/ngx';
// import firebase from 'firebase/compat/app';
// import { Firebase } from '@firebase/auth-compat/dist';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
	public user	: Observable<any>;

	// constructor(public http : Http, private firebase: AngularFireModule,) {
	constructor(afAuth: AngularFireAuthModule) {
		/*const auth = getAuth();
		onAuthStateChanged(auth, (user) => {
			if (user) {
				// User is signed in, see docs for a list of available properties
				// https://firebase.google.com/docs/reference/js/firebase.User
				console.log('User is signed in: '+user);
				// const uid = user.uid;
				// ...
			} else {
				// User is signed out
				// ...
					console.log('User is NOT signed in');
			}
		});*/
		firebase.auth().onAuthStateChanged((user) =>
		{
			if (user) 
			{
				console.log('User is signed in');
			} 
			else 
			{
				console.log('User is NOT signed in');
			}
		});
	}

	/** 
	* Use Firebase Web API signInWithEmailAndPassword method 
	* to authenticate user login attempt
	* 
	* @method loginWithEmailAndPassword
	* @param email    {string}      User e-mail address (gmail)
	* @param password {string}      Gmail address password
	* @return {Promise}
	*/
	/*loginWithEmailAndPassword(email : string, password : string)
	{
		const auth = getAuth();
		return new Promise((resolve, reject) =>
		{
			firebase
			.signInWithEmailAndPassword(auth, email, password)
			.then((val : any) =>
			{
				resolve(val);
			})
			.catch((error : any) =>
			{
				reject(error);
			});
		});
	}*/
	loginWithEmailAndPassword(email : string, password  : string) : Promise <any>
	{

		console.log('Call login');
		return new Promise((resolve, reject) =>
		{
			firebase.auth()
			.signInWithEmailAndPassword(email, password)
			.then((val : any) =>
			{
				resolve(val);
			})
			.catch((error : any) =>
			{
				reject(error);
			});
		});
	}
	
	/**
	* Log out with Firebase Web API signOut method 
	* 
	* @method logOut
	* @return {Promise}
	*/
	logOut() : Promise <any>
	{
		console.log('Call logout');
		return new Promise((resolve, reject) =>
		{
			firebase.auth()
			.signOut()
			.then(() =>
			{
				resolve(true);
			})
			.catch((error : any) =>
			{
				reject(error);
			});
		}); 
	}
}
