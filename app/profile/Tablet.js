Ext.define('myvera.profile.Tablet', {
    extend: 'Ext.app.Profile',

    config: {
        name: 'Tablet',
        //views: ['myvera.view.tablet.Main', 'myvera.view.tablet.HomePanel', 'myvera.view.tablet.datalist','myvera.view.tablet.listclock']
	views: ['Main', 'HomePanel', 'datalist','listclock', 'panelinfo', 'dataliston', 'datalistoff']
    },

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