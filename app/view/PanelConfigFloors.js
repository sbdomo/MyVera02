Ext.define('myvera.view.PanelConfigFloors', {
	extend: 'Ext.List',
	xtype: 'PanelConfigFloors',
	id:'PanelConfigFloors',
	requires: ['myvera.store.FloorsStore'],
	config: {
		title: 'Liste des vues',
		itemTpl: ' {name}',
		store: 'FloorsStore',
		onItemDisclosure: true
    }
});