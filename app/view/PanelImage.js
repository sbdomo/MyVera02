Ext.define('myvera.view.PanelImage', {
	extend: 'Ext.Panel',
	xtype: 'PanelImage',
	id:'PanelImage',
	requires: ['Ext.Img'],
	config: {
		fullscreen: true,
		items: [
			{
			xtype: 'image',
			itemId:'image',
			width:'100%',
			height:'100%',
			//width: 1024,
			//height: 768,
			listeners:{
				tap:function(e,t){
					typepanel = 'PanelConfigItem';
					if (this.getParent().config.data.typepanel=='scene') {
						typepanel = 'PanelConfigScene';
					} else if (this.getParent().config.data.typepanel=='webview') {
						typepanel = 'PanelConfigWebview';
					}
					var itempanel = Ext.getCmp(typepanel);
					var numetage = this.getParent().config.data.etage;
					
					Ext.getCmp(typepanel).down('#LeftItem'+numetage).setValue(t.pageX);
					Ext.getCmp(typepanel).down('#TopItem'+numetage).setValue(t.pageY);
					Ext.getCmp('PanelConfigNavigation').pop();
				}
			}
			}
		],
		listeners:{
			painted:function(e,d){
				var floors = Ext.getStore('FloorsStore');
				var floor = floors.getById(this.config.data.id);
				//var path = floor.get('path');
				//this.getParent().down('image').setSrc('./resources/config/img/' + path);
				var background="";
				if(myvera.app.isretina=="@2x"&&floor.get('pathretina')!="") {
					background='background-size: '+floor.get('widthretina')+'px; background-image: url(./resources/config/img/'+floor.get('pathretina')+'); background-repeat: no-repeat; background-position: 0px 0px;';
				} else {
					background='background:url(./resources/config/img/'+floor.get('path')+') no-repeat left top;';
				}
				this.getParent().down('image').setStyle(background);
			}
		}
	}
});