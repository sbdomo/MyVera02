Ext.define('myvera.store.ConfigDevicesStore', {
	extend: 'Ext.data.Store',
	requires: ['myvera.store.storeRooms'],
	config: {
		storeId: 'ConfigDevicesStore',
		model: 'myvera.model.Configdevices',
		sorters: [
			{
				property : 'room',
				direction: 'ASC'
			},
			{
				property : 'name',
				direction: 'ASC'
			}
		],
		grouper: {
			groupFn: function(record) {
				var roomname = record.get('room');
				var roomsection = "0";
				if (Ext.getStore('Rooms').getById(record.get('room'))) {
					roomname = Ext.getStore('Rooms').getById(record.get('room')).get('name');
					roomsection = Ext.getStore('Rooms').getById(record.get('room')).get('section');
				}
				return '<div class="head' + roomsection + '">' + roomname + '</div>';
				//return '<div class="head'+ record.get('etage') + '">' + roomname + '</div>';
			}
		},
		//the local contacts.json file
		proxy: {
			type: 'ajax',
			url: './protect/syncvera.php',
			reader: {
				type: 'json',
				rootProperty: 'devices'
			}
		}
	}
});