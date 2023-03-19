import Sizes from './Utils/Sizes'
import Time from './Utils/Time'

export default class Base {
  constructor(canvas) {
    // Options
    this.canvas = canvas

    // Setup
    this.sizes = new Sizes()
    this.time = new Time()

		// Resize events
    this.sizes.on('resize', () => {
      this.resize()
    })

    this.time.on('tick', () => {
			this.update()
		})
  }

  resize() {
    console.log('resize')
  }

	update() {
		
	}
}
