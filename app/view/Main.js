Ext.define("myvera.view.Main", {
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
			title: ' Tableau de bord ',
			iconCls: 'home',
			hidden: true
		},
		{
			xtype: 'panelinfo',
			title: 'Allumés ?',
			iconCls: 'info',
			hidden: true
		},
		{
			xtype: 'listclock',
			title: 'Réveils',
			iconCls: 'time',
			hidden: true
		},
		{
			xtype: 'PanelConfig',
			title: 'Config.',
			iconCls: 'user'
		}
		]
	}
});