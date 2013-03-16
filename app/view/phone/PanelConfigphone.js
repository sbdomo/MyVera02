Ext.define('myvera.view.phone.PanelConfigphone', {
    extend: 'myvera.view.PanelConfig',
    requires: ['Ext.i18n.Bundle'],
    xtype: 'PanelConfigphone',  
    config: {
	items: [
	{
		xtype:'PanelConfigGenerale',
		title: Ext.i18n.Bundle.message('panelconfig.conf')
	},
	{
		xtype: 'PanelConfigRoomsNavigation'
	},
	{
		xtype: 'PanelConfigFloorsNavigation',
		title: Ext.i18n.Bundle.message('msg.views')
	},
	{
		xtype: 'PanelConfigNavigation',
		title : Ext.i18n.Bundle.message('msg.devices')
	}
	]
    }
});