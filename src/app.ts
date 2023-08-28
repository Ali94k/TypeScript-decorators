function Logger(constructor: Function) {
    console.log('Logging...')
    console.log(constructor)
}

// Decorator runs when class is defined, not when instantiated
@Logger
class Person {
    name = 'Max'

    constructor() {
        console.log('Creating person object...')
    }
}

const person = new Person()
console.log(person)