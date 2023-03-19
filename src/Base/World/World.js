import * as THREE from 'three'
import Base from '../Base'

export default class World {
  constructor() {
    this.base = new Base()
    this.scene = this.base.scene

    // Test mesh
    const testMesh = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshBasicMaterial({ wireframe: true })
    )
    this.scene.add(testMesh)
  }
}
