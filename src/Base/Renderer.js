import * as THREE from 'three'
import Base from './Base'

export default class Renderer {
  constructor() {
    this.base = new Base()
    this.canvas = this.base.canvas
    this.scene = this.base.scene
    this.sizes = this.base.sizes
    this.camera = this.base.camera

    this.setRenderer()
  }

  setRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
    })
    this.renderer.physicallyCorrectLights = true
    this.renderer.outputEncoding = THREE.sRGBEncoding
    this.renderer.toneMapping = THREE.CineonToneMapping
    this.renderer.toneMappingExposure = 1.75
    this.renderer.shadowMap.enabled = true
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap
    this.renderer.setClearColor('#211d20')
    this.renderer.setSize(this.sizes.width, this.sizes.height)
    this.renderer.setPixelRatio(Math.min(this.sizes.pixelRatio, 2))
  }

  resize() {
    this.renderer.setSize(this.sizes.width, this.sizes.height)
    this.renderer.setPixelRatio(Math.min(this.sizes.pixelRatio, 2))
  }

  update() {
    this.renderer.render(this.scene, this.camera.camera)
  }
}
