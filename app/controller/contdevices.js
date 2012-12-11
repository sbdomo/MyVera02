Ext.define('myvera.controller.contdevices', {
	extend : 'Ext.app.Controller',
	config: {
		stores: ['devicesStore', 'storeRooms'],
		views: ['dataplan'],
		//views: ['dataplan', 'listclock', 'PanelConfigGenerale'],
		//'datalist',
		//profile: Ext.os.deviceType.toLowerCase(),
		
		//jsonpath: './protect/config/',
		loggedUserId: null,
		logged: null,
		ipvera: null,
		profilchoice: null,
		
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
			viewprofil: 'PanelConfigGenerale [name=viewprofil]',
			loginBt: 'PanelConfigGenerale [name=loginbutton]',
			
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
			
			loginBt: {
				tap: 'onLoginTap'
			},
			
			clocksaveclockBt: {
				tap: 'onClockSaveTap'
			}
			
		}
	},

	launch: function() {
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
				
				this.profilchoice=cachedLoggedInUser.get('profil');
				if(this.profilchoice==null) this.profilchoice=0;
				this.getViewprofil().setValue(this.profilchoice);
				
				console.info('Auto-Login succeeded.');
				
				if(this.getIsReveil().getValue()) Ext.getCmp('main').getTabBar().items.items[2].show();
				
				var application = this.getApplication().getController('Application');
				var orientation= application.getOrientationFix();
				
				var typevue = this.getIsVueL().getValue();
				application.setPanel3dL(typevue);
				if(typevue==true&&orientation=='landscape') {
					Ext.getCmp('homepanel').setActiveItem(Ext.getCmp('carouselplan'));
					//Ext.getCmp('carouselplan').hide();
				}
				
				var typevue = this.getIsVueP().getValue();
				application.setPanel3dP(typevue);
				if(typevue==true&&orientation=='portrait') {
					Ext.getCmp('homepanel').setActiveItem(Ext.getCmp('carouselplan'));
					//Ext.getCmp('carouselplan').hide();
				}
				
				Ext.getCmp('main').getTabBar().items.items[1].show();
				Ext.getCmp('main').getTabBar().items.items[0].show();
				this.LogIn();
				//this.startstore();
			},
			failure : function() {
				console.warn('Auto-Login failed (user was not logged in).');
				Ext.getCmp('main').setActiveItem(Ext.getCmp('PanelConfig'));
				Ext.Msg.alert('Erreur','Vous devez vous identifier !');
			}
		});
	},
	
	LogIn: function() {
		this.logged = true;
		this.startstore();
		this.getLoginBt().setText('Se déconnecter');
		//this.getLoginBt().setUi('decline');
		this.getUsernameCt().hide();
		this.getPasswordCt().hide();
		this.getIpveraCt().hide();
		this.getViewprofil().disable();
	},
	
	startstore: function() {
		var storeRooms = Ext.getStore('Rooms');
		
		var syncheader = "";
		syncheader = {'Authorization': 'Basic ' + this.loggedUserId};
		storeRooms.getProxy().setHeaders(syncheader);
		
		storeRooms.on({
			load: 'onStoreRoomsLoad',
			scope: this
		});
		storeRooms.load();
	},
	
	onStoreRoomsLoad: function() {
		console.log("loading Rooms");
		var storeRooms = Ext.getStore('Rooms');
		if (storeRooms.getCount()>0) {
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
			this.pushplans();
			var listroom = Ext.getCmp('datalist').down('#list');
			if(listroom.getStore().getAt(0).get('id')!=0||storeRooms.getCount()==1) {
				listroom.select(0);
			} else {
				listroom.select(1);
			}
			
		} else {
			Ext.Msg.confirm('Erreur', 'Liste des pièces vide. La créer?', function(confirmed) {
				if (confirmed == 'yes') {
					Ext.Viewport.setMasked({
						xtype: 'loadmask',
						message: 'Sauvegarde....'
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
									Ext.Msg.alert('Erreur', 'Erreur lors de la création de la liste des pièces.');
								}
							},
							failure: function(response) {
								Ext.Viewport.setMasked(false);
								Ext.Msg.alert('Erreur', 'Erreur lors de la création de la liste des pièces.');
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
			Ext.Msg.alert('Pas de modules', 'Vous devriez ajouter des modules et, si nécessaire, des vues.');
		}
	},
	
	devicesync: function(newloadtime, newdataversion, nonewsync) {
		console.log("New Vera Sync");
		if (nonewsync != true) nonewsync=false;
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
					var device = "";
					if (devices) {
						for (idrecord in response.devices) {
							device = devices.getById(response.devices[idrecord].id);
							if (device) {
								device.set('status', response.devices[idrecord].status);
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
									break;
								case 18: //light sensor
									device.set('var1', response.devices[idrecord].light);
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
								case 120: //vclock
									device.set('var1', response.devices[idrecord].alarmtime);
									if (response.devices[idrecord].alarmtime != null) {
										heuredep = new Date("February 5, 2001 " + response.devices[idrecord].alarmtime);
										duration = response.devices[idrecord].alarmduration;
										heuredep.setTime(heuredep.getTime() + (eval(duration) * 1000));
										heures = Ext.Date.format(heuredep, 'H:i:s')
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
										(category !=4 && category !=104 && status == 1)
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
											(category !=4 && category != 103 && category != 120 && status == 0)
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
					if(nonewsync!=true) {
					//new sync
					if (response.loadtime && response.dataversion) {
						this.devicesync(response.loadtime,response.dataversion);
					} else {
						Ext.Msg.alert('Erreur', 'Synchronisation sans loadtime');
						this.devicesync(0, 0, nonewsync);
					}
					}
				} else {
					Ext.Msg.confirm('Erreur', 'Pas de réponse lors de la synchro. Essayer à nouveau?', function(confirmed) {
					if (confirmed == 'yes') {
						this.devicesync(0,0, nonewsync);
					}
					}, this);
				}
			},
			failure: function(response) {
				console.log("Vera Sync : Error");
				//Ext.Msg.alert('Erreur','Synchronisation avec la Vera impossible ou interrompue');
				Ext.Msg.confirm('Erreur', 'Synchronisation avec la Vera impossible ou interrompue. Essayer à nouveau?', function(confirmed) {
					if (confirmed == 'yes') {
						this.devicesync(0,0, nonewsync);
					}
				}, this);
				
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

	onDeviceTap: function(view, index, target, record, event) {
		//abort if in datalist it's not the image
		//if(view.id=="datalist"&&Ext.get(event.target).hasCls('deviceImage')==false) return;
		//console.log("tap");
		var dservice = 'urn:upnp-org:serviceId:SwitchPower1';
		var daction = 'SetTarget';
		var sdim = 'urn:upnp-org:serviceId:Dimming1';
		var actdim = 'SetLoadLevelTarget';
		var tardim = 'newLoadlevelTarget';
		var dtargetvalue = 'newTargetValue';
		
		var newstatus = "0";
		
		var icontap = false;
		var cat=record.get('category');
		if (!Ext.Array.contains([2, 3, 4, 6, 8, 16, 17, 21, 101, 102, 103, 104, 120, 1000], cat) && (record.get('sceneon') == null || record.get('sceneoff') == null)) {
			return;
		}
		
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
			
			//camera
			if(cat==6&&record.get('sceneon')==null) {
				var me=this;
				if(record.get('var2')==null){
					record.data.var2="/snapshot.cgi";
				}
				var RefreshCam = function() {
					task = Ext.create('Ext.util.DelayedTask', function() {
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
				if(record.get('graphlink')!=null){
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
			if (record.get('category') == 120&&record.get('sceneon') == null) {
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
			
			if (record.get('category') == 4) {
				if (record.get('tripped') == 0) {
					newstatus = "1";
				}
			} else if (record.get('status') == 0) {
				newstatus = "1";
			}
			if (record.get('category') == 101) {
				dservice = "urn:upnp-org:serviceId:VSwitch1";
				daction = 'SetTarget';
				dtargetvalue = 'newTargetValue';
			}
			
			//Pilote Wire Controlle
			if(record.get('category') == 104&&record.get('sceneon') == null) {
				var html0 = '<img class="i0" src="./resources/images/plugin/pw0_';
				if(record.get('status')==0) {
					html0=html0+'1';
					press0= true;
				} else {
					html0=html0+'0';
					press0=false;
				}
				html0= html0+'.png" />';
				var html1 = '<img class="i1" src="./resources/images/plugin/pw1_';
				if(record.get('status')==1) {
					html1=html1+'1';
					press1= true;
				} else {
					html1=html1+'0';
					press1=false;
				}
				html1= html1+'.png" />';
				var html2 = '<img class="i2" src="./resources/images/plugin/pw2_';
				if(record.get('status')==2) {
					html2=html2+'1';
					press2= true;
				} else {
					html2=html2+'0';
					press2=false;
				}
				html2= html2+'.png" />';
				var html3 = '<img class="i3" src="./resources/images/plugin/pw3_';
				if(record.get('status')==3) {
					html3=html3+'1';
					press3= true;
				} else {
					html3=html3+'0';
					press3=false;
				}
				html3= html3+'.png" />';
				me =this;
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
			
			if (record.get('category') == 1000) {
				dservice = "urn:micasaverde-com:serviceId:HomeAutomationGateway1";
				daction = 'RunScene';
				newstatus = record.get('id').substring(1);
			}
			
			if (record.get('sceneon') != null && record.get('sceneoff') != null) {
				dservice = 'urn:micasaverde-com:serviceId:HomeAutomationGateway1';
				daction = 'RunScene';
				if (newstatus == "1") {
					newstatus = record.get('sceneon');
				} else {
					newstatus = record.get('sceneoff');
				}
			} else if (Ext.Array.contains([4, 103, 120], record.get('category'))) {
				return;
			}
			
		} else {
			//Action lors d'un clic aillues que sur l'icône
			if (record.get('category') == 104) {
				dservice = "urn:antor-fr:serviceId:PilotWire1";
				daction = 'SetTarget';
				dtargetvalue = 'newTargetValue';
			}
		}

		//switch status
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
				var category = record.get('category');
				if (Ext.Array.contains([2, 3, 8], category)) {
					record.set('state', -2);
				} else if (category==1000) {
					record.set('state', -1);
				}
			},
			failure: function(response) {
				console.log("switch error :" + record.get('name'));
				Ext.Msg.alert('Erreur','Switch Error');
			}
		});
	},
	
	onDeviceHoldTap: function(view, index, target, record, event) {
		var dservice = 'urn:upnp-org:serviceId:SwitchPower1';
		var daction = 'SetTarget';
		var sdim = 'urn:upnp-org:serviceId:Dimming1';
		var actdim = 'SetLoadLevelTarget';
		var tardim = 'newLoadlevelTarget';
		var dtargetvalue = 'newTargetValue';
		var syncheader = "";
		syncheader = {'Authorization': 'Basic ' + this.loggedUserId};
		
		var newstatus = "0";
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
						dservice=sdim;
						daction=actdim;
						dtargetvalue=tardim;
						newstatus = newValue;
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
									newvalue: newstatus,
									targetvalue: dtargetvalue
									
								},
								success: function(response) {
									if (Ext.Array.contains([2, 3, 8], record.get('category'))) {
										record.set('state', -2);
									}
								},
								failure: function(response) {
									console.log("switch error :" + record.get('name'));
									Ext.Msg.alert('Erreur','Switch Error');
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
	
	onLoginTap: function() {
		if(this.logged!=true) {
			var username = this.getUsernameCt().getValue(),
				password = this.getPasswordCt().getValue(),
				ipvera = this.getIpveraCt().getValue(),
				isVueL = this.getIsVueL().getValue(),
				isVueP = this.getIsVueP().getValue(),
				isReveil = this.getIsReveil().getValue();
				profil = this.getViewprofil().getValue();
				
			if(!Ext.isEmpty(password) && !Ext.isEmpty(username) && !Ext.isEmpty(ipvera)) {
				var user = Ext.create('myvera.model.CurrentUser', {
					id: 1,
					name: username,
					pass: password,
					ipvera: ipvera,
					isVueL: isVueL,
					isVueP: isVueP,
					isReveil: isReveil,
					profil: profil
				});
				user.save();
				this.loggedUserId=this.base64_encode(username+":"+password);
				this.ipvera=this.getIpveraCt().getValue();
				this.profilchoice=this.getViewprofil().getValue();
				
				console.log('logUserIn: ', username);
				//this.startstore();
				this.LogIn();

				if(this.getIsReveil().getValue()) Ext.getCmp('main').getTabBar().items.items[2].show();
				
				var application = this.getApplication().getController('Application');
				var orientation= application.getOrientationFix();
				
				application.setPanel3dL(isVueL);
				if(isVueL==true&&orientation=='landscape') {
					Ext.getCmp('homepanel').setActiveItem(Ext.getCmp('carouselplan'));
					//Ext.getCmp('carouselplan').hide();
				}
				
				application.setPanel3dP(isVueP);
				if(isVueP==true&&orientation=='portrait') {
					Ext.getCmp('homepanel').setActiveItem(Ext.getCmp('carouselplan'));
					//Ext.getCmp('carouselplan').hide();
				}
				
				Ext.getCmp('main').getTabBar().items.items[1].show();
				Ext.getCmp('main').getTabBar().items.items[0].show();
				Ext.getCmp('main').setActiveItem(Ext.getCmp('homepanel'));
			} else Ext.Msg.alert('Erreur','vous devez indiquer un login, un mot de passe et l\'IP de la Vera.');
		} else {
			Ext.ModelMgr.getModel('myvera.model.CurrentUser').load(1, {
				success: function(user) {
					Ext.Msg.confirm('Message', 'Voulez-vous vous déconnecter?', function(confirmed) {
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
				this.ChangeVue("landscape", isvue);
				
			},
			failure: function() {
				// this should not happen, nevertheless:
				alert("Erreur !");
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
				this.ChangeVue("portrait", isvue);
				
			},
			failure: function() {
				// this should not happen, nevertheless:
				alert("Erreur !");
			}
		}, this);
		}
	},
	
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
				Ext.getCmp('homepanel').setActiveItem(Ext.getCmp('carouselplan'));
			}
		} else {
			if(orientation==orient) {
				Ext.getCmp('homepanel').setActiveItem(Ext.getCmp('datalist'));
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
					Ext.getCmp('main').getTabBar().items.items[2].show();
				} else {
					Ext.getCmp('main').getTabBar().items.items[2].hide();
				}
			},
			failure: function() {
				// this should not happen, nevertheless:
				alert("Erreur !");
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
		device=devices.getById(id);
		devicetype=device.get('subcategory');
		var change=false;
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
					Ext.Msg.alert('Erreur','Clock Error');
				}
			});
		} else {
			Ext.Msg.alert('Message','Pas de modification.');
			//Ext.Msg.alert('Message',''+heuredeb+' '+heurefin);
		}
	
	},
	
	onPilotWireTap: function(iddevice, newstatus) {
		dservice = "urn:antor-fr:serviceId:PilotWire1";
		daction = 'SetTarget';
		dtargetvalue = 'newTargetValue';
		var devices = Ext.getStore('devicesStore');
		device = devices.getById(iddevice);
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
				Ext.Msg.alert('Erreur','Switch Error');
			}
		});
		} else {
			console.log("PilotWireTap - module non trouvé.");
		}
	},
	
	pushplans: function() {
		var FloorsStore = Ext.getStore('FloorsStore');
		var syncheader = "";
		syncheader = {'Authorization': 'Basic ' + this.loggedUserId};
		FloorsStore.getProxy().setHeaders(syncheader);
		
		if(this.profilchoice>0) {
			var jsonfile=this.jsonpath+"floors" + this.profilchoice +".json";
			FloorsStore.getProxy().setUrl(jsonfile);
		}
		
		//Pour ne pas perdre "this"
		var contdevives=this;
		//console.log(contdevives.storeloaded);
		FloorsStore.load(function(floors) {
			console.log("loading floors");
			//Vérifie qu'il y a au moins une vue (en principe -1 - Aucun étage)
			//Initialise floors.json sinon.
			if(FloorsStore.getCount()>0) {
				var items = [];
				Ext.each(floors, function(floor) {
					if(floor.data.id!=-1) {
						items.push({
							xtype: 'dataplan',
							style: 'background:url(./resources/config/img/'+floor.data.path+') no-repeat left top;',
							itemTpl: '<tpl if="etage=='+floor.data.id+'||etage1=='+floor.data.id+'||etage2=='+floor.data.id+'">'+
							'<div style="top:<tpl if="etage=='+floor.data.id+'">{top}px; left:{left}px;'+
							'<tpl elseif="etage1=='+floor.data.id+'">{top1}px; left:{left1}px;'+
							'<tpl elseif="etage1=='+floor.data.id+'">{top2}px; left:{left2}px;</tpl>'+
							myvera.util.Templates.getTplplan() + '</tpl>'
						});
					}
				});
				var carouselplan=Ext.getCmp('carouselplan');
				//Désactive l'effet carousel s'il n'y a qu'une vue
				//A faire avant d'ajouter des vues sinon "indicator" n'apparait pas
				if(FloorsStore.getCount()<3) {
					carouselplan.toggleSwipe(false);
					carouselplan.setIndicator(false);
				} else {
					carouselplan.toggleSwipe(true);
					carouselplan.setIndicator(true);
				}
				carouselplan.setItems(items);
				carouselplan.setActiveItem(0);
				//Charge devicesStore seulement la première fois.
				if(contdevives.storeloaded==false) {
					var DevicesStore = Ext.getStore('devicesStore');
					DevicesStore.load();
					contdevives.storeloaded=true;
				}
				//console.log(contdevives.storeloaded);
			} else {
				contdevives.initfloors();
			}
		});
	},
	
	initfloors: function() {
		Ext.Msg.confirm('Erreur', 'Liste des vues vide. La créer?', function(confirmed) {
				if (confirmed == 'yes') {
					Ext.Viewport.setMasked({
						xtype: 'loadmask',
						message: 'Initialisation de la liste...'
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
									this.pushplans();
								} else {
									Ext.Msg.alert('Erreur', 'Erreur lors de la création de la liste des vues.');
								}
							},
							failure: function(response) {
								Ext.Viewport.setMasked(false);
								Ext.Msg.alert('Erreur', 'Erreur lors de la création de la liste des vues.');
							}
					});
				}
			}, this);
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
	}
});
