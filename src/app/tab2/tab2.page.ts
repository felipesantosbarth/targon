import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController, ModalController, IonModal, IonItem, AlertController } from '@ionic/angular';
// import { HTTP } from '@awesome-cordova-plugins/http/ngx';

@Component({
	selector: 'app-tab2',
	templateUrl: 'tab2.page.html',
	styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
	data: any;
	teste: any;
  	titulares: any;
  	players: any;
  	user: any;
  	showLoader: boolean;
  	showModalLoader: boolean;
  	public playerListVisible = "visible";
  	public sectionModal: any = "all";
	public scopo: any[] = [];
	public available = "item item-block item-md";
	@ViewChild(IonModal) modal: IonModal;
	// @ViewChild(IonItem) item: IonItem;
	public hash = "ce74825b5a01c99b06af231de0bd667d";

	constructor(public http: HttpClient, private toaster: ToastController,private modaler: ModalController, private alerter: AlertController) {
		// this.user = '["contratacoes": {"total":"0","lista":{}},"email":"felipe.santos.barth@gmail.com","moeda":"100","nome":"Felipe","premium":"false","senha":"202cb962ac59075b964b07152d234b70","sobrenome":"Barth"}]';
		this.user = {
			"moeda":"100",
			"sobrenome":"Barth",
			"nome":"Felipe",
			"email":"felipe.santos.barth@gmail.com",
			"senha":"202cb962ac59075b964b07152d234b70",
			"premium":"false",
			"contratacoes": {
				"limite":"5",
				"total":"0",
				"lista":{
					"titulares":[8,7,6,4],
					// "titulares":[8,7,6,4,2],
					"reservas":[1]
				},
			}
		};
	}

	displayProgress() {
		this.showLoader = true;
	}

	killProgressBar() {
		this.showLoader = false;
	}

	ionViewDidEnter() {
		this.displayProgress();
		this.teste = new Array(this.user.contratacoes.total);
		// fetch('https://acaodireta.com/testes/v3/api/players?apikey='+hash)
		// .then(res => {
		// 	console.log(res);
		// }).catch(error => {
		// 	console.log('error');
		// }).finally(() => {
		// })
		if (this.user.contratacoes.total > 0) {
			var listatxt = this.user.contratacoes.lista.titulares.join(':');
			// console.log(listatxt);
			return new Promise(resolve => {
				// this.http.get('https://acaodireta.com/testes/v3/api/players?apikey='+hash)
				this.http.get('https://acaodireta.com/testes/v3/api/players?apikey='+this.hash+'&idlist='+listatxt)
				.subscribe(data => {
					// console.table(data);
					this.titulares = data;
					resolve(this.titulares);
					// this.data = data;
					// resolve(this.data);
					this.killProgressBar();
				});
			});
		} else {
			// this.presentToast("Apenas membros premium podem substituir o time titular.", "error-msg");
			this.killProgressBar();
		}
	}

	async openModal() {
		this.sectionModal = "all";
		this.showModalLoader = true;
		return new Promise(resolve => {
			// this.http.get('https://acaodireta.com/testes/v3/api/players?apikey='+hash)
			this.http.get('https://acaodireta.com/testes/v3/api/players?apikey='+this.hash)
			.subscribe(data => {
				this.players = data;
				resolve(this.players);
				// this.data = data;
				// resolve(this.data);
				this.showModalLoader = false;
			});
		});
		// modal.present();
	}

	cancel() {
		let truck:any = {
			"aviso":"As contratações feitas serão ignnoradas ao deixar essa tela. Deseja continuar e ignorar?",
			"confirmTxtBtn":"Sim",
			"confirmText":"As contratações foram descartadas.",
			"confirmAction":"closeModal",
			"cancelTxtBtn":"Não",
			"cancelText":"Para confirmar as contratações, clique no botão <ion-icon name='checkmark-circle-outline'></ion-icon> ao lado direito",
			"cancelAction":""
		};
		this.presentAlert(truck);
		// this.modal.dismiss(null, 'cancel');
	}
	confirm() {
		this.modal.dismiss(null, 'confirm');
	}
	onWillDismiss(event: Event) {
		// const ev = event as CustomEvent<OverlayEventDetail<string>>;
		// if (ev.detail.role === 'confirm') {
		// 	this.message = `Hello, ${ev.detail.data}!`;
		// }
	}

	procurar(ev: any) {
		// set val to the value of the searchbar
		const val = ev.target.value;
		let id:number = 0;
		let item: any;
		this.sectionModal = "all";
		
		// if the value is an empty string don't filter the items
		if (val && val.trim() != '') {
			let alerta = this.players.filter((jogador, index) => {
				item = document.getElementById('indice-'+index);
				item.classList.remove('visible');
				item.classList.remove('not-visible');
				if (jogador.apelido.toLowerCase().indexOf(val.toLowerCase()) > -1) {
					item.classList.add('visible');
				} else {
					item.classList.add('not-visible');
				}
			});
			// this.presentToast("Apenas membros premium podem substituir o time titular.", "error-msg");
		} else {
			let alerta = this.players.filter((jogador, index) => {
				item = document.getElementById('indice-'+index);
				// item = document.getElementsByClassName('card-player').item(index);
				item.classList.remove('visible');
				item.classList.remove('not-visible');
			});
		}
		// this.slides.slideTo(id);
		return 0;
	}

	modalSegmentChanged(ev: any) {
		let item: any;
		let val = this.sectionModal;
		if (val != 'all') {
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
		}
	}

	async presentAlert(mensagem:any) {
		const alert = await this.alerter.create({
			header: mensagem.aviso,
			buttons: [
			{
				text: mensagem.cancelTxtBtn,
				role: 'cancel',
				cssClass: 'cl50 ion-text-center',
				handler: () => {
					switch(mensagem.cancelAction) {
						case 'closeModal':
							this.modal.dismiss(null, 'cancel');
						break;
						default: 
							this.presentToast(mensagem.cancelText, "error-msg");
						break;
					}
				},
			},
			{
				text: mensagem.confirmTxtBtn,
				role: 'confirm',
				cssClass: 'cl50 ion-text-center',
				handler: () => {
					switch(mensagem.confirmAction) {
						case 'closeModal':
							this.modal.dismiss(null, 'cancel');
						break;
						default: 
							this.presentToast(mensagem.confirmText, "error-msg");
						break;
					}
				},
			},
			],
		});

		await alert.present();
	}

	async presentToast(mensagem:string, classe:string = "normal") {
		let toast;
		if (classe=="error-msg") {
			toast = await this.toaster.create({
				message: mensagem,
				cssClass: classe,
				position: "middle",
				buttons: [
					{
						text: 'OK',
						role: 'cancel'
					}
				]
			});
		}
		else if (classe=="em-substituicao") {
			toast = await this.toaster.create({
				message: mensagem,
				position: "top",
				cssClass: classe,
				buttons: [
					{
						text: 'Não',
						role: 'cancel',
						handler: () => { this.available = "item item-block item-md"; }
					}
				]
			});
		}
		else {
			toast = await this.toaster.create({
				message: mensagem,
				position: "top",
				cssClass: classe,
				duration: 1700
			});
		}
		await toast.present();
	}
}
