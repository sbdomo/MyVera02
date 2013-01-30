Ext.define('myvera.util.Templates', {
    alias : 'widget.Templates',
    singleton : true,
    config: {
//avant tplplan: <tpl if="etage==... puis <div style="top:<tpl if="etage=='+floor.get('id')+'">{top}px; left:{left}px;
//Se décompose ensuite : tplplan + tplpanwebview + tplpanfin ou tplplan + tplpanwebviewmove + tplpanfin
tplplan: '<tpl if="category==1000&&subcategory!=1">'+
		 '" class="scene">'+
		 	'<div class="devicon">'+
				'<img class="deviceImage" src="./resources/images/d'+
					'<tpl if="icon!=null">{icon}<tpl else>1000</tpl>_0{retina}.png" />'+
				'<img class="indic2" src="./resources/images/indic/'+
					'<tpl if="state==-2">djaune<tpl elseif="state==-3">drouge<tpl else>vide</tpl>'+
				'{retina}.png">'+
			'</div><div class="txtscene">'+
		 		'<span class="scenemiddle"<tpl if="color!=null> style="color:#{color};"</tpl> >{name}</span><div>'+
		 '</div>',
//Affichage des webviews dans une iframe
tplpanwebview:	'<tpl elseif="category==1001">'+
	' z-index:5;width:{width}px;height:{height}px;" class="x-img x-floating">'+
	'<iframe style="width:{width}px;height:{height}px;background:transparent;" src="{graphlink}" frameborder="no" scrolling="no" marginwidth="0" marginheight="0" noresize allowtransparency="true">Your device does not support iframes.</iframe></div>',
//Pour ne pas afficher l'iframe lors du drag and drop
tplpanwebviewmove: '<tpl elseif="category==1001">'+
' z-index:5;width:{width}px;height:{height}px; background-color:rgba(137,224,156,0.6);" class="x-img x-floating">{name}'+
	'</div>',

	
tplpanfin: '<tpl else> z-index: 6;" class="x-img x-floating">'+
	'<img <tpl if="retina==\'@2x\'">width="{width}px"</tpl>src="./resources/images/d'+
	    '<tpl if="category==2||category==3||category==4||category==7||category==8||category==101||category==103||category==120">'+
	    	'<tpl if="icon!=null">{icon}<tpl elseif="category==4&&subcategory==4">44<tpl else>{category}</tpl>_<tpl if="category==4||category==103||category==120">{tripped}<tpl else>{status}</tpl>'+
	    '<tpl elseif="category==6||category==16||category==17||category==18||category==21||category==102||category==1000">'+
		'<tpl if="icon!=null">{icon}<tpl else>{category}</tpl>_0'+
	    '<tpl elseif="category==104">'+
	    	'<tpl if="icon!=null">{icon}<tpl else>{category}</tpl>_{status}'+
	    '<tpl elseif="category==105">'+
	    	'<tpl if="icon!=null">{icon}<tpl else>{category}</tpl>_0'+
		'<tpl else>0_0</tpl>{retina}.png" />'+
	    
	    '<tpl if="state==-2"><img class="indic" src="./resources/images/indic/djaune{retina}.png" />'+
	    '<tpl elseif="state==-3"><img class="indic" src="./resources/images/indic/drouge{retina}.png" />'+
	    '<tpl elseif="state==2"><img class="indic" src="./resources/images/indic/dalert{retina}.png" />'+
	    '<tpl elseif="(category==4||category==103)&&armed==0"><img class="indic" src="./resources/images/indic/darm{retina}.png" />'+
	    '<tpl elseif="category==120"><tpl if="armed==1&&var3==\'off\'"><img class="indic" src="./resources/images/indic/doff{retina}.png" />'+
	    	'<tpl elseif="armed==0&&var3==\'off\'"><img class="indic" src="./resources/images/indic/darmoff{retina}.png" /><tpl elseif="armed==0&&var3==\'on\'"><img class="indic" src="./resources/images/indic/darm{retina}.png" /></tpl>'+
	    '</tpl>'+
	    
	    '<tpl if="category==16&&var1!=null"><div class="texticon" style=\'font-size:{fontsize};<tpl if="color!=null"> color:#{color};</tpl>\' >{var1} %</div>'+
	    '<tpl elseif="category==17&&var1!=null"><div class="texticon" style=\'font-size:{fontsize};<tpl if="color!=null"> color:#{color};</tpl>\' >{var1} °C</div>'+
	    '<tpl elseif="category==18&&var1!=null"><div class="texticon" style=\'font-size:{fontsize};<tpl if="color!=null"> color:#{color};</tpl>\' >{var1} %</div>'+
	    '<tpl elseif="category==21&&(watts!=null||var1!=null)"><div class="texticon" style=\'font-size:{fontsize};<tpl if="color!=null"> color:#{color};</tpl>\' ><tpl if="watts!=null">{watts} W<br/></tpl><tpl if="var1!=null">{var1} kwh</tpl></div>'+
	    '<tpl elseif="(category==2||category==8)&&level!=null&&watts!=null"><div class="texticon" style=\'font-size:{fontsize};<tpl if="color!=null"> color:#{color};</tpl>\' >{level} %<br/>{watts} W</div>'+
	    '<tpl elseif="(category==2||category==8)&&level!=null"><div class="texticon" style=\'font-size:{fontsize};<tpl if="color!=null"> color:#{color};</tpl>\' >{level} %</div>'+
	    '<tpl elseif="category==3&&watts!=null"><div class="texticon" style=\'font-size:{fontsize};<tpl if="color!=null"> color:#{color};</tpl>\' >{watts} W</div>'+
	    '<tpl elseif="category==120&&var1!=null"><div class="texticon" style=\'font-size:{fontsize};<tpl if="color!=null"> color:#{color};</tpl>\' >{var1}<tpl if="subcategory==1&&var2!=null"><br/>{var2}</tpl></div>'+
	    '<tpl elseif="category==104"><div class="texticon" style=\'font-size:{fontsize};<tpl if="color!=null"> color:#{color};</tpl>\' >'+
	    		'<tpl if="status==0">OFF<tpl elseif="status==1">HG<tpl elseif="status==2">ECO<tpl elseif="status==3">CONF</tpl></div>'+
	    '<tpl elseif="category==105"><div class="texticon" style=\'font-size:{fontsize};<tpl if="color!=null"> color:#{color};</tpl>\' >'+
	    '<tpl if="status==0">OFF<br/>&nbsp;<tpl elseif="status==1">Inactif<br/>&nbsp;<tpl elseif="status==2">Forcé<br/>&nbsp;<tpl elseif="status==3">Auto. {var4} <tpl if="var4==\'Heating\'">Conf.<br/>{var2}<tpl else>Eco.<br/>{var3}</tpl>°C</tpl></div>'+
		'<div style=\'font-weight:bold; text-shadow: 0 0 5px white; font-size:{fontsize}; position: absolute; color:#009ade; width:50px; text-align:center; top: 25%;"\' > {var1}°C </div>'+
	    '</tpl>'+
	'</div></tpl>',
	
tpllist: "",
tplphone: "",
tpllistfull: "",
tplphonefull: "",
	
tpllisticon2:'<div class="devicon">'+
			'<img class="deviceImage" src="./resources/images/indic/'+
				'<tpl if="state==-2">jaune<tpl elseif="state==-3">rouge<tpl elseif="state==2">alert<tpl else>vide</tpl>'+
				'{retina}.png" style="background-image: url(./resources/images/l'+
				'<tpl if="category==2||category==3||category==4||category==7||category==8||category==101||category==103||category==120">'+
					'<tpl if="icon != null">{icon}<tpl elseif="category==4&&subcategory==4">44'+
					'<tpl elseif="category==120&&subcategory==1">121<tpl elseif="category==120&&subcategory==2">122'+
					'<tpl else>{category}</tpl>'+
					'_<tpl if="category==4||category==103||category==120">{tripped}<tpl else>{status}</tpl>'+
				'<tpl elseif="category==6||category==16||category==17||category==18||category==21||category==102||category==104||category==105||category==1000">'+
					'<tpl if="icon!=null">{icon}<tpl else>{category}</tpl>_0'+
	   			'<tpl else>0_0</tpl>{retina}.png);" />'+
			'</div>',

tpllisticon:'<div class="devicon">'+
			'<img class="deviceImage" src="./resources/images/l'+
				'<tpl if="category==2||category==3||category==4||category==7||category==8||category==101||category==103||category==120">'+
					'<tpl if="icon != null">{icon}<tpl elseif="category==4&&subcategory==4">44'+
					'<tpl elseif="category==120&&subcategory==1">121<tpl elseif="category==120&&subcategory==2">122'+
					'<tpl else>{category}</tpl>'+
					'_<tpl if="category==4||category==103||category==120">{tripped}<tpl else>{status}</tpl>'+
				'<tpl elseif="category==6||category==16||category==17||category==18||category==21||category==102||category==104||category==105||category==1000">'+
					'<tpl if="icon!=null">{icon}<tpl else>{category}</tpl>_0'+
	   			'<tpl else>0_0</tpl>{retina}.png" />'+
	   			'<img class="indic2" src="./resources/images/indic/'+
					'<tpl if="state==-2">djaune<tpl elseif="state==-3">drouge<tpl elseif="state==2">dalert<tpl else>vide</tpl>'+
				'{retina}.png">'+
			'</div>',
			
tplfooter: '<div class="footer"><tpl if="watts != null&&category!=3&&category!=21"><span class="wattfooter">{watts} W</span>'+
		'<tpl elseif="category==104"><span class="wattfooter"><tpl if="status==0">OFF<tpl elseif="status==1">HG<tpl elseif="status==2">ECO<tpl elseif="status==3">CONF</tpl></span>'+
		'</tpl>' +
		'<tpl if="comment!=\'\'&&comment!=null">{comment}<tpl else>&nbsp;</tpl>' + '</div>',

tplcontenu: '<tpl if="category==4&&armed!= null"><div>'+
'<img class="armed" src="./resources/images/indic/arm{armed}{retina}.png" /> '+
				'</div>'+
			'<tpl elseif="category==16"><div class="vargros"><tpl if="var1==null">&nbsp;<tpl else>{var1} %</tpl></div>'+
			'<tpl elseif="category==17"><div class="vargros"><tpl if="var1==null">&nbsp;<tpl else>{var1} °C</tpl></div>'+
			'<tpl elseif="category==18"><div class="vargros"><tpl if="var1==null">&nbsp;<tpl else>{var1} %</tpl></div>'+
			'<tpl elseif="category==3"><div class="vargros"><tpl if="watts==null">&nbsp;<tpl else>{watts} W</tpl></div>'+
			'<tpl elseif="category==21"><div class="vargros"><tpl if="watts==null">&nbsp;<tpl else>{watts} W</tpl><br /><tpl if="var1!=null">{var1} kwh</tpl></div>'+
			'<tpl elseif="category==101"><div class="var"><tpl if="var1==null">&nbsp;<tpl else>{var1}</tpl><br /><tpl if="var2==null">&nbsp;<tpl else>{var2}</tpl></div>'+
			'<tpl elseif="category==102"><div class="var"><tpl if="var1==null">&nbsp;<tpl else>{var1}</tpl><br /><tpl if="var2==null">&nbsp;<tpl else>{var2}</tpl><br /><tpl if="var3==null">&nbsp;<tpl else>{var3}</tpl><br /><tpl if="var4==null">&nbsp;<tpl else>{var4}</tpl> <tpl if="var5==null">&nbsp;<tpl else>{var5}</tpl></div>'+
			'<tpl elseif="category==103"><div><div class="longvar"><tpl if="var1==null">&nbsp;<tpl else>{var1}</tpl></div>'+
			'<tpl if="armed!= null"><div class="clock2"><img class="armed2" src="./resources/images/indic/arm{armed}{retina}.png" /></div></tpl></div>'+
			'<tpl elseif="category==104">'+
					'<img class="i0" src="./resources/images/plugin/pw0_<tpl if="status==0">1<tpl else>0</tpl>{retina}.png" />'+
					'&nbsp;&nbsp;&nbsp;<img class="i1" src="./resources/images/plugin/pw1_<tpl if="status==1">1<tpl else>0</tpl>{retina}.png" />'+
					'&nbsp;&nbsp;&nbsp;<img class="i2" src="./resources/images/plugin/pw2_<tpl if="status==2">1<tpl else>0</tpl>{retina}.png" />'+
					'&nbsp;&nbsp;&nbsp;<img class="i3" src="./resources/images/plugin/pw3_<tpl if="status==3">1<tpl else>0</tpl>{retina}.png" />'+
			'<tpl elseif="category==105">'+
				'<div class="vargros">{var1}°C</div><div class="varcenter">'+
				'<tpl if="status==0">OFF<tpl elseif="status==1">Inactif<tpl elseif="status==2">Forcé<tpl elseif="status==3">Auto. <tpl if="var4==\'Heating\'">Confort<br />{var2}<tpl else>Eco.<br />{var3}</tpl>°C</tpl></div>'+
			'<tpl elseif="category==120"><div><div class="clock1"><tpl if="var1==null">&nbsp;<tpl else>{var1}</tpl><br /><tpl if="var2==null||subcategory!=1">&nbsp;<tpl else>{var2}</tpl></div>'+
			'<tpl if="armed!= null"><div class="clock2"><img class="armed2" src="./resources/images/indic/arm{armed}{retina}.png" /></div></tpl>'+
					'<div class="clock3"><tpl if="var3==null">&nbsp;<tpl else><img width="42px" class="clocknext" src="./resources/images/indic/{var3}{retina}.png" /></tpl></div></div>'+
			'<tpl elseif="category==2||category==8"><div>'+
				'<div class="devicelevel1">'+
					'<div class="lpourcent"><tpl if="level != null">{level} %<tpl else> </tpl></div>'+
					'<img class="d25" src="./resources/images/indic/25<tpl if="level&gt;=25">on</tpl>{retina}.png" />'+
					'<img class="d50" src="./resources/images/indic/50<tpl if="level&gt;=50">on</tpl>{retina}.png" />'+
				'</div>'+
				'<div class="devicelevel2">'+
					'<img class="d75" src="./resources/images/indic/75<tpl if="level&gt;=75">on</tpl>{retina}.png" /> '+
					'<img class="d100" src="./resources/images/indic/100<tpl if="level==100">on</tpl>{retina}.png" />'+
				'</div>'+
				'</div>'+
			'</tpl>',

tplliston: '<tpl if="(verif!=\'off\'&&verif!=\'no\')&&(((category==4||category==103||category==120)&&tripped==1)||(category!=4&&category!=104&&category!=105&&category!=7&&status==1)||(category==7&&status==0))">',
tpllistoff: '<tpl if="(verif==\'off\'&&('+
	'((category==4||category==103||category==120)&&tripped==0)||'+
	'(category!=4&&category!=103&&category!=120&&category!=7&&status==0)||(category==7&&status==1)))||'+
	'(verif!=\'no\'&&(category==4||category==103||category==120)&&armed==0)">'
    },
    
    constructor: function(config) {
        this.initConfig(config);
        this.callParent([config]);
    },
    applyTplphone: function() {
	    var result = '<div class="listdevice">' +this.config.tpllisticon +
	    '<div class="listdevicename">{name}</div>'+this.config.tplcontenu+
	    this.config.tplfooter + '</div>';
	    return result;    },
    applyTpllist: function() {
	    var result = '<div class="devicecadre"><div class="devtitle">{name}</div>'+
		'<div class="devmain">'+ this.config.tpllisticon + '<div class="contenu">'+ this.config.tplcontenu + '</div></div>' +
		this.config.tplfooter + '</div>';
	    return result;
     },
     
     applyTpllistfull: function() {
	    var result = '<div class="devtitle">{name}</div>'+
		'<div class="devmain">'+ this.config.tpllisticon + '<div class="contenu">'+ this.config.tplcontenu + '</div></div>' +
		this.config.tplfooter;
	    return result;
     },
     
     applyTplphonefull: function() {
	    var result = this.config.tpllisticon +
	    '<div class="listdevicename">{name}</div>'+this.config.tplcontenu+
	    this.config.tplfooter;
	    return result;
     }
});