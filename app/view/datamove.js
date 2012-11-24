Ext.define('myvera.view.datamove', {
	extend: 'Ext.DataView',
	xtype: 'datamove',
	requires:['Ext.util.Draggable', 'Ext.ux.util.Draggable', 'myvera.util.Templates'],
	stores: ['devicesStore'],
	config: {
		emptyText: 'Aucun module',		
		store: 'devicesStore',
		scrollable: false,
		listeners:{
			itemtouchstart: function(me, index, target, record, e, eOpts) {
				console.log('element tap!');
				Ext.getCmp('carouselitemmove').toggleSwipe(false);
				var currentdrag = new Ext.util.Draggable({
						element : target,
						//direction: 'both',
						//revert:true,
						constraint: ({
							min: { x: -Infinity, y: -Infinity },
							max: { x: Infinity, y: Infinity }
						})
				});
				currentdrag.revert = true;
			},
			itemtouchend: function(me, index, target, record, e, eOpts) {
				console.log('element x'+ target.getX() + ' y:' + (target.getY()));
				record.set('left', record.get('left')+target.getX());
				record.set('top', record.get('top')+target.getY());
				Ext.getCmp('carouselitemmove').toggleSwipe(true);
				myvera.app.getController('myvera.controller.contconfig').alertDirtydevices();
				
			}
			
		}
	}
});