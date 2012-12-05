Ext.define('myvera.view.tablet.listclock', {
    extend: 'myvera.view.listclock',
    xtype: 'listclock',
    
    config: {
	itemTpl:  '<tpl if="category==120||category==103">'+
		 myvera.util.Templates.getTpllist() + '</tpl>',
	styleHtmlContent:true,
	itemCls:'deviceview'
    }
});