Ext.define('myvera.view.tablet.dataliston', {
    extend: 'myvera.view.dataliston',
    xtype: 'dataliston',
    
    config: {
	itemTpl:  myvera.util.Templates.getTplliston() + myvera.util.Templates.getTpllist() + '</tpl>',
	styleHtmlContent:true,
	itemCls:'deviceview'
    }
});