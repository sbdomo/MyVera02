Ext.define('myvera.controller.contconfig', {
	extend : 'Ext.app.Controller',
	config: {
		//stores: ['ConfigDevicesStore', 'devicesStore'],
		views: ['PanelConfigNavigation', 'PanelConfigItemsMenu', 'PanelConfigItems', 'PanelConfigItem', 'PanelConfigScenes', , 'PanelConfigScene', 'PanelConfigWebviews', 'PanelConfigWebview', 'PanelImage', 'datamove', 'PanelConfigFloorsNavigation', 'PanelConfigFloors', 'PanelConfigFloor', 'PanelConfigMove', 'PanelConfigTabs', 'PanelConfigTab'],
		refs: {
			configDevices: 'PanelConfigNavigation',
			panelConfigItemsOpen: 'PanelConfigItemsMenu [name=openPanelConfigItems]',
			panelConfigViewsOpen: 'PanelConfigViewsMenu [name=openPanelConfigViews]',
			panelConfigRTabsOpen: 'PanelConfigViewsMenu [name=openPanelConfigTabs]',
			panelConfigScenesOpen: 'PanelConfigItemsMenu [name=openPanelConfigScenes]',
			panelConfigWebViewsOpen: 'PanelConfigItemsMenu [name=openPanelConfigWebViews]',
			panelItemsMoveOpen: 'PanelConfigItemsMenu [name=openPanelMove]',
			listItemsSave: 'PanelConfigItemsMenu [name=sauver]',
			configFloors: 'PanelConfigFloorsNavigation',
			configRooms: 'PanelConfigRoomsNavigation',
			roomsSave: 'PanelConfigRoomsNavigation [itemId=sauver]',
			panelConfigFloor: 'PanelConfigFloor',
			panelConfigTab: 'PanelConfigTab',
			savefloor: 'PanelConfigFloor [name=savefloor]',
			deletefloor: 'PanelConfigFloor [name=deletefloor]',
			savetab: 'PanelConfigTab [name=savetab]',
			deletetab: 'PanelConfigTab [name=deletetab]'
		},
		//0 si rien à sauver et qu'il n'y a pas eu de message d'alerte, 1 si plus rien à sauver mais qu'il y a eu le message d'alerte, 2 s'il faut sauver
		//pour la sauvegarde de devicesStore
		dirtydevices: 0,
		dirtyrooms: 0,
		
		control: {
			configDevices: {
				activate: 'onActivatePanelItems'
			},
			
			panelConfigViewsOpen: {
				tap: 'onPanelConfigViewsOpen'
			},
			panelConfigRTabsOpen: {
				tap: 'onPanelConfigTabsOpen'
			},
			
			panelConfigItemsOpen: {
				tap: 'onPanelConfigItemsOpen'
			},
			
			panelConfigScenesOpen: {
				tap: 'onPanelConfigScenesOpen'
			},
			
			panelConfigWebViewsOpen: {
				tap: 'onPanelConfigWebViewsOpen'
			},
			
			panelItemsMoveOpen: {
				tap: 'onPanelItemsMoveOpen'
			},
			
			listItemsSave: {
				tap: 'onListItemsSave'
			},
			
			'PanelConfigItems': {
				disclose: 'showDetailItem'
			},
			'PanelConfigFloors': {
				disclose: 'showDetailFloor'
			},
			'PanelConfigTabs': {
				disclose: 'showDetailTab'
			},
			'PanelConfigRooms': {
				disclose: 'showDetailRoom'
			},
			'PanelConfigScenes': {
				disclose: 'showDetailScene'
			},
			'PanelConfigMove': {
				disclose: 'showDataMove'
			},
			
			roomsSave: {
				tap: 'saveRooms'
			},
			
			savefloor: {
				tap: 'onsavefloor'
			},
			
			deletefloor: {
				tap: 'ondeletefloor'
			},
			
			savetab: {
				tap: 'onsavetab'
			},
			
			deletetab: {
				tap: 'ondeletetab'
			},
			
			
			'#RefreshRoomsButton': {
				tap: 'onRefreshRooms'
			}
		}
	},
	
	onActivatePanelItems: function(panel,item) {
		var ConfigDevicesStore = Ext.getStore('ConfigDevicesStore');
		var contdevices = this.getApplication().getController('contdevices');
		
		if (ConfigDevicesStore.getCount() <= 0) {
			ConfigDevicesStore.on({
					load: 'onLoadConfigDevicesStore',
					scope: this
			});
			console.log("Load Vera Modules");
			ConfigDevicesStore.getProxy().setExtraParam( 'ipvera',  contdevices.getIpveraCt().getValue());
			ConfigDevicesStore.getProxy().setExtraParam( 'id',  'sdata');
			var syncheader = "";
			syncheader = {'Authorization': 'Basic ' + contdevices.loggedUserId};
			ConfigDevicesStore.getProxy().setHeaders(syncheader);
			ConfigDevicesStore.load();
		}

	},
	
	onLoadConfigDevicesStore: function() {
		var ConfigDevicesStore = Ext.getStore('ConfigDevicesStore');
		console.log('Store:' + ConfigDevicesStore.getCount());
		if (ConfigDevicesStore.getCount()>0) {
			var devices = Ext.getStore('devicesStore');
			if (devices.getCount()>0) {
				var count = 0;
				var letexte = "";
				devices.data.each(function(device) {
				    var cat = device.get('category');
				    //si la catégorie est 1000, c'est une scène, 1001 c'est une webview : ne pas prendre en compte, il serait possible également de vérifier que l'ID ne commence pas par s ou w
				    if(cat!=1000&&cat!=1001) {
					var id = device.get('id');
					var configdevice = ConfigDevicesStore.getById(id);
					if (configdevice) {
						configdevice.set('state', '-4');
						configdevice.set('category', cat);
						configdevice.set('subcategory', device.get('subcategory'));
						var icon_num = device.get('icon');
						if (icon_num != null) {
							configdevice.set('icon', icon_num);
						}
						
						configdevice.set('ind', device.get('ind'));
						
						var name = configdevice.get('name');
						if (device.get('name') != name) {
							device.set('name', name);
							device.set('state', "-3");
							letexte+=" " + name + " " + locale.getSt().msg.renamed + ".";
							count++;
						}
						var room = configdevice.get('room');
						if (device.get('room')!=room) {
							if(device.get('forced')!=1) {
								device.set('room', room);
								device.set('state', "-3");
								letexte+=" " + name + " " +locale.getSt().msg.inroom + room;
								count++;
							} else {
								configdevice.set('room', device.get('room'));
							}
						}
						if(count > 0) {
							var contconfig = myvera.app.getController('myvera.controller.contconfig');
							contconfig.dirtydevices = 2;
							contconfig.getListItemsSave().setUi('decline');
							contconfig.getListItemsSave().setDisabled(false);
							if(letexte.length > 500) letexte = letexte.substr(0, 500) + "... "
							Ext.Msg.alert(locale.getSt().misc.msg, letexte + ' '+locale.getSt().msg.savedevices);
						}
						
					} else {
						//console.info('error finding ' + device.get('name'));
						Ext.Msg.alert(locale.getSt().misc.msg, device.get('name') + ' ' +locale.getSt().msg.nofind +'.');
						ConfigDevicesStore.add({
								id: device.get('id'),
								name: device.get('name'),
								state: "-4",
								room: device.get('room'),
								category: device.get('category'),
								subcategory: device.get('subcategory'),
								icon: device.get('icon')
						});
					}
				    }
				});
			}
		}
	},
	
	onPanelConfigItemsOpen: function() {
		this.getConfigDevices().push({
				xtype: 'PanelConfigItems',
				title: locale.getSt().title.devices
		});
       },
       
       onPanelConfigViewsOpen: function() {
		this.getConfigFloors().push({
				xtype: 'PanelConfigFloors',
				itemId:'PanelConfigFloors',
				title: locale.getSt().title.views
		});
		//Ext.getCmp('addViewButton').show();
       },
       
       onPanelConfigTabsOpen: function() {
		this.getConfigFloors().push({
				xtype: 'PanelConfigTabs',
				itemId:'PanelConfigTabs',
				title: locale.getSt().title.tabs
		});
		//Ext.getCmp('addViewButton').show();
       },
       
       onPanelConfigScenesOpen: function() {
		var ConfigScenesStore = Ext.getStore('ConfigScenesStore');
		var contdevices = this.getApplication().getController('contdevices');
		
		if (ConfigScenesStore.getCount() <= 0) {
			ConfigScenesStore.on({
				load: 'onLoadConfigScenesStore',
				scope: this
			});
			console.log("Load Vera scenes");
			ConfigScenesStore.getProxy().setExtraParam( 'ipvera',  contdevices.getIpveraCt().getValue());
			ConfigScenesStore.getProxy().setExtraParam( 'id',  'sdata');
			var syncheader = "";
			syncheader = {'Authorization': 'Basic ' + contdevices.loggedUserId};
			ConfigScenesStore.getProxy().setHeaders(syncheader);
			ConfigScenesStore.load();
		} else {
			this.getConfigDevices().push({
				xtype: 'PanelConfigScenes',
				title: locale.getSt().title.scenes
			});
		}
       },
       
       onPanelConfigWebViewsOpen: function() {
	       	this.getConfigDevices().push({
				xtype: 'PanelConfigWebviews',
				title: locale.getSt().title.widgets
		});
       },
       
       onLoadConfigScenesStore: function() {
	       var ConfigScenesStore = Ext.getStore('ConfigScenesStore');
		console.log('Scenes Store:' + ConfigScenesStore.getCount());
		if (ConfigScenesStore.getCount()>0) {
			var devices = Ext.getStore('devicesStore');
			if (devices.getCount()>0) {
				var count = 0;
				var letexte = "";
				devices.data.each(function(device) {
					var cat = device.get('category');
					//si la catégorie est 1000, c'est une scène, il serait possible également de vérifier que l'ID ne commence pas par s
					if(cat==1000) {
					var id = device.get('id').substring(1);
					var configscene = ConfigScenesStore.getById(id);
					if (configscene) {
						configscene.set('state', '-4');
						//configscene.set('category', cat);
						//configscene.set('subcategory', device.get('subcategory'));
						var icon_num = device.get('icon');
						if (icon_num != null) {
							configscene.set('icon', icon_num);
						}
						
						configscene.set('ind', device.get('ind'));
						
						var name = configscene.get('name');
						if (device.get('name') != name) {
							device.set('name', name);
							device.set('state', "-3");
							letexte+=" " + name + " " + locale.getSt().msg.renamed + ".";
							count++;
						}
						var room = configscene.get('room');
						if (device.get('room') != room) {
							device.set('room', room);
							device.set('state', "-3");
							letexte+=" " + name + " " +locale.getSt().msg.inroom + room;
							count++;
						}
						if(count > 0) {
							var contconfig = myvera.app.getController('myvera.controller.contconfig');
							contconfig.dirtydevices = 2;
							contconfig.getListItemsSave().setUi('decline');
							contconfig.getListItemsSave().setDisabled(false);
							Ext.Msg.alert('Message', letexte + ' '+locale.getSt().msg.savedevices);
						}
						
					} else {
						//console.info('error finding ' + device.get('name'));
						Ext.Msg.alert('Message', device.get('name') + ' ' +locale.getSt().msg.nofind +'.');
						ConfigScenesStore.add({
								id: device.get('id'),
								name: device.get('name'),
								state: "-4",
								room: device.get('room'),
								//category: device.get('category'),
								//subcategory: device.get('subcategory'),
								icon: device.get('icon')
						});
					}
					}
				});
			}
			
			this.getConfigDevices().push({
				xtype: 'PanelConfigScenes',
				title: locale.getSt().title.scenes
			});
		
		} else {
			Ext.Msg.alert(locale.getSt().misc.error, locale.getSt().msg.noscene);
		}
		
       },
       
	onPanelItemsMoveOpen: function() {
		this.getConfigDevices().push({
			xtype: 'PanelConfigMove'//,
			//title: 'Liste des scenes'
		});
	},
	
	onListItemsSave: function() {
		
		Ext.Viewport.setMasked({
                     xtype: 'loadmask',
                     message: locale.getSt().msg.saving
		 });
		
		var contdevices = this.getApplication().getController('contdevices');
		var devicesStore = Ext.getStore('devicesStore');
		var syncheader = "";
		syncheader={'Authorization': 'Basic ' + contdevices.loggedUserId};
		Ext.getStore('devicesStore').getProxy().setHeaders(syncheader);
		
		//Remplacement par Ext.Ajax.request car il manque un callback...
		//Ext.getStore('devicesStore').sync();
		var allDataStore = [];
		devicesStore.each(function(record){
			allDataStore.push(record.getData());
		});
				
		Ext.Ajax.request({
			url: './protect/savedevices.php',
			headers: syncheader,
			method: 'POST',
			params: {
				profil: contdevices.profilchoice
			},
			jsonData: {
				devices: allDataStore
			},
			success: function(result){
				if (result.responseText=="true") {
					var control =myvera.app.getController('myvera.controller.contconfig');
					control.getListItemsSave().setUi('normal');
					control.getListItemsSave().setDisabled(true);
					control.dirtydevices = 1;
					
					//Enlève la sphère orange après sauvegarde des modules non synchronisés
					//(le state n'est pas utilisé pour les scènes car il semble ne pas toujours être remonté).
					var devices = Ext.getStore('devicesStore');
					devices.data.each(function(device) {
								if ( device.get('category') == '1000'||device.get('category') == '1001') {
									device.set('state', '0');
								}
					});					
					
					Ext.Viewport.setMasked(false);
				} else {
					Ext.Viewport.setMasked(false);
					Ext.Msg.alert(locale.getSt().msg.saveerror);
				}
			},
			failure: function(result) {
				Ext.Viewport.setMasked(false);
				Ext.Msg.alert(locale.getSt().msg.saveerror + " 2");
			}
		});
		
		contdevices.devicesync(0,0, true);
		//Ext.Msg.alert('Message', "Sauvegarde lancée.");
	},
	
	showDetailItem: function(list, record) {
		console.info('Record ' + record.get('name'));
		this.getConfigDevices().push({
				xtype: 'PanelConfigItem',
				title: 'Edition',
				data: record.getData()
		});
       },
       
	showDetailFloor: function(list, record) {
		console.info('Record ' + record.get('name'));
		if( record.get('id') != -1 ) {
			var pathview= "{path}";
			if(myvera.app.isretina=="@2x"&&record.get('pathretina')!="") pathview="{pathretina}";
			this.getConfigFloors().push({
					xtype: 'PanelConfigFloor',
					title: locale.getSt().title.edit,
					//layout: 'vbox',
					tpl: '<div style="text-align:center"><img style="width:290px" src="./resources/config/img/' + pathview + '"></div>',
					data: record.getData()
			});
		} else {
			Ext.Msg.alert(locale.getSt().misc.msg, locale.getSt().msg.noeditview);
		}
	},
	
	showDetailTab: function(list, record) {
		console.info('Record ' + record.get('name'));
		this.getConfigFloors().push({
			xtype: 'PanelConfigTab',
			title: locale.getSt().title.edit,
			//layout: 'vbox',
			data: record.getData()
		});
	},
	
	showDetailScene: function(list, record) {
		console.info('Record ' + record.get('name'));
		this.getConfigDevices().push({
				xtype: 'PanelConfigScene',
				title: locale.getSt().title.edit,
				data: record.getData()
		});
       },
       
       	showDetailRoom: function(list, record) {
		console.info('Room ' + record.get('name'));
		this.getConfigRooms().push({
				xtype: 'PanelConfigRoom',
				title: locale.getSt().title.edit,
				data: record.getData()
		});
       },
       
       showDataMove: function(list, record) {
	    if( record.get('id') != -1 ) {
	       	Ext.getCmp('main').getTabBar().hide();
		Ext.getCmp('PanelConfig').getTabBar().hide();
		Ext.getCmp('PanelConfigNavigation').setNavigationBar({ docked : 'bottom'});
		var floorid= record.get('id');
		var background="";
		if(myvera.app.isretina=="@2x"&&record.get('pathretina')!="") {
			background='background-size: '+record.get('widthretina')+'px; background-image: url(./resources/config/img/'+record.get('pathretina')+'); background-repeat: no-repeat; background-position: 0px 0px;';
		} else {
			background='background:url(./resources/config/img/'+record.get('path')+') no-repeat left top;';
		}
		this.getConfigDevices().push({
			 xtype: 'datamove',
			 title: locale.getSt().misc.iconmove,
			 idfloor: floorid,
			 style: background,
			 itemTpl: '<tpl if="etage=='+floorid+'||etage1=='+floorid+'||etage2=='+floorid+'">'+
			 	'<div style="top:<tpl if="etage=='+floorid+'">{top}px; left:{left}px;'+
				'<tpl elseif="etage1=='+floorid+'">{top1}px; left:{left1}px;'+
				'<tpl elseif="etage2=='+floorid+'">{top2}px; left:{left2}px;</tpl>'+
				myvera.util.Templates.getTplplan() + myvera.util.Templates.getTplpanwebviewmove() + myvera.util.Templates.getTplpanfin() + '</tpl>'
		});
	    } else {
		Ext.Msg.alert(locale.getSt().misc.msg, locale.getSt().msg.noinview);
	    }

       },
       
       onsavefloor: function() {
		Ext.Viewport.setMasked({
                     xtype: 'loadmask',
                     message: locale.getSt().msg.saving
		 });
		var form = this.getPanelConfigFloor();
		var formdata = form.getValues();
		var contdevices = this.getApplication().getController('contdevices');
		var contconfig = this.getApplication().getController('contconfig');
		var syncheader = "";
		syncheader={'Authorization': 'Basic ' + contdevices.loggedUserId};
		var idfloor = "";
		if(form.config.data){
			idfloor = form.config.data.id;
		}
		var floor= {id: idfloor, name: formdata.name, path: formdata.path, linkimage: formdata.linkimage, pathretina: formdata.pathretina,
			linkimage2: formdata.linkimage2, widthretina: formdata.widthretina, tab: formdata.tab, ind: formdata.ind };
		Ext.Ajax.request({
			url: './protect/savefloors.php',
			headers: syncheader,
			method: 'POST',
			params: {
				profil: contdevices.profilchoice
			},
			jsonData: {
				floor: floor
			},
			success: function(result){
				var response = Ext.decode(result.responseText, true);
				if (response) {
					Ext.Viewport.setMasked(false);
					if (response.success=="true") {
						//contdevices.pushplans();
						//contdevices.pushviews();
						contconfig.resettabs();
						//if(response.result=="OK") {
							Ext.getCmp('PanelConfigFloorsNavigation').pop();
							Ext.Msg.alert(locale.getSt().misc.msg, locale.getSt().msg.updateview);
						//} else Ext.Msg.alert('Message', 'Erreur : ' + response.result);
					} else {
						Ext.Msg.alert(locale.getSt().misc.error +':' + locale.getSt().msg.savefloor[response.result]);
					}
				} else {
					Ext.Msg.alert(locale.getSt().msg.updateerror);
				}
			},
			failure: function(response) {
				Ext.Viewport.setMasked(false);
				Ext.Msg.alert(locale.getSt().msg.updateerror);
			}
		});
	},
       
	ondeletefloor: function() {
	  Ext.Msg.confirm(locale.getSt().misc.suppr, locale.getSt().msg.viewdel, function(confirmed) {
	  if (confirmed == 'yes') {
		Ext.Viewport.setMasked({
                     xtype: 'loadmask',
                     message: locale.getSt().misc.suppr + '...'
		 })
		
		var form = this.getPanelConfigFloor();
		var formdata = form.getValues();
		var contdevices = this.getApplication().getController('contdevices');
		var contconfig = this.getApplication().getController('contconfig');
		var syncheader = "";
		syncheader={'Authorization': 'Basic ' + contdevices.loggedUserId};
		var idfloor = form.config.data.id;
		
		Ext.Ajax.request({
			url: './protect/deletefloor.php',
			headers: syncheader,
			method: 'GET',
			params: {
				id: idfloor,
				profil: contdevices.profilchoice
			},
			success: function(result){
				var response = Ext.decode(result.responseText, true);
				if (response) {
					if (response.success=="true") {
						// réallocation des modules de la vue
						var movemodule=false;
						//var ConfigDevicesStore = Ext.getStore('ConfigDevicesStore');
						var devices = Ext.getStore('devicesStore');
						if (devices.getCount()>0) {
							devices.data.each(function(device) {
								//move1=false;
								if (device.get('etage') == idfloor) {
									device.set('etage', '-1');
									device.set('state', '-3');
									//Pourquoi ??
									//Mis en commentaire
									//var id = device.get('id');
									//var configdevice = ConfigDevicesStore.getById(id);
									//if (configdevice) {
									//	configdevice.set('etage', '-1');
									//}
									movemodule=true;
								} else if (device.get('etage1') == idfloor) {
									device.set('etage1', '-1');
									device.set('state', '-3');
									movemodule=true;
								} else if (device.get('etage2') == idfloor) {
									device.set('etage2', '-1');
									device.set('state', '-3');
									movemodule=true;
								}
								
							});
						}
						
						//contdevices.pushplans();
						//contdevices.pushviews();
						contconfig.resettabs();
						
						Ext.Viewport.setMasked(false);
						
						Ext.getCmp('PanelConfigFloorsNavigation').pop();
						if(movemodule==false) {
							Ext.Msg.alert(locale.getSt().misc.msg, response.result + " " + locale.getSt().msg.deleteok);
						} else {
							var contconfig = myvera.app.getController('myvera.controller.contconfig');
							contconfig.dirtydevices = 2;
							contconfig.getListItemsSave().setUi('decline');
							contconfig.getListItemsSave().setDisabled(false);
							Ext.Msg.alert(locale.getSt().misc.msg, locale.getSt().msg.deviceinnowiew);
						}
					} else {
						Ext.Viewport.setMasked(false);
						Ext.Msg.alert(locale.getSt().msg.deleteerror);
					}
				} else {
					Ext.Viewport.setMasked(false);
					Ext.Msg.alert(locale.getSt().msg.deleteerror + " 2");
				}
			},
			failure: function(result) {
				Ext.Viewport.setMasked(false);
				Ext.Msg.alert(locale.getSt().msg.deleteerror + " 3");
			}
		});
			
			
	  }
	  }, this);
	},
	
	onsavetab: function() {
		Ext.Viewport.setMasked({
                     xtype: 'loadmask',
                     message: locale.getSt().msg.saving
		 });
		var form = this.getPanelConfigTab();
		var formdata = form.getValues();
		var contdevices = this.getApplication().getController('contdevices');
		var contconfig = this.getApplication().getController('contconfig');
		var syncheader = "";
		syncheader={'Authorization': 'Basic ' + contdevices.loggedUserId};
		var idtab = "";
		if(form.config.data){
			idtab = form.config.data.id;
		}
		var tab= {id: idtab, name: formdata.name, cls: formdata.cls, ind: formdata.ind };
		Ext.Ajax.request({
			url: './protect/savetabs.php',
			headers: syncheader,
			method: 'POST',
			params: {
				profil: contdevices.profilchoice
			},
			jsonData: {
				tab: tab
			},
			success: function(result){
				var response = Ext.decode(result.responseText, true);
				if (response) {
					Ext.Viewport.setMasked(false);
					if (response.success=="true") {
						//contdevices.pushplans();
						//contdevices.pushviews();
						contconfig.resettabs();
						
						Ext.getCmp('PanelConfigFloorsNavigation').pop();
						Ext.Msg.alert(locale.getSt().misc.msg, response.result + " " + locale.getSt().msg.updateok);
					} else {
						Ext.Msg.alert(locale.getSt().msg.updateerror);
					}
				} else {
					Ext.Msg.alert(locale.getSt().msg.updateerror+" 2");
				}
			},
			failure: function(response) {
				Ext.Viewport.setMasked(false);
				Ext.Msg.alert(locale.getSt().msg.updateerror+" 3");
			}
		});
	},
	
	ondeletetab: function() {
	Ext.Msg.confirm(locale.getSt().misc.suppr, locale.getSt().msg.tabdel, function(confirmed) {
	  if (confirmed == 'yes') {
		Ext.Viewport.setMasked({
                     xtype: 'loadmask',
                     message: locale.getSt().misc.suppr + '...'
		 })
		
		var form = this.getPanelConfigTab();
		var formdata = form.getValues();
		var contdevices = this.getApplication().getController('contdevices');
		var contconfig = this.getApplication().getController('contconfig');
		var syncheader = "";
		syncheader={'Authorization': 'Basic ' + contdevices.loggedUserId};
		var iditem = form.config.data.id;
		
		Ext.Ajax.request({
			url: './protect/deletetab.php',
			headers: syncheader,
			method: 'GET',
			params: {
				id: iditem,
				profil: contdevices.profilchoice
			},
			success: function(result){
				var response = Ext.decode(result.responseText, true);
				if (response) {
					if (response.success=="true") {
						// réallocation des vue de l'onglet
						var moveview=false;
						var views = Ext.getStore('FloorsStore');
						if (views.getCount()>0) {
							views.data.each(function(view) {
								if (view.get('tab') == iditem) {
									console.log(view.get('name'));
									//view.set('tab', 0);
									moveview=true;
								}
							});
						}
						
						contconfig.resettabs();
						
						Ext.Viewport.setMasked(false);
						
						Ext.getCmp('PanelConfigFloorsNavigation').pop();
						if(moveview==false) {
							Ext.Msg.alert(locale.getSt().misc.msg, response.result +" "+locale.getSt().msg.deleteok);
						} else {
							Ext.Msg.alert(locale.getSt().misc.msg, locale.getSt().msg.vueinnotab);
						}
					} else {
						Ext.Viewport.setMasked(false);
						Ext.Msg.alert(locale.getSt().msg.deleteerror);
					}
				} else {
					Ext.Viewport.setMasked(false);
					Ext.Msg.alert(locale.getSt().msg.deleteerror+" 2");
				}
			},
			failure: function(result) {
				Ext.Viewport.setMasked(false);
				Ext.Msg.alert(locale.getSt().msg.deleteerror+" 3");
			}
		});
	  }
	  }, this);
	},
	
	resettabs: function() {
		var contdevices = this.getApplication().getController('contdevices');
		var TabViewsStore = Ext.getStore('TabViewsStore');
		//syncheader pas nécessaire car déjà initialisé, idem pour le fichier json.
		//var syncheader = "";
		//syncheader = {'Authorization': 'Basic ' + contdevices.loggedUserId};
		//TabViewsStore.getProxy().setHeaders(syncheader);
		
		//Supprime les onglets des vues pour les remettre ensuite.
		var tabs = Ext.getCmp('main');
		var count= 0;
		TabViewsStore.data.each(function(tabview) {
			tabs.removeAt(0);
			count = count + 1;
		});
		
		TabViewsStore.load(function(tabs) {
				console.log("reset tabs");
				if(TabViewsStore.getCount()>0) {
					contdevices.inserttabs();
					//contdevices.pushviews();
				}
		});
	},
	
	onRefreshRooms: function() {
		
		Ext.Viewport.setMasked({
                     xtype: 'loadmask',
                     message: locale.getSt().msg.updating+'...'
		});
		
		var contdevices = this.getApplication().getController('contdevices');
		var syncheader = "";
		syncheader={'Authorization': 'Basic ' + contdevices.loggedUserId};
		var ipvera = contdevices.ipvera;
		Ext.Ajax.request({
			scope: this,
			url: './protect/readrooms.php',
			headers: syncheader,
			method: 'GET',
			params: {
				ipvera: ipvera
			},
			success: function(result){
				var response = Ext.decode(result.responseText, true);
				if (response) {
					if (response.success=="true") {
						var RoomsStore = Ext.getStore('Rooms');
						var listId = new Array();
						for (var idrecord in response.rooms) {
							var result_room = response.rooms[idrecord];
							var resultId=result_room.id;
							if(resultId!=0) {
								var room = RoomsStore.getById(resultId);
								if (room) {
								  room.set('name', result_room.name);
								} else {
								  RoomsStore.add({
									id: resultId,
									name: result_room.name,
									section: result_room.section
								  });
								  room = RoomsStore.getById(resultId);
								  room.setDirty();
								}
							}
							listId.push(resultId);
						}
						RoomsStore.data.each(function(testroom) {
							var id=testroom.get('id');
							if(!Ext.Array.contains(listId, id)) {
								//alert(testroom.get('name'));
								RoomsStore.remove(testroom);
							}
						});
						
						var listroom = Ext.getCmp('datalist').down('#list');
						if(listroom.getStore().getAt(0).get('id')!=0||RoomsStore.getCount()==1) {
							listroom.select(0);
						} else {
							listroom.select(1);
						}
						var contconfig = myvera.app.getController('myvera.controller.contconfig');
						contconfig.dirtyrooms = 2;
						contconfig.getRoomsSave().setUi('decline');
						contconfig.getRoomsSave().setDisabled(false);

						Ext.Viewport.setMasked(false);
						Ext.Msg.confirm(locale.getSt().msg.updating, locale.getSt().msg.saverooms, function(confirmed) {
							if (confirmed == 'yes') {
								this.saveRooms();
							}
						}, this);
				
					} else {
						Ext.Viewport.setMasked(false);
						Ext.Msg.alert(locale.getSt().misc.error + " 120");
					}				
				} else {
					Ext.Viewport.setMasked(false);
					Ext.Msg.alert(locale.getSt().misc.error + " 121");
				}
				

			},
			failure: function(response) {
				Ext.Viewport.setMasked(false);
				Ext.Msg.alert(locale.getSt().misc.error + " 122");
			}
		});
	
	
	},
	
	saveRooms: function() {
		 Ext.Viewport.setMasked({
                     xtype: 'loadmask',
                     message: locale.getSt().msg.saving
		 });
		
		var RoomsStore = Ext.getStore('Rooms');
		var contdevices = this.getApplication().getController('contdevices');
		var syncheader = "";
		syncheader={'Authorization': 'Basic ' + contdevices.loggedUserId};
		
		var allDataStore = [];
		RoomsStore.each(function(record){
			allDataStore.push(record.getData());
		});
		
		Ext.Ajax.request({
			url: './protect/saverooms.php',
			headers: syncheader,
			method: 'POST',
			jsonData: {
				rooms: allDataStore
			},
			success: function(result){
				//Le texte de  Ext.Msg.alert n'est pas correct si on l'ouvre après confirmation
				//de Ext.Msg.confirm de "onRefreshRooms"
				if (result.responseText=="true") {
					var control =myvera.app.getController('myvera.controller.contconfig');
					control.getRoomsSave().setUi('normal');
					control.getRoomsSave().setDisabled(true);
					control.dirtyrooms = 1;
					Ext.Viewport.setMasked(false);
					//new Ext.MessageBox().show({
					//		title: 'Pièces',
					//		message: 'Liste sauvegardée.'
					//});
				} else {
					Ext.Viewport.setMasked(false);
					new Ext.MessageBox().show({
							title: locale.getSt().title.rooms,
							message: locale.getSt().msg.saveerror
					});
				}
			},
			failure: function(result) {
				Ext.Viewport.setMasked(false);
				new Ext.MessageBox().show({
					title: locale.getSt().title.rooms,
					message: locale.getSt().msg.saveerror
				});
			}
		});
	},
	
	alertDirtydevices: function(msg) {
		if(!msg) msg=locale.getSt().msg.savethink;
		switch (this.dirtydevices) {
		case 1: //si plus rien à sauver mais qu'il y a eu le message d'alerte
			this.getListItemsSave().setUi('decline');
			this.getListItemsSave().setDisabled(false);
			this.dirtydevices = 2;
			break;
		case 2: //s'il faut sauver
			//nothing
			break;
		default://0 si rien à sauver et qu'il n'y a pas eu de message d'alerte
			this.dirtydevices = 2;
			this.getListItemsSave().setUi('decline');
			this.getListItemsSave().setDisabled(false);
			new Ext.MessageBox().show({
				title: locale.getSt().title.devices,
				message: msg
			});
			break;
		}
	},
	
	alertDirtyrooms: function(msg) {
		if(!msg) msg=locale.getSt().msg.savethink;
		switch (this.dirtyrooms) {
		case 1: //si plus rien à sauver mais qu'il y a eu le message d'alerte
			this.getRoomsSave().setUi('decline');
			this.getRoomsSave().setDisabled(false);
			this.dirtyrooms = 2;
			break;
		case 2: //s'il faut sauver
			//nothing
			break;
		default://0 si rien à sauver et qu'il n'y a pas eu de message d'alerte
			this.dirtyrooms = 2;
			this.getRoomsSave().setUi('decline');
			this.getRoomsSave().setDisabled(false);
			new Ext.MessageBox().show({
				title: locale.getSt().title.rooms,
				message: msg
			});
			break;
		}
	}
	
});