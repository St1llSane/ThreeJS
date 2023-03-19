import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Base from './Base'

export default class Camera {
  constructor() {
    this.base = new Base()
    this.sizes = this.base.sizes
    this.scene = this.base.scene
    this.canvas = this.base.canvas

    this.setCamera()
    this.setOrbitControls()
  }

  setCamera() {
    this.camera = new THREE.PerspectiveCamera(
      35,
      this.sizes.width / this.sizes.height,
      0.1,
      100
    )
    this.camera.position.set(6, 4, 8)
    this.scene.add(this.camera)
  }

  setOrbitControls() {
    this.orbitControls = new OrbitControls(this.camera, this.canvas)
    this.orbitControls.enableDamping = true
  }

  resize() {
    this.camera.aspect = this.sizes.width / this.sizes.height
    this.camera.updateProjectionMatrix()
  }

  update() {
    this.orbitControls.update()
  }
}
