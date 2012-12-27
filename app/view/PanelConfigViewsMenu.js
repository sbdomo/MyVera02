Ext.define('myvera.view.PanelConfigViewsMenu', {
	extend: 'Ext.Container',
	xtype: 'PanelConfigViewsMenu',
	id:'PanelConfigViewsMenu',
	config: {
		padding: 4,
		itemId:"viewsmenu",
		defaults: {
			xtype: 'button',
			margin: 5
		},
		layout: {
			type: 'vbox',
			align: 'center'
		},
		items: [
		{ ui: 'normal', text: 'Liste des onglets', name:'openPanelConfigTabs' },
		{ ui: 'normal', text: 'Liste des vues', name:'openPanelConfigViews' }
		]
	}
});