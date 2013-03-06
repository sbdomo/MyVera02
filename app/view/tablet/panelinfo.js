Ext.define('myvera.view.tablet.panelinfo', {
	extend: 'Ext.Container',
	//id:'panelinfo',
	xtype: 'panelinfo',
	config: {
		layout: 'vbox',
		items: [
		{
			html: locale.getSt().misc.devices_on,
			height: 22,
			//style: "background-color:#d9ffa0; margin-left:3px;"
			style: "padding-left:3px; background-image: -webkit-linear-gradient(top, #ccff7c, #c3f171 3%, #a7ca72);"
		},
		{
			xtype: 'dataliston',
			id:'dataliston',
			flex: 2
		},
		{
			html: locale.getSt().misc.devices_off,
			height: 22,
			//style: "background-color:#d9ffa0; margin-left:3px;"
			style: "padding-left:3px; background-image: -webkit-linear-gradient(top, #ccff7c, #c3f171 3%, #a7ca72);"
		},
		{
			xtype: 'datalistoff',
			id:'datalistoff',
			flex: 1
		}
		]
	}
});