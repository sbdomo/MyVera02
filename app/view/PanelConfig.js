Ext.define('myvera.view.PanelConfig', {
	extend: 'Ext.tab.Panel',
	xtype: 'PanelConfig',
	//id:'PanelConfig',
		config: {
		ui: 'light',
		tabBar: {
			layout:{
				pack:'center'
			},
			scrollable: {
				direction: 'horizontal',
				directionLock: true
			}
		},
		activeTab: 1
	}
});