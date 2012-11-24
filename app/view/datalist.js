Ext.define('myvera.view.datalist', {
	extend: 'Ext.List',
	id:'datalist',
	xtype: 'datalist',
	stores: ['devicesStore'],
	requires:['myvera.util.Templates'],
	config: {
		cls: 'devicelist',
		//itemCls: 'device-item',
		styleHtmlContent:true,
		
		styleHtmlCls:'devicetHtml',
		overItemCls:'deviceOver',
		selectedItemCls:'deviceSelect',
		pressedCls:'devicePress',
		ui: 'round',
		
		disableSelection: true,
		itemTpl:  '<tpl for=".">'+
		 myvera.util.Templates.getTpllist() +
	        '</tpl>',
		emptyText: 'Aucun module',
		disclosure: false,
		//group the list
		grouped: true,
		store: 'devicesStore'
	}
});