Ext.define('myvera.view.PanelConfigItemsMenu', {
	extend: 'Ext.Container',
	xtype: 'PanelConfigItemsMenu',
	id:'PanelConfigItemsMenu',
	config: {
		padding: 4,
		defaults: {
			xtype: 'button',
			margin: 5
		},
		layout: {
			type: 'vbox',
			align: 'center'
		},
		items: [
		{ ui: 'normal', text: locale.getSt().button.devicemngmt, name:'openPanelConfigItems' },
		{ ui: 'normal', text: locale.getSt().button.scenemngmnt, name:'openPanelConfigScenes' },
		{ ui: 'normal', text: locale.getSt().button.widgetmngmnt, name:'openPanelConfigWebViews' },
		{ ui: 'normal', text: locale.getSt().button.viewposition, name:'openPanelMove' },
		{ ui: 'normal', text: locale.getSt().button.save, name: 'sauver', disabled: true}
		]
	}
});