Ext.define('myvera.view.HomePanel', {
	extend: 'Ext.tab.Panel',
	xtype: 'homepanel',
	id: 'homepanel',
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
				xtype: 'datalist'
			}
		]
	}
});