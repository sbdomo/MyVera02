Ext.define('myvera.model.Floors', {
    extend: 'Ext.data.Model',

    config: {
            //give the store some fields
            fields: [
	        {name: 'id',  type: 'auto'},
		{name: 'name',  type: 'string'},
		{name: 'path',  type: 'string'},
		{name: 'pathretina',  type: 'string', defaultValue: ""},
		{name: 'widthretina', type: 'int', defaultValue: 0},
		{name: 'tab', type: 'int', defaultValue: 0},
		{name: 'ind', type: 'int', defaultValue: 90}
		    ],
	    idProperty: 'id'
    }
    });