Ext.define('myvera.view.PanelConfigGenerale', {
	extend: 'Ext.form.Panel',
	xtype: 'PanelConfigGenerale',
	id:'PanelConfigGenerale',
	requires: ['Ext.i18n.Bundle', 'Ext.field.Hidden', 'Ext.field.Password', 'Ext.field.Toggle'],
	config: {
		items: [
		{
			xtype: 'fieldset',
			defaults: {
				labelWidth: '140px'
			},
			title: Ext.i18n.Bundle.message('msg.connect'),
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
				placeHolder: Ext.i18n.Bundle.message('field.name')
			},
			{
				xtype: 'passwordfield',
				name: 'pass',
				placeHolder: Ext.i18n.Bundle.message('field.pass')
			},
			{
				xtype: 'textfield',
				label: Ext.i18n.Bundle.message('field.ipvera'),
				//id: 'ipvera',
				name: 'ipvera',
				placeHolder: 'Ex: 192.168.0.1'
			},
			{
				xtype: 'selectfield',
				label: Ext.i18n.Bundle.message('field.profil'),
				name:'viewprofil',
				itemId:'viewprofil',
				options: [
				{text: Ext.i18n.Bundle.message('profil.default'), value:'0'},
				{text: Ext.i18n.Bundle.message('profil.name', {num: '1'}),  value: '1'},
				{text: Ext.i18n.Bundle.message('profil.name', {num: '2'}),  value: '2'},
				{text: Ext.i18n.Bundle.message('profil.name', {num: '3'}),  value: '3'},
				{text: Ext.i18n.Bundle.message('profil.name', {num: '4'}),  value: '4'},
				{text: Ext.i18n.Bundle.message('profil.name', {num: '5'}),  value: '5'},
				{text: Ext.i18n.Bundle.message('profil.name', {num: '6'}),  value: '6'}
				]
			},
			{
				xtype: 'button',
				text: Ext.i18n.Bundle.message('button.auth'),
				name: 'loginbutton',
				ui: 'confirm'
			}
			]
		},
		{
			xtype: 'fieldset',
			defaults: {
				labelWidth: '190px'
			},
			title: Ext.i18n.Bundle.message('msg.screen'),
			items: [
			{
				xtype: 'togglefield',
				name: 'isVueL',
				value: 1,
				label: Ext.i18n.Bundle.message('button.landscape')
			},
			{
				xtype: 'togglefield',
				name: 'isVueP',
				value: 0,
				label: Ext.i18n.Bundle.message('button.portrait')
			},
			{
				xtype: 'togglefield',
				name: 'isReveil',
				value: 1,
				label: Ext.i18n.Bundle.message('main.listclock')
			},
			{
				xtype: 'togglefield',
				name: 'isTab',
				value: 1,
				label: Ext.i18n.Bundle.message('button.tabbarshow')
			},
			{
				xtype: 'togglefield',
				name: 'isRetina',
				value: 0,
				label: Ext.i18n.Bundle.message('msg.retina')
			},
			{
				xtype: 'button',
				text: Ext.i18n.Bundle.message('msg.retina'),
				hidden: true,
				name: 'retinabutton'
				//ui: 'confirm'
			}
			]
		},
		{
			xtype: 'button',
			text: Ext.i18n.Bundle.message('button.searchversion'),
			name: 'versionbutton'
			//ui: 'confirm'
		},
		{
			name: 'urlversion',
			hidden: true,
			html:''
		}
			
		]
	}
});