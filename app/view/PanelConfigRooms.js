Ext.define('myvera.view.PanelConfigRooms', {
	extend: 'Ext.List',
	xtype: 'PanelConfigRooms',
	id:'PanelConfigRooms',
	//requires: ['myvera.store.ConfigDevicesStore'],
	config: {
		itemTpl: '{name}',
		store: 'Rooms',
		//grouped: true,
		//onItemDisclosure: true
	}
});