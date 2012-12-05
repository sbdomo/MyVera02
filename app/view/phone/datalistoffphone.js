Ext.define('myvera.view.phone.datalistoffphone', {
    extend: 'myvera.view.datalistoff',
    xtype: 'datalistoffphone',
    config: {
		styleHtmlContent: false,
		itemTpl:  myvera.util.Templates.getTpllistoff() + myvera.util.Templates.getTplphone() + '</tpl>'
    }
});