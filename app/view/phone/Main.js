Ext.define("myvera.view.phone.Main", {
	extend: 'Ext.tab.Panel',
	id: 'main',
	alias: 'widget.main',
	requires: [
		'Ext.TitleBar'
	],
	config: {
		fullscreen: true,
		tabBar: {
			docked: 'bottom',
			scrollable: 'horizontal'
		},
		//tabBarPosition: 'bottom',
		items: [
		{
			title: 'liste',
			id:'datalist',
			title: locale.getSt().title.board,
			iconCls: 'home',
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
			title: locale.getSt().title.is_on,
			iconCls: 'info'//,
			//hidden: true
		},
		{
			xtype: 'listclockphone',
			id:'listclock',
			title: locale.getSt().title.clocks,
			iconCls: 'time'//,
			//hidden: true
		},
		{
			xtype: 'PanelConfigphone',
			id:'PanelConfig',
			title: locale.getSt().title.config,
			iconCls: 'user'
		}
		]
	}
});