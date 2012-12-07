Ext.define('myvera.util.Templates', {
    alias : 'widget.Templates',
    singleton : true,
    config: {
tplplan: '<tpl if="category==1000&&subcategory!=1">'+
		 '" class="scene">'+
		 	'<div class="devicon">'+
		 		'<img class="deviceImage" src="./resources/images/'+
					'<tpl if="state==-2">jaune<tpl elseif="state==-3">rouge<tpl else>vide</tpl>'+
					'.png" style="background-image: url(./resources/images/d<tpl if="icon!=null">{icon}<tpl else>1000</tpl>_0.png)" />'+
			'</div><div class="txtscene">'+
		 		'<span class="scenemiddle"<tpl if="color!=null> style="color:#{color};"</tpl> >{name}</span><div>'+
		 	 '</div>'+
	'<tpl else>'+
	
	' height: 50px; width: 50px; z-index: 6; background-image: url(./resources/images/d'+
	    '<tpl if="category==2||category==3||category==4||category==8||category==101||category==103||category==120">'+
	    	'<tpl if="icon!=null">{icon}<tpl elseif="category==4&&subcategory==4">44<tpl else>{category}</tpl>_<tpl if="category==4||category==103||category==120">{tripped}<tpl else>{status}</tpl>'+
	    '<tpl elseif="category==6||category==16||category==17||category==18||category==21||category==102||category==1000">'+
		'<tpl if="icon!=null">{icon}<tpl else>{category}</tpl>_0'+
	    '<tpl else>0_0</tpl>.png); " class="x-img x-floating">'+
	    
	    '<tpl if="state==-2"><img src="./resources/images/jaune.png" /><tpl elseif="state==-3"><img src="./resources/images/rouge.png" />'+
	    '<tpl elseif="(category==4||category==103)&&armed==0"><img src="./resources/images/darm.png" />'+
	    '<tpl elseif="category==120"><tpl if="armed==1&&var3==\'off\'"><img src="./resources/images/doff.png" />'+
	    	'<tpl elseif="armed==0&&var3==\'off\'"><img src="./resources/images/darmoff.png" /><tpl elseif="armed==0&&var3==\'on\'"><img src="./resources/images/darm.png" /></tpl>'+
	    '</tpl>'+
	    
	    '<tpl if="category==16&&var1!=null"><div class="texticon"<tpl if="color!=null> style="color:#{color};"</tpl> >{var1} %</div>'+
	    '<tpl elseif="category==17&&var1!=null"><div class="texticon"<tpl if="color!=null> style="color:#{color};"</tpl> >{var1} °C</div>'+
	    '<tpl elseif="category==18&&var1!=null"><div class="texticon"<tpl if="color!=null> style="color:#{color};"</tpl> >{var1} %</div>'+
	    '<tpl elseif="category==21&&watts!=null"><div class="texticon"<tpl if="color!=null> style="color:#{color};"</tpl> >{watts} W</div>'+
	    '<tpl elseif="(category==2||category==8)&&level!=null&&watts!=null"><div class="texticon"<tpl if="color!=null> style="color:#{color};"</tpl> >{level} %<br/>{watts} W</div>'+
	    '<tpl elseif="(category==2||category==8)&&level!=null"><div class="texticon"<tpl if="color!=null> style="color:#{color};"</tpl> >{level} %</div>'+
	    '<tpl elseif="category==3&&watts!=null"><div class="texticon"<tpl if="color!=null> style="color:#{color};"</tpl> >{watts} W</div>'+
	    '<tpl elseif="category==120&&var1!=null"><div class="texticon"<tpl if="color!=null> style="color:#{color};"</tpl> >{var1}<tpl if="subcategory==1&&var2!=null"><br/>{var2}</tpl></div>'+
	    '</tpl>'+
	'</div></tpl>',
	
tpllist: "",
tplphone: "",
	
tpllisticon:'<div class="devicon">'+
			'<img class="deviceImage" src="./resources/images/'+
				'<tpl if="state==-2">jaune<tpl elseif="state==-3">rouge<tpl else>vide</tpl>'+
				'.png" style="background-image: url(./resources/images/l'+
				'<tpl if="category==2||category==3||category==4||category==8||category==101||category==103||category==120">'+
					'<tpl if="icon != null">{icon}<tpl elseif="category==4&&subcategory==4">44'+
					'<tpl elseif="category==120&&subcategory==1">121<tpl elseif="category==120&&subcategory==2">122'+
					'<tpl else>{category}</tpl>'+
					'_<tpl if="category==4||category==103||category==120">{tripped}<tpl else>{status}</tpl>'+
				'<tpl elseif="category==6||category==16||category==17||category==18||category==21||category==102||category==1000">'+
					'<tpl if="icon!=null">{icon}<tpl else>{category}</tpl>_0'+
	   			'<tpl else>0_0</tpl>.png);" />'+
			'</div>',
			
tplfooter: '<div class="footer"><tpl if="watts != null&&category!=3&&category!=21"><span class="wattfooter">{watts} W</span></tpl>' +
    	'<tpl if="comment!=\'\'&&comment!=null">{comment}<tpl else>&nbsp;</tpl></div>',

tplcontenu: '<tpl if="category==4&&armed!= null"><div>'+
				'<img class="armed" src="./resources/images/arm{armed}.png" /> '+
				'</div>'+
			'<tpl elseif="category==16"><div class="vargros"><tpl if="var1==null">&nbsp;<tpl else>{var1} %</tpl></div>'+
			'<tpl elseif="category==17"><div class="vargros"><tpl if="var1==null">&nbsp;<tpl else>{var1} °C</tpl></div>'+
			'<tpl elseif="category==18"><div class="vargros"><tpl if="var1==null">&nbsp;<tpl else>{var1} %</tpl></div>'+
			'<tpl elseif="category==21||category==3"><div class="vargros"><tpl if="watts==null">&nbsp;<tpl else>{watts} W</tpl></div>'+
			'<tpl elseif="category==101"><div class="var"><tpl if="var1==null">&nbsp;<tpl else>{var1}</tpl><br /><tpl if="var2==null">&nbsp;<tpl else>{var2}</tpl></div>'+
			'<tpl elseif="category==102"><div class="var"><tpl if="var1==null">&nbsp;<tpl else>{var1}</tpl><br /><tpl if="var2==null">&nbsp;<tpl else>{var2}</tpl><br /><tpl if="var3==null">&nbsp;<tpl else>{var3}</tpl><br /><tpl if="var4==null">&nbsp;<tpl else>{var4}</tpl> <tpl if="var5==null">&nbsp;<tpl else>{var5}</tpl></div>'+
			'<tpl elseif="category==103"><div><div class="longvar"><tpl if="var1==null">&nbsp;<tpl else>{var1}</tpl></div>'+
					'<tpl if="armed!= null"><div class="clock2"><img class="armed2" src="./resources/images/arm{armed}.png" /></div></tpl></div>'+
			'<tpl elseif="category==120"><div><div class="clock1"><tpl if="var1==null">&nbsp;<tpl else>{var1}</tpl><br /><tpl if="var2==null||subcategory!=1">&nbsp;<tpl else>{var2}</tpl></div>'+
					'<tpl if="armed!= null"><div class="clock2"><img class="armed2" src="./resources/images/arm{armed}.png" /></div></tpl>'+
					'<div class="clock3"><tpl if="var3==null">&nbsp;<tpl else><img class="clocknext" src="./resources/images/{var3}.png" /></tpl></div></div>'+
			'<tpl elseif="category==2||category==8"><div>'+
				'<div class="devicelevel1">'+
					'<div class="lpourcent"><tpl if="level != null">{level} %<tpl else> </tpl></div>'+
					'<img class="d25" src="./resources/images/25<tpl if="level&gt;=25">on</tpl>.png" />'+
					'<img class="d50" src="./resources/images/50<tpl if="level&gt;=50">on</tpl>.png" />'+
				'</div>'+
				'<div class="devicelevel2">'+
					'<img class="d75" src="./resources/images/75<tpl if="level&gt;=75">on</tpl>.png" /> '+
					'<img class="d100" src="./resources/images/100<tpl if="level==100">on</tpl>.png" />'+
				'</div>'+
				'</div>'+
			'</tpl>',

tplliston: '<tpl if="(verif!=\'off\'&&verif!=\'no\')&&(((category==4||category==103||category==120)&&tripped==1)||(category!=4&&status==1))">',
tpllistoff: '<tpl if="(verif==\'off\'&&(((category==4||category==103||category==120)&&tripped==0)||(category!=4&&category!=103&&category!=120&&status==0)))||'+
	'(verif!=\'no\'&&(category==4||category==103||category==120)&&armed==0)">'
},
    
    constructor : function(config) {
        this.initConfig(config);
        this.callParent([config]);
    },
    applyTplphone : function() {
	    var result = '<div class="listdevice">' +this.config.tpllisticon +
	    '<div class="listdevicename">{name}</div>'+this.config.tplcontenu+
	    this.config.tplfooter + '</div>';
	    return result;    },
    applyTpllist : function() {
	    var result = '<div class="devicecadre"><div class="devtitle">{name}</div>'+
		'<div class="devmain">'+ this.config.tpllisticon + '<div class="contenu">'+ this.config.tplcontenu + '</div></div>' +
		this.config.tplfooter + '</div>';
	    return result;
     }
});