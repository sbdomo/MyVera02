Ext.define('myvera.view.PanelConfigTabs', {
	extend: 'Ext.List',
	xtype: 'PanelConfigTabs',
	id:'PanelConfigTabs',
	requires: ['myvera.store.TabViewsStore'],
	config: {
		title: 'Onglets',
		itemId:"PanelConfigTabs",
		itemTpl: ' {name}',
		store: 'TabViewsStore',
		onItemDisclosure: true//,
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