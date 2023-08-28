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
  return function (constructor: Function) {
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

// Building more useful decorators

function WithTemplate(template: string, hookId: string) {
  return function (constructor: any) {
    const hookEl = document.getElementById(hookId)
    const p = new constructor() // new instance of the class !!!
    if (hookEl) {
      hookEl.innerHTML = template
      hookEl.querySelector('h1')!.textContent = p.name
    }
  }
}

// Multiple Decorators
// Order of creation of decorators is top down
// Order of execution of decorators is bottom up
@Logger2('LOGGING - PERSON')
@WithTemplate('<h1>My Person Object</h1>', 'app')
class Person3 {
  name = 'Max'

  constructor() {
    console.log('Creating person object...')
  }
}

// Decorator for property

function Log(target: any, propertyName: string | Symbol) {
  console.log('Property decorator!')
  console.log(target, propertyName)
}

class Product {
  @Log
  title: string
  private _price: number

  set price(val: number) {
    if (val > 0) {
      this._price = val
    } else {
      throw new Error('Invalid price - should be positive!')
    }
  }

  constructor(t: string, p: number) {
    this.title = t
    this._price = p
  }

  getInformation() {
    return [this.title, `$${this.price}`]
  }

  priceWithTax(tax: number) {
    return this._price * (1 + tax)
  }
}

// Decorator for accessor and methods and parameters

function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
  console.log('Accessor decorator!')
  console.log(target)
  console.log(name)
  console.log(descriptor)
}

function Log3(
  target: any,
  name: string | Symbol,
  descriptor: PropertyDescriptor
) {
  console.log('Method decorator!')
  console.log(target)
  console.log(name)
  console.log(descriptor)
}

function Log4(target: any, name: string | Symbol, position: number) {
  console.log('Parameter decorator!')
  console.log(target)
  console.log(name)
  console.log(position)
}

class Product2 {
  @Log
  title: string
  private _price: number

  constructor(t: string, p: number) {
    this.title = t
    this._price = p
  }

  @Log2
  set price(val: number) {
    if (val > 0) {
      this._price = val
    } else {
      throw new Error('Invalid price - should be positive!')
    }
  }

  @Log3
  priceWithTax(@Log4 tax: number) {
    return this._price * (1 + tax)
  }
}

// Autobind decorator

function Autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      console.log('this: ', this)
      console.log('originalMethod: ', originalMethod)

      const boundFn = originalMethod.bind(this)
      console.log('boundFn: ', boundFn)
      console.log('adjDescriptor: ', adjDescriptor)
      
      return boundFn
    },
  }
  return adjDescriptor
}

class Printer {
  message = 'This works!'

  @Autobind
  showMessage() {
    console.log(this.message)
  }
}

const p = new Printer()

const button = document.querySelector('button')!
button.addEventListener('click', p.showMessage)
