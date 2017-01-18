var radio = (function(){
	var channels = {};

	function radio(topic){
		if (!channels.hasOwnProperty(topic))
			channels[topic] = new Channel(topic);
		return channels[topic];
	}

	function Channel(name){
		this.name = name;
		this._subscribers = [];
	}

	function getSubscription(argument){
		if (typeof argument === 'function'){
			return argument;
		}
		if (argument instanceof Array){
			var subscriptionFn = argument[0];
			subscriptionFn.__context__ = argument[1];
			return subscriptionFn;
		}
	}
	Channel.prototype.subscribe = function(){
		var self = this;
		Array.prototype.forEach.call(arguments, function(argument){
			self._subscribers.push(getSubscription(argument));
		});
		return this;
	}

	Channel.prototype.unsubscribe = function(subscriptionFn){
		for(var i = this._subscribers.length-1; i >=0; i--)
			if (this._subscribers[i] === subscriptionFn)
				this._subscribers.splice(i,1);
		return this;
	}

	Channel.prototype.broadcast = function(){
		var args = arguments;
		var self = this;
		this._subscribers.forEach(function(subscriptionFn){
			var context = subscriptionFn.__context__ || self;
			subscriptionFn.apply(context, args);
		});
		return this;
	}
	return radio;
})()