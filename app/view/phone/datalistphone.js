Ext.define('myvera.view.phone.datalistphone', {
    extend: 'Ext.tab.Panel',
    xtype: 'datalistphone',
    config: {
	   layout:'card',
	   activeItem: 0,
	   //tpl: myvera.util.Templates.getTpllist(),
	   tabBar: {hidden: true},
           items: [
	   {
		xtype: 'dataview',
		title: 'menu',
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
		
		items: [
		{
			xtype: 'toolbar',
			docked: 'top',
			ui: 'light',
			title: locale.getSt().title.rooms,
			items: [
			    {
				    xtype: 'button',
				    iconMask: true,
				    iconCls: 'arrow_right',
				    name: 'slidebutton2',
				    handler: function() {
					    console.log(this.getParent().getParent().getParent().id);
					    this.getParent().getParent().getParent().toggleContainer2();
				    }
			    },
			    {
				    xtype: 'button',
				    iconMask: true,
				    iconCls: 'add',
				    name: 'hideshow2',
				    handler: function() {
					    myvera.app.getController('myvera.controller.contdevices').showHideMenu();
				    }
			    }
			    ]
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
		    title: 'liste',
		    itemId: 'listInRoom',
		    id: 'listInRoom',
		    //styleHtmlContent:true,
		    //itemCls:'deviceview',
		    disableSelection: true,
		    emptyText: locale.getSt().misc.nodevice,
		    store: 'devicesStore',
		    items: [{
			    xtype: 'toolbar',
			    itemId: 'toolbar',
			    //title: {
				    //title: locale.getSt().misc.noroom,
				    //centered: true,
				    //width: 200,
				    //left:300
			    //},
			    //title: 'Pas de pièce',
			    docked: 'top',
			    items: [
			    {
				    xtype: 'button',
				    iconMask: true,
				    iconCls: 'arrow_left',
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
			    },
			    {
			    	    xtype: 'title',
			    	    itemId: 'title',
			    	    title : locale.getSt().misc.noroom
			    }
			    ]
		    }]
	    }
	    ]
    },
    
    toggleContainer: function() {
	    //var list = this.down('#list');
	    this.setActiveItem(0);
    },
    
    toggleContainer2: function() {
	    //var listInRoom = this.down('#listInRoom');
	    this.setActiveItem(1);
    },
    
    onSelect: function(view, record) {
            //console.log('You selected ' + record.get('name'));
	    var listInRoom = this.down('#listInRoom');
	    listInRoom.down('#toolbar').down('#title').setTitle(record.get('name'));
	    //var tpl = '<tpl if="room==' + record.get('id') + '">' + myvera.util.Templates.getTplphone() +'</tpl>';
	    var tpl= '<tpl if="!(category==1001&&(subcategory==0||subcategory==3||subcategory==4))"><div <tpl if="room==' + record.get('id') + '"> class="listdevice"<tpl else> style="display:none;"</tpl> >' + myvera.util.Templates.getTplphonefull()+ '</div></tpl>';
	    
	    listInRoom.setItemTpl(tpl);
	    listInRoom.refresh();
	    this.setActiveItem(listInRoom);
        }
    
});
