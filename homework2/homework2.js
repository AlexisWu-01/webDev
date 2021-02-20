//
// HOMEWORK 2
// Due: Monday Feb 22 (23h59)
//
// Put team members + any remarks in a README file that you submit in your final .zip file
//


function roundN (n, i) {
    return Math.round(n/(10**i))*(10**i)
}

function range (n, m) {
    let res = []
    var i
    for (i=n;i<m;i+=1){
    	res.push(i)
    }
    return res
}

function positive (arr) {
    var i
    let res = []
    for (i=0;i<arr.length;i++){
    	if (arr[i] >= 0){
    		res.push(arr[i])
    	}
    }
    return res
}

function positiveStr (s) {
    let lst = s.split(';')
    let reslst = positive(lst)
    return reslst.join(';')

}

function mapStr (s, sep, f) {
	if (s.length == 0){
		return ''
	}
    let input_lst = s.split(sep)
    var i
    let res = []
    for (i=0;i<input_lst.length;i++){
    	input_lst[i] = parseFloat(input_lst[i])
        res.push(f(input_lst[i]))
    }
    
    return res.join(sep)
    

}


const sample = [
    {a: 1,     b: 2,     c: 3},
    {a: 10,    b: 20,    c: 30},
    {a: 99,    b: 66,    c: 33},
    {a: 1,     b: 20,    c: 33},
    {a: 10,    b: 66,    c: 3},
    {a: 99,    b: 2,     c: 30}
]

const sample_obj = {
    a: 33,
    b: 66,
    c: 99,
    x: ['this', 'is', 'a', 'string'],
    y: [1, 2, 3],
    z: []
}

function distinct (objs, field) {
	let res = []
	var i
	for (i=0;i<objs.length;i++){
		if (!res.includes(objs[i][field])){
			res.push(objs[i][field])
		}
	}
    return res
}

function sort (objs, field) {
    let value = []
	for (var i=0;i<objs.length;i++){
		value.push([i,objs[i][field]])
		}
	value.sort(function(a,b){
		return a[1]-b[1]
	})
	let res = []
	for (var i=0; i<value.length; i++){
		res.push(objs[value[i][0]])
	}
	return res
	} 


function sum (objs, field1, field2) {
    let res = []
    for (var i=0; i<objs.length;i++){
    	var tmp = objs[i]
    	tmp.sum = objs[i][field1]+objs[i][field2]
    	res.push(tmp)
    }
    return res

}

function group (objs, field) {
    let values = distinct(objs,field)
    values.sort()
    res = {}
    for (var i=0;i<values.length;i++){
    	let tmp = []
    	for (var j=0; j<objs.length; j++){
    		if (values[i]==objs[j][field]){
    			tmp.push(objs[j])
    		}
    	}
    res[values[i].toString()] = tmp
    }
    return res
}

function expand (obj, field) {
	let res = []
	for (var i=0; i<obj[field].length;i++){
		var tmp = Object.assign({},obj)
		tmp[field] = tmp[field][i]
		res.push(tmp)
	}
	return res
}



class Empty {
    
    isEmpty() {
	return true
    }

    size() {
	return 0
    }

    height(){
    	return 0
    }

    fringe(){
    	return []
    }

    preorder(){
    	return undefined
    }

    map(){
    	return new Empty()
    }

    trim(){
    	return new Empty()
    }
}


class Node {
    
    constructor(value, left, right) {
	this.value = value
	this.left = left
	this.right = right
    }

    isEmpty() {
	return false
    }

    size() {
	return 1 + this.left.size() + this.right.size()
    }

    height(){
    	return 1+Math.max(this.left.height(),this.right.height())
    }

    fringe(){
    	let res = []
    	if (this.left.isEmpty() && this.right.isEmpty()){
    		res.push(this.value)
    	}
		return res.concat(this.left.fringe(),this.right.fringe())

    }

    preorder(fun){
    	fun(this.value)
    	return this.left.preorder(fun),this.right.preorder(fun)
    }

    map(fun){
    	return new Node(fun(this.value),this.left.map(fun),this.right.map(fun))
    }

    trim(){
    	if (this.left.isEmpty() && this.right.isEmpty()){
            return new Empty()
    	}
    	this.left = this.left.trim()
		this.right = this.right.trim()

    	return this
    }
}

// helper functions
const leaf = (v) => new Node(v, new Empty(), new Empty())
const node = (v, l, r) => new Node(v, l, r)
const sample_tree = node(10,
			 node(20, node(40, leaf(80), leaf(90)),
                                  node(50, leaf(100), leaf(110))),
			 node(30, leaf(60), leaf(70)))


// const test = (v) => { console.log('value = ', v) }