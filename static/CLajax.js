function Clajax(url,type,params,callback){
	if(!url||!type||url==''||type==''){
		callback('url或type参数错误！',false);
		
	}else{
		$.ajax({
			url:'http://10.122.91.97:8080/web'+url,//腰豪
			type:type,
			data:params,
			dataTypr:'json',

			success:function(res){
				callback(JSON.parse(res),true)
			},
			error:function(res){
				callback(JSON.parse(res),false)
			},
		})
	}
};
function Clajax2(url,type,params,callback){
	if(!url||!type||url==''||type==''){
		callback('url或type参数错误！',false);
		
	}else{
		$.ajax({
			url:'http://10.122.95.131:8080/web'+url,//刘明辉
			//url: 'http://10.150.173.24:8081/web'+url,//服务器
			type:type,
			data:params,
			dataTypr:'json',
			success:function(res){
				callback(JSON.parse(res),true)
			},
			error:function(res){
				callback(JSON.parse(res),false)
			},
		})
	}
};