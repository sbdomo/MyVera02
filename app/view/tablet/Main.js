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
			title: 'liste',
			id:'datalist',
			title: locale.getSt().title.board,
			iconCls: 'home',
			xtype: 'datalist'

		},
		{
			xtype: 'panelinfo',
			id:'panelinfo',
			title: locale.getSt().title.is_on,
			iconCls: 'info'//,
			//hidden: true
		},
		{
			xtype: 'listclock',
			id:'listclock',
			title: locale.getSt().title.clocks,
			iconCls: 'time'//,
			//hidden: true
		},
		{
			xtype: 'PanelConfig',
			id:'PanelConfig',
			title: locale.getSt().title.config,
			iconCls: 'user'
		}
		]
	}
});