Ext.define('myvera.view.PanelConfigFloor', {
	extend: 'Ext.form.Panel',
	xtype: 'PanelConfigFloor',
	requires: [
        'Ext.field.Text'
    ],
    
	config: {
		tpl: [ '<div style="text-align:center"><img style="width:290px" src="./resources/config/img/{path}"></div>' ],
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
			label: 'Nom',
			//id: 'name',
			itemId: 'name',
			name: 'name'
		},
		{
			xtype: 'selectfield',
			label: 'Onglet',
			name: 'tab',
			itemId: 'tab',
			store: 'TabViewsStore',
   			displayField:'name',
   			valueField: 'id'
		},
		{
			xtype: 'textfield',
			label: 'Url de l\'image',
			//id: 'linkimage',
			itemId: 'linkimage',
			name: 'linkimage'
		},{
			xtype: 'textfield',
			label: 'Image',
			//id: 'path',
			itemId: 'path',
			disabled: true,
			name: 'path'
		},
		{
			xtype: 'button',
			text: 'Ajouter et sauver',
			ui: 'confirm',
			iconCls: 'add',
			iconMask: true,
			margin: 5,
			name: 'savefloor',
			itemId: 'savefloor'
		},
                {
			xtype: 'button',
			text: 'Supprimer et sauver',
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
				e.down('#savefloor').setText('Sauver');
				//Ext.getCmp('name').setValue(d.name);
				//Ext.getCmp('path').setValue(d.path);
				e.down('#name').setValue(d.name);
				e.down('#path').setValue(d.path);
				e.down('#tab').setValue(d.tab);
			}
		}
		
	}
});