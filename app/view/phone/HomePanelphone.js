Ext.define('myvera.view.phone.HomePanelphone', {
	extend: 'Ext.tab.Panel',
	xtype: 'homepanelphone',
	//id: 'homepanelphone',
	config: {
		layout: {
			type: 'card',
			animation: 'scroll'
		},
		items: [
			{
				title: 'carousel',
				xtype: 'carouselplan'
			},
			{
				title: 'liste',
				id:'datalist',
				xtype: 'datalistphone'
			}
		]
	}
});