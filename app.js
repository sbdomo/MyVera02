//<debug>
Ext.Loader.setPath({
    'Ext': 'touch/src',
    'myvera': 'app'
});
//</debug>

Ext.application({
    name: 'myvera',
    controllers: [
        'Application','contdevices', 'contconfig'
	],

    requires: [
        'Ext.MessageBox',
	'myvera.util.locale',
	'myvera.util.Templates',
	'Ext.ux.field.SliderFieldExtended'
    ],

    //views: ['Main'],

    profiles: ['Phone', 'Tablet'],
    
    icon: {
        '57': 'resources/icons/Icon.png',
        '72': 'resources/icons/Icon~ipad.png',
        '114': 'resources/icons/Icon@2x.png',
        '144': 'resources/icons/Icon~ipad@2x.png'
    },
    glossOnIcon: true,
    isIconPrecomposed: false,

    startupImage: {
        '320x460': 'resources/startup/320x460.jpg',
        '640x920': 'resources/startup/640x920.png',
        '768x1004': 'resources/startup/768x1004.png',
        '748x1024': 'resources/startup/748x1024.png',
        '1536x2008': 'resources/startup/1536x2008.png',
        '1496x2048': 'resources/startup/1496x2048.png'
    },
    
    isretina: "",
    setIsretina: function(value) {
	    this.isretina = value;
    },
    
    launch: function() {
	if(locale.getSt().lang!="en") {
		var MB = Ext.MessageBox;
		Ext.apply(MB, {
			YES: { text: locale.getSt().button.yes, itemId: 'yes', ui: 'action' },
			NO: { text: locale.getSt().button.no, itemId: 'no' }
		});
		Ext.apply(MB, {
			YESNO: [MB.NO, MB.YES]
		});
	}
	// Destroy the #appLoadingIndicator element
        Ext.fly('appLoadingIndicator').destroy();

        // Initialize the main view
        //Ext.Viewport.add(Ext.create('myvera.view.Main'));
    },

    onUpdated: function() {
            //"Application Update",
            //"This application has just successfully been updated to the latest version. Reload now?",
        Ext.Msg.confirm(
		locale.getSt().msg.updateapp,
		locale.getSt().msg.updatedone,
            function(buttonId) {
                if (buttonId === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});
