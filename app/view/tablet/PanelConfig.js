Ext.define('myvera.view.tablet.PanelConfig', {
    extend: 'myvera.view.PanelConfig',
    requires:['Ext.i18n.Bundle'],
    xtype: 'PanelConfig',  
    config: {
	items: [
	{
		xtype:'PanelConfigGenerale',
		title: Ext.i18n.Bundle.message('panelconfig.general')
	},
	{
		xtype: 'PanelConfigRoomsNavigation'
	},
	{
		xtype: 'PanelConfigFloorsNavigation',
		title: Ext.i18n.Bundle.message('panelconfig.tabview')
	},
	{
		xtype: 'PanelConfigNavigation',
		title : Ext.i18n.Bundle.message('panelconfig.devices')
	}
	]
    }
});