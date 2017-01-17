function isPrimeFactory(){
	var cache = {};
	function isPrime(n){
		if (typeof cache[n] !== 'undefined')
			return cache[n];

		console.log('processing ', n);
		var result = true;
		if (n <= 3) result = true;
		for(var i=2; i <= (n/2); i++){
			if (n % 2 === 0){
				result = false;
				break;
			}
		}
		cache[n] = result;
		return cache[n];
	}
	return isPrime;
}

function isPrimeFactory(){
	var cache = {};

	function checkPrime(n){
		console.log('processing ', n);
		if (n <= 3) return true;
		for(var i=2; i <= (n/2); i++){
			if (n % 2 === 0)
				return false;
		}
		return true;
	}

	function isPrime(n){
		if (typeof cache[n] !== 'undefined')
			return cache[n];
		cache[n] = checkPrime(n);
		return cache[n]
	}

	return isPrime;
}

function isOddEvenFactory(){
	var cache = {};

	function checkEvenOrOdd(n){
		console.log('processing ', n);
		return n % 2 === 0 ? 'even' : 'odd'
	}

	return function(n){
		if (typeof cache[n] !== 'undefined')
			return cache[n];
		cache[n] = checkEvenOrOdd(n);
		return cache[n]
	}

	
}

function memoize(algoFn){
	var cache = {};
	return function(n){
		if (typeof cache[n] !== 'undefined')
			return cache[n];
		cache[n] = algoFn(n);
		return cache[n]
	}
}

function memoize(algoFn){
	var cache = {};
	return function(){
		var key = JSON.stringify(arguments);
		if (typeof cache[key] !== 'undefined')
			return cache[key];
		cache[key] = algoFn.apply(this,arguments);
		return cache[key];
	}
}

