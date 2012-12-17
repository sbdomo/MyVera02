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
				//console.log('etage ' + record.get('etage') + " / " + this.config.idfloor);
				if(record.get('etage')==this.config.idfloor) {
					//console.log("left: " + record.get('left') + " target: " + target.getX());
					record.set('left', record.get('left')+target.getX());
					record.set('top', record.get('top')+target.getY());
				} else if(record.get('etage1')==this.config.idfloor) {
					record.set('left1', record.get('left1')+target.getX());
					record.set('top1', record.get('top1')+target.getY());
				} else if(record.get('etage2')==this.config.idfloor) {
					record.set('left2', record.get('left2')+target.getX());
					record.set('top2', record.get('top2')+target.getY());
				} else {
					alert("Pas d'étage trouvé !");
					return;
				}
				
				Ext.getCmp('carouselitemmove').toggleSwipe(true);
				myvera.app.getController('myvera.controller.contconfig').alertDirtydevices();
				
			}
			
		}
	}
});