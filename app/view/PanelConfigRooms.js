Ext.define('myvera.view.PanelConfigRooms', {
	extend: 'Ext.List',
	xtype: 'PanelConfigRooms',
	id:'PanelConfigRooms',
	//requires: ['myvera.store.ConfigDevicesStore'],
	config: {
		itemTpl: '<tpl if="icon!=null&&icon!=\'\'"><div class="listconfigimg">'+
		'<img style="height:40px;" src="resources/images/rooms/{icon}{retina}.png" /></div></tpl><div class="listconfig"><span class="<tpl if="hidden!=true">listconfig<tpl else>hideitem</tpl>">{ind} - {name}</span></div>',
		store: 'Rooms',
		//grouped: true,
		onItemDisclosure: true
	}
});