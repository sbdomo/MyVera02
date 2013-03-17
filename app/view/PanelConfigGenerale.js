Ext.define('myvera.view.PanelConfigGenerale', {
	extend: 'Ext.form.Panel',
	xtype: 'PanelConfigGenerale',
	id:'PanelConfigGenerale',
	requires: ['Ext.field.Hidden', 'Ext.field.Password', 'Ext.field.Toggle'],
	config: {
		items: [
		{
			xtype: 'fieldset',
			defaults: {
				labelWidth: '125px'
			},
			title: locale.getSt().title.localconnect,
			//iconCls: 'home',
			//instructions: 'Connexion locale',
			items: [
			{
				xtype: 'hiddenfield',
				value:'0',
				name: 'connexion'
			},
			{
				xtype: 'textfield',
				name: 'login',
				autoCapitalize: false,
				placeHolder: locale.getSt().field.name
			},
			{
				xtype: 'passwordfield',
				name: 'pass',
				placeHolder: locale.getSt().field.password
			},
			{
				xtype: 'textfield',
				label: locale.getSt().field.veraip,
				//id: 'ipvera',
				name: 'ipvera',
				placeHolder: 'Ex: 192.168.0.1'
			},
			{
				xtype: 'selectfield',
				label: locale.getSt().field.profile.name,
				name:'viewprofil',
				itemId:'viewprofil',
				options: [
				{text: locale.getSt().field.profile['0'],  value: '0'},
				{text: locale.getSt().field.profile['1'],  value: '1'},
				{text: locale.getSt().field.profile['2'],  value: '2'},
				{text: locale.getSt().field.profile['3'],  value: '3'},
				{text: locale.getSt().field.profile['4'],  value: '4'},
				{text: locale.getSt().field.profile['5'],  value: '5'},
				{text: locale.getSt().field.profile['6'],  value: '6'}
				]
			},
			{
				xtype: 'button',
				text: locale.getSt().button.login,
				name: 'loginbutton',
				ui: 'confirm'
			}
			]
		},
		{
			xtype: 'fieldset',
			defaults: {
				labelWidth: '180px'
			},
			title: locale.getSt().misc.display,
			items: [
			{
				xtype: 'togglefield',
				name: 'isVueL',
				value: 1,
				label: locale.getSt().misc.landscapeview//,
				//labelWidth: '60%'
			},
			{
				xtype: 'togglefield',
				name: 'isVueP',
				value: 0,
				label: locale.getSt().misc.portraitview//,
				//labelWidth: '40%'
			},
			{
				xtype: 'togglefield',
				name: 'isReveil',
				value: 1,
				label: locale.getSt().title.clocks//,
				//labelWidth: '40%'
			},
			{
				xtype: 'togglefield',
				name: 'isTab',
				value: 1,
				label: locale.getSt().misc.viewtabs//,
				//labelWidth: '40%'
			},
			{
				xtype: 'togglefield',
				name: 'isRetina',
				value: 0,
				label: locale.getSt().misc.retina//,
				//labelWidth: '40%'
			},
			{
				xtype: 'button',
				text: locale.getSt().misc.retina,
				hidden: true,
				name: 'retinabutton'
				//ui: 'confirm'
			}
			]
		},
		{
			xtype: 'button',
			text: locale.getSt().misc.newversion+' ?',
			name: 'versionbutton'
			//ui: 'confirm'
		},
		{
			name: 'urlversion',
			hidden: true,
			width:'250px',
			html:''
		}
			
		]
	}
});