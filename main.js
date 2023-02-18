import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import './style.css'

const scene = new THREE.Scene()

// const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2)

// Create geometry
const points = []
points.push(new THREE.Vector3(0, 1, 0))
points.push(new THREE.Vector3(-1, 0, 0))
points.push(new THREE.Vector3(1, 0, 0))

for (let i = 0; i <= 50; i++) {
  for (let j = 0; j < 3; j++) {
    points.push(
      new THREE.Vector3(
        (Math.random() - 0.5) * 3,
        (Math.random() - 0.5) * 3,
        (Math.random() - 0.5) * 3,
      )
    )
  }
}

const geometry = new THREE.BufferGeometry().setFromPoints(points)

const material = new THREE.MeshBasicMaterial({
  color: 'yellow',
  wireframe: true,
})
const cube = new THREE.Mesh(geometry, material)
scene.add(cube)

const size = {
  width: window.innerWidth,
  height: window.innerHeight,
}

// Resize
window.addEventListener('resize', () => {
  size.width = window.innerWidth
  size.height = window.innerHeight

  // Update camera
  camera.aspect = size.width / size.height
  camera.updateProjectionMatrix()

  // Update renderer
  renderer.setSize(size.width, size.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

window.addEventListener('dblclick', () => {
  if (!document.fullscreenElement) {
    canvas.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
})

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
controls.minDistance = 2
controls.maxDistance = 8
controls.target = cube.position

const renderer = new THREE.WebGLRenderer({
  canvas,
})
renderer.setSize(size.width, size.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

const tick = () => {
  controls.update()

  renderer.render(scene, camera)
  window.requestAnimationFrame(tick)
}
tick()
