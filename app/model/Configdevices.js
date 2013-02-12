Ext.define('myvera.model.Configdevices', {
	extend: 'Ext.data.Model',

	config: {
		//give the store some fields
		fields: [
			{name: 'id', type: 'string'},
			{name: 'name', type: 'string'},
			{name: 'state', type: 'int'},
			{name: 'room', type: 'int'},
			{name: 'category', type: 'int'},
			{name: 'subcategory', type: 'int'},
			{name: 'etage', type: 'int', defaultValue: -1},
			{name: 'left', type: 'int'},
			{name: 'top', type: 'int'},
			{name: 'etage1', type: 'int', defaultValue: -1},
			{name: 'left1', type: 'int'},
			{name: 'top1', type: 'int'},
			{name: 'etage2', type: 'int', defaultValue: -1},
			{name: 'left2', type: 'int'},
			{name: 'top2', type: 'int'},
			{name: 'color', type: 'string', defaultValue:'000000'},
			{name: 'icon', type: 'int'},
			{name: 'verif', type: 'string', defaultValue:"yes"},
			{name: 'sceneon', type: 'int'},
			{name: 'sceneoff', type: 'int'},
			{name: 'camuser', type: 'string'},
			{name: 'campassword', type: 'string'},
			{name: 'graphlink', type: 'string'},
			{name: 'width', type: 'int', defaultValue:50},
			{name: 'ind', type: 'int'},
			{name:'retina', type: 'string', convert: function(value, record) { 			var result="";
			if(myvera.app.isretina=="@2x") result= "@2x"
			return result; } }
		],
		idProperty: 'id'
	}
});