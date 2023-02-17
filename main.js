import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import './style.css'

const scene = new THREE.Scene()

const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 'yellow' })
const cube = new THREE.Mesh(geometry, material)
scene.add(cube)

const size = {
  width: 800,
  height: 600,
}

const camera = new THREE.PerspectiveCamera(
  75,
  size.width / size.height,
  0.1,
  100
)

camera.position.z = 3
camera.lookAt(cube.position)
scene.add(camera)

const canvas = document.querySelector('.webgl')

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.dampingFactor = 0.03
controls.minDistance = 3
controls.maxDistance = 8
controls.maxPolarAngle = Math.PI / 2
controls.target = cube.position
// controls.autoRotate = true

const renderer = new THREE.WebGLRenderer({
  canvas,
})
renderer.setSize(size.width, size.height)

const tick = () => {
  controls.update()

  renderer.render(scene, camera)
  window.requestAnimationFrame(tick)
}
tick()
