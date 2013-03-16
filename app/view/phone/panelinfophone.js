Ext.define('myvera.view.phone.panelinfophone', {
	extend: 'Ext.Container',
	requires:['Ext.i18n.Bundle'],
	//id:'panelinfo',
	xtype: 'panelinfophone',
	config: {
		layout: 'vbox',
		items: [
		{
			html: Ext.i18n.Bundle.message('panelinfo.deviceson'),
			height: 22,
			//style: "background-color:#d9ffa0; margin-left:3px;"
			style: "padding-left:3px; background-image: -webkit-linear-gradient(top, #ccff7c, #c3f171 3%, #a7ca72);"
		},
		{
			xtype: 'datalistonphone',
			id:'dataliston',
			flex: 2
		},
		{
			html: Ext.i18n.Bundle.message('panelinfo.devicesoff'),
			height: 22,
			//style: "background-color:#d9ffa0; margin-left:3px;"
			style: "padding-left:3px; background-image: -webkit-linear-gradient(top, #ccff7c, #c3f171 3%, #a7ca72);"
		},
		{
			xtype: 'datalistoffphone',
			id:'datalistoff',
			flex: 1
		}
		]
	}
});