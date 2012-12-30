Ext.define('myvera.model.modelRooms', {
    extend: 'Ext.data.Model',
    config: {
        //give the store some fields
        fields: [
			{name: 'id', type: 'int'},
			{name: 'name', type: 'string'},
			{name: 'icon', type: 'string'},
			{name: 'hidden', type: 'boolean'},
			{name: 'section', type: 'string'},
			{name: 'ind', type: 'int', defaultValue: 90}
		    ],
	    idProperty: 'id'
    }
});