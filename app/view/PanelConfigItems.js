Ext.define('myvera.view.PanelConfigItems', {
	extend: 'Ext.List',
	xtype: 'PanelConfigItems',
	id:'PanelConfigItems',
	//requires: ['myvera.store.ConfigDevicesStore'],
	config: {
		itemTpl: '<div class="listconfigimg" style="background-size: 18px; background-image: url(resources/images/indic/<tpl if="state==-4">dvert<tpl else>drouge</tpl>{retina}.png)">'+
		'<img style="height:40px; margin-left:20px;" src="resources/images/l<tpl if="icon!=null">{icon}'+
		'<tpl elseif="category==4&&(subcategory==4||subcategory==1)">4{subcategory}'+
		'<tpl elseif="category==120&&subcategory==1">121<tpl elseif="category==120&&subcategory==2">122'+
		'<tpl else>{category}</tpl>_0{retina}.png" /></div><div class="listconfig"><span class="listconfig"><tpl if="ind!=null">{ind} - </tpl>{name}</span></div>',
		store: 'ConfigDevicesStore',
		grouped: true,
		onItemDisclosure: true,
		variableHeights: false,
		listeners: {
			painted:function(e,d){
				myvera.app.getController('myvera.controller.contdevices').stopsynchro();
				console.log(this.id + " painted");
				
			}
		}
	}
});