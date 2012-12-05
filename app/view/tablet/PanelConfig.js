Ext.define('myvera.view.tablet.PanelConfig', {
    extend: 'myvera.view.PanelConfig',
    xtype: 'PanelConfig',  
    config: {
	items: [
	{
		xtype:'PanelConfigGenerale',
		title: 'Config. générale'
	},
	{
		xtype: 'PanelConfigRoomsNavigation'
	},
	{
		xtype: 'PanelConfigFloorsNavigation',
		title: 'Vues des étages ou des pièces'
	},
	{
		xtype: 'PanelConfigNavigation',
		title : 'Modules et scènes'
	}
	]
    }
});