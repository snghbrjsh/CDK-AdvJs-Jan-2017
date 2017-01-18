function defer(){
	var deferred = {};

	deferred.promise = new Promise(function(resolveFn, rejectFn){
		deferred.resolve = resolveFn;
		deferred.reject = rejectFn;
	});

	return deferred;
}