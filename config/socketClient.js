module.exports = {
	getConnect:function(url,topic,clientId,cb,bool) {
		
		var clstr = url.split(":");
		console.log(555,clstr)
		var topic1 =  topic + "_json";
		console.log('soket主题',topic1)
		var client = new Paho.MQTT.Client(clstr[0],clstr[1], clientId);
			// console.log(3,client)
			// set callback handlers
			client.onConnectionLost = onConnectionLost;
			client.onMessageArrived = onMessageArrived;
			// console.log(5,onMessageArrived)

			// connect the client
			client.connect({onSuccess:onConnect});
			// console.log(connect({onSuccess:onConnect}));
			// console.log(0)
			// called when the client connects
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
					cb();
					if (responseObject.errorCode !== 0) {
							// console.log(1);
							console.log("onConnectionLost:"+responseObject.errorMessage);
							// this.props.getdata(dataa,pages);
							// console.log(11) 192.168.10.210a
					}
			}

			// called when a message arrives
			function onMessageArrived(message) {
					var fdata = (message._getPayloadString)();
					console.log('mqtt',(message._getPayloadString)())
					//var fdata = JSON.parse("{"+(message._getPayloadString)()+"}");
					cb(fdata)
			

			}
	 
	},

};
