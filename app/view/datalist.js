Ext.define('myvera.view.datalist', {
    extend: 'Ext.Container',
    id:'datalist',
    xtype: 'datalist',
    config: {
	   layout:'card',
	   tpl: '<div class="devicecadre">'+ myvera.util.Templates.getTpllist() + '</div>',
	   
           items: [
	   {
		xtype: 'dataview',
		itemId: 'list',
		cls: 'slidelist',
		selectedCls: 'listroomselect',
		//baseCls: 'listroom',
		itemTpl: '<tpl if="hidden!=true"><div class="listroom"><tpl if="icon!=null&&icon!=\'\'">'+ 
			'<div class="listroomimg"><img  style="height:40px;" src="resources/images/rooms/{icon}.png" /></div>' +
			'<div class="listroomtext"><span class="listroomtext">{name}</span></div>'+
			'<tpl else><div class="listroomnoicon"><span class="listroomtext2">{name}</span>'+
			'</div></tpl></div></tpl>',
			
		itemTplz: '<tpl if="hidden!=true"><div class="listroom2"><tpl if="icon!=null&&icon!=\'\'"><div class="listconfigimg2">'+
		'<img style="height:40px;" src="resources/images/rooms/{icon}.png" /></div></tpl><div class="listconfig2"><span class="listconfig2">{name}</span></div></div></tpl>',
		
		
		store: 'Rooms',
		
		docked: 'left',
		width: 235,
		hidden: true,
		items: [
		{
			xtype: 'toolbar',
			docked: 'top',
			ui: 'light',                    
			title: {
				title: 'Pièces',
				centered: true,
				//width: 200,
				//left: 0
			}
		}],
		listeners: {
			select: function(view, record) {
				this.getParent().onSelect(view, record);
			},
			updatedata:function(e,d){
				console.log('updatedata datalist-list');
			}
		}

	    },
	    {
		    xtype: 'dataview',
		    itemId: 'listInRoom',
		    id: 'listInRoom',
		    styleHtmlContent:true,
		    itemCls:'deviceview',
		    disableSelection: true,
		    //itemTpl:  '<tpl for="."><div class="devicecadre">'+
		    //	myvera.util.Templates.getTpllist() +
			//'</div></tpl>',
		    emptyText: 'Aucun module',
		    store: 'devicesStore',
		    items: [{
			    xtype: 'toolbar',
			    itemId: 'toolbar',
			    title: 'Pas de pièce',
			    docked: 'top',
			    items: [
			    {
				    xtype: 'button',
				    iconMask: true,
				    iconCls: 'more',
				    name: 'slidebutton',
				    handler: function() {
					    console.log(this.getParent().getParent().getParent().id);
					    this.getParent().getParent().getParent().toggleContainer();
				    }
			    }
			    ]
		    }],
	    }
	    ],
    },
    
    toggleContainer: function(duration) {
	list = this.down('#list');
	if(list.isHidden()) {
	    this.down('#list').show();
	    //{type: 'slide', direction: 'right'}
	} else {
	    this.down('#list').hide();
	}
    },
    
    onSelect: function(view, record) {
            //console.log('You selected ' + record.get('name'));
	    var listInRoom = this.down('#listInRoom');
	    listInRoom.down('#toolbar').setTitle(record.get('name'));
	    var tpl ='<tpl if="room==' + record.get('id') + '">' + this.config.tpl +'</tpl>';
	    listInRoom.setItemTpl(tpl);
	    listInRoom.refresh();
        }
    
});
