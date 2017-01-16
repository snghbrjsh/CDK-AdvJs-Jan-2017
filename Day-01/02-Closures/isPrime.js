function isPrime(n){
	console.log('processing ', n);
	if (n <= 3) return true;
	for(var i=2; i <= (n/2); i++)
		if (n % 2 === 0)
			return false;
	return true;
}

