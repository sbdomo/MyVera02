Ext.define('myvera.view.PanelConfigFloors', {
	extend: 'Ext.List',
	xtype: 'PanelConfigFloors',
	id:'PanelConfigFloors',
	requires: ['Ext.i18n.Bundle','myvera.store.FloorsStore'],
	config: {
		title: Ext.i18n.Bundle.message('msg.views'),
		itemId:"PanelConfigFloors",
		itemTpl: '{ind} - {name}',
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