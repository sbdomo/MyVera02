Ext.define('myvera.view.dataplan', {
	extend: 'Ext.DataView',
	xtype: 'dataplan',
	requires:['Ext.i18n.Bundle','myvera.util.Templates'],
	stores: ['devicesStore'],
	config: {
		emptyText: Ext.i18n.Bundle.message('msg.devices'),		
		store: 'devicesStore',
		styleHtmlContent: true,
		scrollable: null,
		listeners:{
			itemtaphold: function(view, index, target, record, event){
				//2: Dimmable light, 8: Window Covering
			   if (Ext.Array.contains([2, 8], record.data.category)) {
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