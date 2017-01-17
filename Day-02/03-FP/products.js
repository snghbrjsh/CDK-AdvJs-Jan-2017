var products = [
	{id : 6, name : 'Pen', cost : 60, units : 10, category : "stationary"},
	{id : 3, name : 'Rice', cost : 20, units : 70, category : "grocery"},
	{id : 9, name : 'Dal', cost : 80, units : 40, category : "grocery"},
	{id : 8, name : 'Pencil', cost : 50, units : 90, category : "stationary"},
	{id : 2, name : 'Vegetables', cost : 90, units : 20, category : "grocery"},
]

/*
sort
filter
any
all
aggregate
transform
groupBy
*/

function describe(title, fn){
	console.group(title);
	fn();
	console.groupEnd();
}

describe("Sorting", function(){
	describe("Default Sorting [Products by id]", function(){
		//sort(...)
		console.table(products);
	});

	describe("Any list by any attribute", function(){
		//sort(...)
		describe('Products by name', function(){
			//sort(...)
			console.table(products);
		});
		describe('Products by cost', function(){
			//sort(...)
			console.table(products);
		});
	});
});

describe('Filtering', function(){
	describe("All costly products", function(){
		//filter(...)
		console.table(products);
	});
});