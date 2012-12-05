Ext.define('myvera.controller.Application', {
	extend: 'Ext.app.Controller',
	requires: ['Ext.DataView', 'Ext.util.DelayedTask'],

	config: {
		views: ['carouselplan', 'PanelConfigGenerale', 'PanelConfigFloorsNavigation', 'PanelConfigNavigation', 'PanelConfigRoomsNavigation','paneloverlay'],
		stores: ['ConfigDevicesStore', 'devicesStore', 'FloorsStore', 'ConfigScenesStore'],
		models: ['Veradevices', 'Configdevices', 'modelRooms','CurrentUser', 'Floors', 'Configscenes'],
		//'Main','datalist','HomePanel','listclock', 'panelinfo','dataliston','datalistoff', 'PanelConfig',
		panel3dL: false,
		panel3dP: false,
		
		refs: {
		},
		control: {
			'viewport': {
				//capture the orientation change event
				orientationchange: 'onOrientationchange'
			}
		}
	},
	// called when the Application is launched, remove if not needed
	launch: function(app) {
				this.initViewport();
	},
	initViewport: function() {
		//Ext.Viewport.add(Ext.create('myvera.view.Main'));
		Ext.getCmp('homepanel').getTabBar().hide();		
		
//		if (Ext.os.is.Android) {
//			        var height = Ext.Viewport.getWindowHeight();
//				var width = Ext.Viewport.getWindowWidth();
//				if(width > height){
//					var orientation = 'landscape';
//				} else {
//					var orientation = 'portrait';
//				}
//		} else {
//			var orientation = Ext.Viewport.getOrientation();
//		}
//		if(orientation=="landscape") {
//			Ext.getCmp('homepanel').setActiveItem(Ext.getCmp('carouselplan'));
//		} else {
		Ext.getCmp('homepanel').setActiveItem(Ext.getCmp('datalist'));
//		}
		Ext.Viewport.add(Ext.create('myvera.view.paneloverlay'));
		Ext.getCmp('paneloverlay').hide();
	},
	onOrientationchange: function(viewport, orientation, width, height) {
		
		//comment mettre this.panel3d plutôt que this.getApplication().getController('Application').getPanel3d() ?
		if (Ext.os.is.Android) {
				if(width > height){
					orientation = 'landscape';
				} else {
					orientation = 'portrait';
				}
		}
		
		var vue=false;
		if(orientation=='landscape') {
			vue=this.getApplication().getController('Application').getPanel3dL()
		} else {
			vue=this.getApplication().getController('Application').getPanel3dP()
		}
		
		var homepanel = Ext.getCmp('homepanel');
		console.log('orientationchange : ' + homepanel.id);
		if(vue) {
			if(homepanel.getActiveItem().id=='datalist') homepanel.setActiveItem(Ext.getCmp('carouselplan'));
		} else {
			if(homepanel.getActiveItem().id=='carouselplan') homepanel.setActiveItem(Ext.getCmp('datalist'));
		}
	},
	
	getOrientationFix: function() {
		var orientation='';
		if (Ext.os.is.Android) {
			var height = Ext.Viewport.getWindowHeight();
			var width = Ext.Viewport.getWindowWidth();
			if(width > height){
				orientation = 'landscape';
			} else {
				orientation = 'portrait';
			}
		} else {
			orientation = Ext.Viewport.getOrientation();
		}
		return orientation;
	}
});
