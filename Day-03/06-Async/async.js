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

	function addAsync(x,y){
		console.log('		[Service] addAsync - processing inputs');
		setTimeout(function(){
			var result = x + y;
			console.log('		[Service] returning result');
			return result;	
		}, 4000);
	}

	function addAsyncClient(x,y){
		console.log('[Consumer] triggering addAsync');
		var result = addAsync(x,y);
		console.log('[Consumer] result = ', result);
	}

	return {
		addSyncClient : addSyncClient,
		addAsyncClient : addAsyncClient
	}
})()