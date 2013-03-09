Ext.define('myvera.view.PanelConfigMove', {
	extend: 'Ext.List',
	xtype: 'PanelConfigMove',
	id:'PanelConfigMove',
	requires: ['myvera.store.FloorsStore'],
	config: {
		title: locale.getSt().misc.chooseview,
		itemTpl: ' {name}',
		store: 'FloorsStore',
		onItemDisclosure: true
    }
});