Ext.define('myvera.view.PanelConfigNavigation', {
	extend: 'Ext.navigation.View',
	xtype: 'PanelConfigNavigation',
	id:'PanelConfigNavigation',
	requires: ['myvera.view.PanelConfigItemsMenu', 'myvera.view.PanelConfigWebviews','myvera.view.PanelConfigWebview'],
	config: {
		iconCls : '',
		defaultBackButtonText: 'Retour',
		navigationBar: {
			items: [
			{
				xtype: 'button',
				id: 'addWebViewButton',
				text: 'Ajouter',
				align: 'right',
				hidden: true,
				handler: function(){
					Ext.getCmp('PanelConfigNavigation').push({
							xtype: 'PanelConfigWebview',
							title: 'Nouveau widget',
							data: { id:"", etage:"-1", etage1:"-1", etage2:"-1"}
					});
				}
			}
			]
		},
		items: [
		{
			xtype: 'PanelConfigItemsMenu'
			
		}
		],
		listeners:{
			push:function(e,d){
				if(this.getActiveItem().getItemId()=="PanelConfigWebviews") {
					Ext.getCmp('addWebViewButton').show();
				} else {
					Ext.getCmp('addWebViewButton').hide();
				}
			},
			pop:function(e,d){
				Ext.getCmp('main').getTabBar().show();
				Ext.getCmp('PanelConfig').getTabBar().show();
				Ext.getCmp('PanelConfigNavigation').setNavigationBar({docked: 'top'});
				if(this.getActiveItem().getItemId()=="PanelConfigWebviews") {
					Ext.getCmp('addWebViewButton').show();
				} else {
					Ext.getCmp('addWebViewButton').hide();
				}
			}
		}
	}
});