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

// const camera = new THREE.PerspectiveCamera(75, size.width / size.height, 0.1, 100)
const aspectRatio = size.width / size.height
const camera = new THREE.OrthographicCamera(
  -1 * aspectRatio,
  1 * aspectRatio,
  1,
  -1,
  0.1,
  100
)
camera.position.x = 2
camera.position.y = 2
camera.position.z = 3
camera.lookAt(cube.position)
scene.add(camera)

const canvas = document.querySelector('.webgl')
const renderer = new THREE.WebGLRenderer({
  canvas,
})
renderer.setSize(size.width, size.height)

const tick = () => {
	cube.rotation.y += 0.004
	
  renderer.render(scene, camera)
  window.requestAnimationFrame(tick)
}
tick()
