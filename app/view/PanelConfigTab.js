Ext.define('myvera.view.PanelConfigTab', {
	extend: 'Ext.form.Panel',
	xtype: 'PanelConfigTab',
	requires: [
        'Ext.field.Text'
    ],
    
	config: {
		name:'PanelConfigTab',
		itemId:"PanelConfigTab",
		//styleHtmlContent: true,
		scrollable: 'vertical',
		defaults: {
			labelWidth: '120px'
		},
		items: [
		{
			xtype: 'textfield',
			label: 'Nom',
			//id: 'name',
			itemId: 'name',
			name: 'name'
		},
		{
			xtype: 'selectfield',
			label: 'Icône',
			name:'cls',
			itemId:'cls',
			options: [
			{text: '1', value:'1'},
			{text: '2',  value: '2'},
			{text: '3',  value: '3'},
			{text: '4',  value: '4'},
			{text: '5',  value: '5'},
			{text: '6',  value: '6'},
			{text: '7',  value: '7'},
			{text: '8',  value: '8'}
			]
		},
		{
			xtype: 'button',
			text: 'Ajouter et sauver',
			ui: 'confirm',
			iconCls: 'add',
			iconMask: true,
			margin: 5,
			name: 'savetab',
			itemId: 'savetab'
		},
                {
			xtype: 'button',
			text: 'Supprimer et sauver',
			margin: 5,
			iconCls: 'trash',
			ui: 'decline',
			iconMask: true,
			hidden: true,
			name: 'deletetab',
			itemId: 'deletetab'
		}		],
		listeners:{
			updatedata:function(e,d){
				if(d.id!=0) e.down('#deletetab').show();
				e.down('#savetab').setIconCls('refresh');
				e.down('#savetab').setText('Sauver');

				e.down('#name').setValue(d.name);
				e.down('#cls').setValue(d.cls);
			}
		}
		
	}
});