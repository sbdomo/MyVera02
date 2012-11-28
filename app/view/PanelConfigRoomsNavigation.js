Ext.define('myvera.view.PanelConfigRoomsNavigation', {
	extend: 'Ext.navigation.View',
	xtype: 'PanelConfigRoomsNavigation',
	id:'PanelConfigRoomsNavigation',
	requires: ['myvera.view.PanelConfigRooms','myvera.view.PanelConfigRoom'],
	config: {
		iconCls: '',
		title: 'Pièces',
		defaultBackButtonText: 'Retour',
		navigationBar: {
			items: [
			{
				xtype: 'button',
				id: 'RefreshRoomsButton',
				itemId: 'RefreshRoomsButton',
				text: 'Mettre à jour la liste',
				align: 'right',
				hidden: false
			},
			{
				ui: 'normal',
				text: 'Sauver', 
				itemId: 'sauver', 
				disabled: true,
				align: 'right'
			}
			]
		},
		items: [
		{
			xtype: 'PanelConfigRooms'
		}
		],
		listeners:{
			pop:function(e,d){
				//Ext.getCmp('RefreshRoomsButton').show();
				e.down('#RefreshRoomsButton').show();
				e.down('#sauver').show();
			},
			push:function(e,d){
				//Ext.getCmp('RefreshRoomsButton').hide();
				e.down('#RefreshRoomsButton').hide();
				e.down('#sauver').hide();
		}}
	}
});