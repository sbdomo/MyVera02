Ext.define('myvera.view.PanelConfigFloorsNavigation', {
	extend: 'Ext.navigation.View',
	xtype: 'PanelConfigFloorsNavigation',
	id:'PanelConfigFloorsNavigation',
	requires: ['Ext.i18n.Bundle','myvera.view.PanelConfigViewsMenu', 'myvera.view.PanelConfigFloors','myvera.view.PanelConfigFloor'],
	config: {
		iconCls: '',
		defaultBackButtonText: Ext.i18n.Bundle.message('button.back'),
		navigationBar: {
			items: [
			{
				xtype: 'button',
				id: 'addViewButton',
				text: Ext.i18n.Bundle.message('button.add'),
				align: 'right',
				hidden: true,
				handler: function(){
					Ext.getCmp('PanelConfigFloorsNavigation').push({
							xtype: 'PanelConfigFloor',
							title: Ext.i18n.Bundle.message('msg.newview')
					});
				}
			},
			{
				xtype: 'button',
				id: 'addTabButton',
				text: Ext.i18n.Bundle.message('button.add'),
				align: 'right',
				hidden: true,
				handler: function(){
					Ext.getCmp('PanelConfigFloorsNavigation').push({
							xtype: 'PanelConfigTab',
							title: Ext.i18n.Bundle.message('msg.tab')
					});
				}
			}
			]
		},
		items: [
		{
			//xtype: 'PanelConfigFloors'
			itemId:'PanelConfigViewsMenu',
			xtype: 'PanelConfigViewsMenu'
		}
		],
		listeners:{
			push:function(e,d){
				if(this.getActiveItem().getItemId()=="PanelConfigFloors") {
					//alert(this.getActiveItem().getTitle());
					Ext.getCmp('addViewButton').show();
					Ext.getCmp('addTabButton').hide();
				} else {
					Ext.getCmp('addViewButton').hide();
					if(this.getActiveItem().getItemId()=="PanelConfigTabs") {
						Ext.getCmp('addTabButton').show();
					} else {
						Ext.getCmp('addTabButton').hide();
					}
				}
			},
			pop:function(e,d){
				if(this.getActiveItem().getItemId()=="PanelConfigFloors") {
					//alert(this.getActiveItem().getTitle());
					Ext.getCmp('addViewButton').show();
					Ext.getCmp('addTabButton').hide();
				} else {
					Ext.getCmp('addViewButton').hide();
					if(this.getActiveItem().getItemId()=="PanelConfigTabs") {
						Ext.getCmp('addTabButton').show();
					} else {
						Ext.getCmp('addTabButton').hide();
					}
				}
			}
		}
	}
});