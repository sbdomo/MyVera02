Ext.define('myvera.view.PanelConfigRoomsNavigation', {
	extend: 'Ext.navigation.View',
	xtype: 'PanelConfigRoomsNavigation',
	id:'PanelConfigRoomsNavigation',
	requires: ['myvera.view.PanelConfigRooms'],
	config: {
		iconCls: '',
		title: 'Pièces',
		defaultBackButtonText: 'Retour',
		navigationBar: {
			items: [
			{
				xtype: 'button',
				id: 'RefreshRoomsButton',
				text: 'Mettre à jour la liste',
				align: 'right',
				hidden: false
			}]
		},
		items: [
		{
			xtype: 'PanelConfigRooms'
		}
		],
		listeners:{
			pop:function(e,d){
				Ext.getCmp('RefreshRoomsButton').show();
			},
			push:function(e,d){
				Ext.getCmp('RefreshRoomsButton').hide();
		}}
	}
});