export default class Robot {
  constructor(name, legs) {
    this.name = name
    this.legs = legs

		this.sayHi()
  }

  sayHi() {
    console.log(`My name is ${this.name}`)
  }
}
