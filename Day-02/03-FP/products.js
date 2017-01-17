var products = [
	{id : 6, name : 'Pen', cost : 60, units : 10, category : "stationary"},
	{id : 3, name : 'Rice', cost : 20, units : 70, category : "grocery"},
	{id : 9, name : 'Dal', cost : 80, units : 40, category : "grocery"},
	{id : 8, name : 'Pencil', cost : 50, units : 90, category : "stationary"},
	{id : 2, name : 'Vegetables', cost : 90, units : 20, category : "vegetables"},
]

/*
sort
filter
any -
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

	function comparerFactory(comparer){

		if (typeof comparer === 'function'){
			return comparer;
		}
		if (typeof comparer === 'string'){
			return function(item1, item2){
				if (item1[comparer] > item2[comparer]) return 1;
				if (item1[comparer] < item2[comparer]) return -1;
				return 0;
			}
		}
		return function(){}
	}
	function inverse(comparerFn){
		return function(){
			return -1 * comparerFn.apply(this, arguments);
		}
	}
	function sort(list, comparer){
		var comparerFn = comparerFactory(comparer);
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
		var productComparerByValue = function(p1, p2){
				var p1Value = p1.cost * p1.units,
					p2Value = p2.cost * p2.units;

				if (p1Value < p2Value) return -1;
				if (p1Value > p2Value) return 1;
				return 0
			};
		describe("Products by value [cost * units]", function(){
			sort(products, productComparerByValue);
			console.table(products);
		});
		describe("Products by value [cost * units] in descending", function(){
			var descendingComparerByValue = inverse(productComparerByValue);
			sort(products, descendingComparerByValue);
			console.table(products);
		})
	})
});

describe('Filtering', function(){
	describe("All costly products", function(){
		function filterCostlyProducts(){
			var result = [];
			for(var i=0; i < products.length; i++)
				if (products[i].cost > 50)
					result.push(products[i]);
			return result;
		}
		var costlyProducts = filterCostlyProducts();
		console.table(costlyProducts);
	});
	describe("Any list by any criteria", function(){
		function filter(list, criteriaFn){
			var result = [];
			for(var i=0; i < list.length; i++)
				if (criteriaFn(list[i]))
					result.push(list[i]);
			return result;
		}
		function negate(criteriaFn){
			return function(){
				return !criteriaFn.apply(this, arguments);
			};
		}
		var stationaryProductCriteria = function(product){
			return product.category === 'stationary';
		};
		describe("Stationary products", function(){
			
			var stationaryProducts = filter(products, stationaryProductCriteria);
			console.table(stationaryProducts);
		});
		describe("Non stationary products", function(){
			/*var nonStationaryProductCritera = function(product){
				return !stationaryProductCriteria(product);
			};*/
			var nonStationaryProductCritera = negate(stationaryProductCriteria);

			var nonStationaryProducts = filter(products, nonStationaryProductCritera);
			console.table(nonStationaryProducts);
		})

		var costlyProductCriteria = function(product){
			return product.cost > 50;
		};
		describe("Costly products [cost > 50]", function(){
			
			var costlyProducts = filter(products, costlyProductCriteria);
			console.table(costlyProducts);
		});

		describe("Affordable products [cost <= 50]", function(){
			/*var affordableProductCriteria = function(product){
				return !costlyProductCriteria(product);
			};*/
			var affordableProductCriteria = negate(costlyProductCriteria);

			var affordableProducts = filter(products,affordableProductCriteria);
			console.table(affordableProducts);
		});
	})
});

describe('Any', function(){
	function any(list, criteriaFn){
		for(var i=0; i < list.length; i++)
			if (criteriaFn(list[i]))
				return true;
		return false;
	}
	console.log('Are there any costly products ', any(products, function(p){ return p.cost > 50}));
});

describe('All', function(){
	function all(list, criteriaFn){
		for(var i=0; i < list.length; i++)
			if (!criteriaFn(list[i]))
				return false;
		return true;
	}
	console.log('Are all the products costly ', all(products, function(p){ return p.cost > 50}));
});

describe("GroupBy", function(){
	describe("Products by category", function(){
		function groupProductsByCategory(){
			var result = {};
			for(var i=0; i < products.length; i++){
				var category = products[i].category;
				if (typeof result[category] === 'undefined')
					result[category] = [];
				result[category].push(products[i]);
			}
			return result;
		}
		var productsGroupedByCategory = groupProductsByCategory();
		console.log(productsGroupedByCategory);
	});

	describe("Any list by any key", function(){
		function groupBy(list, keySelectorFn){
			var result = {};
			for(var i=0; i < list.length; i++){
				var key = keySelectorFn(list[i]);
				/*if (typeof result[key] === 'undefined')
					result[key] = [];*/
				result[key] = result[key] || [];
				result[key].push(list[i]);
			}
			return result;
		}
		function printGroup(groupedItems){
			for(var key in groupedItems)
				describe('key - ' + key, function(){
					console.table(groupedItems[key]);
				});
		}

		describe("Products by category", function(){
			var categoryKeySelector = function(product){
				return product.category;
			};
			var productsGroupedByCategory = groupBy(products, categoryKeySelector);
			printGroup(productsGroupedByCategory);
		});
		describe("Products by cost", function(){
			var costKeySelector = function(product){
				return product.cost > 50 ? "costly" : "affordable";
			};
			var productsGroupedByCost = groupBy(products, costKeySelector);
			printGroup(productsGroupedByCost);
		});
	});
});

describe("Transform", function(){
	function transform(list, fn){
		var result = [];
		for(var i=0; i < list.length; i++)
			result.push(fn(list[i]));
		return result;
	}
	describe("Products with 10% discount", function(){
		var discountedProducts = transform(products, function(product){
			return {
				id : product.id,
				name : product.name,
				cost : product.cost,
				discountedCost : product.cost * 0.9,
				units : product.units
			};
		});
		console.table(discountedProducts);
	})
});

describe("Aggregate", function(){
	function aggregate(list, fn, seed){
		var result = seed,
			start = 0;

		if (!seed){
			result = list[0];
			start = 1;
		}
		
		for(var i=start; i < list.length; i++)
			result = fn(result, list[i]);
		return result;
	}

	describe("Total stock", function(){
		var totalStock = aggregate(products, function(result, product){
			return result + product.units;
		}, 0);
		console.log(totalStock);
	});

	describe('cheapest product', function(){
		var cheapestProduct = aggregate(products, function(product1, product2){
			return product1.cost < product2.cost ? product1 : product2;
		});
		console.table([cheapestProduct]);
	});
});

function before(count, fn){
   var result = null;
   return function(){
       if (--count >= 0)
          result = fn.apply(this, arguments);
       return result;
   }
}