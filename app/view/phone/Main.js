Ext.define("myvera.view.phone.Main", {
	extend: 'Ext.tab.Panel',
	id: 'main',
	alias: 'widget.main',
	requires: [
		'Ext.TitleBar'
	],
	config: {
		fullscreen: true,
		tabBarPosition: 'bottom',
		items: [
		{
			title: 'liste',
			id:'datalist',
			title: ' Tableau de bord ',
			iconCls: 'tab1',
			xtype: 'datalistphone'

		},
		//{
		//	xtype: 'homepanelphone',
		//	id: 'homepanel',
		//	title: ' Tableau de bord ',
		//	iconCls: 'home',
		//	hidden: true
		//},
		{
			xtype: 'panelinfophone',
			id:'panelinfo',
			title: 'Allumés ?',
			iconCls: 'info'//,
			//hidden: true
		},
		{
			xtype: 'listclockphone',
			id:'listclock',
			title: 'Réveils',
			iconCls: 'time'//,
			//hidden: true
		},
		{
			xtype: 'PanelConfigphone',
			id:'PanelConfig',
			title: 'Config.',
			iconCls: 'user'
		}
		]
	}
});