Ext.define('myvera.view.tablet.datalistoff', {
    extend: 'myvera.view.datalistoff',
    xtype: 'datalistoff',
    
    config: {
	itemTpl:  myvera.util.Templates.getTpllistoff() + myvera.util.Templates.getTpllist() + '</tpl>',
	styleHtmlContent:true,
	itemCls:'deviceview'
    }
});