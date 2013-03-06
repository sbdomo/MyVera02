Ext.define('myvera.view.dataliston', {
	extend: 'Ext.DataView',
	//id:'dataliston',
	xtype: 'dataliston',
	stores: ['devicesStore'],
	requires:['myvera.util.Templates'],
	config: {
		//styleHtmlContent:true,
		//itemCls:'deviceview',
		disableSelection: true,
		//itemTpl:  '<tpl if="(verif!=\'off\'&&verif!=\'no\')&&(((category==4||category==103||category==120)&&tripped==1)||(category!=4&&status==1))">'+
		// myvera.util.Templates.getTpllist() + '</tpl>',
		emptyText: locale.getSt().misc.nodevice,
		store: 'devicesStore'
	}
});