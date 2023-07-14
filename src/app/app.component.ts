import { Component } from '@angular/core';
import { Deeplinks } from '@awesome-cordova-plugins/deeplinks/ngx';
import { Platform } from '@ionic/angular';
// import { NavController } from 'ionic-angular';
// import { StatusBar, Deeplinks } from 'ionic-native';
// import { StatusBar } from '@ionic-native/status-bar';
import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';
// import { SplashScreen } from '@ionic-native/splash-screen';
import { SplashScreen } from '@awesome-cordova-plugins/splash-screen/ngx';
// import { Firebase } from '@awesome-cordova-plugins/firebase/ngx';
// import { Firebase } from '@firebase';
// import { firebase } from 'firebase';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from '../environments/environment';

import { LoginPage } from './login/login.page';
import { TabsPage } from './tabs/tabs.page';
// import { RoleListComponent } from './components/role-list/role-list.component';

@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.scss'],
})
export class AppComponent {
	/*rootPage = LoginPage;*/
	constructor() {}
	/*constructor(platform: Platform, private firebase: AngularFireModule, statusBar: StatusBar, splashScreen: SplashScreen) {
		// Okay, so the platform is ready and our plugins are available.
		// Here you can do any higher level native things you might need.
		platform.ready().then(() => {
			statusBar.styleDefault();
			splashScreen.hide();
		});

		AngularFireModule.initializeApp(environment.firebase);
	}*/
}
