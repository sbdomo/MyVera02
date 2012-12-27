Ext.define('myvera.profile.Phone', {
    extend: 'Ext.app.Profile',

    config: {
        name: 'Phone',
        views: ['Main', 'datalistphone', 'listclockphone', 'panelinfophone', 'datalistonphone', 'datalistoffphone',
		 'PanelConfigphone']
    },
//'HomePanelphone', 
    isActive: function() {
	if(Ext.os.is.Phone || (Ext.Viewport.getWindowWidth()<481)) {
	//if(Ext.os.is.Phone) {
		console.log("Phone Profile");
		return true;
		//return  Ext.os.is.Desktop;
	} else {
		return false;
	}
    },
    
    launch: function() {
	    console.log("launch phone");
	    Ext.Viewport.add(Ext.create('myvera.view.phone.Main'));
    }

});