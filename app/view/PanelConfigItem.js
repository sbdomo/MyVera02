Ext.define('myvera.view.PanelConfigItem', {
	extend: 'Ext.form.Panel',
	xtype: 'PanelConfigItem',
	id:'PanelConfigItem',
	requires: [
        'Ext.field.Text',
        'Ext.field.Select'
	],
	config: {
		name:'PanelConfigItem',
		scrollable: 'vertical',
		//tpl: ['<img src="resources/images/l<tpl if="icon!=null&#icon!=\'\'">{icon}<tpl else>{category}</tpl>_0.png" /> ID:{id}<br/>Nom: {name}'],
		defaults: {
			labelWidth: '150px'
		},
		items: [
		{
			html:"",
			itemId: 'titlePanelConfigItem',
			tpl: [ '<img style="float: left;" height="40px" src="resources/images/l<tpl if="icon!=null">{icon}'+
			'<tpl elseif="category==4&&(subcategory==4||subcategory==1)">4{subcategory}'+
			'<tpl elseif="category==120&&subcategory==1">121<tpl elseif="category==120&&subcategory==2">122'+
			'<tpl else>{category}</tpl>_0{retina}.png" /><p style="line-height: 30px">&nbsp;&nbsp;{name} - ID:{id}</p><p>&nbsp;</p>' ]
		},
		{
			xtype: 'selectfield',
			label: locale.getSt().field.category,
			name: 'category',
			options: [
			{text: 'Unknown plugin', value:'0'},
			{text: 'Custom device',  value: '108'},
			{text: 'Virtual ON/OFF Switches (plugin)',  value: '101'},
			{text: 'Variable Container (plugin)',  value: '102'},
			{text: 'Google Calendar Switch (plugin)',  value: '103'},
			{text: 'Virtual Clock (plugin)',  value: '120'},
			{text: 'Pilot wire controller (plugin)',  value: '104'},
			{text: 'Smart Virtual Thermostat (plugin)',  value: '105'},
			{text: 'Day Or Night (plugin)',  value: '106'},
			{text: 'Colored Variable Container (plugin)',  value: '107'},
			{text: 'Interface',  value: '1'},
			{text: 'Dimmable light',  value: '2'},
			{text: 'Switch',  value: '3'},
			{text: 'Security Sensor',  value: '4'},
			{text: 'HVAC',  value: '5'},
			{text: 'Camera',  value: '6'},
			{text: 'Door Lock',  value: '7'},
			{text: 'Window Covering',  value: '8'},
			{text: 'Remote Control',  value: '9'},
			{text: 'IR Transmitter',  value: '10'},
			{text: 'Generic I/O',  value: '11'},
			{text: 'Generic Sensor',  value: '12'},
			{text: 'Serial Port',  value: '13'},
			{text: 'Scene Controller',  value: '14'},
			{text: 'A/V',  value: '15'},
			{text: 'Humidity Sensor',  value: '16'},
			{text: 'Temperature Sensor',  value: '17'},
			{text: 'Light Sensor',  value: '18'},
			{text: 'Zwave Int',  value: '19'},
			{text: 'Insteon Int',  value: '20'},
			{text: 'Power Meter',  value: '21'},
			{text: 'Alarm Panel',  value: '22'},
			{text: 'Alarm Partition',  value: '23'}
			],
			listeners: 
			{
				change:function(selectbox,value,oldvalue){
					var subcat = this.getParent().down('#subcategory');
					if(value=="120"){
						var options = [
						{text: 'Alarm Clock',  value: '0'},
						{text: 'Electrical timer',  value: '1'},
						{text: 'Timer',  value: '2'}
						];
						subcat.setOptions(options);
						subcat.show();
					} else if(value=="4"){
						var options = [
						{text: 'Door Sensor',  value: '1'},
						{text: 'Leak Sensor',  value: '2'},
						{text: 'Motion Sensor',  value: '3'},
						{text: 'Smoke Sensor',  value: '4'}
						];
						subcat.setOptions(options);
						subcat.show();
					} else {
						var options = [
						{text: '0', value:'0'},
						{text: '1', value:'1'},
						{text: '2', value:'2'},
						{text: '3', value:'3'},
						{text: '4', value:'4'},
						{text: '5', value:'5'},
						{text: '6', value:'6'}
						];
						subcat.setOptions(options);
						subcat.hide();
					}
					
					this.getParent().down('#CamuserItem').hide();
					this.getParent().down('#CampasswordItem').hide();
					this.getParent().down('#GraphlinkItem').hide();
					this.getParent().down('#wwidth').hide();
					this.getParent().down('#height').hide();
					if(value=="6") {
						this.getParent().down('#CamuserItem').show();
						this.getParent().down('#CampasswordItem').show();
					} else  if(value=="16" || value=="17" || value=="21") {
						this.getParent().down('#GraphlinkItem').setLabel(locale.getSt().field.urlgraph);
						this.getParent().down('#GraphlinkItem').show();
					} else  if(value=="108") {
						this.getParent().down('#GraphlinkItem').setLabel(locale.getSt().field.urlwidget);
						this.getParent().down('#GraphlinkItem').show();
						this.getParent().down('#wwidth').show();
						this.getParent().down('#height').show();
						this.getParent().down('#var1').show();
						this.getParent().down('#var2').show();
						this.getParent().down('#var3').show();
						this.getParent().down('#var4').show();
					}
					
					
					this.getParent().config.data.category = value;
					var label = this.getParent().down('#titlePanelConfigItem');
					var html = label.getTpl().apply(this.getParent().config.data);
					label.setHtml(html);
				}
			}
		},
		{
			xtype: 'selectfield',
			label: locale.getSt().field.subcategory,
			name: 'subcategory',
			itemId: 'subcategory'//,
			//options: [
			//{text: '0', value:'0'},
			//{text: '1', value:'1'},
			//{text: '2', value:'2'},
			//{text: '3', value:'3'},
			//{text: '4', value:'4'},
			//{text: '5', value:'5'},
			//{text: '6', value:'6'},
			//]
		},
		{
			xtype: 'textfield',
			itemId: 'CamuserItem',
			label: locale.getSt().field.camerauser,
			autoCapitalize: false,
			hidden: true,
			name: 'camuser'
		},
		{
			xtype: 'passwordfield',
			itemId: 'CampasswordItem',
			label: locale.getSt().field.camerapassword,
			hidden: true,
			name: 'campassword'
		},
		{
			xtype: 'textfield',
			itemId: 'var1',
			label: locale.getSt().field.varstatus,
			autoCapitalize: false,
			hidden: true,
			name: 'var1'
		},
		{
			xtype: 'textfield',
			itemId: 'var2',
			label: locale.getSt().field.vartext,
			autoCapitalize: false,
			hidden: true,
			name: 'var2'
		},
		{
			xtype: 'textfield',
			itemId: 'var3',
			label: locale.getSt().field.suffix,
			autoCapitalize: false,
			hidden: true,
			name: 'var3'
		},
		{
			xtype: 'textfield',
			itemId: 'var4',
			label: locale.getSt().field.command,
			autoCapitalize: false,
			hidden: true,
			name: 'var4',
			placeHolder: 'service|action|targetvalue'
		},
		{
			xtype: 'textfield',
			itemId: 'GraphlinkItem',
			label: locale.getSt().field.urlwidget,
			autoCapitalize: false,
			hidden: true,
			name: 'graphlink'
		},
		{
			xtype: 'textfield',
			label: locale.getSt().field.width,
			name: 'wwidth',
			hidden: true,
			itemId: 'wwidth'
		},
		{
			xtype: 'textfield',
			label: locale.getSt().field.height,
			name: 'height',
			hidden: true,
			itemId: 'height'
		},
		{
			xtype: 'togglefield',
			name: 'forced',
			itemId: 'forced',
			label: locale.getSt().misc.chooseroom,
			listeners: {
				change: function(field, newValue) {
					if(field.getValue()==1) this.getParent().down('#room').show();
					else this.getParent().down('#room').hide();
				}
			}
		},
		{
			xtype: 'selectfield',
			label: locale.getSt().title.rooms,
			name: 'room',
			itemId: 'room',
			store: 'Rooms',
			displayField:'name',
			hidden: true,
			valueField: 'id'
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
			label: locale.getSt().misc.inison,
			name: 'verif',
			options: [
			{text: locale.getSt().misc.ifon,  value: 'yes'},
			{text: locale.getSt().misc.ifoff,  value: 'off'},
			{text: locale.getSt().misc.never, value: 'no'}
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
			label: locale.getSt().field.textsize,
			name: 'fontsize',
			itemId: 'fontsize',
			placeHolder: '10px'
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
			xtype: 'textfield',
			label: locale.getSt().field.sceneon,
			name: 'sceneon'
		},
		{
			xtype: 'textfield',
			label: locale.getSt().field.sceneoff,
			name: 'sceneoff'
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
			text: locale.getSt().button.adddevice,
			iconCls: 'add',
			iconMask: true,
			handler: function(){
				var form = this.getParent();
				var formdata = form.getValues();
				var data = form.config.data;
				var devices = Ext.getStore('devicesStore');
				
				var fontsize=formdata.fontsize;
				if(fontsize=="") fontsize="10px";
				
				var listdevices = Ext.getStore('ConfigDevicesStore');
				var listdevice = listdevices.getById(data.id);
				//Le module est déjà dans la liste
				if (form.config.data.state=="-4") {
					device = devices.getById(data.id);
					device.set("category", formdata.category);
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
					device.set("fontsize", fontsize);
					device.set("icon", formdata.icon);
					device.set("width", formdata.width);
					device.set("verif", formdata.verif);
					device.set("sceneon", formdata.sceneon);
					device.set("sceneoff", formdata.sceneoff);
					device.set("camuser", formdata.camuser);
					device.set("campassword", formdata.campassword);
					device.set("graphlink", formdata.graphlink);
					device.set("forced", formdata.forced);
					device.set("room", formdata.room);
					device.set("state", "-3");
					device.set("ind", formdata.ind);
					device.set("height", formdata.height);
					device.set("wwidth", formdata.wwidth);
					
					if(formdata.category=="108") {
						device.set("var1", formdata.var1);
						device.set("var2", formdata.var2);
						device.set("var3", formdata.var3);
						device.set("var4", formdata.var4);
						device.set("var5", "");
					}
				} else {
					//Il faut ajouter le module
					devices.add({
					id: data.id,
					name: data.name,
					state: "-3",
					status: "0",
					tripped: "0",
					room: formdata.room,
					category: formdata.category,
					subcategory: formdata.subcategory,
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
					fontsize: fontsize,
					icon: formdata.icon,
					width: formdata.width,
					verif: formdata.verif,
					sceneon: formdata.sceneon,
					sceneoff: formdata.sceneoff,
					camuser: formdata.camuser,
					campassword: formdata.campassword,
					graphlink: formdata.graphlink,
					forced: formdata.forced,
					ind: formdata.ind,
					height: formdata.height,
					wwidth: formdata.wwidth
					});
					device = devices.getById(data.id);
					
					if(formdata.category=="108") {
						device.set("var1", formdata.var1);
						device.set("var2", formdata.var2);
						device.set("var3", formdata.var3);
						device.set("var4", formdata.var4);
						device.set("var5", "");
					}
					
					device.setDirty();
					listdevice.set("state", "-4");
				}
				//Paramètres utilisés dans l'affichage de la liste de ConfigDevices, il faut donc les mettre à jour.
				listdevice.set("category", formdata.category);
				listdevice.set("subcategory", formdata.subcategory);
				listdevice.set("icon", formdata.icon);
				listdevice.set("ind", formdata.ind);
				listdevice.set("room", formdata.room);
				listdevice.set("name", data.name);
				
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
				device = devices.getById(form.config.data.id);
				//var width =device.get('width');
				//var height =device.get('height');
				devices.remove(device);
				
				var listdevices = Ext.getStore('ConfigDevicesStore');
				var listdevice = listdevices.getById(form.config.data.id);
				//Paramètres du modules transférés à configDevices pour pouvoir le réaffecter sans devoir tout paramétrer à nouveau
				var formdata = form.getValues();
				listdevice.set("category", formdata.category);
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
				listdevice.set("fontsize", formdata.fontsize);
				listdevice.set("icon", formdata.icon);
				listdevice.set("verif", formdata.verif);
				listdevice.set("sceneon", formdata.sceneon);
				listdevice.set("sceneoff", formdata.sceneoff);
				listdevice.set("camuser", formdata.camuser);
				listdevice.set("campassword", formdata.campassword);
				listdevice.set("graphlink", formdata.graphlink);
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
			    var label = this.down('#titlePanelConfigItem');
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
				    device = devices.getById(e.config.data.id);
				    e.setValues(device.getData());
				    //if(device.get('verif')==null) e.setValues({verif:"yes"});
				    //if(device.get('color')==null) e.setValues({color:'000000'});
				    //Problème dans le selectfield : si etage est un entier et pas un string ??
				    //Ce serait un bug (fix dans V. 2.02)
				    //e.setValues({category: "" + device.get("category")});
				    //e.setValues({subcategory: "" + device.get("subcategory")});
				    //e.setValues({etage: "" + device.get("etage")});
				    
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
//				    if(device.get('category')=="6") {
//					    this.down('#CamuserItem').show();
//					    this.down('#CampasswordItem').show();
//				    }
//				    if(device.get('category')=="16" || device.get('category')=="17" || device.get('category')=="21") {
//					    this.down('#GraphlinkItem').show();
//				    }
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
				    //if(e.config.data.verif==null) e.config.data.verif="yes";
				    //if(e.config.data.color==null) e.config.data.color="000000";
				    e.setValues(e.config.data);
				    //Bug avec entier ??
				    //e.setValues({category: "" + e.config.data.category});
				    //e.setValues({subcategory: "" + e.config.data.subcategory});
			    }
			    //Pour changer l'icone du titre quand icon est modifié
			    this.down('#icon').addListener('change', function(me,newvalue,oldvalue, opt){
					if(newvalue!="") this.getParent().config.data.icon = newvalue;
					else this.getParent().config.data.icon = null;
					var label = this.getParent().down('#titlePanelConfigItem');
					var html = label.getTpl().apply(this.getParent().config.data);
					label.setHtml(html);
				});
				
				//Pour changer l'icone du titre quand subcategory est modifié
			    this.down('#subcategory').addListener('change', function(me,newvalue,oldvalue, opt){
					this.getParent().config.data.subcategory = newvalue;
					var label = this.getParent().down('#titlePanelConfigItem');
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
					data: {id: this.getParent().down('#etage'+numetage).getValue(), typepanel: 'item', etage: numetage}
					});
	}
});