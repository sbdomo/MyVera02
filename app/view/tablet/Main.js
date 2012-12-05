Ext.define("myvera.view.tablet.Main", {
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
			xtype: 'homepanel',
			id: 'homepanel',
			title: ' Tableau de bord ',
			iconCls: 'home',
			hidden: true
		},
		{
			xtype: 'panelinfo',
			id:'panelinfo',
			title: 'Allumés ?',
			iconCls: 'info',
			hidden: true
		},
		{
			xtype: 'listclock',
			id:'listclock',
			title: 'Réveils',
			iconCls: 'time',
			hidden: true
		},
		{
			xtype: 'PanelConfig',
			id:'PanelConfig',
			title: 'Config.',
			iconCls: 'user'
		}
		]
	}
});