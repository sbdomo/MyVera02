Ext.define('myvera.model.CurrentUser', {
	extend: 'Ext.data.Model',
	config: {
		fields: [
			{name: 'id', type: 'int'},
			{name: 'ipvera', type: 'string'},
			{name: 'name', type: 'string'},
			{name: 'pass', type: 'string'},
			{name: 'isVueL', type: 'boolean', defaultValue: true},
			{name: 'isVueP', type: 'boolean', defaultValue: true},
			{name: 'isReveil', type: 'boolean', defaultValue: true},
			{name: 'isTab', type: 'boolean', defaultValue: true},
			{name: 'profil', type: 'integer'},
			{name: 'isRetina', type: 'string', defaultValue: ""},
			{name: 'autoVue', type: 'boolean', defaultValue: false},
			{name: 'autoBord', type: 'boolean', defaultValue: false}
		],

		proxy: {
			type: 'localstorage',
			id: 'login-data'
		}
	}
});
