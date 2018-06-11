module.exports={
	myAjax : function(obj,callbackparam){
		$.ajax({
		  	url: 'http://10.122.95.131:8080/web/'+obj.url,//刘明辉
		  	//url: 'http://10.150.173.24:8081/web/'+obj.url,//服务器
		  	data: obj.requireData ? obj.requireData:'',
		  	dataType: 'json',
		  	type: obj.requireType ? obj.requireType:'get',
		  	timeout: 10000, 
		  	async: obj.async ? obj.async:'true',
		  	success: callbackparam,
		  	error: function(XMLHttpRequest, textStatus, errorThrown){
		  		if(textStatus=='timeout'){
		  			alert('请求超时')
		  		}
		  	}
		})
	},
	myAjax2 : function(obj,callbackparam){
		$.ajax({
		  	url: 'http://10.122.91.97:8080/'+obj.url,//腰豪
		  	data: obj.requireData,
		  	dataType: 'json',
		  	type: obj.requireType,
		  	timeout: 10000, 
		  	async: obj.async,
		  	success: callbackparam,
		  	error: function(XMLHttpRequest, textStatus, errorThrown){
		  		if(textStatus=='timeout'){
		  			alert('请求超时')
		  		}
		  	}
		})
	},
}