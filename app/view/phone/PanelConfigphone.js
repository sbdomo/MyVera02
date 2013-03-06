Ext.define('myvera.view.phone.PanelConfigphone', {
    extend: 'myvera.view.PanelConfig',
    xtype: 'PanelConfigphone',  
    config: {
	items: [
	{
		xtype:'PanelConfigGenerale',
		title: locale.getSt().title.conf
	},
	{
		xtype: 'PanelConfigRoomsNavigation'
	},
	{
		xtype: 'PanelConfigFloorsNavigation',
		title: locale.getSt().title.views
	},
	{
		xtype: 'PanelConfigNavigation',
		title : locale.getSt().title.devices
	}
	]
    }
});