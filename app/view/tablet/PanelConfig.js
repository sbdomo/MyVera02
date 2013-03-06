Ext.define('myvera.view.tablet.PanelConfig', {
    extend: 'myvera.view.PanelConfig',
    xtype: 'PanelConfig',
    config: {
	items: [
	{
		xtype:'PanelConfigGenerale',
		title: locale.getSt().title.conf_gen
	},
	{
		xtype: 'PanelConfigRoomsNavigation'
	},
	{
		xtype: 'PanelConfigFloorsNavigation',
		title: locale.getSt().title.conf_views
	},
	{
		xtype: 'PanelConfigNavigation',
		title : locale.getSt().title.conf_devices
	}
	]
    }
});