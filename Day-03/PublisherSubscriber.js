
var calculator = (function(){

	var _subscribers = {
		add : [],
		subtract : []
	}

	function add(x,y){
		var result = x + y;
		notifiySubscribers('add', result);
	}

	function subscribe(operation, subscriptionFn){
		_subscribers[operation].push(subscriptionFn);
	}

	function unsubscribe(operation, subscriptionFn){
		var subscriptionFns = _subscribers[operation];
		for(var i=subscriptionFns.length-1; i >=0 ; i--){
			if (subscriptionFns[i] === subscriptionFn)
				subscriptionFns.splice(i,1);
		}
	}

	function subtract(x,y){
		var result = x - y;
		notifiySubscribers('subtract', result);	
	}

	function notifiySubscribers(operation, data){
		var subscriptions = _subscribers[operation];
		subscriptions.forEach(function(subscriptionFn){
			subscriptionFn(data);
		});
	}

	return{
		add : add,
		subtract : subtract,
		subscribe : subscribe,
		unsubscribe : unsubscribe
	}

})();