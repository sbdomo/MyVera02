Ext.define('myvera.view.PanelConfigWebview', {
	extend: 'Ext.form.Panel',
	xtype: 'PanelConfigWebview',
	id:'PanelConfigWebview',
	requires: [
        'Ext.field.Text',
        'Ext.field.Select'
	],
	config: {
		name:'PanelConfigWebview',
		scrollable: 'vertical',
		defaults: {
			labelWidth: '150px'
		},
		items: [
		{
			html:"",
			itemId: 'titlePanelConfigWebview'
		},
		{
			xtype: 'textfield',
			label: 'Nom',
			name: 'name',
			itemId: 'name',
			placeHolder: 'facultatif'
		},
		{
			xtype: 'textfield',
			itemId: 'graphlink',
			label: 'URL',
			name: 'graphlink'
		},
		{
			xtype: 'textfield',
			label: 'Largeur',
			name: 'width',
			itemId: 'width'
		},
		{
			xtype: 'textfield',
			label: 'Hauteur',
			name: 'height',
			itemId: 'height'
		},
		{
			xtype: 'selectfield',
			label: 'Vue 0',
			name: 'etage',
			itemId: 'etage',
			store: 'FloorsStore',
   			displayField:'name',
   			valueField: 'id',
			listeners: 
			{
				change:function(selectbox,value,oldvalue){
					if(value=="-1"){
						this.getParent().down('#PlaceItem').hide();
						this.getParent().down('#LeftItem').hide();
						this.getParent().down('#TopItem').hide();
					} else {
 						this.getParent().down('#PlaceItem').show();
						this.getParent().down('#LeftItem').show();
						this.getParent().down('#TopItem').show();
					}
				}
			}
		},
		{
			xtype: 'textfield',
			label: 'Position gauche',
			itemId: 'LeftItem',
			hidden: true,
			name: 'left'
		},
		{
			xtype: 'textfield',
			label: 'Position haut',
			itemId: 'TopItem',
			hidden: true,
			name: 'top'
		},
		{
			xtype: 'button',
			margin: 15,
			align: 'center',
			itemId: 'PlaceItem',
			iconCls: 'locate',
			iconMask: true,
			hidden: true,
			text: 'Définir l\'emplacement',
			handler: function(){
			this.getParent().openpanelimage('');
			}
		},
		{
			xtype: 'textfield',
			label: 'Index',
			name: 'ind',
			itemId: 'ind',
			value: 90
		},
		{
			xtype: 'selectfield',
			label: 'Vue 1',
			name: 'etage1',
			itemId: 'etage1',
			store: 'FloorsStore',
   			displayField:'name',
   			valueField: 'id',
			listeners: 
			{
				change:function(selectbox,value,oldvalue){
					if(value=="-1"){
						this.getParent().down('#PlaceItem1').hide();
						this.getParent().down('#LeftItem1').hide();
						this.getParent().down('#TopItem1').hide();
					} else {
 						this.getParent().down('#PlaceItem1').show();
						this.getParent().down('#LeftItem1').show();
						this.getParent().down('#TopItem1').show();
					}
				}
			}
		},
		{
			xtype: 'textfield',
			label: 'Position gauche',
			itemId: 'LeftItem1',
			hidden: true,
			name: 'left1'
		},
		{
			xtype: 'textfield',
			label: 'Position haut',
			itemId: 'TopItem1',
			hidden: true,
			name: 'top1'
		},
		{
			xtype: 'button',
			margin: 15,
			align: 'center',
			itemId: 'PlaceItem1',
			iconCls: 'locate',
			iconMask: true,
			hidden: true,
			text: 'Définir l\'emplacement',
			handler: function(){
			this.getParent().openpanelimage('1');
			}
		},
		{
			xtype: 'selectfield',
			label: 'Vue 2',
			name: 'etage2',
			itemId: 'etage2',
			store: 'FloorsStore',
   			displayField:'name',
   			valueField: 'id',
			listeners: 
			{
				change:function(selectbox,value,oldvalue){
					if(value=="-1"){
						this.getParent().down('#PlaceItem2').hide();
						this.getParent().down('#LeftItem2').hide();
						this.getParent().down('#TopItem2').hide();
					} else {
 						this.getParent().down('#PlaceItem2').show();
						this.getParent().down('#LeftItem2').show();
						this.getParent().down('#TopItem2').show();
					}
				}
			}
		},
		{
			xtype: 'textfield',
			label: 'Position gauche',
			itemId: 'LeftItem2',
			hidden: true,
			name: 'left2'
		},
		{
			xtype: 'textfield',
			label: 'Position haut',
			itemId: 'TopItem2',
			hidden: true,
			name: 'top2'
		},
		{
			xtype: 'button',
			margin: 15,
			align: 'center',
			itemId: 'PlaceItem2',
			iconCls: 'locate',
			hidden: true,
			iconMask: true,
			text: 'Définir l\'emplacement',
			handler: function(){
			this.getParent().openpanelimage('2');
			}
		},
		{
			xtype: 'button',
			margin: 5,
			itemId: 'SaveItem',
			ui: 'confirm',
			text: 'Ajouter le widget',
			iconCls: 'add',
			iconMask: true,
			handler: function(){
				var form = this.getParent();
				var formdata = form.getValues();
				var data = form.config.data;
				var devices = Ext.getStore('devicesStore');
				
				//var listdevices = Ext.getStore('ConfigDevicesStore');
				//var listdevice = listdevices.getById(data.id);
				
				//Le module est déjà dans la liste
				if (data.id!="") {
					device = devices.getById(data.id);
					device.set("name", formdata.name);
					//device.set("category", 1001);
					//device.set("subcategory", formdata.subcategory);
					device.set("etage", formdata.etage);
					device.set("left", formdata.left);
					device.set("top", formdata.top);
					device.set("etage1", formdata.etage1);
					device.set("left1", formdata.left1);
					device.set("top1", formdata.top1);
					device.set("etage2", formdata.etage2);
					device.set("left2", formdata.left2);
					device.set("top2", formdata.top2);
					device.set("width", formdata.width);
					device.set("height", formdata.height);
					device.set("graphlink", formdata.graphlink);
					device.set("state", "-3");
					device.set("ind", formdata.ind);
				} else {
					//Recherche une nouvelle id
					var newid="w";
					var count=0;
					while(newid=="w") {
						if(!devices.getById(newid+count)) newid=newid+count;
						count=count+1;
					}
					if(formdata.name=="") formdata.name=newid;
					//Il faut ajouter le module
					devices.add({
					id: newid,
					name: formdata.name,
					state: "-3",
					room: 0,
					room: data.room,
					category: "1001",
					etage: formdata.etage,
					left: formdata.left,
					top: formdata.top,
					etage1: formdata.etage1,
					left1: formdata.left1,
					top1: formdata.top1,
					etage2: formdata.etage2,
					left2: formdata.left2,
					top2: formdata.top2,
					width: formdata.width,
					height: formdata.height,
					graphlink: formdata.graphlink,
					ind: formdata.ind
					});
					device = devices.getById(newid);
					device.setDirty();
					//listdevice.set("state", "-4");
				}
				//Paramètres utilisés dans l'affichage de la liste de ConfigDevices, il faut donc les mettre à jour.
				//listdevice.set("category", formdata.category);
				//listdevice.set("subcategory", formdata.subcategory);
				//listdevice.set("icon", formdata.icon);
				//listdevice.set("ind", formdata.ind);
				
				Ext.getCmp('PanelConfigNavigation').pop();
				myvera.app.getController('myvera.controller.contconfig').alertDirtydevices();
			}
		},
		{
			xtype: 'button',
			margin: 5,
			itemId: 'DeleteItem',
			iconCls: 'trash',
			iconMask: true,
			ui: 'decline',
			hidden: true,
			text: 'Supprimer le widget',
			
			handler: function(){
				var form = this.getParent();
				var devices = Ext.getStore('devicesStore');
				device = devices.getById(form.config.data.id);
				//var width =device.get('width');
				//var height =device.get('height');
				devices.remove(device);
				
				Ext.getCmp('PanelConfigNavigation').pop();
				myvera.app.getController('myvera.controller.contconfig').alertDirtydevices();
			}
		}
		],
		listeners:{
		    updatedata:function(e,d){
			    //var id = d.id.substring(1);
			    var id =d.id;
			    var label = this.down('#titlePanelConfigWebview');
			    var html ="";
			    if (id!="") {
			    e.down('#DeleteItem').show();
			    e.down('#SaveItem').setIconCls('refresh');
			    e.down('#SaveItem').setText('Mettre à jour');
			    html = d.name + ' - ID: ' + id;
			    } else html = "Nouveau widget";
			    
			    label.setHtml(html);
			    e.setValues(e.config.data);
			    
			    //e.down('#name').setValue(d.name);
			    //e.down('#graphlink').setValue(d.graphlink);
			    //e.down('#width').setValue(d.width);
			    //e.down('#height').setValue(d.height);
			    //e.down('#etage').setValue(d.etage);
			    //e.down('#LeftItem').setValue(d.left);
			    //e.down('#TopItem').setValue(d.top);
			    //e.down('#ind').setValue(d.ind);
			    //e.down('#etage1').setValue(d.etage1);
			    //e.down('#LeftItem1').setValue(d.left1);
			    //e.down('#TopItem1').setValue(d.top1);
			    //e.down('#etage2').setValue(d.etage2);
			    //e.down('#LeftItem2').setValue(d.left2);
			    //e.down('#TopItem2').setValue(d.top2);
			    
				    
			    if(d.etage!="-1") {
				    this.down('#PlaceItem').show();
				    this.down('#LeftItem').show();
				    this.down('#TopItem').show();
			    }
			    if(d.etage1!="-1") {
				    this.down('#PlaceItem1').show();
				    this.down('#LeftItem1').show();
				    this.down('#TopItem1').show();
			    }
			    if(d.etage2!="-1") {
				    this.down('#PlaceItem2').show();
				    this.down('#LeftItem2').show();
				    this.down('#TopItem2').show();
			    }
		    }
	}
	},
	
    openpanelimage: function(numetage) {
				Ext.getCmp('main').getTabBar().hide();
				Ext.getCmp('PanelConfig').getTabBar().hide();
				Ext.getCmp('PanelConfigNavigation').setNavigationBar({ docked : 'bottom'});
				Ext.getCmp('PanelConfigNavigation').push({
					xtype: 'PanelImage',
					//title: 'Positionner le module sur la vue',
					title: 'Positionner',
					data: {id: this.getParent().down('#etage'+numetage).getValue(), typepanel: 'webview', etage: numetage}
					});
	}
});