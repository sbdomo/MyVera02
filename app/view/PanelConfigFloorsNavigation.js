Ext.define('myvera.view.PanelConfigFloorsNavigation', {
	extend: 'Ext.navigation.View',
	xtype: 'PanelConfigFloorsNavigation',
	id:'PanelConfigFloorsNavigation',
	requires: ['myvera.view.PanelConfigFloors','myvera.view.PanelConfigFloor'],
	config: {
		iconCls: '',
		title: 'Vues des étages ou des pièces',
		defaultBackButtonText: 'Retour',
		navigationBar: {
			items: [
			{
				xtype: 'button',
				id: 'addButton',
				text: 'ajouter',
				align: 'right',
				hidden: false,
				handler: function(){
					Ext.getCmp('PanelConfigFloorsNavigation').push({
							xtype: 'PanelConfigFloor',
							title: 'Nouvelle vue'
					});
				}
			}]
		},
		items: [
		{
			xtype: 'PanelConfigFloors'
		}
		],
		listeners:{
			pop:function(e,d){
				Ext.getCmp('addButton').show();
			},
			push:function(e,d){
				Ext.getCmp('addButton').hide();
		}}
	}
});