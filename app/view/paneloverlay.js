Ext.define('myvera.view.paneloverlay', {
	extend: 'Ext.form.Panel',
	xtype: 'paneloverlay',
	id: 'paneloverlay',
	requires: ['Ext.ux.field.DateTimePicker', 'Ext.field.Hidden', 'Ext.form.FieldSet'],
	config: {
		modal: true,
		hideOnMaskTap: true,
		centered: true,
		width: '400px',
		height: '290px',
		items:[
			{
				xtype: 'fieldset',
				name:'fieldset1',
				id:'titleform',
				instructions: 'Programmation du réveil...',
				items: [
				{
					xtype: 'hiddenfield',
					name: 'deviceid'
				},
				{
					xtype: 'datetimepickerfield',
					name: 'heuredeb',
					label: 'Heure début',
					dateTimeFormat : 'H:i:s',
					picker: {
						yearFrom: 1998,
						minuteInterval : 1,
						secondeInterval : 1,
						slotOrder: ['hour','minute','seconde']
					}
				},
				{
					xtype: 'datetimepickerfield',
					name: 'heurefin',
					label: 'Arrêt',
					dateTimeFormat : 'H:i:s',
					picker: {
						yearFrom: 1998,
						minuteInterval : 1,
						secondeInterval : 1,
						slotOrder: ['hour','minute','seconde']
					}
				},
				{
					xtype: 'textfield',
					name: 'message',
					label: 'Message'
				}
				]
			},
			{
				xtype: 'button',
				name: 'saveclock',
				ui: 'confirm',
				text: 'Sauver'
			}
		]
	}
});