Ext.define('myvera.view.phone.datalistonphone', {
    extend: 'myvera.view.dataliston',
    xtype: 'datalistonphone',
    config: {
		styleHtmlContent: false,
		itemTpl:  myvera.util.Templates.getTplliston() + myvera.util.Templates.getTplphone() + '</tpl>'
    }
});