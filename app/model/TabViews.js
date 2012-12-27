Ext.define('myvera.model.TabViews', {
    extend: 'Ext.data.Model',

    config: {
            //give the store some fields
            fields: [
	            {name: 'id',  type: 'auto'},
		    {name: 'name',  type: 'string'},
		    {name: 'cls',  type: 'integer', defaultValue: 2}
		    ],
	    idProperty: 'id'
    }
    });