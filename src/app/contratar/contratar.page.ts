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
  	usuario: any;
  	@Input() usu: any;
  	@Input() moeda: number;
  	showLoader: boolean;
  	isFiltering: boolean;
  	hasFired: boolean = false;
  	totalTemp: number;
  	moneyTemp: number;
  	todosTemp : any[] = [];
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
		// console.log(this.usuario);
	  	/*this.moneyTemp = this.usuario.moeda;
	  	this.totalTemp = this.usuario.contratacoes.total;
	  	this.todosTemp = this.usuario.contratacoes.lista.todos;
	  	this.titularesTemp = this.usuario.contratacoes.lista.titulares;
	  	this.reservasTemp = this.usuario.contratacoes.lista.reservas;

		this.populatePlayers().then(res => this.showModalLoader = false);*/
  	}

	ngOnInit() {
		console.log(this.hasFired);
		// this.moneyTemp = this.usuario.moeda;
	 //  	this.totalTemp = this.usuario.contratacoes.total;
	 //  	this.todosTemp = this.usuario.contratacoes.lista.todos;
	 //  	this.titularesTemp = this.usuario.contratacoes.lista.titulares;
	 //  	this.reservasTemp = this.usuario.contratacoes.lista.reservas;
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
		this.usuario = this.usu;
		this.moneyTemp = this.usuario.moeda;
	  	this.totalTemp = this.usuario.contratacoes.total;
	  	this.todosTemp = this.usuario.contratacoes.lista.todos;
	  	this.titularesTemp = this.usuario.contratacoes.lista.titulares;
	  	this.reservasTemp = this.usuario.contratacoes.lista.reservas;
		console.log(this.totalTemp, this.usuario.contratacoes.limite, this.usuario.contratacoes.lista.titulares);
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
		if (this.totalTemp < this.usuario.contratacoes.limite) {
			this.hasFired = true;
			// this.moneyTemp--;
			this.totalTemp++;
			this.usuario.contratacoes.total = this.totalTemp;
			// this.usuario.moeda = this.moneyTemp;
			this.todosTemp.push(idSolicitante);
			if((this.titularesTemp.length==5) && (this.usuario.premium=="true")) {
				this.reservasTemp.push(idSolicitante);
			} else {
				this.titularesTemp.push(idSolicitante);
			}
			let custo = this.getPlayerPropertyById(idSolicitante, "valorizacao");
			this.atualizaOuro("compra", custo);
		}
	}

	demitir(event, idSolicitante:number) {
		event.stopPropagation();
		// redundancia na validação por segurança
		if ((this.totalTemp > 0) && (this.getSimplePositionById(idSolicitante, this.todosTemp) > -1)) {
			this.hasFired = true;
			// this.moneyTemp++;
			this.totalTemp--;
			this.usuario.contratacoes.total = this.totalTemp;

			this.removeContratacao(idSolicitante);
			let custo = this.getPlayerPropertyById(idSolicitante, "valorizacao");
			this.atualizaOuro("venda", custo);
			console.log(this.players);
		}
	}

	getSimplePositionById(id, obj) {
		return obj.map(object => object).indexOf(id);
	}


	getComplexPositionById(id, obj) {
		return obj.map(object => object.id).indexOf(id);
	}

	getPlayerPropertyById(id, property) {
		let listIndexPlayers = this.getComplexPositionById(id, this.players);
		let player = this.players[listIndexPlayers][property];
		return player;
	}

	removeContratacao(id) {
		// remove do todosTemp
		let listIndexTodos = this.getSimplePositionById(id, this.todosTemp);
		this.todosTemp.splice(listIndexTodos, 1);
		// remove dos titularesTemp
		let listIndexTit = this.getSimplePositionById(id, this.titularesTemp);
		if (listIndexTit > -1) {
			this.titularesTemp.splice(listIndexTit, 1);
		}
		// if premium
			// remove dos reservasTemp
		if (this.usuario.premium) {
			let listIndexRes = this.getSimplePositionById(id, this.reservasTemp);
			if (listIndexRes > -1) {
				this.reservasTemp.splice(listIndexRes, 1);
			}
		}
	}

	atualizaOuro(tipo, custo:number) {
		let result;
		if (tipo=="compra") {
			this.moneyTemp = this.moneyTemp - custo;
		} else if (tipo=="venda") {
			this.moneyTemp = this.moneyTemp - (-custo);
		}
		else {
			this.presentToast("Ação inválida", "error-msg");
			return;
		}
		this.usuario.moeda = this.moneyTemp;
		// this.presentToast("A " + tipo + " do jogador foi concluída!", "ok-msg");
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
		
		if ((this.hasFired!=false) || (this.totalTemp!=this.usuario.contratacoes.total)) {
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
	  	// this.usuario.moeda = this.moneyTemp;
	  	// this.usuario.contratacoes.total = this.totalTemp;
	  	// this.usuario.contratacoes.lista.todos = this.todosTemp;
	  	// this.usuario.contratacoes.lista.titulares = this.titularesTemp;
	  	// this.usuario.contratacoes.lista.reservas = this.reservasTemp;
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
		this.isFiltering = val.length > 0;
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
