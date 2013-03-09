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
		{ ui: 'normal', text: locale.getSt().button.listtabs, name:'openPanelConfigTabs' },
		{ ui: 'normal', text: locale.getSt().button.listviews, name:'openPanelConfigViews' }
		]
	}
});