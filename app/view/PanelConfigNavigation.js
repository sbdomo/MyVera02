Ext.define('myvera.view.PanelConfigNavigation', {
	extend: 'Ext.navigation.View',
	xtype: 'PanelConfigNavigation',
	id:'PanelConfigNavigation',
	requires: ['myvera.view.PanelConfigItemsMenu', 'myvera.view.PanelConfigWebviews','myvera.view.PanelConfigWebview'],
	config: {
		iconCls : '',
		defaultBackButtonText: locale.getSt().button.back,
		navigationBar: {
			items: [
			{
				xtype: 'button',
				id: 'addWebViewButton',
				text: locale.getSt().button.add,
				align: 'right',
				hidden: true,
				handler: function(){
					Ext.getCmp('PanelConfigNavigation').push({
							xtype: 'PanelConfigWebview',
							title: locale.getSt().title.newwidget,
							data: { id:"", subcategory:'0', status:'-1', room:'0', icon:null, etage:"-1", etage1:"-1", etage2:"-1", width:"50", retina:myvera.app.isretina}
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