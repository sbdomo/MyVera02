Ext.define('myvera.view.tablet.HomePanel', {
	extend: 'Ext.tab.Panel',
	xtype: 'homepanel',
	//id: 'homepanel',
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
				xtype: 'datalist'

			}
		]
	}
});