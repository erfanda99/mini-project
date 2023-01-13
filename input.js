let validator = require('validatorjs')

let data = {
    name: 'Arya',
    email: 'arya@gmail.com',
    age: 31
}

let rules = {
    name: 'required',
    email: 'required|email',
    age: 'min:18|max:30'
}

let validation = new validator(data, rules)

console.log('Status: ', validation.passes())
console.log('Error: ', validation.errors.all())