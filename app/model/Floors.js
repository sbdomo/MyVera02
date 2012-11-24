Ext.define('myvera.model.Floors', {
    extend: 'Ext.data.Model',

    config: {
            //give the store some fields
            fields: [
	            {name: 'id',  type: 'auto'},
		    {name: 'name',  type: 'string'},
		    {name: 'path',  type: 'string'}
		    ],
	    idProperty: 'id'
    }
    });