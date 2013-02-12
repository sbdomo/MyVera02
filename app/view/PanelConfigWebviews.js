Ext.define('myvera.view.PanelConfigWebviews', {
	extend: 'Ext.DataView',
	xtype: 'PanelConfigWebviews',
	id:'PanelConfigWebviews',
	stores: ['devicesStore'],
	//requires: ['myvera.store.ConfigDevicesStore'],
	config: {
		emptyText: 'Aucun module',
		store: 'devicesStore',
		//cls: 'slidelist',
		selectedCls: 'listroomselect',
		itemTpl: '<tpl if="category==1001"><div class="listwebview">'+
		'<div class="listwebviewimg"><img style="height:18px; margin-bottom:10px;" src="resources/images/indic/<tpl if="state==0">dvert<tpl else>drouge</tpl>{retina}.png" />'+
				'<img style="height:40px;" src="resources/images/l<tpl if="icon!=null">{icon}'+
				'<tpl else>1001{subcategory}</tpl>_0{retina}.png" /></div>'+
				'<div class="listroomtext"><span class="listroomtext"><tpl if="ind!=null">{ind} - </tpl>{name}</span>'+
					'<div class="x-list" style="float:right;"/><div class="x-list-disclosure"></div></div></div>'+
			'</div></tpl>',
		listeners: {
			itemtap: function(view, index, target, record, event){
				console.log('tap');
				if (event.getTarget('.x-list-disclosure')) {
					Ext.getCmp('PanelConfigNavigation').push({
							xtype: 'PanelConfigWebview',
							title: 'Edition',
							layout: 'vbox',
							//tpl: '<div style="text-align:center"><img style="width:290px" src="./resources/config/img/' + pathview + '"></div>',
							data: record.getData()
					});
				}
			}
		}
	}
});