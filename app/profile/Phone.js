Ext.define('myvera.profile.Phone', {
    extend: 'Ext.app.Profile',

    config: {
        name: 'Phone',
        //views: ['myvera.view.phone.Main', 'myvera.view.phone.HomePanelphone', 'myvera.view.phone.datalistphone', 'myvera.view.phone.listclockphone']
        views: ['Main', 'HomePanelphone', 'datalistphone', 'listclockphone', 'panelinfophone', 'datalistonphone', 'datalistoffphone']
    },

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