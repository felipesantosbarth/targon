import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// import { ComponentsModule } from '../components/components.module';
import { ToastController, ModalController, IonModal, IonItem, AlertController } from '@ionic/angular';

// import { ContratarPage } from './contratar.page';

@Component({
	selector: 'app-contratar',
	templateUrl: './contratar.page.html',
	styleUrls: ['./contratar.page.scss'],
})
export class ContratarPage implements OnInit {
	data: any;
  	titulares: any;
  	players: any;
  	allplayers: any;
  	@Input() user: any;
  	@Input() moeda: number;
  	showLoader: boolean;
  	hasFired: boolean = false;
  	totalTemp: number;
  	moneyTemp: number;
  	todosTemp : any[] = [];
  	todosOriginal : any[] = [];
  	titularesTemp : any[] = [];
  	reservasTemp : any[] = [];
  	showModalLoader: boolean;
  	title: string;
  	public playerListVisible = "visible";
  	public sectionModal: any = "all";
	public scopo: any[] = [];
	public available = "item item-block item-md";
	public hash = "ce74825b5a01c99b06af231de0bd667d";

  	constructor(public http: HttpClient, private toaster: ToastController,private modaler: ModalController, private alerter: AlertController) {
		this.sectionModal = "all";
		this.showModalLoader = true;
		// console.log(this.user);
	  	/*this.moneyTemp = this.user.moeda;
	  	this.totalTemp = this.user.contratacoes.total;
	  	this.todosTemp = this.user.contratacoes.lista.todos;
	  	this.titularesTemp = this.user.contratacoes.lista.titulares;
	  	this.reservasTemp = this.user.contratacoes.lista.reservas;

		this.populatePlayers().then(res => this.showModalLoader = false);*/
  	}

	ngOnInit() {
		console.log(this.hasFired);
		// this.moneyTemp = this.user.moeda;
	 //  	this.totalTemp = this.user.contratacoes.total;
	 //  	this.todosTemp = this.user.contratacoes.lista.todos;
	 //  	this.titularesTemp = this.user.contratacoes.lista.titulares;
	 //  	this.reservasTemp = this.user.contratacoes.lista.reservas;
	  	this.resetValues('initial');
		this.populatePlayers().then(res => this.showModalLoader = false);
	}

	displayProgress() {
		this.showLoader = true;
	}

	killProgressBar() {
		this.showLoader = false;
	}

	resetValues(origin) {		
		console.log(this.moneyTemp,this.moeda);
		if (origin == "initial") {
			this.todosOriginal = this.user.contratacoes.lista.todos;
		} else {
			this.user.contratacoes.lista.todos = this.todosOriginal;
		}
	  	console.log(this.todosOriginal);
		this.moneyTemp = this.user.moeda;
	  	this.totalTemp = this.user.contratacoes.total;
	  	this.todosTemp = this.user.contratacoes.lista.todos;
	  	this.titularesTemp = this.user.contratacoes.lista.titulares;
	  	this.reservasTemp = this.user.contratacoes.lista.reservas;
	}

	async populatePlayers() {
		console.log('Populating players');
		return new Promise(resolve => {
			// this.http.get('https://acaodireta.com/testes/v3/api/players?apikey='+hash)
			this.http.get('https://acaodireta.com/testes/v3/api/players?apikey='+this.hash)
			.subscribe(data => {
				this.players = data;
				this.allplayers = data;
				resolve(this.players);
				resolve(this.allplayers);
				// this.data = data;
				// resolve(this.data);
			});
		});
	}

	async populateTitulares(obj:any[]) {
		let listatxt = obj.join(':');
		console.log(listatxt);
		return new Promise(resolve => {
			// this.http.get('https://acaodireta.com/testes/v3/api/players?apikey='+hash)
			this.http.get('https://acaodireta.com/testes/v3/api/players?apikey='+this.hash+'&idlist='+listatxt)
			.subscribe(data => {
				// console.table(data);
				this.titulares = data;
				resolve(this.titulares);
				// this.data = data;
				// resolve(this.data);
			});
		});
	}



	contratar(event, idSolicitante:number) {
		event.stopPropagation();
		let nome, text;
		this.hasFired = true;
		this.moneyTemp--;
		this.totalTemp++;
		this.todosTemp.push(idSolicitante);
		if(this.titularesTemp.length==5) {
			this.reservasTemp.push(idSolicitante);
		} else {
			this.titularesTemp.push(idSolicitante);
		}

		// console.log(this.titularesTemp);
		// this.titulares.filter((item, index) => {
		// // this.titulares.filter((item, index) => {
		// 	if (item.id == idSolicitante) {
		// 		nome = item.apelido;
		// 	}
		// });
		// this.reservas.filter((item, index) => {
		// // this.reservas.filter((item, index) => {
		// 	if (item.id == idSolicitante) {
		// 		nome = item.apelido;
		// 	}
		// });
		// if (this.section == "titulares") { 
		// 	this.section = "reservas";
		// 	text = " da line-up?"
		// }
		// else { 
		// 	this.section = "titulares"; 
		// 	text = " para a line-up?"
		// }
		// this.aviso = "Substituir " + nome + text;
		// this.aproval = true;
		// this.presentToast("Substituir " + nome + text, "em-substituicao");
	}

