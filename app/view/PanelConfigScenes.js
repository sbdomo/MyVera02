Ext.define('myvera.view.PanelConfigScenes', {
	extend: 'Ext.List',
	xtype: 'PanelConfigScenes',
	id:'PanelConfigScenes',
	//requires: ['myvera.store.ConfigDevicesStore'],
	config: {
		itemTpl: '<div class="listconfigimg" style="background-image: url(resources/images/<tpl if="state==-4">vert<tpl else>rouge</tpl>.png)"><img style="height:40px; margin-left:20px;" src="resources/images/l<tpl if="icon!=null">{icon}'+
		'<tpl else>1000</tpl>_0.png" /></div><div class="listconfig"><span class="listconfig">{name}</span></div>',
		store: 'ConfigScenesStore',
		grouped: true,
		onItemDisclosure: true
	}
});