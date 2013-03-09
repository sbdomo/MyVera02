Ext.define('myvera.view.PanelConfigRoom', {
	extend: 'Ext.form.Panel',
	xtype: 'PanelConfigRoom',
	requires: [
        'Ext.field.Text'
    ],
    
	config: {
		defaults: {
				labelWidth: '135px'
		},
		items: [
		{
			html:"",
			itemId: 'titlePanelConfigRoom',
			tpl: [ '<tpl if="icon!=null&&icon!=\'\'"><img style="float: left;" height="40px" src="resources/images/rooms/{icon}{retina}.png" /></tpl>' +
			'<p style="line-height: 40px">&nbsp;&nbsp;{name} - ID: {id}</p><p>&nbsp;</p>' ]
		},
		{
			xtype: 'textfield',
			label: locale.getSt().field.iconname,
			name: 'icon',
			itemId: 'icon'
		},
		{
			xtype: 'textfield',
			label: locale.getSt().field.index,
			name: 'ind',
			itemId: 'ind'
		},
		{
			xtype: 'togglefield',
			name: 'hidden',
			itemId: 'hidden',
			label: locale.getSt().misc.hideroom
		},
		{
			xtype: 'button',
			text: locale.getSt().button.update,
			ui: 'confirm',
			iconCls: 'refresh',
			iconMask: true,
			margin: 5,
			name: 'saveroom',
			itemId: 'saveroom',
			handler: function(){
				var form = this.getParent();
				var formdata = form.getValues();
				var data = form.config.data;
				var rooms = Ext.getStore('Rooms');
				
				room = rooms.getById(data.id);
				room.set("icon", formdata.icon);
				room.set("hidden", formdata.hidden);
				room.set("ind", formdata.ind);
				
				Ext.getCmp('PanelConfigRoomsNavigation').pop();
				myvera.app.getController('myvera.controller.contconfig').alertDirtyrooms();
			}
		}
		],

		listeners:{
			updatedata:function(e,d){
				console.log('updatedata PanelCongifRoom');
				var label = this.down('#titlePanelConfigRoom');
				var html = label.getTpl().apply(e.config.data);
				label.setHtml(html);
				e.down('#icon').setValue(d.icon);
				e.down('#hidden').setValue(d.hidden);
				e.down('#ind').setValue(d.ind);
				
				
				//Pour changer l'icone du titre quand icon est modifié
				this.down('#icon').addListener('change', function(me,newvalue,oldvalue, opt){
					if(newvalue!="") this.getParent().config.data.icon = newvalue;
					else this.getParent().config.data.icon = null;
					var label = this.getParent().down('#titlePanelConfigRoom');
					var html = label.getTpl().apply(this.getParent().config.data);
					label.setHtml(html);
				});
			}
		}
		
	}
});