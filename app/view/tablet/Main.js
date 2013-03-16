Ext.define("myvera.view.tablet.Main", {
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
			//title: ' Tableau de bord ',
			title: Ext.i18n.Bundle.message('main.liste'),
			iconCls: 'tab1',
			xtype: 'datalist'

		},
		{
			xtype: 'panelinfo',
			id:'panelinfo',
			title: Ext.i18n.Bundle.message('main.panelinfo'),
			//title: 'Allumés ?',
			iconCls: 'info'//,
			//hidden: true
		},
		{
			xtype: 'listclock',
			id:'listclock',
			title: Ext.i18n.Bundle.message('main.listclock'),
			//title: 'Réveils',
			iconCls: 'time'//,
			//hidden: true
		},
		{
			xtype: 'PanelConfig',
			id:'PanelConfig',
			title: Ext.i18n.Bundle.message('main.panelconfig'),
			//title: 'Config.',
			iconCls: 'user'
		}
		]
	}
});