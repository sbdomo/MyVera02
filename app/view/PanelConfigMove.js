Ext.define('myvera.view.PanelConfigMove', {
	extend: 'Ext.List',
	xtype: 'PanelConfigMove',
	id:'PanelConfigMove',
	requires: ['myvera.store.FloorsStore'],
	config: {
		title: 'Choisir une vues',
		itemTpl: ' {name}',
		store: 'FloorsStore',
		onItemDisclosure: true
    }
});