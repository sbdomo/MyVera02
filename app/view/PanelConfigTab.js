Ext.define('myvera.view.PanelConfigTab', {
	extend: 'Ext.form.Panel',
	xtype: 'PanelConfigTab',
	requires: [
        'Ext.field.Text'
    ],
    
	config: {
		name:'PanelConfigTab',
		itemId:"PanelConfigTab",
		//styleHtmlContent: true,
		//scrollable: 'vertical',
		defaults: {
			labelWidth: '120px'
		},
		items: [
		{
			xtype: 'textfield',
			label: locale.getSt().field.name,
			//id: 'name',
			itemId: 'name',
			name: 'name'
		},
		{
			xtype: 'selectfield',
			label: locale.getSt().field.icon,
			name:'cls',
			itemId:'cls',
			inputCls: "tabfont",
			//defaultType: 'panel',
			defaultTabletPickerConfig: {
				cls:'tabfont'
			}//,
//			options: [
//			{text: 'a', value:'a'},
//			{text: 'b', value: 'b'},
//			{text: 'c', value: 'c'},
//			{text: 'd', value: 'd'},
//			{text: 'e', value: 'e'},
//			{text: 'f', value: 'f'},
//			{text: 'g', value: 'g'},
//			{text: 'h', value: 'h'}
//			]
		},
		{
			xtype: 'textfield',
			label: locale.getSt().field.index,
			name: 'ind',
			itemId: 'ind',
			value: 90
		},
		{
			xtype: 'button',
			text: locale.getSt().field.addsave,
			ui: 'confirm',
			iconCls: 'add',
			iconMask: true,
			margin: 5,
			name: 'savetab',
			itemId: 'savetab'
		},
                {
			xtype: 'button',
			text: locale.getSt().field.deletesave,
			margin: 5,
			iconCls: 'trash',
			ui: 'decline',
			iconMask: true,
			hidden: true,
			name: 'deletetab',
			itemId: 'deletetab'
		}		],
		listeners:{
			updatedata:function(e,d){
				if(d.id!=0) e.down('#deletetab').show();
				e.down('#savetab').setIconCls('refresh');
				e.down('#savetab').setText(locale.getSt().button.save);

				e.down('#name').setValue(d.name);
				
				var options = [];
				//console.log("a: "+"a".charCodeAt(0)); 
				//de a à z
				for($i=97;$i<=122;$i++) {
					var newstr = String.fromCharCode($i);
					options.push({text: newstr, value: $i});
				}
				//de A à Z
				for($i=65;$i<=90;$i++) {
					var newstr = String.fromCharCode($i);
					options.push({text: newstr, value: $i});
				}
				//de 0 à 9
				for($i=48;$i<=57;$i++) {
					var newstr = String.fromCharCode($i);
					options.push({text: newstr, value: $i});
				}
				e.down('#cls').setOptions(options);
				
				e.down('#cls').setValue(d.cls);
				e.down('#ind').setValue(d.ind);
			}
		}
		
	}
});