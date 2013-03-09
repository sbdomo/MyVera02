Ext.define('myvera.util.locale', {
    singleton: true,
    alternateClassName: 'locale',
    requires: ['Ext.Ajax'],
    config: {
	st: ""
    },
    constructor : function(config) {
	me=this;
	Ext.Ajax.request({
		url: './resources/locales/lang.json',
		async:false,
		method: 'POST',
		success: function(result){
			me.config.st = Ext.decode(result.responseText, true);
			if(!me.config.st) alert('Error localization');
			me.initConfig(config);
			//me.callParent([config]);
		},
		failure: function(response) {
			alert('Error localization');
		}
	});
    }
});

