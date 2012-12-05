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
			xtype: 'homepanelphone',
			id: 'homepanel',
			title: ' Tableau de bord ',
			iconCls: 'home',
			hidden: true
		},
		{
			xtype: 'panelinfophone',
			id:'panelinfo',
			title: 'Allumés ?',
			iconCls: 'info',
			hidden: true
		},
		{
			xtype: 'listclockphone',
			id:'listclock',
			title: 'Réveils',
			iconCls: 'time',
			hidden: true
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