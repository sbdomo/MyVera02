Ext.define('myvera.view.tablet.listclock', {
    extend: 'myvera.view.listclock',
    xtype: 'listclock',
    
    config: {
    	cls: 'carbon',
	itemTpl:  '<tpl if="category==120||category==103">'+
		 myvera.util.Templates.getTpllist() + '</tpl>',
	styleHtmlContent:true,
	itemCls:'deviceview'
    }
});