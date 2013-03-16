Ext.define('myvera.view.PanelConfigFloor', {
	extend: 'Ext.form.Panel',
	xtype: 'PanelConfigFloor',
	requires: [
        'Ext.field.Text',
        'Ext.i18n.Bundle'
    ],
    
	config: {
		//tpl: [ '<div style="text-align:center"><img style="width:290px" src="./resources/config/img/{path}"></div>' ],
		name:'PanelConfigFloor',
		itemId:"PanelConfigFloor",
		//styleHtmlContent: true,
		scrollable: 'vertical',
		defaults: {
			labelWidth: '120px'
		},
		items: [
		{
			html:"",
			itemId: 'titlePanelConfigFloor'
		},
		{
			xtype: 'textfield',
			label: Ext.i18n.Bundle.message('field.name'),
			//id: 'name',
			itemId: 'name',
			name: 'name'
		},
		{
			xtype: 'selectfield',
			label: Ext.i18n.Bundle.message('field.tab'),
			name: 'tab',
			itemId: 'tab',
			store: 'TabViewsStore',
   			displayField:'name',
   			valueField: 'id'
		},
		{
			xtype: 'textfield',
			label: Ext.i18n.Bundle.message('field.index'),
			name: 'ind',
			itemId: 'ind',
			value: 90
		},
		{
			xtype: 'textfield',
			label: Ext.i18n.Bundle.message('field.linkimage'),
			//id: 'linkimage',
			itemId: 'linkimage',
			name: 'linkimage'
		},
		{
			xtype: 'textfield',
			label: Ext.i18n.Bundle.message('field.img'),
			//id: 'path',
			itemId: 'path',
			disabled: true,
			name: 'path'
		},
		{
			xtype: 'button',
			text: Ext.i18n.Bundle.message('button.imglink'),
			//ui: 'confirm',
			//iconCls: 'refresh',
			//iconMask: true,
			margin: 5,
			name: 'imglink',
			itemId: 'imglink',
			handler: function(){
				var me = this.getParent();
				var popup=new Ext.Panel({
					modal:true,
					id: 'popup_imgview',
					hideOnMaskTap: true,
					width: '400px',
					height: '120px',
					padding: 10,
					maxWidth: '95%',
					maxHeight: '95%',
					centered: true,
					items:[
						{
							xtype: 'selectfield',
							label: 'Vue',
							name: 'view',
							itemId: 'view'
						},
						{
							xtype: 'button',
							name: 'adddimg',
							ui: 'confirm',
							text: Ext.i18n.Bundle.message('button.adddimg'),
							handler: function(){
								me.down('#path').setValue(this.getParent().down('#view').getValue());
								this.getParent().hide();
							}
						}
					],
					listeners: {
						hide: function(panel) {
							this.destroy();
						}
					}
				});
				var FloorsStore = Ext.getStore('FloorsStore');
				var options = [];
				FloorsStore.data.each(function(floor) {
						if(floor.get('id')!=-1&&floor.get('id')!=me.config.data.id) {
							options.push({ text: floor.get('name'), value: floor.get('path') });
						}
				});
				popup.down('#view').setOptions(options);
				Ext.Viewport.add(popup);
				popup.show();
			}
		},
		{
			xtype: 'textfield',
			label: Ext.i18n.Bundle.message('field.linkimage2'),
			//id: 'linkimage',
			itemId: 'linkimage2',
			name: 'linkimage2'
		},
		{
			xtype: 'textfield',
			label: Ext.i18n.Bundle.message('field.imgretina'),
			//id: 'path',
			itemId: 'pathretina',
			disabled: true,
			name: 'pathretina'
		},
		{
			xtype: 'hiddenfield',
			itemId: 'widthretina',
			name: 'widthretina'
		},
		{
			xtype: 'button',
			text: Ext.i18n.Bundle.message('button.imglink'),
			//ui: 'confirm',
			//iconCls: 'refresh',
			//iconMask: true,
			margin: 5,
			name: 'imglink2',
			itemId: 'imglink2',
			handler: function(){
				var me = this.getParent();
				var popup=new Ext.Panel({
					modal:true,
					id: 'popup_imgview',
					hideOnMaskTap: true,
					width: '400px',
					height: '120px',
					padding: 10,
					maxWidth: '95%',
					maxHeight: '95%',
					centered: true,
					items:[
						{
							xtype: 'selectfield',
							label: 'Vue',
							name: 'view',
							itemId: 'view'
						},
						{
							xtype: 'hiddenfield',
							itemId: 'widthretina',
							name: 'widthretina'
						},
						{
							xtype: 'button',
							name: 'adddimg',
							ui: 'confirm',
							text: Ext.i18n.Bundle.message('button.adddimg'),
							handler: function(){
								var Floor = Ext.getStore('FloorsStore').getById(this.getParent().down('#view').getValue());
								me.down('#pathretina').setValue(Floor.get('pathretina'));
								me.down('#widthretina').setValue(Floor.get('widthretina'));
								this.getParent().hide();
							}
						}
					],
					listeners: {
						hide: function(panel) {
							this.destroy();
						}
					}
				});
				var FloorsStore = Ext.getStore('FloorsStore');
				var options = [];
				FloorsStore.data.each(function(floor) {
						if(floor.get('id')!=-1&&floor.get('id')!=me.config.data.id) {
							options.push({ text: floor.get('name'), value: floor.get('id') });
						}
				});
				popup.down('#view').setOptions(options);
				Ext.Viewport.add(popup);
				popup.show();
			}
		},
		{
			xtype: 'button',
			text: Ext.i18n.Bundle.message('button.addsave'),
			ui: 'confirm',
			iconCls: 'add',
			iconMask: true,
			margin: 5,
			name: 'savefloor',
			itemId: 'savefloor'
		},
                {
			xtype: 'button',
			text: Ext.i18n.Bundle.message('button.deletesave'),
			margin: 5,
			iconCls: 'trash',
			ui: 'decline',
			iconMask: true,
			hidden: true,
			name: 'deletefloor',
			itemId: 'deletefloor'
		}		],
		listeners:{
			updatedata:function(e,d){
				var label = e.down('#titlePanelConfigFloor');
				var html = d.name + ' - ID: ' + d.id;
				label.setHtml(html);
				e.down('#deletefloor').show();
				e.down('#savefloor').setIconCls('refresh');
				e.down('#savefloor').setText(Ext.i18n.Bundle.message('button.save'));
				//Ext.getCmp('name').setValue(d.name);
				//Ext.getCmp('path').setValue(d.path);
				e.down('#name').setValue(d.name);
				e.down('#path').setValue(d.path);
				e.down('#pathretina').setValue(d.pathretina);
				e.down('#widthretina').setValue(d.widthretina);
				e.down('#tab').setValue(d.tab);
				e.down('#ind').setValue(d.ind);
			}
		}
		
	}
});