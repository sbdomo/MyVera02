Ext.define('myvera.view.phone.listclockphone', {
    extend: 'myvera.view.listclock',
    xtype: 'listclockphone',  
    config: {
		itemTpl:  '<tpl if="category==120||category==103">'+
		 	myvera.util.Templates.getTplphone() + '</tpl>',
		styleHtmlContent: false
    }
});