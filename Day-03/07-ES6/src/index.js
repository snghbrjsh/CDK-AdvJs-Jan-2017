console.log('Welcome to ES6!');

class EmployeeBase{
	constructor(id, name, salary){
		this.__id = id;
		this.name = name;
		this.salary = salary;
	}

	get id(){
		console.log('id getter triggered');
		return this.__id;
	}
	set id(val){
		console.log('id setter triggered');
		if (val < 0) throw new Error('Invalid id');
		this.__id = val;
	}
	display(){
		console.log(`id = ${this.id}, name = ${this.name}, salary=${this.salary}`)
	}

	static isEmployee(obj){
		return obj instanceof Employee;
	}
}

class FulltimeEmployee extends EmployeeBase{
	constructor(id, name, salary, benefits){
		super(id, name, salary);
		this.benefits = benefits;
	}
}


function add(...values){
	function parseArg(n){
		if (Array.isArray(n)) return add(...n);
		if (typeof n === 'function') return parseArg(n());
		return isNaN(n) ?  0 : parseInt(n, 10);
	}
	return values.length <= 1 ? parseArg(values[0]) : parseArg(values[0]) + add(values.slice(1));
}

const n='CDK';

n = 'Intel';