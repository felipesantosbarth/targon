import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// import { HttpModule } from '@angular/http';

import { PreloadAllModules, RouteReuseStrategy, RouterModule, Routes } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';

// import { StatusBar } from '@ionic-native/status-bar';
// import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';
import { SplashScreen } from '@awesome-cordova-plugins/splash-screen/ngx';

import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";

import { AuthService } from './services/auth/auth.service';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { Tab1Page } from './tab1/tab1.page';
import { Tab1PageModule } from './tab1/tab1.module';
import { Tab2Page } from './tab2/tab2.page';
import { Tab2PageModule } from './tab2/tab2.module';
import { Tab3Page } from './tab3/tab3.page';
import { Tab3PageModule } from './tab3/tab3.module';
import { TabsPage } from './tabs/tabs.page';
// import { LoginPage } from './login/login';
import { LoginPage } from './login/login.page';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
// import { LoginPageModule } from './login/login.module';

/*const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  }
];*/

/*@NgModule({
	declarations: [
		AppComponent,
		TabsPage
		//LoginPage
	],
	imports: [
		BrowserModule, 
		RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
		IonicModule.forRoot(),
		// RouterModule.forRoot([
		// 	{ path: '', redirectTo: 'login', pathMatch: 'full' },
		// 	{ path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule) },
		// 	]), 
			Tab1PageModule,
			Tab2PageModule,
			Tab3PageModule,
		AppRoutingModule,
		AngularFireAuthModule,
        AngularFireModule.initializeApp(environment.firebase)
	],
	providers: [
		StatusBar,
		SplashScreen,
		{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
		{ provide: ErrorHandler },
		AuthService
	],
	entryComponents: [
		AppComponent,
		// LoginPage,
		TabsPage,
		Tab1Page,Tab2Page,Tab3Page
	],
	bootstrap: [AppComponent],
})*/

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,FormsModule,ReactiveFormsModule ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
