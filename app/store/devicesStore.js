Ext.define('myvera.store.devicesStore', {
	extend: 'Ext.data.Store',
	requires: ['myvera.store.storeRooms'],
	config: {
		model: 'myvera.model.Veradevices',
		//give the store some fields
		//fields: ['name', 'id'],

		//filter the data using the name field
	 
		storeId: 'devicesStore',
		sorters: [
			{
				property: 'ind',
				direction: 'ASC'
			},
//			{
//				property : 'room',
//				direction: 'ASC'
//			},
			{
				property: 'category',
				direction: 'ASC'
			},
			{
				property: 'name',
				direction: 'ASC'
			}
		],
//		grouper: {
//			groupFn: function(record) {
//				var roomname = record.get('room');
//				var roomsection = "0";
//				if (Ext.getStore('Rooms').getById(record.get('room'))) {
//					roomname = Ext.getStore('Rooms').getById(record.get('room')).get('name');
//					roomsection = Ext.getStore('Rooms').getById(record.get('room')).get('section');
//				}
//				return '<div class="head' + roomsection + '">' + roomname + '</div>';
				//return '<div class="head'+ record.get('etage') + '">' + roomname + '</div>';
//			}
//		},
		//setup the proxy for the store to use an ajax proxy and give it a url to load
		//the local contacts.json file
		proxy: {
			type: 'ajax',
			url: './protect/config/devices.json',
			//api: {
			//	read: './protect/config/devices.json',
			//	update: "./protect/savedevices.php"
			//},
			reader: {
				type: 'json',
				rootProperty: 'devices'
			},
			writer: {
				type: 'json',
				rootProperty: 'devices'
			}
		}

		//sorters: 'name',

		//autoload the data from the server
//		autoLoad: true,
//		listeners: {
//			load: function(store) {
//				Ext.Msg.alert('Test',Ext.getStore('devplan1Store').getById(35).get('name'))
			    //store.each(function(record) {
			    //                    });
//		    }
//	    },
	}

});