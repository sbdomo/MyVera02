Ext.define('myvera.view.dataplan', {
	extend: 'Ext.DataView',
	xtype: 'dataplan',
	requires:['myvera.util.Templates'],
	stores: ['devicesStore'],
	config: {
		emptyText: 'Aucun module',		
		store: 'devicesStore',
		scrollable: false,
		listeners:{
			itemtaphold: function(view, index, target, record, event){
			   if(record.data.category==2){
				myvera.view.dataplan.lastTapHold = new Date();
				myvera.app.getController('myvera.controller.contdevices').onDeviceHoldTap(view, index, target, record, event);
			   }
			},
			itemsingletap: function(view, index, target, record, event){
			   if (!myvera.view.dataplan.lastTapHold || (myvera.view.dataplan.lastTapHold - new Date() > 1000)) {
				console.log('tap');
				myvera.app.getController('myvera.controller.contdevices').onDeviceTap(view, index, target, record, event);
			   }
			}
		}
	}
});