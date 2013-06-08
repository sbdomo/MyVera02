Ext.define('myvera.view.datamove', {
	extend: 'Ext.DataView',
	xtype: 'datamove',
	requires:['Ext.util.Draggable', 'myvera.util.Templates'],
	//, 'Ext.ux.util.Draggable'
	stores: ['devicesStore'],
	draggablerecord: new Array(),
	config: {
		emptyText: locale.getSt().misc.nodevice,
		store: 'devicesStore',
		scrollable: null,
		currentrecord: null,
		autoDestroy: false,
		listeners:{
			painted:function(e,d){
				myvera.app.getController('myvera.controller.contdevices').stopsynchro();
				console.log(this.id + " painted");
			},
			itemtouchstart: function(me, index, target, record, e, eOpts) {
				//console.log('element tap!');
				//Ext.getCmp('carouselitemmove').toggleSwipe(false);
				this.setCurrentrecord(record);

				//if(!target.hasCls('x-draggable')) {
				if(!Ext.Array.contains(this.draggablerecord, record.get('id'))) {
					console.log("create draggable", target);
					this.draggablerecord.push(record.get('id'));
					var currentdrag = new Ext.util.Draggable({
						element: target,
						//direction: 'both',
						//revert:true,
						constraint: ({
							min: { x: -Infinity, y: -Infinity },
							max: { x: Infinity, y: Infinity }
						}),
						listeners: {
							//drag: this.onDrag,
							dragend: this.onDrop,
							//dragstart: this.onDragStart,
							scope: this
						}
					});
				}
				//currentdrag.revert = true;
				//console.log('tap: getXY'+target.getX()+":"+target.getY());
			}
			
		}
	},
	//onDragStart: function(el, e, offsetX, offsetY, eOpts) {
	//	console.log('dragstart: offset:', el.getOffset());
	//},
	onDrop: function(el, e, offsetX, offsetY, eOpts) {
		var currecord=this.getCurrentrecord();
		console.log("drop left: " + currecord.get('left') + " offsetX: " + offsetX);
		//currecord.set('left', currecord.get('left'));
		//currecord.set('top', currecord.get('top'));
		//myvera.app.getController('myvera.controller.contdevices').stopsynchro();
		
		if(currecord.get('etage')==this.config.idfloor) {
			currecord.set('left', currecord.get('left')+ offsetX);
			currecord.set('top', currecord.get('top')+ offsetY);
		} else if(currecord.get('etage1')==this.config.idfloor) {
			currecord.set('left1', currecord.get('left1')+ offsetX);
			currecord.set('top1', currecord.get('top1')+ offsetY);
		} else if(currecord.get('etage2')==this.config.idfloor) {
			currecord.set('left2', currecord.get('left2')+ offsetX);
			currecord.set('top2', currecord.get('top2')+ offsetY);
		} else {
			alert(locale.getSt().misc.noview +" !");
			return;
		}
		el.setOffset(0,0);
				
		//el.setInitialOffset(0,0);
		//console.log('dragdrop: offset:', el.getOffset());
		//Ext.getCmp('carouselitemmove').toggleSwipe(true);
		myvera.app.getController('myvera.controller.contconfig').alertDirtydevices();
		
	}
});