Ext.define('myvera.store.storeRooms', {
    extend: 'Ext.data.Store',
    config: {
            model: 'myvera.model.modelRooms',
	    //autoLoad: true,
	    storeId: 'Rooms',
	    sorters: [
	    //{
		//    property: 'section',
		//    direction: 'ASC'
	    //},
	    {
		    property: 'name',
		    direction: 'ASC'
	    }
	    ],
	    proxy: {
		    type: 'ajax',
		    url: './protect/config/rooms.json',
		    reader: {
			    type: 'json',
			    rootProperty: 'rooms'
		    }
	    }
    }
}
);