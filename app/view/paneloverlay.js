Ext.define('myvera.view.paneloverlay', {
	extend: 'Ext.form.Panel',
	xtype: 'paneloverlay',
	id: 'paneloverlay',
	requires: ['Ext.ux.field.DateTimePicker', 'Ext.field.Hidden', 'Ext.form.FieldSet'],
	config: {
		modal: true,
		hideOnMaskTap: true,
		centered: true,
		hidden: true,
		width: '400px',
		height: '290px',
		maxWidth: '95%',
		maxHeight: '95%',
		items:[
			{
				xtype: 'fieldset',
				name:'fieldset1',
				id:'titleform',
				//instructions: locale.getSt().misc.clockprogram,
				defaults: {
					labelWidth: '100px'
				},
				items: [
				{
					xtype: 'hiddenfield',
					name: 'deviceid'
				},
				{
					xtype: 'datetimepickerfield',
					name: 'heuredeb',
					label: locale.getSt().misc.beginning,
					dateTimeFormat : 'H:i:s',
					picker: {
						cancelButton: locale.getSt().button.cancel,
						doneButton: locale.getSt().button.done,
						yearFrom: 1998,
						minuteInterval : 1,
						secondeInterval : 1,
						slotOrder: ['hour','minute','seconde']
					}
				},
				{
					xtype: 'datetimepickerfield',
					name: 'heurefin',
					label: locale.getSt().misc.stop,
					dateTimeFormat : 'H:i:s',
					picker: {
						cancelButton: locale.getSt().button.cancel,
						doneButton: locale.getSt().button.done,
						yearFrom: 1998,
						minuteInterval : 1,
						secondeInterval : 1,
						slotOrder: ['hour','minute','seconde']
					}
				},
				{
					xtype: 'textfield',
					name: 'message',
					label: locale.getSt().misc.msg
				}
				]
			},
			{
				xtype: 'button',
				name: 'saveclock',
				ui: 'confirm',
				text: locale.getSt().button.save
			}
		]
	}
});