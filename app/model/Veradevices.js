Ext.define('myvera.model.Veradevices', {
	extend: 'Ext.data.Model',

	config: {
		//give the store some fields
		fields: [
			{name: 'id', type: 'string'},
			{name: 'name', type: 'string'},
			{name: 'status', type: 'int'},
			{name: 'state', type: 'int'},
			{name: 'room', type: 'int'},
			{name: 'level', type: 'int'},
			{name: 'category', type: 'int'},
			{name: 'subcategory', type: 'int'},
			{name: 'watts', type: 'int'},
			{name: 'etage', type: 'int'},
			{name: 'left', type: 'int'},
			{name: 'top', type: 'int'},
			{name: 'etage1', type: 'int', defaultValue: -1},
			{name: 'left1', type: 'int'},
			{name: 'top1', type: 'int'},
			{name: 'etage2', type: 'int', defaultValue: -1},
			{name: 'left2', type: 'int'},
			{name: 'top2', type: 'int'},
			{name:'color', type: 'string', defaultValue:'000000'},
			{name:'fontsize', type: 'string', defaultValue:'10px'},
			{name: 'tripped', type: 'int'},
			{name: 'icon', type: 'int'},
			{name: 'verif', type: 'string', defaultValue:"yes"},
			{name: 'sceneon', type: 'int'},
			{name: 'sceneoff', type: 'int'},
			{name: 'camuser', type: 'string'},
			{name: 'campassword', type: 'string'},
			{name: 'graphlink', type: 'string'},
			{name: 'comment', type: 'string'},
			{name: 'armed', type: 'int'},
			{name: 'var1', type: 'string'},
			{name: 'var2', type: 'string'},
			{name: 'var3', type: 'string'},
			{name: 'var4', type: 'string'},
			{name: 'var5', type: 'string'},
			{name: 'var6', type: 'string'},
			{name: 'ind', type: 'int'}
		],
		idProperty: 'id'
	}
});