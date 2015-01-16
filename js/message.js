Msg = function(){
	this.count = 0;
	this.intips = [];
	this.outtips = [];
}

Msg.prototype.init = function()
{
	setInterval(function(){
	   g_msg.update();
	  },200
	);	 
}


function MsgTipCallback(){
	var tagid = g_msg.outtips.shift();
	var tag = document.getElementById(tagid);
	if (tag ){
		document.body.removeChild(tag);
	}	
}

Msg.prototype.tip = function(desc)
{
	this.intips.push(desc);
}

Msg.prototype.createtip = function(desc)
{
	var tagname = "msgtip"+this.count;
	this.count ++;
	tag = document.createElement("DIV");
	tag.id = tagname;
	tag.style.position="absolute";
tag.style.left="20px";
tag.style.top="600px";
tag.style.width="400px";
tag.style.fontSize="30px";
tag.style.fontWeight="bold";
tag.style.height="40px";
tag.style.color="yellow";
tag.style.textAlign="center";
//tag.style.backgroundColor="#275868";
tag.style.filter="alpha(opacity=95)";  /*支持 IE 浏览器*/
tag.style.opacity="0.95";  /*支持 Chrome, Opera, Safari 等浏览器*/
tag.style.zIndex="2000";
	tag.innerHTML = desc;
    document.body.appendChild(tag);
	$('#'+tagname).animate({marginTop:-440},2500,MsgTipCallback);
		//alert('aaa');

	return tagname;
}

Msg.prototype.showDuration = function(startDate)
{
        var endDate = new Date();
		var endS = endDate.getSeconds(); 
		var endM = endDate.getMilliseconds();

		var startS = startDate.getSeconds(); 
		var startM = startDate.getMilliseconds();	

		g_msg.tip("cost ms: "+((endS-startS)*1000+(endM-startM))); 
}

Msg.prototype.update = function()
{
	this.count++;
	if (this.count%5==0)
	{
		while (this.intips.length>0){
			var desc = g_msg.intips.shift();
			var tipid = this.createtip(desc);
			this.outtips.push(tipid);
			break;
		}
	}
}

var g_msg = new Msg()
g_msg.init();
