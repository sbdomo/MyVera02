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
			{name: 'subcategory', type: 'int'},
			{name: 'left', type: 'int'},
			{name: 'top', type: 'int'},
			{name: 'etage', type: 'int'},
			{name:'color', type: 'string'},
			{name: 'icon', type: 'int'}
		],
		idProperty: 'id'
	}
});