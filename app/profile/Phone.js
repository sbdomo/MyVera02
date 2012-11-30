Ext.define('myvera.profile.Phone', {
    extend: 'Ext.app.Profile',

    config: {
        name: 'Phone'
        //views: ['Main','datalist']
    },

    isActive: function() {
	if(Ext.os.is.Phone || (Ext.Viewport.getWindowWidth()<481)) {
		console.log("Phone Profile");
		return  Ext.os.is.Desktop;
	} else {
		return false;
	}
    }
    
//    launch: function() {
//	    Ext.Viewport.add(Ext.create('myvera.view.phone.Main'));
//    }

});