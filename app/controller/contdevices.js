Ext.define('myvera.controller.contdevices', {
	extend: 'Ext.app.Controller',
	
	config: {
		stores: ['storeRooms', 'TabViewsStore'],
		//'devicesStore',
		//models: ['Veradevices'],
		views: ['dataplan'],
		//views: ['dataplan', 'listclock', 'PanelConfigGenerale'],
		//'datalist',
		//profile: Ext.os.deviceType.toLowerCase(),
		
		//jsonpath: './protect/config/',
		loggedUserId: null,
		logged: null,
		ipvera: null,
		profilchoice: null,
		tabshow: true,//Pour indiquer si isTab était déjà sur 0 (et ne pas mettre le message indiquant de penser à mettre un bouton dans les vues)
		
		refs: {
			plan: 'dataplan',
			liste1: 'datalist [id=listInRoom]',
			liste2: 'datalistphone [id=listInRoom]',
			
			listeon: 'dataliston',
			listeoff: 'datalistoff',
			listclock: 'listclock',
			
			panelConfig: 'PanelConfigGenerale',
			usernameCt: 'PanelConfigGenerale [name=login]',
			passwordCt: 'PanelConfigGenerale [name=pass]',
			connexionCt: 'PanelConfigGenerale [name=connexion]',
			ipveraCt: 'PanelConfigGenerale [name=ipvera]',
			isVueL: 'PanelConfigGenerale [name=isVueL]',
			isVueP: 'PanelConfigGenerale [name=isVueP]',
			isReveil: 'PanelConfigGenerale [name=isReveil]',
			isRetina: 'PanelConfigGenerale [name=isRetina]',
			isTab: 'PanelConfigGenerale [name=isTab]',
			viewprofil: 'PanelConfigGenerale [name=viewprofil]',
			loginBt: 'PanelConfigGenerale [name=loginbutton]',
			retinaBt: 'PanelConfigGenerale [name=retinabutton]',
			versionBt: 'PanelConfigGenerale [name=versionbutton]',
			urlversiontxt: 'PanelConfigGenerale [name=urlversion]',
			
			clockfieldsetCt: 'paneloverlay [name=fieldset1]',
			clockdeiveidCt: 'paneloverlay [name=deviceid]',
			clockheuredebCt: 'paneloverlay [name=heuredeb]',
			clockheurefinCt: 'paneloverlay [name=heurefin]',
			clockmessageCt: 'paneloverlay [name=message]',
			clocksaveclockBt: 'paneloverlay [name=saveclock]'
		},
		control: {
			liste1: {
				itemtap: 'onDeviceTap'
			},
			liste2: {
				itemtap: 'onDeviceTap'
			},
			
			listeon: {
				itemtap: 'onDeviceTap'
			},
			listeoff: {
				itemtap: 'onDeviceTap'
			},
			listclock: {
				itemtap: 'onDeviceTap'
			},
			
			isVueL: {
				change: 'onIsVueChangeL'
			},
			isVueP: {
				change: 'onIsVueChangeP'
			},
			
			isReveil: {
				change: 'onIsReveilChange'
			},
			
			isTab: {
				change: 'onIsTabChange'
			},
			
			loginBt: {
				tap: 'onLoginTap'
			},
			
			versionBt: {
				tap: 'onVersionTap'
			},
			
			retinaBt: {
				tap: 'onRetinaTap'
			},
			
			clocksaveclockBt: {
				tap: 'onClockSaveTap'
			}
			
		}
	},

	launch: function() {
		//console.log("contdevices");
		//*******************Debug mode
		//this.nbrsync = 0;
		//this.nbrtimer=0;
		//this.nbrforce = 0;
		//this.syncdate = 0;
		this.synccount=0;
		this.autosync = true;
		this.tabshow=true;
		//var tabbarlabel = {
		//    id: 'tabbarlabel',
                //    docked: 'right',
                //    html: this.nbrsync + "/" + this.nbrtimer + "/" + this.nbrforce
                //};
		//Ext.getCmp('main').getTabBar().add(tabbarlabel);
		//*******************
		
		//Utilisé pour charger devicesStore après FloorsStore s'il n'est pas encore chargé.
		this.storeloaded=false;
		this.jsonpath='./protect/config/';
		Ext.ModelMgr.getModel('myvera.model.CurrentUser').load(1, {
			scope: this,
			success: function(cachedLoggedInUser) {
				delete cachedLoggedInUser.phantom;
				this.getUsernameCt().setValue(cachedLoggedInUser.get('name'));
				this.getPasswordCt().setValue(cachedLoggedInUser.get('pass'));
				this.getConnexionCt().setValue(cachedLoggedInUser.get('connexion'));
				this.ipvera = cachedLoggedInUser.get('ipvera');
				this.getIpveraCt().setValue(this.ipvera);
				this.loggedUserId = this.base64_encode(cachedLoggedInUser.get('name') + ":" + cachedLoggedInUser.get('pass'));
				
				this.getIsVueL().setValue(cachedLoggedInUser.get('isVueL'));
				this.getIsVueP().setValue(cachedLoggedInUser.get('isVueP'));
				this.getIsReveil().setValue(cachedLoggedInUser.get('isReveil'));
				this.getIsTab().setValue(cachedLoggedInUser.get('isTab'));
				if(cachedLoggedInUser.get('isTab')=="0") this.tabshow=false;
				if(cachedLoggedInUser.get('isRetina')=='@2x') {
					myvera.app.setIsretina('@2x');
				} else {
					myvera.app.setIsretina("");
				}
				this.profilchoice=cachedLoggedInUser.get('profil');
				if(this.profilchoice==null) this.profilchoice=0;
				this.getViewprofil().setValue(this.profilchoice);
				
				console.info('Auto-Login succeeded.');
				
				if(this.getIsReveil().getValue()==0) Ext.getCmp('listclock').tab.hide();
				
				if(myvera.app.isretina=="@2x") this.getRetinaBt().setText(locale.getSt().button.noretinamode);
				else  this.getRetinaBt().setText(locale.getSt().button.retinamode);
				this.getIsRetina().hide();
				this.getRetinaBt().show();
				
				this.LogIn();
				//this.startstore();
			},
			failure : function() {
				console.warn('Auto-Login failed (user was not logged in).');
				//Lecture des paramètre par défaut
				var url = './conf.json';
				Ext.Ajax.request({
					url: url,
					method: 'GET',
					timeout: 10000,
					scope: this,
					success: function(result) {
						var response = Ext.decode(result.responseText, true);
						//console.log(response.config[0].ipvera);
						if (response) {
							if(response.config[0].ipvera) this.getIpveraCt().setValue(response.config[0].ipvera);
						}
					},
					failure: function(result) {
						console.log("Pas de config par défaut");
						//Ext.Msg.alert('Erreur',"Erreur lors de la sauvegarde de l'adresse IP");
					}
				});
				
				Ext.getCmp('main').setActiveItem(Ext.getCmp('PanelConfig'));
				Ext.getCmp('datalist').tab.hide();
				Ext.getCmp('panelinfo').tab.hide();
				Ext.getCmp('listclock').tab.hide();
				
				Ext.Msg.alert(locale.getSt().misc.error,locale.getSt().msg.mustlogin);
			}
		});
	},
	
	LogIn: function() {
		this.logged = true;
		this.startstore();
		this.getLoginBt().setText(locale.getSt().button.notlogin);
		//this.getLoginBt().setUi('decline');
		this.getUsernameCt().hide();
		this.getPasswordCt().hide();
		this.getIpveraCt().hide();
		this.getViewprofil().disable();
	},
	
	startstore: function() {
		var TabViewsStore = Ext.getStore('TabViewsStore');
		var syncheader = "";
		syncheader = {'Authorization': 'Basic ' + this.loggedUserId};
		TabViewsStore.getProxy().setHeaders(syncheader);
		
		if(this.profilchoice>0) {
			var jsonfile=this.jsonpath+"tabs" + this.profilchoice +".json";
			TabViewsStore.getProxy().setUrl(jsonfile);
		}
		
		//Pour ne pas perdre "this"
		var contdevices=this;
		//console.log(contdevices.storeloaded);
		TabViewsStore.load(function(tabs) {
			console.log("loading tabs");
			//Vérifie qu'il y a au moins un onglet (en principe 0)
			//Initialise tabs.json sinon.
			if(TabViewsStore.getCount()>0) {
				//contdevices.onTabViewsLoad();
				var storeRooms = Ext.getStore('Rooms');
				
				//var syncheader = "";
				//syncheader = {'Authorization': 'Basic ' + this.loggedUserId};
				storeRooms.getProxy().setHeaders(syncheader);
				
				storeRooms.on({
						load: 'onStoreRoomsLoad',
						scope: contdevices
				});
				storeRooms.load();
			} else {
				contdevices.initTabsViews();
			}
		});
	},
	
	onStoreRoomsLoad: function() {
		console.log("loading Rooms");
		var storeRooms = Ext.getStore('Rooms');
		if (storeRooms.getCount()>0) {
			if(locale.getSt().lang!="fr") {
				var noroom = storeRooms.getById(0)
				if(noroom) noroom.set("name",locale.getSt().misc.noroom);
			}
			var DevicesStore = Ext.getStore('devicesStore');
			
			var syncheader = "";
			syncheader = {'Authorization': 'Basic ' + this.loggedUserId};
			DevicesStore.getProxy().setHeaders(syncheader);
			
			DevicesStore.on({
					load: 'onDevicesStoreLoad',
					scope: this
			});
			
			Ext.getStore('devicesStore').getProxy().setExtraParam( 'ipvera',  this.getIpveraCt().getValue());
			if(this.profilchoice>0) {
				var jsonfile=this.jsonpath+"devices" + this.profilchoice +".json";
				Ext.getStore('devicesStore').getProxy().setUrl(jsonfile);
			}
			
			//Bug avec Sencha Touch 2.1, load après le load de FloorsStore dans pushplans
			//DevicesStore.load();
			this.inserttabs();
			
			//Pas pour le profil iphone
			if(this.getApplication().getCurrentProfile().getName()!="Phone") {
			var listroom = Ext.getCmp('datalist').down('#list');
			if(listroom.getStore().getAt(0).get('id')!=0||storeRooms.getCount()==1) {
				listroom.select(0);
			} else {
				listroom.select(1);
			}
			}
			
		} else {
			Ext.Msg.confirm(locale.getSt().misc.error, locale.getSt().msg.norooms, function(confirmed) {
				if (confirmed == 'yes') {
					Ext.Viewport.setMasked({
						xtype: 'loadmask',
						message: locale.getSt().msg.saving
					});

					console.log("Create Rooms");
					var vera_url = './protect/createrooms.php';
					var syncheader = "";
					syncheader = {'Authorization': 'Basic ' + this.loggedUserId};
					var ipvera = this.ipvera;
					Ext.Ajax.request({
							url: vera_url,
							headers: syncheader,
							method: 'GET',
							timeout: 35000,
							scope: this,
							params: {
								ipvera: ipvera,
								timeout: '30'
							},
							success: function(result) {
								//console.log("return Rooms");
								Ext.Viewport.setMasked(false);
								if (result.responseText=="OK") {
									storeRooms.load();
								} else {
									Ext.Msg.alert(locale.getSt().misc.error, locale.getSt().msg.errorcreaterooms);
								}
							},
							failure: function(response) {
								Ext.Viewport.setMasked(false);
								Ext.Msg.alert(locale.getSt().misc.error, locale.getSt().msg.errorcreaterooms + " 2");
							}
					});
				}
			}, this);
		}
	},
	
	onDevicesStoreLoad: function() {
		this.devicesync(0,0);
		var devices = Ext.getStore('devicesStore');
		if (!devices.getCount()>0) {
			Ext.getCmp('main').setActiveItem(Ext.getCmp('PanelConfig'));
			Ext.Msg.alert(locale.getSt().misc.nodevice, locale.getSt().msg.createdevices);
		}
		//*******************Debug mode
		//this.verifsync(0);
		//*******************
	},
	
	//*******************Debug mode
//	verifsync: function(timer) {
//		if(timer!=0) timer=15000;
//		taskverifsync = Ext.create('Ext.util.DelayedTask', function() {
			//console.log("New Timer");
//			this.nbrtimer = this.nbrtimer +1;
//			if((Date.now()-this.syncdate>90000) && this.autosync==true) {
//				this.nbrforce = this.nbrforce + 1;
				//this.devicesync(0, 0);
//			}
			//Ext.getCmp('tabbarlabel').setHtml(this.nbrsync + "/" + this.nbrtimer + "/" + this.nbrforce);
//			this.verifsync();
//		}, this);
//		taskverifsync.delay(timer);
//	},
	//*******************
	
	devicesync: function(newloadtime, newdataversion, nonewsync) {
		console.log("New Vera Sync");
		if (nonewsync != true) nonewsync=false;
		//*******************Debug mode
//		if(nonewsync==false) {
//			this.nbrsync= this.nbrsync + 1;
//***********			Ext.getCmp('tabbarlabel').setHtml(this.nbrsync + "/" + this.nbrtimer + "/" + this.nbrforce);
//			this.syncdate = Date.now();
//			syncstamp = this.syncdate;
//		}
		//*******************
		var vera_url = './protect/syncvera.php';
		var syncheader = "";
		syncheader = {'Authorization': 'Basic ' + this.loggedUserId};
		var ipvera = this.ipvera;
		Ext.Ajax.request({
			url: vera_url,
			headers: syncheader,
			method: 'GET',
			timeout: 90000,
			scope: this,
			//withCredentials: true,
			//useDefaultXhrHeader: false,
			params: {
				id: 'sdata',
				loadtime: newloadtime,
				dataversion: newdataversion,
				ipvera: ipvera,
				timeout: '60',
				minimumdelay: '1000'
			},
			success: function(result) {
				var date = new Date();
				console.log("Vera Sync : OK " + Ext.Date.format(date, 'h:i:s'));
				var response = Ext.decode(result.responseText, true);
				if (response) {
					var devices = Ext.getStore('devicesStore');
					if (devices) {
						//var tmp="";
						for (idrecord in response.devices) {
							var device = devices.getById(response.devices[idrecord].id);
							if (device) {
								//Le status des Smart Virtual Thermostat - cat 105 n'est pas dans status
								if(device.set('cat')!=105) device.set('status', response.devices[idrecord].status);
								device.set('level', response.devices[idrecord].level);
								device.set('watts', response.devices[idrecord].watts);
								device.set('comment', response.devices[idrecord].comment);
								if (response.devices[idrecord].state == null) {
									device.set('state', 0);
								} else {
									device.set('state', response.devices[idrecord].state);
								}
								device.set('tripped', response.devices[idrecord].tripped);
								var armed =response.devices[idrecord].armed;
								device.set('armed', armed);
								
								var category = device.get('category');
								switch (category) {
								case 6: //camera
									device.set('var1', response.devices[idrecord].ip);
									device.set('var2', response.devices[idrecord].url);
									break;
								case 16: //humidity sensor
									device.set('var1', response.devices[idrecord].humidity);
									break;
								case 17: //temperature sensor
									device.set('var1', response.devices[idrecord].temperature);
									device.set('var3', locale.getSt().unit.temp);//Unité utilisée ex: °C
									break;
								case 18: //light sensor
									device.set('var1', response.devices[idrecord].light);
									break;
								case 21: //Power Meter : watts (déjà ajouté) + kwh
									device.set('var1', response.devices[idrecord].kwh);
									break;
								case 101: //vswitch
									device.set('var1', response.devices[idrecord].text1);
									device.set('var2', response.devices[idrecord].text2);
									break;
								case 102: //vcontainer
									device.set('var1', response.devices[idrecord].variable1);
									device.set('var2', response.devices[idrecord].variable2);
									device.set('var3', response.devices[idrecord].variable3);
									device.set('var4', response.devices[idrecord].variable4);
									device.set('var5', response.devices[idrecord].variable5);
									break;
								case 103: //gcal
									if(response.devices[idrecord].nextevent) device.set('var1', response.devices[idrecord].nextevent);
									break;
								case 104:
									device.set('var1', locale.getSt().device.pilotwire[response.devices[idrecord].status]);
									break;
								case 105: //Smart Virtual Thermostat
									//Status 5 : non connu, 0 : mode off, 1 : mode CoolOn (Inactif), 2: Mode HeatOn (Forcé), 3: Auto
									switch (response.devices[idrecord].mode) {
									case "AutoChangeOver":
										device.set('status', 3);
										device.set('var6', locale.getSt().device.vtherm["3"]);//status en texte et traduit
										break;
									case "HeatOn":
										device.set('status', 2);
										device.set('var6', locale.getSt().device.vtherm["2"]);
										break;
									case "CoolOn":
										device.set('status', 1);
										device.set('var6', locale.getSt().device.vtherm["1"]);
										break;
									case "Off":
										device.set('status', 0);
										device.set('var6', locale.getSt().device.vtherm["0"]);
										break;
									default:
										device.set('status', 5);
										device.set('var6', "Unknown");
										break;
									}
									device.set('var1', response.devices[idrecord].temperature);
									device.set('var2', response.devices[idrecord].heatsp); //Temp. utilisée en mode Auto. confort
									device.set('var3', response.devices[idrecord].coolsp); //Temp. utilisée en mode Auto. Eco
									device.set('var4', response.devices[idrecord].EnergyMode); //Normal pour le mode Confort et EnergySavingsMode pour Eco
									device.set('var5', response.devices[idrecord].hvacstate); //Heating quand le radiateur est en chauffe et Idle quand il est à l'arrêt
									device.set('camuser', locale.getSt().unit.temp);//Unité utilisée ex: °C
									if(response.devices[idrecord].EnergyMode=="Normal") {
										device.set('campassword', locale.getSt().device.vtherm.normal);//mode auto : Conf ou Eco, traduction de var4
									} else {
										device.set('campassword', locale.getSt().device.vtherm.eco);
									}
									
//********Debug
console.log("Debug: VT "+ device.get('name') + ": mode OCHA "+ device.get('status') + ", EnergyMode " + device.get('var4') + ", hvacstate "  + device.get('var5'));
									break;
								case 107: //colored vcontainer
									if(!isNaN(parseInt(response.devices[idrecord].variable1))) device.set('status', parseInt(response.devices[idrecord].variable1));
										else device.set('status', "");
									device.set('var1', response.devices[idrecord].variable2);
									break;
								case 108: //Custom Device utilise: var1: variable status, var2: text 1, var3: suffixe 1, var5: text 2, var 6: suffixe 2,
										//var4: commande, GraphlinkItem pour l'url du popup, wwidth et height
										//Affectation : status en fonction de var1
										//camuser : contient var2+var3
										//campassword : contient var5+var6
									if(device.get('var1')!=""&&device.get('var1')!= null) {
										device.set('status', response.devices[idrecord][device.get('var1')]);
									} else device.set('status', 0);
									if(device.get('var2')!=""&&device.get('var2')!= null) {
										device.set('camuser', response.devices[idrecord][device.get('var2')] + device.get('var3') );
									} else device.set('camuser', "");
									if(device.get('var5')!=""&&device.get('var5')!= null) {
										device.set('campassword', response.devices[idrecord][device.get('var5')] + device.get('var6') );
									} else device.set('campassword', "");									
									break;
								case 120: //vclock
									device.set('var1', response.devices[idrecord].alarmtime);
									if (response.devices[idrecord].alarmtime != null) {
										var heuredep = new Date("February 5, 2001 " + response.devices[idrecord].alarmtime);
										var duration = response.devices[idrecord].alarmduration;
										heuredep.setTime(heuredep.getTime() + (eval(duration) * 1000));
										var heures = Ext.Date.format(heuredep, 'H:i:s')
										device.set('var2', heures);
									}
									device.set('var3', response.devices[idrecord].next);
									device.set('var4', response.devices[idrecord].text1);
									device.set('var5', response.devices[idrecord].alarmtype);
									device.set('var6', response.devices[idrecord].weekdays);
									break;
								default:
									break;
								}
							}
						}
						
						//Pas de mise à jour des status car non utilisé (ne remonte pas toujours.
						//for (idrecord in response.scenes) {
						//	device = devices.getById("s" + response.scenes[idrecord].id);
						//	if (device) {
								//Pas de synchro des champs active et comment car le sdata le remonte après le lancement d'une scène
								//mais il ne le réinitialise jamais (alors qu'il le fait pour les devices).
								//device.set('status', response.scenes[idrecord].active);
								//device.set('comment', response.scenes[idrecord].comment);
						//		if (response.scenes[idrecord].state == null) {
						//			device.set('state', 0);
						//		} else {
						//			device.set('state', response.scenes[idrecord].state);
						//		}
						//	}
						//}
						
						
						// Maj indicateur nb allumés/éteints
						var count1 = 0; // nb allumés
						var count2 = 0; // nb éteints
						devices.findBy(function(rec) {
							var status = rec.get('status');
							var category = rec.get('category');
							var isTripped = (rec.get('tripped') == 1);
							if (
									(rec.get('verif') != 'off' && rec.get('verif') != 'no')
									&&
									(
										((category == 4 || category == 103 || category == 120) && isTripped)
										||
										(category !=4 && category !=106 && category !=7 && category !=1001 && status == 1)
										||
										(category ==7 && status == 0)
										||
										((category ==104||category ==105) && (status == 2 || status==3))
									)
							) {
								count1++;
							}
							if (
									(
										rec.get('verif') == 'off'
										&&
										(
											((category == 4 || category == 103 || category == 120) && !isTripped)
											||
											(category !=4 && category != 103 && category != 120 && category != 7 && category != 1001 && status == 0)
											||
											(category == 7 && status == 1)
										)
									)
									||
									(rec.get('verif')!='no' && (category == 4 || category == 103 || category == 120) && rec.get('armed')==0)
							) {
								count2++;
							}
						});
						if (count1 == 0 && count2 == 0) {
							Ext.getCmp('panelinfo').tab.setBadgeText("");
						} else {
							Ext.getCmp('panelinfo').tab.setBadgeText(count1 + '-' + count2);
						}
					}
					//*******************Debug mode
					//Sert à compter le nombre d'essai quand la synchro ne se fait pas. Un message apparait au bout de 10 essais
					this.synccount=0;
					if(nonewsync!=true) {
						//new sync
						if (response.loadtime && response.dataversion) {
							//this.devicesync(response.loadtime,response.dataversion);
							this.newsync(response.loadtime,response.dataversion);//, syncstamp
						} else {
							Ext.Msg.alert(locale.getSt().misc.error, 'no loadtime');
							this.newsync(0, 0);//, syncstamp
							//this.devicesync(0, 0, nonewsync);
						}
					}
				} else {
					//*******************Debug mode
					this.synccount=this.synccount+1;
					if(this.autosync==true&&nonewsync==false) {//&&syncstamp==this.syncdate
						if(this.synccount<10) {
							this.newsync(0, 0);//, syncstamp
						} else {
							Ext.Msg.confirm(locale.getSt().misc.error, locale.getSt().msg.nosynchro+" "+locale.getSt().msg.newtry, function(confirmed) {
								if (confirmed == 'yes') {
									//this.devicesync(0,0, nonewsync);
									//this.devicesync(0,0);
									this.newsync(0, 0);//, syncstamp
								} else {
									this.autosync=false;
								}
							}, this);
						}
					} else {
						Ext.Msg.alert(locale.getSt().misc.error, locale.getSt().msg.nosynchro);
					}
				}
			},
			failure: function(response) {
				console.log("Vera Sync : Error");
				this.synccount=this.synccount+1;
				if(this.autosync==true&&nonewsync==false) {//&&syncstamp==this.syncdate
					if(this.synccount<10) {
						this.newsync(0, 0);//, syncstamp
					} else {
						//Ext.Msg.alert('Erreur','Synchronisation avec la Vera impossible ou interrompue');
						Ext.Msg.confirm(locale.getSt().misc.error, locale.getSt().msg.nosynchro+" "+locale.getSt().msg.newtry, function(confirmed) {
							if (confirmed == 'yes') {
								//this.devicesync(0,0, nonewsync);
								this.newsync(0, 0);//, syncstamp
							}
						}, this);
					}
				} else {
					Ext.Msg.alert(locale.getSt().misc.error, locale.getSt().msg.nosynchro);
				}
				
				//setTimeout(this.devicesync(0,0),2000);
			}//,
			//callback: function(response) {
			//	console.log("It's OK");
			//}
		});
	},
	//onActivate: function() {
	//    console.log('Main container is active');
	//   },

	//Sert à mettre un timer sur la synchro pour qu'elle s'arrête pendant la veille et reprenne ensuite
	newsync: function(loadtime, dataversion) {//, timestamp
		var newsynctask = Ext.create('Ext.util.DelayedTask', function() {
				//var date = new Date();
				//console.log("New Sync Timer" + Ext.Date.format(date, 'h:i:s'));
				//if(timestamp==this.syncdate) {
					//console.log(loadtime + "/" + dataversion);
					this.devicesync(loadtime, dataversion);
				//}
		}, this);
		newsynctask.delay(100);
	},
	
	
	onDeviceTap: function(view, index, target, record, event) {
		//Valeurs par défaut
		var dservice = 'urn:upnp-org:serviceId:SwitchPower1';
		var daction = 'SetTarget';
		var dtargetvalue = 'newTargetValue';
		
		//Valeurs utilisée pour un dimmer
		var sdim = 'urn:upnp-org:serviceId:Dimming1';
		var actdim = 'SetLoadLevelTarget';
		var tardim = 'newLoadlevelTarget';
		
		
		var newstatus = "0";
		
		var icontap = false;
		var cat=record.get('category');
		if (!Ext.Array.contains([2, 3, 4, 6, 7, 8, 16, 17, 21, 101, 102, 103, 104, 105, 106, 107, 108, 120, 1000, 1001], cat) && (record.get('sceneon') == null || record.get('sceneoff') == null)) {
			return;
		}
		
		//Si c'est une webview, sort de la commande
		if(cat==1001&&record.get('subcategory')==0) return;
		
		if (Ext.Array.contains(["listInRoom", "dataliston", "datalistoff", "listclock"], view.id)) {
			var tap = Ext.get(event.target);
			if (tap.hasCls('deviceImage')) {
				icontap = true;
			} else if (tap.hasCls('d25')) {
				dservice=sdim;
				daction=actdim;
				dtargetvalue=tardim;
				newstatus = 25;
			} else if (tap.hasCls('d50')) {
				dservice=sdim;
				daction=actdim;
				dtargetvalue=tardim;
				newstatus = 50;
			} else if (tap.hasCls('d75')) {
				dservice=sdim;
				daction=actdim;
				dtargetvalue=tardim;
				newstatus = 75;
			} else if (tap.hasCls('d100')) {
				//Open 100%
				newstatus = "1";
			} else if (tap.hasCls('armed') || tap.hasCls('armed2')) {
				dservice = 'urn:micasaverde-com:serviceId:SecuritySensor1';
				daction = 'SetArmed';
				dtargetvalue = 'newArmedValue';
				if (record.get('armed') == 1) {
					newstatus = "0";
				} else {
					newstatus = "1";
				}
			} else if (tap.hasCls('clocknext')) {
				dservice = 'urn:upnp-org:serviceId:VClock1';
				daction = 'SetNext';
				dtargetvalue = 'newNextValue';
				if (record.get('var3') == "on") {
					newstatus = "off";
				} else {
					newstatus = "on";
				}
			} else if (tap.hasCls('i0')) {
				newstatus = '0';
			} else if (tap.hasCls('i1')) {
				newstatus = '1';
			} else if (tap.hasCls('i2')) {
				newstatus = '2';
			} else if (tap.hasCls('i3')) {
				newstatus = '3';
			} else {
				return;
			}
		} else {
			icontap = true;
		}
		if (icontap == true) {
			
			//Cas général
			//newstatus=0 par défaut. Affecte la valeur 1 de tripped ou de status
			if (cat == 4) {
				if (record.get('tripped') == 0) {
					newstatus = "1";
				}
			} else if (record.get('status') == 0) {
				newstatus = "1";
			}
			
			//DoorLock
			if(cat==7) {
				//data_request?id=action&DeviceNum=XX&serviceId=urn:micasaverde-com:serviceId:DoorLock1&action=SetTarget&newTargetValue=0
				dservice = "urn:micasaverde-com:serviceId:DoorLock1";
				//daction = 'SetTarget';
				//dtargetvalue = 'newTargetValue';
			}
			
			//camera
			if(cat==6&&record.get('sceneon')==null) {
				var me=this;
				if(record.get('var2')==null){
					record.data.var2="/snapshot.cgi";
				}
				var RefreshCam = function() {
					var task = Ext.create('Ext.util.DelayedTask', function() {
						var rand = Math.random();
						var obj =document.getElementById('cam'+record.get('id'));
						obj.src = 'http://'+record.get('var1')+record.get('var2')+'?user='+record.get('camuser')+'&pwd='+record.get('campassword')+'&t='+rand;
						RefreshCam.call(this);
					}, this);
					task.delay(700);
				}
				
				var vheight = Ext.Viewport.getWindowHeight();
				var vwidth = Ext.Viewport.getWindowWidth();
				var defwidth = 640;
				var defheight = 480;
				var width = defwidth;
				var height = defheight;
				var space=50;
				if((defwidth>vwidth-space)||(defheight>vheight-space)) {
					width = vwidth - space;
					height = Math.floor(defheight*width/defwidth);
					if(height>vheight-space) {
						var diff=height-(vheight-space);
						diff=Math.ceil(diff*defwidth/width);
						width = width - diff;
						height = Math.floor(defheight*width/defwidth);
					}
				}
				
				if(Ext.getCmp('popup_cam')){
					Ext.getCmp('popup_cam').setWidth(width+10);
					Ext.getCmp('popup_cam').setHeight(height+10);
					Ext.getCmp('popup_cam').setHtml('<img src="http://'+record.get('var1')+record.get('var2')+'?user='+record.get('camuser')+'&pwd='+record.get('campassword')+'" width='+width+' height='+height+' border=0 id="cam'+record.get('id')+'" />');
					RefreshCam();
					Ext.getCmp('popup_cam').show();
				}else{
					var popup=new Ext.Panel({
						modal:true,
						id: 'popup_cam',
						hideOnMaskTap: true,
						width:width+10,
						height:height+10,
						centered: true,
						//styleHtmlContent: true,
						html:'<img src="http://'+record.get('var1')+record.get('var2')+'?user='+record.get('camuser')+'&pwd='+record.get('campassword')+'" width='+width+' height='+height+' border=0 id="cam'+record.get('id')+'" />',
						listeners: {
							hide: function(panel) {
								task.cancel();
							},
							initialize: function(panel){
								RefreshCam();
							}
						}
					});
					Ext.Viewport.add(popup);
					popup.show();
				}
				return;
			}
			
			
			//Humidity, Temperature sensor ou Power Meter
			if(Ext.Array.contains([16, 17, 21], cat)&&record.get('sceneon') == null) {
				if(record.get('graphlink')!=null && record.get('graphlink')!=""){
					var vheight = Ext.Viewport.getWindowHeight();
					var vwidth = Ext.Viewport.getWindowWidth();
					var defwidth = 640;
					var defheight = 480;
					var width = defwidth;
					var height = defheight;
					var space=50;
					if((defwidth>vwidth-space)||(defheight>vheight-space)) {
						width = vwidth - space;
						height = Math.floor(defheight*width/defwidth);
						if(height>vheight-space) {
							var diff=height-(vheight-space);
							diff=Math.ceil(diff*defwidth/width);
							width = width - diff;
							height = Math.floor(defheight*width/defwidth);
						}
					}
					
					if(Ext.getCmp('popup_cam')){
						Ext.getCmp('popup_cam').setWidth(width+10);
						Ext.getCmp('popup_cam').setHeight(height+10);
						Ext.getCmp('popup_cam').setHtml('<img src="'+record.get('graphlink')+'" width='+width+' height='+height+' border=0 />');
						Ext.getCmp('popup_cam').show();
					}else{
						var popup=new Ext.Panel({
							modal:true,
							id: 'popup_cam',
							hideOnMaskTap: true,
							width:width+10,
							height:height+10,
							centered: true,
							//styleHtmlContent: true,
							html:'<img src="'+record.get('graphlink')+'" width='+width+' height='+height+' border=0 />',
							listeners: {
								hide: function(panel) {
									//delete myvera.view.dataplan.lastTapHold;
									Ext.getCmp('popup_cam').setHtml('');
								}
							}
						});
						Ext.Viewport.add(popup);
						popup.show();
					}
				}
				return;
			}
			
			//Vclock
			if (cat == 120&&record.get('sceneon') == null) {
				var dateheure="";
				this.getClockfieldsetCt().setTitle(record.get('name'));
				this.getClockdeiveidCt().setValue(record.get('id'));
				dateheure=new Date("February 5, 2001 "+record.get('var1'));
				this.getClockheuredebCt().setValue(dateheure);
				dateheure=new Date("February 5, 2001 "+record.get('var2'));
				this.getClockheurefinCt().setValue(dateheure);
				if(record.get('subcategory')!=1) this.getClockheurefinCt().hide();
				else this.getClockheurefinCt().show();
				this.getClockmessageCt().setValue(record.get('var4'));
				if(record.get('subcategory')!=2) this.getClockmessageCt().hide();
				else this.getClockmessageCt().show();
				if(record.get('subcategory')!=1&&record.get('subcategory')!=2) Ext.getCmp('paneloverlay').setHeight('250px');
				else Ext.getCmp('paneloverlay').setHeight('290px');
				Ext.getCmp('paneloverlay').show();
				return;
			}
			
			//VSwitch
			if (cat == 101) {
				dservice = "urn:upnp-org:serviceId:VSwitch1";
				//daction = 'SetTarget';
				//dtargetvalue = 'newTargetValue';
			}
			
			//Pilote Wire Controller
			if(cat == 104&&record.get('sceneon') == null) {
				var retina= myvera.app.isretina;
				var html0 = '<img class="i0" src="./resources/images/plugin/pw0_';
				if(record.get('status')==0) {
					html0=html0+'1';
					var press0= true;
				} else {
					html0=html0+'0';
					var press0=false;
				}
				html0= html0+ retina + '.png" />';
				var html1 = '<img class="i1" src="./resources/images/plugin/pw1_';
				if(record.get('status')==1) {
					html1=html1+'1';
					var press1= true;
				} else {
					html1=html1+'0';
					var press1=false;
				}
				html1= html1+ retina + '.png" />';
				var html2 = '<img class="i2" src="./resources/images/plugin/pw2_';
				if(record.get('status')==2) {
					html2=html2+'1';
					var press2= true;
				} else {
					html2=html2+'0';
					var press2=false;
				}
				html2= html2+ retina + '.png" />';
				var html3 = '<img class="i3" src="./resources/images/plugin/pw3_';
				if(record.get('status')==3) {
					html3=html3+'1';
					var press3= true;
				} else {
					html3=html3+'0';
					var press3=false;
				}
				html3= html3+ retina + '.png" />';
				var me =this;
				var segmentedButton = Ext.create('Ext.SegmentedButton', {
						//numid: record.get('id'),
						allowMultiple: true,
						items: [
						{
							text: "0",
							pressed: press0,
							html: html0
						},
						{
							text: "1",
							pressed: press1,
							html: html1
						},
						{
							text: "2",
							pressed: press2,
							html: html2
						},
						{
							text: "3",
							pressed: press3,
							html: html3
						}
						],
						listeners: {
							toggle: function(container, button, pressed){
								if(pressed) {
										me.onPilotWireTap(record.get('id'), button.getText());
								}
								Ext.getCmp('popup_tap').hide();
							}
						}
				});
				
				if(Ext.getCmp('popup_tap')){
					var popup = Ext.getCmp('popup_tap');
					//popup.setWidth(width+10);
					//popup.setHeight(height+10);
					//popup.setHtml(html);
					popup.setItems(segmentedButton);
					popup.show();
				}else{
					var popup=new Ext.Panel({
						modal:true,
						id: 'popup_tap',
						hideOnMaskTap: true,
						padding: 10,
						//width:width+10,
						//height:height+10,
						centered: true,
						items: [segmentedButton],
						//html:html,
						listeners: {
							hide: function(panel) {
								//Ext.getCmp('popup_tap').setHtml('');
							}
						}
					});
					Ext.Viewport.add(popup);
					popup.show();
				}
				return;
			}
			
			//Smart Virtual Thermostat
			if(cat == 105&&record.get('sceneon') == null) {
				this.vthermPopup(record.get('id'), record.get('name'), record.get('status'), record.get('var4'), record.get('var2'), record.get('var3'));
				return;
			}
			
			//Custom Device
			if(cat == 108&&record.get('sceneon') == null) {
				if(record.get('var4')!=""&&record.get('var4')!=null) {
					//Exemple : urn:upnp-org:serviceId:VSwitch1|SetTarget|newTargetValue
					var commande =record.get('var4').split('|')
					dservice = commande[0];
					daction = commande[1];
					dtargetvalue = commande[2];
				} else {
					if(record.get('graphlink')!=""&&record.get('graphlink')!=null) {
						this.widgetPopup(record.get('wwidth'), record.get('height'), record.get('graphlink'));
					}
					return;
				}
			}
			
			//Scene
			if (cat == 1000) {
				dservice = "urn:micasaverde-com:serviceId:HomeAutomationGateway1";
				daction = 'RunScene';
				newstatus = record.get('id').substring(1);
			}
			
			//widget ou bouton
			if (cat == 1001) {
				switch (record.get('subcategory')) {
				//widget, ne fait rien
				case 0:
					break;
				//widget avec icône
				case 1:
					this.widgetPopup(record.get('wwidth'), record.get('height'), record.get('graphlink'));
					break;
				//command html
				case 2:
					this.runHtml(record.get('id'), record.get('graphlink'));
					break;
				//bouton de navigation
				case 3:
					//console.log(view.getParent().id);
					this.changeView(view.getParent(),record.get('status'));
					break;
				//bouton pour afficher masquer la barre d'onglet
				case 4:
					this.showHideMenu();
					break;
				default:
					break;
				}
				return;
			}
			
			//Lancement d'une scène à la place de l'action normal
			if ((record.get('sceneon') != null && newstatus == "1") || (record.get('sceneoff') != null && newstatus == "0")) {
				dservice = 'urn:micasaverde-com:serviceId:HomeAutomationGateway1';
				daction = 'RunScene';
				if (newstatus == "1") {
					newstatus = record.get('sceneon');
				} else {
					newstatus = record.get('sceneoff');
				}
			//Pas d'action pour les modules qui ne lancent rien sauf sceneon et sceneoff
			} else if (Ext.Array.contains([0, 4, 102, 103, 106, 107, 120], cat)) {
				return;
			}
			
		} else {
			//Action lors d'un clic ailleurs que sur l'icône
			if (cat == 104) {
				dservice = "urn:antor-fr:serviceId:PilotWire1";
				daction = 'SetTarget';
				dtargetvalue = 'newTargetValue';
			}
		}

		//Lancement de l'action
		console.log("switch : " + record.get('name'));
		record.set('state', -2);
		var vera_url = './protect/syncvera.php';
		var syncheader = "";
		syncheader = {'Authorization': 'Basic ' + this.loggedUserId};
		var ipvera = this.ipvera;
		Ext.Ajax.request({
			url: vera_url,
			headers: syncheader,
			method: 'GET',
			timeout: 10000,
			scope: this,
			params: {
				id: 'lu_action',
				ipvera: ipvera,
				DeviceNum: record.get('id'),
				serviceId: dservice,
				action: daction,
				newvalue: newstatus,
				targetvalue: dtargetvalue
				//newLoadlevelTarget: newstatus,
				//newTargetValue: newstatus,
				//newArmedValue: newstatus,
				//output_format: 'json'
			},
			success: function(response) {
				//var category = record.get('category');
				if (Ext.Array.contains([2, 3, 8], cat)) {
					record.set('state', -2);
				} else if (cat==1000) {
					record.set('state', -1);
				}
			},
			failure: function(response) {
				console.log("switch error :" + record.get('name'));
				Ext.Msg.alert(locale.getSt().misc.error,'Switch Error');
			}
		});
	},
	
	onDeviceHoldTap: function(view, index, target, record, event) {
		//var dservice = 'urn:upnp-org:serviceId:SwitchPower1';
		//var daction = 'SetTarget';
		var dservice = 'urn:upnp-org:serviceId:Dimming1';
		var daction = 'SetLoadLevelTarget';
		var dtargetvalue = 'newLoadlevelTarget';
		//var dtargetvalue = 'newTargetValue';
		var syncheader = "";
		syncheader = {'Authorization': 'Basic ' + this.loggedUserId};
		
		//var newstatus = "0";
		var ipvera = this.ipvera;
		var popup=new Ext.Panel({
			modal:true,
			hideOnMaskTap: true,
			width:300,
			height:50,
			centered: true,
			items:[{
				xtype:'slider',
				value:record.data.level,
				listeners: {
					change: function(Slider, thumb, newValue, oldValue, eOpts) {
						//dservice=sdim;
						//daction=actdim;
						//dtargetvalue=tardim;
						//newstatus = newValue;
						console.log("switch : " + record.get('name'));
						record.set('state', -2);
						var vera_url = './protect/syncvera.php';
						
						Ext.Ajax.request({
								url: vera_url,
								headers: syncheader,
								method: 'GET',
								timeout: 10000,
								scope: this,
								params: {
									id: 'lu_action',
									ipvera: ipvera,
									DeviceNum: record.get('id'),
									serviceId: dservice,
									action: daction,
									newvalue: newValue,
									targetvalue: dtargetvalue
									
								},
								success: function(response) {
									if (Ext.Array.contains([2, 3, 8], record.get('category'))) {
										record.set('state', -2);
									}
								},
								failure: function(response) {
									console.log("switch error :" + record.get('name'));
									Ext.Msg.alert(locale.getSt().misc.error,'Switch Error');
								}
						});
					}
				}
			}],
			listeners: {
				hide: function(panel) {
					delete myvera.view.dataplan.lastTapHold;
				}
			}
		});
		Ext.Viewport.add(popup);
		popup.show();
		
	},
	
	onRetinaTap: function() {
		console.log("Retina Change");
		if(this.logged==true) {
		Ext.ModelMgr.getModel('myvera.model.CurrentUser').load(1, {
			success: function(user) {
				var isretina = myvera.app.isretina;
				if(isretina=="@2x") isretina="";
				else isretina="@2x";
				user.set("isRetina", isretina);
				user.save();
				window.location.reload();
			},
			failure: function() {
				// this should not happen, nevertheless:
				alert(locale.getSt().misc.error);
			}
		}, this);
		}
	},
	
	onLoginTap: function() {
		if(this.logged!=true) {
			var username = this.getUsernameCt().getValue(),
				password = this.getPasswordCt().getValue(),
				ipvera = this.getIpveraCt().getValue(),
				isVueL = this.getIsVueL().getValue(),
				isVueP = this.getIsVueP().getValue(),
				isReveil = this.getIsReveil().getValue(),
				isTab = this.getIsTab().getValue(),
				profil = this.getViewprofil().getValue();
			if(this.getIsRetina().getValue()) var isRetina="@2x";
			else var isRetina = "";
				
			if(!Ext.isEmpty(password) && !Ext.isEmpty(username) && !Ext.isEmpty(ipvera)) {
				var user = Ext.create('myvera.model.CurrentUser', {
					id: 1,
					name: username,
					pass: password,
					ipvera: ipvera,
					isVueL: isVueL,
					isVueP: isVueP,
					isReveil: isReveil,
					isTab: isTab,
					isRetina: isRetina,
					profil: profil
				});
				user.save();
				this.loggedUserId=this.base64_encode(username+":"+password);
				this.ipvera=this.getIpveraCt().getValue();
				this.profilchoice=this.getViewprofil().getValue();
				
				console.log('logUserIn: ', username);
				
				//Affichage bouton Retina et affectztion valeur @2x
				myvera.app.setIsretina(isRetina);
				if(myvera.app.isretina=="@2x") this.getRetinaBt().setText(locale.getSt().button.noretinamode);
				else  this.getRetinaBt().setText(locale.getSt().button.retinamode);
				this.getIsRetina().hide();
				this.getRetinaBt().show();
				
				//Affichage des onglets
				Ext.getCmp('datalist').tab.show();
				Ext.getCmp('panelinfo').tab.show();
				if(this.getIsReveil().getValue()) Ext.getCmp('listclock').tab.show();
				
				//Sauvegarde de la dernière adresse IP de la Vera
				var url = './protect/saveconfig.php';
				var syncheader = "";
				syncheader={'Authorization': 'Basic ' + this.loggedUserId};
				var ipvera = this.ipvera;
				Ext.Ajax.request({
					url: url,
					headers: syncheader,
					params: {
						ipvera: ipvera
					},
					method: 'GET',
					timeout: 10000,
					scope: this,
					success: function(response) {
					},
					failure: function(response) {
						Ext.Msg.alert(locale.getSt().misc.error,locale.getSt().msg.saveiperror);
					}
				});
				
				//this.startstore();
				this.LogIn();
				
//*******				var application = this.getApplication().getController('Application');
//*******				var orientation= application.getOrientationFix();
				
//*******				application.setPanel3dL(isVueL);
//*******				if(isVueL==true&&orientation=='landscape') {
//*******					Ext.getCmp('homepanel').setActiveItem(Ext.getCmp('carouselplan'));
					//Ext.getCmp('carouselplan').hide();
//*******				}
				
//*******				application.setPanel3dP(isVueP);
//*******				if(isVueP==true&&orientation=='portrait') {
//*******					Ext.getCmp('homepanel').setActiveItem(Ext.getCmp('carouselplan'));
					//Ext.getCmp('carouselplan').hide();
//*******				}
				
//*******				Ext.getCmp('main').setActiveItem(Ext.getCmp('homepanel'));
			} else Ext.Msg.alert(locale.getSt().misc.error,locale.getSt().msg.mustloginandpass);
		} else {
			Ext.ModelMgr.getModel('myvera.model.CurrentUser').load(1, {
				success: function(user) {
					Ext.Msg.confirm(locale.getSt().misc.msg, locale.getSt().msg.notlogin, function(confirmed) {
						if (confirmed == 'yes') {
							user.erase({success: function() {window.location.reload(); } });
						}
					}, this);
				},
				failure: function() {
					// this should not happen, nevertheless:
					window.location.reload();
				}
			}, this);
		}
	},
	
	onIsVueChangeL: function() {
		if(this.logged==true) {
		Ext.ModelMgr.getModel('myvera.model.CurrentUser').load(1, {
			success: function(user) {
				var isvue = this.getIsVueL().getValue();
				user.set("isVueL", isvue);
				user.save();
//*******				this.ChangeVue("landscape", isvue);
				
			},
			failure: function() {
				// this should not happen, nevertheless:
				alert(locale.getSt().misc.error);
			}
		}, this);
		}
	},
	
	onIsVueChangeP: function() {
		if(this.logged==true) {
		Ext.ModelMgr.getModel('myvera.model.CurrentUser').load(1, {
			success: function(user) {
				var isvue = this.getIsVueP().getValue();
				user.set("isVueP", isvue);
				user.save();
//*******				this.ChangeVue("portrait", isvue);
				
			},
			failure: function() {
				// this should not happen, nevertheless:
				alert(locale.getSt().misc.error);
			}
		}, this);
		}
	},
	
//******* Pas utilisée	
	ChangeVue: function(orient, isvue) {
		var application = this.getApplication().getController('Application');
		if(orient=="landscape") {
				application.setPanel3dL(isvue);
		} else {
				application.setPanel3dP(isvue);
		}
		
		var orientation= application.getOrientationFix();
		
		if (isvue) {
			//Ext.getCmp('carouselplan').show();
			if(orientation==orient) {
//*******				Ext.getCmp('homepanel').setActiveItem(Ext.getCmp('carouselplan'));
			}
		} else {
			if(orientation==orient) {
//*******				Ext.getCmp('homepanel').setActiveItem(Ext.getCmp('datalist'));
				//Ext.getCmp('carouselplan').hide();
			}
		}
	},
	
	onIsReveilChange: function() {
		if(this.logged==true) {
		Ext.ModelMgr.getModel('myvera.model.CurrentUser').load(1, {
			success: function(user) {
				var isreveil = this.getIsReveil().getValue();
				user.set("isReveil", isreveil);
				user.save();
				if(isreveil) {
					Ext.getCmp('listclock').tab.show();
				} else {
					Ext.getCmp('listclock').tab.hide();
				}
			},
			failure: function() {
				// this should not happen, nevertheless:
				alert(locale.getSt().misc.error);
			}
		}, this);
		}
	},
	
	onIsTabChange: function() {
		if(this.logged==true) {
		Ext.ModelMgr.getModel('myvera.model.CurrentUser').load(1, {
			success: function(user) {
				var isTab = this.getIsTab().getValue();
				user.set("isTab", isTab);
				user.save();
				if(isTab==0&&this.tabshow===true) {
					this.tabshow=false;
					Ext.Msg.alert(locale.getSt().misc.msg,locale.getSt().msg.addbtntab);
				}
			},
			failure: function() {
				// this should not happen, nevertheless:
				alert(locale.getSt().misc.error);
			}
		}, this);
		}
	},
	
	
	onClockSaveTap: function() {
		Ext.getCmp('paneloverlay').hide();
		var id = this.getClockdeiveidCt().getValue();
		var datedeb = this.getClockheuredebCt().getValue();
		//le controleur, change le jour (il met le jour en cours). il faut donc le corriger.
		datedeb = new Date("February 5, 2001 " + Ext.Date.format(datedeb, 'H:i:s'));
		var datefin = this.getClockheurefinCt().getValue();
		datefin = new Date("February 5, 2001 " + Ext.Date.format(datefin, 'H:i:s'));
			//Ext.Msg.alert('Message',Ext.Date.format(datedeb, 'd/m/y H:i:s')+' '+Ext.Date.format(datefin, 'd/m/y H:i:s'));
		var message = this.getClockmessageCt().getValue();
		var devices = Ext.getStore('devicesStore');
		var device=devices.getById(id);
		var devicetype=device.get('subcategory');
		var change=false;
		var heurefin="";
		if (devicetype == "1") {
			if (Date.parse(datefin) < Date.parse(datedeb)) {
				datefin.setTime(datefin.getTime() + (24 * 60 * 60 * 1000));
			}
			heurefin = (datefin.getTime() - datedeb.getTime()) / 1000;
			if(!heurefin>=10) heurefin=10;
			change=true;
		} else  heurefin="";
		var heuredeb=Ext.Date.format(datedeb, 'H:i:s');
		if(heuredeb!=device.get('var1')) {
			change=true;
		}
		if(devicetype=="2"&&message!=device.get('var4')) {
			change=true;
		} else message="";
		//change=false;
		if (change == true) {
			device.set('state', -2);
			var vera_url = './protect/syncvera.php';
			var syncheader = "";
			syncheader={'Authorization': 'Basic ' + this.loggedUserId};
			var ipvera = this.ipvera;
			Ext.Ajax.request({
				url: vera_url,
				headers: syncheader,
				params: {
					id: 'vclock',
					ipvera: ipvera,
					DeviceNum: id,
					alarmtime: heuredeb,
					alarmduration: heurefin,
					text1: message
				},
				method: 'GET',
				timeout: 10000,
				scope: this,
				success: function(response) {
				},
				failure: function(response) {
					//console.log("switch error :" + record.get('name'));
					Ext.Msg.alert(locale.getSt().misc.error,'Clock Error');
				}
			});
		} else {
			Ext.Msg.alert(locale.getSt().misc.msg,locale.getSt().msg.nochange);
			//Ext.Msg.alert('Message',''+heuredeb+' '+heurefin);
		}
	
	},
	
	onPilotWireTap: function(iddevice, newstatus) {
		dservice = "urn:antor-fr:serviceId:PilotWire1";
		daction = 'SetTarget';
		dtargetvalue = 'newTargetValue';
		var devices = Ext.getStore('devicesStore');
		var device = devices.getById(iddevice);
		if(device) {
		//switch status
		console.log("switch : " + device.get('name'));
		device.set('state', -2);
		var vera_url = './protect/syncvera.php';
		var syncheader = "";
		syncheader = {'Authorization': 'Basic ' + this.loggedUserId};
		var ipvera = this.ipvera;
		Ext.Ajax.request({
			url: vera_url,
			headers: syncheader,
			method: 'GET',
			timeout: 10000,
			scope: this,
			params: {
				id: 'lu_action',
				ipvera: ipvera,
				DeviceNum: iddevice,
				serviceId: dservice,
				action: daction,
				newvalue: newstatus,
				targetvalue: dtargetvalue
			},
			success: function(response) {
				//var category = device.get('category');
				//device.set('state', -2);
				
			},
			failure: function(response) {
				console.log("switch error :" + device.get('name'));
				Ext.Msg.alert(locale.getSt().misc.error,'Switch Error');
			}
		});
		} else {
			console.log("PilotWireTap - module non trouvé.");
		}
	},
	
	inserttabs: function() {
		var TabViewsStore = Ext.getStore('TabViewsStore');
		var tabs = Ext.getCmp('main');
		var count= 0;
		
		//Ext.getCmp('main').insert(0, {title: 'test', xtype: 'panel', html: 'new item'});
		
		TabViewsStore.data.each(function(tabview) {
				//if(tabview.get('id')==10) {
			tabs.insert(count, {
				xtype: 'carouselplan',
				id: ('tabvue' +tabview.get('id')),
				title: tabview.get('name'),
				iconCls: ('tab' +tabview.get('cls'))
			});
			//tabs.setActiveItem(0);
				//}
			count = count + 1;
			//var id=testroom.get('id');
			//if(!Ext.Array.contains(listId, id)) {
				//alert(testroom.get('name'));
			//	RoomsStore.remove(testroom);
			//}
		});
		//Ext.getCmp('main').doLayout();
		//Ext.getCmp('main').refresh();
		this.pushviews();
		//this.pushplans();
	},
	
	pushviews: function() {
		var FloorsStore = Ext.getStore('FloorsStore');
		var syncheader = "";
		syncheader = {'Authorization': 'Basic ' + this.loggedUserId};
		FloorsStore.getProxy().setHeaders(syncheader);
		
		if(this.profilchoice>0) {
			var jsonfile=this.jsonpath+"floors" + this.profilchoice +".json";
			FloorsStore.getProxy().setUrl(jsonfile);
		}
		
		//Pour ne pas perdre "this"
		var contdevices=this;
		//console.log(contdevices.storeloaded);
		FloorsStore.load(function(floors) {
			console.log("loading floors");
			//Vérifie qu'il y a au moins une vue (en principe -1 - Aucune vue)
			//Initialise floors.json sinon.
			if(FloorsStore.getCount()>0) {
				if(locale.getSt().lang!="fr") {
					var noview = FloorsStore.getById("-1")
					if(noview) noview.set("name",locale.getSt().misc.noview);
				}
				
				var TabViewsStore = Ext.getStore('TabViewsStore');
				var items = [];
				TabViewsStore.data.each(function(tabview) {
					items[tabview.get('id')] = [];
				});
				
				//Utilisation de FloorsStore.data.each, les vues ne sont pas triées sinon.
				//Ext.each(floors, function(floor) {
				var background="";
				FloorsStore.data.each(function(floor) {
					if(floor.get('id')!=-1) {
						//Pas de push si l'onglet n'existe pas (s'il a été supprimé par exemple)
						if(items[floor.get('tab')]) {
							if(myvera.app.isretina=="@2x"&&floor.get('pathretina')!="") {
								background='background-size: '+floor.get('widthretina')+'px; background-image: url(./resources/config/img/'+floor.get('pathretina')+'); background-repeat: no-repeat; background-position: 0px 0px;';
							} else {
								background='background:url(./resources/config/img/'+floor.get('path')+') no-repeat left top;';
							}
							items[floor.get('tab')].push({
									xtype: 'dataplan',
									id: ('vue' +floor.get('id')),
									style: background,
									itemTpl: '<tpl if="etage=='+floor.get('id')+'||etage1=='+floor.get('id')+'||etage2=='+floor.get('id')+'">'+
									'<div style="top:<tpl if="etage=='+floor.get('id')+'">{top}px; left:{left}px;'+
									'<tpl elseif="etage1=='+floor.get('id')+'">{top1}px; left:{left1}px;'+
									'<tpl elseif="etage2=='+floor.get('id')+'">{top2}px; left:{left2}px;</tpl>'+
									myvera.util.Templates.getTplplan() + myvera.util.Templates.getTplpanwebview() + myvera.util.Templates.getTplpanfin() + '</tpl>'
							});
						}
					}
				});
				
				TabViewsStore.data.each(function(tabview) {
					//Désactive l'effet carousel s'il n'y a qu'une vue
					//A faire avant d'ajouter des vues sinon "indicator" n'apparait pas
					if(items[tabview.get('id')].length<2) {
						Ext.getCmp('tabvue' +tabview.get('id')).toggleSwipe(false);
						Ext.getCmp('tabvue' +tabview.get('id')).setIndicator(false);
					} else {
						Ext.getCmp('tabvue' +tabview.get('id')).toggleSwipe(true);
						Ext.getCmp('tabvue' +tabview.get('id')).setIndicator(true);
					}
					Ext.getCmp('tabvue' +tabview.get('id')).setItems(items[tabview.get('id')]);
					Ext.getCmp('tabvue' +tabview.get('id')).setActiveItem(0);
				});
				
				//Affiche l'onglet vue ou list
				contdevices.switchvuelist();
				//Ext.getCmp('main').setActiveItem(0);
				
				//carouselplan.setItems(items);
				//carouselplan.setActiveItem(0);
				
				//Charge devicesStore seulement la première fois.
				if(contdevices.storeloaded==false) {
					var DevicesStore = Ext.getStore('devicesStore');
					DevicesStore.load();
					contdevices.storeloaded=true;
				}
				//console.log(contdevices.storeloaded);
			} else {
				contdevices.initfloors();
			}
		});
	},
	
	initfloors: function() {
		Ext.Msg.confirm(locale.getSt().misc.error, locale.getSt().msg.createviews, function(confirmed) {
				if (confirmed == 'yes') {
					Ext.Viewport.setMasked({
						xtype: 'loadmask',
						message: locale.getSt().msg.initlist
					});

					console.log("Create Floors");
					var url = './protect/initfloors.php';
					var syncheader = "";
					syncheader = {'Authorization': 'Basic ' + this.loggedUserId};
					Ext.Ajax.request({
							url: url,
							headers: syncheader,
							method: 'GET',
							timeout: 35000,
							scope: this,
							params: {
								timeout: '30',
								profil: this.profilchoice
							},
							success: function(result) {
								Ext.Viewport.setMasked(false);
								if (result.responseText=="OK") {
									this.pushviews();
									//this.pushplans();
								} else {
									Ext.Msg.alert(locale.getSt().misc.error, locale.getSt().msg.createlisterror);
								}
							},
							failure: function(response) {
								Ext.Viewport.setMasked(false);
								Ext.Msg.alert(locale.getSt().misc.error, locale.getSt().msg.createlisterror);
							}
					});
				}
			}, this);
	},
	
	//Lancé quand la liste des onglets n'existe pas pour la créer
	initTabsViews: function() {
		Ext.Msg.confirm(locale.getSt().misc.error, locale.getSt().msg.createtabs, function(confirmed) {
				if (confirmed == 'yes') {
					Ext.Viewport.setMasked({
						xtype: 'loadmask',
						message: locale.getSt().msg.initlist
					});

					console.log("Create Tabs");
					var url = './protect/inittabs.php';
					var syncheader = "";
					syncheader = {'Authorization': 'Basic ' + this.loggedUserId};
					Ext.Ajax.request({
							url: url,
							headers: syncheader,
							method: 'GET',
							timeout: 35000,
							scope: this,
							params: {
								timeout: '30',
								profil: this.profilchoice
							},
							success: function(result) {
								Ext.Viewport.setMasked(false);
								if (result.responseText=="OK") {
									this.startstore();
								} else {
									Ext.Msg.alert(locale.getSt().misc.error, locale.getSt().msg.createlisterror);
								}
							},
							failure: function(response) {
								Ext.Viewport.setMasked(false);
								Ext.Msg.alert(locale.getSt().misc.error, locale.getSt().msg.createlisterror);
							}
					});
				}
			}, this);
	},
	
	switchvuelist: function() {
		
		if(this.getIsTab().getValue()==0) Ext.getCmp('main').getTabBar().hide();
		
		var application = this.getApplication().getController('Application');
		var orientation= application.getOrientationFix();
				
		var typevue = this.getIsVueL().getValue();
//*******		application.setPanel3dL(typevue);
		if(typevue==true&&orientation=='landscape') {
			Ext.getCmp('main').setActiveItem(0);
//*******					Ext.getCmp('homepanel').setActiveItem(Ext.getCmp('carouselplan'));
					//Ext.getCmp('carouselplan').hide();
		}
		
		typevue = this.getIsVueP().getValue();
//*******		application.setPanel3dP(typevue);
		if(typevue==true&&orientation=='portrait') {
			Ext.getCmp('main').setActiveItem(0);
//*******					Ext.getCmp('homepanel').setActiveItem(Ext.getCmp('carouselplan'));
					//Ext.getCmp('carouselplan').hide();
		}
	},
	
	base64_encode: function(data) {
		var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
		var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,
			ac = 0,
			enc = "",
			tmp_arr = [];
		
		if (!data) {
			return data;
		}
		
		//data = this.utf8_encode(data + '');
		
		do { // pack three octets into four hexets
			o1 = data.charCodeAt(i++);
			o2 = data.charCodeAt(i++);
			o3 = data.charCodeAt(i++);
			
			bits = o1 << 16 | o2 << 8 | o3;
			h1 = bits >> 18 & 0x3f;
			h2 = bits >> 12 & 0x3f;
			h3 = bits >> 6 & 0x3f;
			h4 = bits & 0x3f;
			
			// use hexets to index into b64, and append result to encoded string
			tmp_arr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
		} while (i < data.length);
		
		enc = tmp_arr.join('');
		
		var r = data.length % 3;
		
		return (r ? enc.slice(0, r - 3) : enc) + '==='.slice(r || 3);
	},
	
	onVersionTap: function() {
		console.log("Version Verif");
		var url = './version/newversion.php';
		Ext.Viewport.setMasked({
				xtype: 'loadmask',
				message: locale.getSt().msg.search + '...'
		});
		Ext.Ajax.request({
			url: url,
			method: 'GET',
			timeout: 10000,
			scope: this,
			success: function(result) {
				var response = Ext.decode(result.responseText, true);
				Ext.Viewport.setMasked(false);
				if (response) {
					if(response.result=="true") {
						this.getUrlversiontxt().setHtml(locale.getSt().msg[response.msg]+' <a style="font-size:12px;" target="_blank" href="' +response.url+'">'+response.url+'</a>');
						//this.getUsernameCt()
						this.getUrlversiontxt().show();
						Ext.Msg.alert(locale.getSt().misc.version,locale.getSt().msg[response.msg]);
					} else {
						this.getUrlversiontxt().hide();
						Ext.Msg.alert(locale.getSt().misc.version,locale.getSt().msg[response.msg]);
					}
				} else {
					Ext.Msg.alert(locale.getSt().misc.error,locale.getSt().msg.noanswer);
				}
			},
			failure: function(result) {
				Ext.Viewport.setMasked(false);
				Ext.Msg.alert(locale.getSt().misc.error,locale.getSt().msg.noanswer);
			}
		});

	},
	
	vthermPopup: function(deviceid, name, status, energymode, heatsp, coolsp) {
		//device.set('var2', response.devices[idrecord].heatsp);
		//device.set('var3', response.devices[idrecord].coolsp);
		//device.set('var4', response.devices[idrecord].hvacstate);
		
		var me=this;
		
//		var automode=1;
//		if(hvacstate=="Heating") automode=0;
			
		//Status 5 : non connu, 0 : mode off, 1 : mode CoolOn (Inactif), 2: Mode HeatOn (Forcé), 3: Auto
		var popup=new Ext.Panel({
		    modal:true,
		    id: 'popup_temp',
		    hideOnMaskTap: true,
		    padding: 4,
		    //margin: '0,0,0,0',
		    //border: 1,
		    //width: '400px',
		    centered: true,
		    items:[
		    {
			xtype: 'fieldset',
			name:'fieldset1',
			itemId:'fieldset1',
			//title:name,
			defaults: {
				labelWidth: '140px'
			},
			items: [
			{
				xtype: 'selectfield',
				label: locale.getSt().device.vtherm.mode,
				name: 'status',
				itemId: 'status',
				options: [{
					text: locale.getSt().device.vtherm["0"],
					value: 0
				}, {
					text: locale.getSt().device.vtherm["1"],
					value: 1
				}, {
					text: locale.getSt().device.vtherm["2"],
					value: 2
				}, {
					text: locale.getSt().device.vtherm["3"],
					value: 3
				}]
			},
			{
				xtype: 'radiofield',
				name: 'automode',
				itemId: 'automodeeco',
				value: 'EnergySavingsMode',
				label: locale.getSt().device.vtherm["3"]+" "+locale.getSt().device.vtherm.eco//,
				//checked: true
			},
			{
				xtype: 'radiofield',
				name: 'automode',
				itemId: 'automodeconf',
				value: 'Normal',
				label: locale.getSt().device.vtherm["3"]+" "+locale.getSt().device.vtherm.normal
			},
			{
				xtype: 'sliderfieldextended',
				name: 'coolsp',
				itemId: 'coolsp',
				labelAlign: 'top',
				labelText: locale.getSt().device.vtherm.tempeco,
				label: locale.getSt().device.vtherm.tempeco+ " ("+locale.getSt().unit.temp+")",
				value: coolsp,
				minValue: 0,
				maxValue: 35,
				increment: 0.1
			},
			{
				xtype: 'sliderfieldextended',
				name: 'heatsp',
				itemId: 'heatsp',
				labelAlign: 'top',
				labelText: locale.getSt().device.vtherm.tempnorm,
				label: locale.getSt().device.vtherm.tempnorm+ " ("+locale.getSt().unit.temp+")",
				value: heatsp,
				minValue: 0,
				maxValue: 35,
				increment: 0.1
			},
			{
				xtype: 'button',
				margin: 5,
				itemId: 'confirm',
				ui: 'confirm',
				text: locale.getSt().button.update,
				iconCls: 'refresh',
				iconMask: true,
				handler: function(){
					var result="";
					var newvalue="";
					var form = popup.down('#fieldset1');
					if(form.down('#coolsp').getHelperValue() != coolsp) {
						newvalue=form.down('#coolsp').getHelperValue();
						//data_request?id=lu_action&serviceId=urn:upnp-org:serviceId:TemperatureSetpoint1_Cool&DeviceNum=86&action=SetCurrentSetpoint&NewCurrentSetpoint=18.2
						me.ondeviceaction(deviceid, "urn:upnp-org:serviceId:TemperatureSetpoint1_Cool", "SetCurrentSetpoint", "NewCurrentSetpoint", newvalue);
						//result=result +"Temp. Eco:" + newvalue;
					}
					
					if(form.down('#heatsp').getHelperValue() != heatsp) {
						newvalue=form.down('#heatsp').getHelperValue();
						//data_request?id=lu_action&serviceId=urn:upnp-org:serviceId:TemperatureSetpoint1_Heat&DeviceNum=86&action=SetCurrentSetpoint&NewCurrentSetpoint=18.2
						me.ondeviceaction(deviceid, "urn:upnp-org:serviceId:TemperatureSetpoint1_Heat", "SetCurrentSetpoint", "NewCurrentSetpoint", newvalue);
						//result=result +"Temp. Confort:" + newvalue;
					}
					
//********Debug
console.log("Debug: Automode "+energymode+ " new: "+form.down('#automodeconf').getGroupValues());
					if(form.down('#automodeconf').getGroupValues() != energymode) {
						//alert(form.down('#automodeconf').getGroupValues());
//					//if(form.down('#automode').getValue() != automode) {
//						if(form.down('#automode').getValue()==1) newvalue="EnergySavingsMode";
						if(form.down('#automodeconf').getGroupValues()=="EnergySavingsMode") newvalue="EnergySavingsMode";
						else newvalue="Normal";
//********Debug
console.log("Debug: NewEnergyModeTarget="+ newvalue);
						//data_request?id=lu_action&serviceId=urn:upnp-org:serviceId:HVAC_UserOperatingMode1&DeviceNum=86&action=SetEnergyModeTarget&NewEnergyModeTarget=EnergySavingsMode
						me.ondeviceaction(deviceid, "urn:upnp-org:serviceId:HVAC_UserOperatingMode1", "SetEnergyModeTarget", "NewEnergyModeTarget", newvalue);
						//result=result +" Mode auto:" + newvalue;
					}
					
					if(form.down('#status').getValue() != status) {
						newvalue="";
						//Status 5 : non connu, 0 : mode Off, 1 : mode CoolOn (Inactif), 2: Mode HeatOn (Forcé), 3: Auto
						switch (form.down('#status').getValue()) {
						case 3:
							newvalue="AutoChangeOver";
							break;
						case 2:
							newvalue="HeatOn";
							break;
						case 1:
							newvalue="CoolOn";
							break;
						case 0:
							newvalue="Off";
							break;
						default:
							
							break;
						}
						//data_request?id=lu_action&serviceId=urn:upnp-org:serviceId:HVAC_UserOperatingMode1&DeviceNum=86&action=SetModeTarget&NewModeTarget=AutoChangeOver
						me.ondeviceaction(deviceid, "urn:upnp-org:serviceId:HVAC_UserOperatingMode1", "SetModeTarget", "NewModeTarget", newvalue);
						//result=result +" Nouveau mode :" + newvalue;
					}
					
					this.getParent().getParent().hide();
					//if(result!="") Ext.Msg.alert('Modif', result);
					//else Ext.Msg.alert('Modif', "Pas de modif");
				}
			}
			]
			}],
			listeners: {
				hide: function(panel) {
					this.destroy();
				}
			}
		});
		
		popup.down('#fieldset1').down('#status').setValue(status);
		//popup.down('#heatsp').setValue(heatsp);
		//popup.down('#coolsp').setValue(coolsp);
		//popup.down('#automodeeco').setGroupValues(hvacstate);
		if(energymode=="Normal") {
			//popup.down('#automode').setValue(0);
			popup.down('#automodeconf').check();
		} else {
			popup.down('#automodeeco').check();
		}
		
		Ext.Viewport.add(popup);
		popup.show();
	},
	
	widgetPopup: function(width, height, url) {
		var popup=new Ext.Panel({
			modal:true,
			hideOnMaskTap: true,
			baseCls:'transparentmodal',
			styleHtmlContent: true,
			width: width,
			height: height,
			centered: true,
			border:false,
			//html: '<iframe style="width:' + width + 'px;height:'+ height +'px;background:transparent;" src="'+url+'" frameborder="no" scrolling="no" marginwidth="0" marginheight="0" noresize allowtransparency="true">Your device does not support iframes.</iframe>',
			listeners: {
				hide: function(panel) {
					this.setHtml('');
					this.destroy();
				}
			}
		});
					
		Ext.Viewport.add(popup);
		popup.show();
		popup.setHtml('<iframe style="width:' + width + 'px;height:'+ height +'px;background:transparent;" src="'+url+'" frameborder="no" scrolling="no" marginwidth="0" marginheight="0" noresize allowtransparency="true">Your device does not support iframes.</iframe>');
	},
	
	changeView: function(panel, index) {
		//syntaxe : nom onglet/carousel : tabvue+id, nom vue : vue + id
		var FloorsStore = Ext.getStore('FloorsStore');
		var view = FloorsStore.getById(index);
		if(view) {
			var tabname = "tabvue" + view.get('tab');
			var vuename = "vue" + index;
			if(tabname==panel.id) {
				panel.setActiveItem(Ext.getCmp(vuename));
				return;
			} else {
				var newpanel = Ext.getCmp(tabname);
				if(newpanel) {
					Ext.getCmp('main').setActiveItem(newpanel);
					newpanel.setActiveItem(Ext.getCmp(vuename));
					return;
				}
			}
		}
		Ext.Msg.alert(locale.getSt().misc.error,locale.getSt().misc.noview);
	},
	
	runHtml: function(iddevice, url) {
		var devices = Ext.getStore('devicesStore');
		var device = devices.getById(iddevice);
		device.set('state', -2);
		
		var send_url = './protect/sendhtml.php';
		var syncheader = "";
		syncheader = {'Authorization': 'Basic ' + this.loggedUserId};
		Ext.Ajax.request({
			url: send_url,
			headers: syncheader,
			method: 'POST',
			//timeout: 10000,
			scope: this,
			params: {
				url: url
			},
			success: function(response) {
				console.log("Command OK "+response.responseText);
				device.set('state', 0);
			},
			failure: function(response) {
				//console.log("switch error :" + record.get('name'));
				Ext.Msg.alert(locale.getSt().misc.error,locale.getSt().msg.noanswer);
				device.set('state', 0);
			}
		});
	},
	
	showHideMenu: function() {
		var tabbar = Ext.getCmp('main').getTabBar();
		console.log("tap 1");
		if(tabbar.getHidden()) {
			console.log("Show Tabbar");
			tabbar.show();
		} else {
			console.log("Hide Tabbar");
			tabbar.hide();
		}
	},
	
	ondeviceaction: function(iddevice, dservice, daction, dtargetvalue, newstatus) {
		var devices = Ext.getStore('devicesStore');
		var device = devices.getById(iddevice);
		if(device) {
		//switch status
		console.log("switch : " + device.get('name'));
		device.set('state', -2);
		var vera_url = './protect/syncvera.php';
		var syncheader = "";
		syncheader = {'Authorization': 'Basic ' + this.loggedUserId};
		var ipvera = this.ipvera;
		Ext.Ajax.request({
			url: vera_url,
			headers: syncheader,
			method: 'GET',
			timeout: 10000,
			scope: this,
			params: {
				id: 'lu_action',
				ipvera: ipvera,
				DeviceNum: iddevice,
				serviceId: dservice,
				action: daction,
				newvalue: newstatus,
				targetvalue: dtargetvalue
			},
			success: function(response) {
				//var category = device.get('category');
				//device.set('state', -2);
				
			},
			failure: function(response) {
				console.log("switch error :" + device.get('name'));
				Ext.Msg.alert(locale.getSt().misc.error,'Switch Error');
			}
		});
		} else {
			console.log("Erreur - module non trouvé.");
		}
	}
});
