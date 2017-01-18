var pgm = (function(){
	function addSync(x,y){
		console.log('		[Service] addSync - processing inputs');
		var result = x + y;
		console.log('		[Service] returning result');
		return result;
	}

	function addSyncClient(x,y){
		console.log('[Consumer] triggering addSync');
		var result = addSync(x,y);
		console.log('[Consumer] result = ', result);
	}

	function addAsyncCallback(x,y, onResult){
		console.log('		[Service] addAsyncCallback - processing inputs');
		setTimeout(function(){
			var result = x + y;
			console.log('		[Service] returning result');
			if (typeof onResult === 'function')
				onResult(result);
		}, 4000);
	}

	function addAsyncCallbackClient(x,y){
		console.log('[Consumer] triggering addAsyncCallback');
		addAsyncCallback(x,y, function(result){
			console.log('[Consumer] result = ', result);
		});
	}

	var addAsyncEvents = (function(){
		var _subscribers = [];
		function subscribe(callback){
			_subscribers.push(callback);
		}
		function add(x,y){
			console.log('		[Service] addAsyncEvents - processing inputs');
			setTimeout(function(){
				var result = x + y;
				console.log('		[Service] returning result');
				_subscribers.forEach(function(subscriptionFn){
					subscriptionFn(result);
				})
			}, 4000);
		}
		return {
			add : add,
			subscribe : subscribe
		}
	})();

	function addAsyncPromise(x,y){
		console.log('		[Service] addAsyncPromise - processing inputs');

		var promiseObj = new Promise(function(resolveFn, rejectFn){
			setTimeout(function(){
				var result = x + y;
				console.log('		[Service] returning result');
				resolveFn(result);
			}, 4000);
		});
		
		return promiseObj;
	}

	return {
		addSyncClient : addSyncClient,
		addAsyncCallbackClient : addAsyncCallbackClient,
		addAsyncEvents : addAsyncEvents,
		addAsyncPromise : addAsyncPromise
	}
})()