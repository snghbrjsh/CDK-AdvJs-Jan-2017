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

describe("Default List", function(){
	console.table(products);
})

describe("Sorting", function(){
	describe("Default Sorting [Products by id]", function(){
		function sort(){
			for(var i=0; i < products.length-1; i++)
				for(var j=i+1; j < products.length; j++)
					if (products[i].id > products[j].id){
						var temp = products[i];
						products[i] = products[j];
						products[j] = temp;
					}
		}
		sort();
		console.table(products);
	});

	function sort(list, comparer){
		var comparerFn = null;
		if (typeof comparer === 'function'){
			comparerFn = comparer;
		}
		else if (typeof comparer === 'string'){
			comparerFn = function(item1, item2){
				if (item1[comparer] > item2[comparer]) return 1;
				if (item1[comparer] < item2[comparer]) return -1;
				return 0;
			}
		}
		else{
			return;
		}
		for(var i=0; i < list.length-1; i++)
			for(var j=i+1; j < list.length; j++)
				if (comparerFn(list[i], list[j]) > 0 ){
					var temp = list[i];
					list[i] = list[j];
					list[j] = temp;
				}
	}
	describe("Any list by any attribute", function(){
		/*function sort(list, attrName){
			for(var i=0; i < list.length-1; i++)
				for(var j=i+1; j < list.length; j++)
					if (list[i][attrName] > list[j][attrName]){
						var temp = list[i];
						list[i] = list[j];
						list[j] = temp;
					}
		}*/
		describe('Products by name', function(){
			sort(products, "name");
			console.table(products);
		});
		describe('Products by cost', function(){
			sort(products, "cost");
			console.table(products);
		});
	});

	describe("Any list by any comparison", function(){
		//comparerFn => 1 if L > R, -1 if L < R, otherwise 0
		/*function sort(list, comparerFn){
			for(var i=0; i < list.length-1; i++)
				for(var j=i+1; j < list.length; j++)
					if (comparerFn(list[i], list[j]) > 0 ){
						var temp = list[i];
						list[i] = list[j];
						list[j] = temp;
					}
		}*/
		describe("Products by value [cost * units]", function(){
			var productComparerByValue = function(p1, p2){
				var p1Value = p1.cost * p1.units,
					p2Value = p2.cost * p2.units;

				if (p1Value < p2Value) return -1;
				if (p1Value > p2Value) return 1;
				return 0
			};

			sort(products, productComparerByValue);
			console.table(products);
		})
	})
});

/*describe('Filtering', function(){
	describe("All costly products", function(){
		//filter(...)
		console.table(products);
	});
});*/