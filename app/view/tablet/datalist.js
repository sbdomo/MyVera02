Ext.define('myvera.view.tablet.datalist', {
    extend: 'Ext.Container',
    xtype: 'datalist',
    config: {
	   layout:'card',
	   //tpl: myvera.util.Templates.getTpllist(),
	   
           items: [
	   {
		xtype: 'dataview',
		itemId: 'list',
		cls: 'slidelist',
		selectedCls: 'listroomselect',
		//baseCls: 'listroom',
		itemTpl: '<tpl if="hidden!=true"><div class="listroom"><tpl if="icon!=null&&icon!=\'\'">'+ 
		'<div class="listroomimg"><img  style="height:40px;" src="resources/images/rooms/{icon}{retina}.png" /></div>' +
			'<div class="listroomtext"><span class="listroomtext">{name}</span></div>'+
			'<tpl else><div class="listroomnoicon"><span class="listroomtext2">{name}</span>'+
			'</div></tpl></div></tpl>',
		
		store: 'Rooms',
		
		docked: 'left',
		width: 235,
		//hidden: true,
		items: [
		{
			xtype: 'toolbar',
			docked: 'top',
			ui: 'light',                    
			title: 'Pièces'
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
			    },
			    {
				    xtype: 'button',
				    iconMask: true,
				    iconCls: 'add',
				    name: 'hideshow',
				    handler: function() {
					    myvera.app.getController('myvera.controller.contdevices').showHideMenu();
				    }
			    }
			    ]
		    }]
	    }
	    ]
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
	    //var tpl ='<tpl if="room==' + record.get('id') + '">' + myvera.util.Templates.getTpllist() +'</tpl>';
	    var tpl= '<tpl if="!(category==1001&&(subcategory==0||subcategory==3))"><div <tpl if="room==' + record.get('id') + '"> class="devicecadre"<tpl else> style="display:none;"</tpl> >' + myvera.util.Templates.getTpllistfull()+ '</div></tpl>';
	    
	    listInRoom.setItemTpl(tpl);
	    listInRoom.refresh();
        }
    
});
