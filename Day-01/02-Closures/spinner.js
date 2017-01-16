function spinnerFactory(){
	var counter = 0;


	function increment(){
		return ++counter;
	}

	function decrement(){
		return --counter;
	}
	return {
		up : increment,
		down : decrement
	}
}
