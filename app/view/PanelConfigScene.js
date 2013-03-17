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
			labelWidth: '155px'
		},
		items: [
		{
			html:"",
			itemId: 'titlePanelConfigScene',
			tpl: [ '<img style="float: left;" height="40px" src="resources/images/l<tpl if="icon!=null">{icon}'+
			'<tpl else>1000'+
			'</tpl>_0{retina}.png" /><p style="line-height: 30px">&nbsp;&nbsp;{name} - ID:{id}</p><p>&nbsp;</p>' ]
		},
		{
			xtype: 'selectfield',
			label: locale.getSt().field.view +' 0',
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
			label: locale.getSt().field.positionleft,
			itemId: 'LeftItem',
			name: 'left'
		},
		{
			xtype: 'textfield',
			label: locale.getSt().field.positiontop,
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
			text: locale.getSt().misc.defineplace,
			handler: function(){
			this.getParent().openpanelimage('');
			}
		},
		{
			xtype: 'selectfield',
			label: locale.getSt().misc.display,
			name: 'subcategory',
			itemId: 'subcategory',
			options: [
			{text: locale.getSt().field.icontitle, value:0},
			{text: locale.getSt().field.icononly,  value: 1}
			]
		},
		{
			xtype: 'selectfield',
			label: locale.getSt().field.textcolor,
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
			label: locale.getSt().field.iconnum,
			name: 'icon',
			itemId: 'icon'
		},
		{
			xtype: 'textfield',
			label: locale.getSt().field.iconwidth,
			name: 'width',
			itemId: 'width'
		},
		{
			xtype: 'textfield',
			label: locale.getSt().field.index,
			name: 'ind',
			itemId: 'ind',
			value: 90
		},
		{
			xtype: 'selectfield',
			label: locale.getSt().field.view+ ' 1',
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
			label: locale.getSt().field.positionleft,
			itemId: 'LeftItem1',
			name: 'left1'
		},
		{
			xtype: 'textfield',
			label: locale.getSt().field.positiontop,
			itemId: 'TopItem1',
			name: 'top1'
		},
		{
			xtype: 'button',
			margin: 15,
			align: 'center',
			itemId: 'PlaceItem1',
			iconCls: 'locate',
			iconMask: true,
			text: locale.getSt().misc.defineplace,
			handler: function(){
			this.getParent().openpanelimage('1');
			}
		},
		{
			xtype: 'selectfield',
			label: locale.getSt().field.view +' 2',
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
			label: locale.getSt().field.positionleft,
			itemId: 'LeftItem2',
			name: 'left2'
		},
		{
			xtype: 'textfield',
			label: locale.getSt().field.positiontop,
			itemId: 'TopItem2',
			name: 'top2'
		},
		{
			xtype: 'button',
			margin: 15,
			align: 'center',
			itemId: 'PlaceItem2',
			iconCls: 'locate',
			iconMask: true,
			text: locale.getSt().misc.defineplace,
			handler: function(){
			this.getParent().openpanelimage('2');
			}
		},
		{
			xtype: 'button',
			margin: 5,
			itemId: 'SaveItem',
			ui: 'confirm',
			text: locale.getSt().button.addscene,
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
					var device = devices.getById("s" + data.id);
					//device.set("category", formdata.category);
					device.set("subcategory", formdata.subcategory);
					device.set("etage", formdata.etage);
					device.set("left", formdata.left);
					device.set("top", formdata.top);
					device.set("etage1", formdata.etage1);
					device.set("left1", formdata.left1);
					device.set("top1", formdata.top1);
					device.set("etage2", formdata.etage2);
					device.set("left2", formdata.left2);
					device.set("top2", formdata.top2);
					device.set("color", formdata.color);
					device.set("icon", formdata.icon);
					device.set("width", formdata.width);
					device.set("state", "-3");
					device.set("ind", formdata.ind);
				} else {
					devices.add({
					id: "s" + data.id,
					name: data.name,
					state: "-3",
					room: data.room,
					category: "1000",
					subcategory: data.subcategory,
					etage: formdata.etage,
					left: formdata.left,
					top: formdata.top,
					etage1: formdata.etage1,
					left1: formdata.left1,
					top1: formdata.top1,
					etage2: formdata.etage2,
					left2: formdata.left2,
					top2: formdata.top2,
					color: formdata.color,
					icon: formdata.icon,
					width: formdata.width,
					ind: formdata.ind
					});
					var device = devices.getById("s" + data.id);
					device.setDirty();
					listdevice.set("state", "-4");
				}
				//Paramètres utilsés dans l'affichage de la liste de ConfigDevices, il faut donc les mettre à jour.
				//listdevice.set("category", formdata.category);
				listdevice.set("icon", formdata.icon);
				listdevice.set("ind", formdata.ind);
				
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
			text: locale.getSt().button.supp,
			
			handler: function(){
				var form = this.getParent();
				var devices = Ext.getStore('devicesStore');
				var device = devices.getById("s" + form.config.data.id);
				//var width =device.get('width');
				//var height =device.get('height');
				devices.remove(device);
				
				var listdevices = Ext.getStore('ConfigScenesStore');
				var listdevice = listdevices.getById(form.config.data.id);
				//Paramètres du modules transférés à configDevices pour pouvoir le réaffecter sans devoir tout paramétrer à nouveau
				var formdata = form.getValues();
				listdevice.set("subcategory", formdata.subcategory);
				listdevice.set("etage", formdata.etage);
				listdevice.set("left", formdata.left);
				listdevice.set("top", formdata.top);
				listdevice.set("etage1", formdata.etage1);
				listdevice.set("left1", formdata.left1);
				listdevice.set("top1", formdata.top1);
				listdevice.set("etage2", formdata.etage2);
				listdevice.set("left2", formdata.left2);
				listdevice.set("top2", formdata.top2);
				listdevice.set("color", formdata.color);
				listdevice.set("icon", formdata.icon);
				listdevice.set("state", "0");
				listdevice.set("ind", formdata.ind);
				listdevice.set("width", formdata.width);
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
				    this.down('#SaveItem').setText(locale.getSt().button.update);
				    this.down('#SaveItem').setIconCls('refresh');
				    var devices = Ext.getStore('devicesStore');
				    var id = e.config.data.id;
				    var device = devices.getById("s" + e.config.data.id);
				    e.setValues(device.getData());
				    
				    //affecte l'ID sans le s
				    e.setValues({id: id});
				    
				    //if(device.get('color')==null) e.setValues({color:'FFFFFF'});
				     
				    //Problème dans le selectfield : si etage est un entier et pas un string ??
				    //Ce serait un bug (fix dans V. 2.02)
				    //e.setValues({etage: "" + device.get("etage")});
				    
				    //if(device.get('subcategory')==null) {
				    //	e.setValues({subcategory:'0'});
				    //}
				    //else {
				    //	e.setValues({subcategory: "" + device.get("subcategory")});
				    //}
				    if(device.get('etage')=="-1") {
						    this.down('#PlaceItem').hide();
						    this.down('#LeftItem').hide();
						    this.down('#TopItem').hide();
				    }
				    if(device.get('etage1')=="-1") {
						    this.down('#PlaceItem1').hide();
						    this.down('#LeftItem1').hide();
						    this.down('#TopItem1').hide();
				    }
				    if(device.get('etage2')=="-1") {
						    this.down('#PlaceItem2').hide();
						    this.down('#LeftItem2').hide();
						    this.down('#TopItem2').hide();
				    }
				    this.down('#DeleteItem').show();
			    } else {
				    //if(e.config.data.etage==null) e.config.data.etage="-1";
				    if(e.config.data.etage=="-1") {
					    this.down('#PlaceItem').hide();
					    this.down('#LeftItem').hide();
					    this.down('#TopItem').hide();
				    }
				    if(e.config.data.etage1=="-1") {
					    this.down('#PlaceItem1').hide();
					    this.down('#LeftItem1').hide();
					    this.down('#TopItem1').hide();
				    }
				    if(e.config.data.etage2=="-1") {
					    this.down('#PlaceItem2').hide();
					    this.down('#LeftItem2').hide();
					    this.down('#TopItem2').hide();
				    }
				    //if(e.config.data.color==null) e.config.data.color="FFFFFF";
				    //if(e.config.data.subcategory==null) e.config.data.subcategory=0;
				    e.setValues(e.config.data);
				    //Bug avec entier ??
				    //e.setValues({subcategory: "" + e.config.data.subcategory});
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
	},
	
    openpanelimage: function(numetage) {
				Ext.getCmp('main').getTabBar().hide();
				Ext.getCmp('PanelConfig').getTabBar().hide();
				Ext.getCmp('PanelConfigNavigation').setNavigationBar({ docked : 'bottom'});
				Ext.getCmp('PanelConfigNavigation').push({
					xtype: 'PanelImage',
					//title: 'Positionner le module sur la vue',
					title: locale.getSt().misc.position,
					data: {id: this.getParent().down('#etage'+numetage).getValue(), typepanel: 'scene', etage: numetage}
					});
	}
});