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

// Decorator Factory

function Logger2(logString: string) {
    return function(constructor: Function) {
        console.log(logString)
        console.log(constructor)
    }
}

@Logger2('LOGGING - PERSON')
class Person2 {
    name = 'Max'

    constructor() {
        console.log('Creating person object...')
    }
}