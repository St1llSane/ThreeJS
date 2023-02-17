import * as THREE from 'three'
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

const cursor = {
  x: 0,
  y: 0,
}

window.addEventListener('mousemove', (e) => {
  console.log(cursor.x)
  console.log(cursor.y)
  cursor.x = e.clientX / size.width - 0.5
  cursor.y = e.clientY / size.height - 0.5
})

const camera = new THREE.PerspectiveCamera(
  75,
  size.width / size.height,
  0.1,
  100
)
// const aspectRatio = size.width / size.height
// const camera = new THREE.OrthographicCamera(
//   -1 * aspectRatio,
//   1 * aspectRatio,
//   1,
//   -1,
//   0.1,
//   100
// )
camera.position.z = 3
camera.lookAt(cube.position)
scene.add(camera)

const canvas = document.querySelector('.webgl')
const renderer = new THREE.WebGLRenderer({
  canvas,
})
renderer.setSize(size.width, size.height)

const tick = () => {
  camera.position.x = cursor.x * 4
  camera.position.y = -cursor.y * 4
	camera.lookAt(cube.position)

  renderer.render(scene, camera)
  window.requestAnimationFrame(tick)
}
tick()
