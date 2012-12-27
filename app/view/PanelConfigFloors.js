Ext.define('myvera.view.PanelConfigFloors', {
	extend: 'Ext.List',
	xtype: 'PanelConfigFloors',
	id:'PanelConfigFloors',
	requires: ['myvera.store.FloorsStore'],
	config: {
		title: 'Vues',
		itemId:"PanelConfigFloors",
		itemTpl: ' {name}',
		store: 'FloorsStore',
		onItemDisclosure: true
		//listeners:{
		//	push:function(e,d){
		//		Ext.getCmp('addViewButton').hide();
		//	},
		//	pop:function(e,d){
		//		Ext.getCmp('addViewButton').hide();
		//	}
		//}
	}
});