import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import EventEmitter from './EventEmitter'

export default class Resources extends EventEmitter {
  constructor(sources) {
    super()

    this.sources = sources
    console.log(this.sources)

    this.items = {}
    this.toLoad = this.sources.length
    this.loaded = 0

    this.setLoaders()
    this.startLoading()
  }

  setLoaders() {
    this.loaders = {}
    this.loaders.gltfLoader = new GLTFLoader()
    this.loaders.textureLoader = new THREE.TextureLoader()
    this.loaders.cubeTextureLoader = new THREE.CubeTextureLoader()
  }

  startLoading() {
    this.sources.forEach((item) => {
      if (item.type === 'gltfModel') {
        this.loaders.gltfLoader.load(item.path, (file) => {
          this.sourceLoaded(item, file)
        })
      }
      if (item.type === 'texture') {
        this.loaders.textureLoader.load(item.path, (file) => {
          this.sourceLoaded(item, file)
        })
      }
      if (item.type === 'cubeTexture') {
        this.loaders.cubeTextureLoader.load(item.path, (file) => {
          this.sourceLoaded(item, file)
        })
      }
    })
  }

  sourceLoaded(source, file) {
    this.items[source.name] = file

    this.loaded++

    if (this.loaded === this.toLoad) {
      this.trigger('ready')
    }
  }
}
