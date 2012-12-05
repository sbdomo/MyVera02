Ext.define('myvera.view.phone.PanelConfigphone', {
    extend: 'myvera.view.PanelConfig',
    xtype: 'PanelConfigphone',  
    config: {
	items: [
	{
		xtype:'PanelConfigGenerale',
		title: 'Conf.'
	},
	{
		xtype: 'PanelConfigRoomsNavigation'
	},
	{
		xtype: 'PanelConfigFloorsNavigation',
		title: 'Vues'
	},
	{
		xtype: 'PanelConfigNavigation',
		title : 'Modules'
	}
	]
    }
});