module.exports = {
	getConnect:function(topic,clientId,cb,bool) {
		var clstrx ='58.87.86.143:61623';
		//var clstrx ='192.168.50.225:1884';
		var clstr =clstrx.split(":");
		console.log(555,clstr)
		var topic1 =  topic;
		var client = new Paho.MQTT.Client(clstr[0],clstr[1], clientId);//建立客户端实例  
			client.onConnectionLost = onConnectionLost;//注册连接断开处理事件 
			client.onMessageArrived = onMessageArrived;//注册消息接收处理事件
			client.connect({onSuccess:onConnect,userName:'admin',password:'password'});//连接服务器并注册连接成功处理事件
			function onConnect() {
					// Once a connection has been made, make a subscription and send a message.
					if(bool){
				      client.subscribe(topic1);
				      console.log("onConnect")
				    } else{
				      client.unsubscribe(topic1);
				      console.log("unConnect")
				    }
					// client.subscribe(topic1);      /**主题**/
					// message = new Paho.MQTT.Message("Hello");
					// message.destinationName = "World";
					// client.send(message);
			}
			// called when the client loses its connection
			function onConnectionLost(responseObject) {
					
					if (responseObject.errorCode !== 0) {
							// console.log(responseObject);
							console.log("onConnectionLost:"+responseObject.errorMessage);
							// this.props.getdata(dataa,pages);
							// console.log(11) 192.168.10.210a
							//cb('connectlost')
					}
			}

			// called when a message arrives
			function onMessageArrived(message) {
					// var fdata = (message._getPayloadString)();
					  console.log(22,message)
					var fdata = JSON.parse((message._getPayloadString)());
					cb(fdata)
			

			}
	 
	},

};