	// modalSegmentChanged(ev: any) {
	// 	let item: any;
	// 	let val = this.sectionModal;
	// 	if (val != 'all') {
	// 		let alerta = this.players.filter((jogador, index) => {
	// 			item = document.getElementById('indice-'+index);
	// 			item.classList.remove('visible');
	// 			item.classList.remove('not-visible');
	// 			if (jogador.posicao.id == val) {
	// 				item.classList.add('visible');
	// 				// this.item[index].style = "visible";
	// 			} else {
	// 				item.classList.add('not-visible');
	// 				// this.playerListVisible = "not-visible";
	// 			}
	// 		});
	// 	} else {
	// 		let alerta = this.players.filter((jogador, index) => {
	// 			item = document.getElementById('indice-'+index);
	// 			// item = document.getElementsByClassName('card-player').item(index);
	// 			item.classList.remove('visible');
	// 			item.classList.remove('not-visible');
	// 		});
	// 	}
	// }
	cancelModal() {
		
		if ((this.hasFired!=false) || (this.totalTemp!=this.user.contratacoes.total)) {
			let truck:any = {
				"aviso":"As contratações feitas serão ignoradas ao deixar essa tela. Deseja continuar e ignorar?",
				"confirmTxtBtn":"Sim",
				"confirmText":"As contratações foram descartadas.",
				"confirmAction":"closeModal",
				"cancelTxtBtn":"Não",
				"cancelText":"Para confirmar as contratações, clique no botão <ion-icon name='checkmark-circle-outline'></ion-icon> ao lado direito",
				"cancelAction":""
			};
			this.presentAlert(truck);
		} else {
			// this.modal.dismiss(null, 'cancel');
			this.modaler.dismiss({
				teste: this.totalTemp,
			  	saldo: this.moneyTemp,
			  	total: this.totalTemp,
			  	todos: this.todosTemp,
			  	titulares: this.titularesTemp,
			  	reservas: this.reservasTemp,
			}, 'cancel');
			console.log('dismissed unchanged');
		}
	}
	confirmModal() {
	  	// this.user.moeda = this.moneyTemp;
	  	// this.user.contratacoes.total = this.totalTemp;
	  	// this.user.contratacoes.lista.todos = this.todosTemp;
	  	// this.user.contratacoes.lista.titulares = this.titularesTemp;
	  	// this.user.contratacoes.lista.reservas = this.reservasTemp;
		// this.modal.dismiss(null, 'confirm');
		console.log('confirm',this.titularesTemp);
		this.modaler.dismiss({
				teste: this.titularesTemp,
			  	saldo: this.moneyTemp,
			  	total: this.totalTemp,
			  	todos: this.todosTemp,
			  	titulares: this.titularesTemp,
			  	reservas: this.reservasTemp,
			}, 'confirm');
			console.log('confirm changes');
		// this.displayProgress();
		// this.populateTitulares(this.titularesTemp).then(res => this.killProgressBar());
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
							// this.modal.dismiss(null, 'cancel');
							console.log('dismiss');
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
							// this.modal.dismiss(null, 'cancel');
							this.resetValues('sair');
							this.modaler.dismiss({
								teste: this.totalTemp,
								saldo: this.moneyTemp,
								total: this.totalTemp,
								todos: this.todosTemp,
								titulares: this.titularesTemp,
								reservas: this.reservasTemp,
							}, 'cancel');
							console.log('dismiss ignoring changes');
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

	spreadLane(ev) {
		let item: any;
		this.sectionModal = ev;
		let val = this.sectionModal;
		this.players=[];
		if (this.allplayers==null) {
			return;
		}
		if (val == "all") {
			this.players = this.allplayers;
			/*let alerta = this.players.filter((jogador, index) => {
				item = document.getElementById('indice-'+index);
				// item = document.getElementsByClassName('card-player').item(index);
				item.classList.remove('visible');
				item.classList.remove('not-visible');
			});*/
		} else {
			let alerta = this.allplayers.filter((jogador, index) => {
				/*item = document.getElementById('indice-'+index);
				item.classList.remove('visible');
				item.classList.remove('not-visible');*/
				if (jogador.posicao.id == val) {
					this.players.push(jogador);
					/*item.classList.add('visible');*/
					// this.item[index].style = "visible";
				} /*else {
					item.classList.add('not-visible');
					// this.playerListVisible = "not-visible";
				}*/
			});
		}
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
}
