Ext.define('myvera.view.PanelConfigScene', {
	extend: 'Ext.form.Panel',
	xtype: 'PanelConfigScene',
	id:'PanelConfigScene',
	requires: [
        'Ext.field.Text',
        'Ext.field.Select'
	],
	config: {
		name:'PanelConfigScene',
		scrollable: 'vertical',
		defaults: {
			labelWidth: '150px'
		},
		items: [
		{
			html:"",
			itemId: 'titlePanelConfigScene',
			tpl: [ '<img style="float: left;" height="40px" src="resources/images/l<tpl if="icon!=null">{icon}'+
			'<tpl else>1000'+
			'</tpl>_0.png" /><p style="line-height: 30px">&nbsp;&nbsp;{name} - ID:{id}</p><p>&nbsp;</p>' ]
		},
		{
			xtype: 'selectfield',
			label: 'Vue',
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
			xtype: 'selectfield',
			label: 'Affichage',
			name: 'subcategory',
			itemId: 'subcategory',
			options: [
			{text: 'icône et titre', value:0},
			{text: 'icône seulement',  value: 1}
			]
		},
		{
			xtype: 'textfield',
			label: 'Position gauche',
			itemId: 'LeftItem',
			name: 'left'
		},
		{
			xtype: 'textfield',
			label: 'Position haut',
			itemId: 'TopItem',
			name: 'top'
		},
		{
			xtype: 'button',
			margin: 15,
			align: 'center',
			itemId: 'PlaceItem',
			iconCls: 'locate',
			iconMask: true,
			text: 'Définir l\'emplacement',
			handler: function(){
				Ext.getCmp('main').getTabBar().hide();
				Ext.getCmp('PanelConfig').getTabBar().hide();
				Ext.getCmp('PanelConfigNavigation').setNavigationBar({ docked : 'bottom'});
				Ext.getCmp('PanelConfigNavigation').push({
					xtype: 'PanelImage',
					//title: 'Positionner la scène sur la vue',
					title: 'Positionner',
					data: {id: this.getParent().down('#etage').getValue(), typepanel: 'scene'}
				});
			}
		},
		{
			xtype: 'selectfield',
			label: 'Couleur du texte',
			    defaultType: 'panel',
			name:'color',
			itemId:'color',
			options: [
			{text: 'Black', value:'000000'},
			{text: 'White',  value: 'FFFFFF'},
			{text: 'Yellow',  value: 'FFFF00'},
			{text: 'Fuchsia',  value: 'FF00FF'},
			{text: 'Red',  value: 'FF0000'},
			{text: 'Silver',  value: 'C0C0C0'},
			{text: 'Gray',  value: '808080'},
			{text: 'Olive',  value: '808000'},
			{text: 'Purple',  value: '800080'},
			{text: 'Maroon',  value: '800000'},
			{text: 'Aqua',  value: '00FFFF'},
			{text: 'Lime',  value: '00FF00'},
			{text: 'Teal',  value: '008080'},
			{text: 'Green',  value: '008000'},
			{text: 'Blue',  value: '0000FF'},
			{text: 'Navy',  value: '000080'}
			]
		},
		{
			xtype: 'textfield',
			label: 'Num. icône',
			name: 'icon',
			itemId: 'icon'
		},
		{
			xtype: 'button',
			margin: 5,
			itemId: 'SaveItem',
			ui: 'confirm',
			text: 'Ajouter la scène',
			iconCls: 'add',
			iconMask: true,
			handler: function(){
				var form = this.getParent();
				var formdata = form.getValues();
				var data = form.config.data;
				var devices = Ext.getStore('devicesStore');
				
				var listdevices = Ext.getStore('ConfigScenesStore');
				var listdevice = listdevices.getById(data.id);
				
				if (form.config.data.state=="-4") {
					device = devices.getById("s" + data.id);
					//device.set("category", formdata.category);
					device.set("left", formdata.left);
					device.set("top", formdata.top);
					device.set("etage", formdata.etage);
					device.set("subcategory", formdata.subcategory);
					device.set("color", formdata.color);
					device.set("icon", formdata.icon);
					device.set("state", "-3");
				} else {
					devices.add({
					id: "s" + data.id,
					name: data.name,
					state: "-3",
					room: data.room,
					category: "1000",
					subcategory: data.subcategory,
					left: formdata.left,
					top: formdata.top,
					etage: formdata.etage,
					color: formdata.color,
					icon: formdata.icon
					});
					device = devices.getById("s" + data.id);
					device.setDirty();
					listdevice.set("state", "-4");
				}
				//Paramètres utilsés dans l'affichage de la liste de ConfigDevices, il faut donc les mettre à jour.
				//listdevice.set("category", formdata.category);
				listdevice.set("icon", formdata.icon);
				
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
			text: 'Enlever la scène',
			
			handler: function(){
				var form = this.getParent();
				var devices = Ext.getStore('devicesStore');
				device = devices.getById("s" + form.config.data.id);
				devices.remove(device);
				
				var listdevices = Ext.getStore('ConfigScenesStore');
				var listdevice = listdevices.getById(form.config.data.id);
				//Paramètres du modules transférés à configDevices pour pouvoir le réaffecter sans devoir tout paramétrer à nouveau
				var formdata = form.getValues();
				listdevice.set("left", formdata.left);
				listdevice.set("top", formdata.top);
				listdevice.set("etage", formdata.etage);
				listdevice.set("subcategory", formdata.subcategory);
				listdevice.set("color", formdata.color);
				listdevice.set("icon", formdata.icon);
				listdevice.set("state", "0");
				Ext.getCmp('PanelConfigNavigation').pop();
				myvera.app.getController('myvera.controller.contconfig').alertDirtydevices();
			}
		}
		],
		listeners:{
		    updatedata:function(e,d){
			    var label = this.down('#titlePanelConfigScene');
			    var html = label.getTpl().apply(e.config.data);
			    label.setHtml(html);
			    
			    var colorpicker = this.down('#color');
			    colorpicker.setDefaultTabletPickerConfig({
				 items: [
				 {
					 xtype: 'list',
					 store: colorpicker.getStore(),
					 itemTpl: '<div style="background-color: #{value}; float: left; width: 150px; border: 1px solid #000;">&nbsp;</div>&nbsp;&nbsp;&nbsp;{text}',
					 
					 listeners: {
						 select: function(item, record) {
							 if (record) {
								 colorpicker.setValue(record);
							 }
						    },
						    itemtap: function(item, index, elem) {
							    //hide the select window
							    this.up('panel').hide({
									    type : 'fade',
									    out  : true,
									    scope: this
							    });
						    }
					    }
				    }
				    ]
			    });
			    
			    
			    if (e.config.data.state=="-4") {
				    this.down('#SaveItem').setText('Mettre à jour');
				    this.down('#SaveItem').setIconCls('refresh');
				    var devices = Ext.getStore('devicesStore');
				    var id = e.config.data.id;
				    device = devices.getById("s" + e.config.data.id);
				    e.setValues(device.getData());
				    
				    //affecte l'ID sans le s
				    e.setValues({id: id});
				    
				    if(device.get('color')==null) e.setValues({color:'FFFFFF'});
				     
				    //Problème dans le selectfield : si etage est un entier et pas un string ??
				    //Ce serait un bug (fix dans V. 2.02)
				    e.setValues({etage: "" + device.get("etage")});
				    
				    if(device.get('subcategory')==null) {
				    	e.setValues({subcategory:'0'});
				    } else {
				    	e.setValues({subcategory: "" + device.get("subcategory")});
				    }
				    
				    if(device.get('etage')=="-1") {
					    this.down('#PlaceItem').hide();
					    this.down('#LeftItem').hide();
					    this.down('#TopItem').hide();
				    }
				    this.down('#DeleteItem').show();
			    } else {
				    if(e.config.data.etage==null) e.config.data.etage="-1";
				    if(e.config.data.etage=="-1") {
					    this.down('#PlaceItem').hide();
					    this.down('#LeftItem').hide();
					    this.down('#TopItem').hide();
				    }
				    
				    if(e.config.data.color==null) e.config.data.color="FFFFFF";
				    if(e.config.data.subcategory==null) e.config.data.subcategory=0;
				    e.setValues(e.config.data);
				    //Bug avec entier ??
				    e.setValues({subcategory: "" + e.config.data.subcategory});
			    }
			    
			    //Pour changer l'icone du titre quand icon est modifié
			    this.down('#icon').addListener('change', function(me,newvalue,oldvalue, opt){
					if(newvalue!="") this.getParent().config.data.icon = newvalue;
					else this.getParent().config.data.icon = null;
					var label = this.getParent().down('#titlePanelConfigScene');
					var html = label.getTpl().apply(this.getParent().config.data);
					label.setHtml(html);
			    });
		    }
	}
	}
});