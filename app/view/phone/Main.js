Ext.define("myvera.view.phone.Main", {
	extend: 'Ext.tab.Panel',
	id: 'main',
	alias: 'widget.main',
	requires: [
		'Ext.TitleBar',
		'Ext.i18n.Bundle'
	],
	config: {
		fullscreen: true,
		tabBarPosition: 'bottom',
		items: [
		{
			title: 'liste',
			id:'datalist',
			title: Ext.i18n.Bundle.message('main.liste'),
			iconCls: 'tab1',
			xtype: 'datalistphone'

		},
		{
			xtype: 'panelinfophone',
			id:'panelinfo',
			title: Ext.i18n.Bundle.message('main.panelinfo'),
			iconCls: 'info'
		},
		{
			xtype: 'listclockphone',
			id:'listclock',
			title: Ext.i18n.Bundle.message('main.listclock'),
			iconCls: 'time'
		},
		{
			xtype: 'PanelConfigphone',
			id:'PanelConfig',
			title: Ext.i18n.Bundle.message('main.panelconfig'),
			iconCls: 'user'
		}
		]
	}
});