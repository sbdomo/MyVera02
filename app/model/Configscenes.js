Ext.define('myvera.model.Configscenes', {
	extend: 'Ext.data.Model',

	config: {
		//give the store some fields
		fields: [
			{name: 'id', type: 'string'},
			{name: 'name', type: 'string'},
			{name: 'state', type: 'int'},
			{name: 'room', type: 'int'},
			{name: 'category', type: 'int'},
			{name: 'subcategory', type: 'int', defaultValue:0},
			{name: 'etage', type: 'int', defaultValue: -1},
			{name: 'left', type: 'int'},
			{name: 'top', type: 'int'},
			{name: 'etage1', type: 'int', defaultValue: -1},
			{name: 'left1', type: 'int'},
			{name: 'top1', type: 'int'},
			{name: 'etage2', type: 'int', defaultValue: -1},
			{name: 'left2', type: 'int'},
			{name: 'top2', type: 'int'},
			{name:'color', type: 'string', defaultValue:'000000'},
			{name: 'icon', type: 'int'},
			{name: 'width', type: 'int', defaultValue:50},
			{name: 'ind', type: 'int'},
			{name:'retina', type: 'string', convert: function(value, record) { return myvera.app.isretina; } }
		],
		idProperty: 'id'
	}
});