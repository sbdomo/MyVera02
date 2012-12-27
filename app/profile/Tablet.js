Ext.define('myvera.profile.Tablet', {
    extend: 'Ext.app.Profile',

    config: {
        name: 'Tablet',
	views: ['Main', 'datalist','listclock', 'panelinfo', 'dataliston', 'datalistoff',
		 'PanelConfig']
    },
//'HomePanel', 
    isActive: function() {
	    if(Ext.os.is.Phone || (Ext.Viewport.getWindowWidth()<481) ) {
		    return false;

	    } else {
		    console.log("Tablet Profile");
		    return true;
	    }
    },
    
    launch: function() {
	    console.log("launch tablet");
	    Ext.Viewport.add(Ext.create('myvera.view.tablet.Main'));
    }
});