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
		{ ui: 'normal', text: 'Gestion de la liste des modules', name:'openPanelConfigItems' },
		{ ui: 'normal', text: 'Gestion de la liste des scènes', name:'openPanelConfigScenes' },
		{ ui: 'normal', text: 'Positionner sur les vues', name:'openPanelMove' },
		{ ui: 'normal', text: 'Sauver', name: 'sauver', disabled: true}
		]
	}
});