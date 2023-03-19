import * as THREE from 'three'
import Sizes from './Utils/Sizes'
import Time from './Utils/Time'
import Camera from './Camera'

let instance = null

export default class Base {
  constructor(canvas) {
		if (instance) {
			return instance
		}
		instance = this
		
    // Options
    this.canvas = canvas

    // Setup
    this.sizes = new Sizes()
    this.time = new Time()
    this.scene = new THREE.Scene()
		this.camera = new Camera()

    // Resize events
    this.sizes.on('resize', () => {
      this.resize()
    })

    this.time.on('tick', () => {
      this.update()
    })
  }

  resize() {
    this.camera.resize()
  }

  update() {
		this.camera.update()
	}
}
