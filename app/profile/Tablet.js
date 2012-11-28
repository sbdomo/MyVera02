Ext.define('myvera.profile.Tablet', {
    extend: 'Ext.app.Profile',

    config: {
        name: 'Tablet'
    },

    isActive: function() {
       	    if(Ext.os.is.Tablet) {
	    //if(Ext.os.is.Tablet || Ext.os.is.Desktop) {
		    console.log("Tablet Profile");
		    return true;
	    } else {
		    return false;
	    }
    }
});