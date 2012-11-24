Ext.define('myvera.view.PanelConfigNavigation', {
	extend: 'Ext.navigation.View',
	xtype: 'PanelConfigNavigation',
	id:'PanelConfigNavigation',
	requires: ['myvera.view.PanelConfigItemsMenu'],
	config: {
		iconCls : '',
		title : 'Modules et scènes',
		defaultBackButtonText: 'Retour',
		items: [
		{
			xtype: 'PanelConfigItemsMenu'
			
		}
		],
		listeners:{
			pop:function(e,d){
				Ext.getCmp('main').getTabBar().show();
				Ext.getCmp('PanelConfig').getTabBar().show();
				this.getNavigationBar().setDocked('top');
			}
		}
	}
});