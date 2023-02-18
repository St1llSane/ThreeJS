import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as dat from 'dat.gui'
import gsap from 'gsap'
import './style.css'

// Debug UI
const gui = new dat.GUI({ closed: true, width: 340 })

const params = {
  cubeColor: 0x7255de,
  spin: () => {
    gsap.to(cube.rotation, { duration: 1, y: cube.rotation.y + Math.PI * 2 })
  },
}

const scene = new THREE.Scene()

const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: params.cubeColor })
const cube = new THREE.Mesh(geometry, material)
scene.add(cube)

// Debug UI
gui.add(cube.position, 'x', -3, 3, 0.1).name('yellow cube X')
gui.add(cube.position, 'y', -3, 3, 0.1).name('yellow cube Y')
gui.add(cube.position, 'z', -3, 3, 0.1).name('yellow cube Z')
gui.add(cube.rotation, 'y', -Math.PI * 2, Math.PI * 2, 0.1).name('yellow cube rotation X')
gui.add(cube.rotation, 'x', -Math.PI * 2, Math.PI * 2, 0.1).name('yellow cube rotation Y')
gui.add(cube.rotation, 'z', -Math.PI * 2, Math.PI * 2, 0.1).name('yellow cube rotation Z')

gui.addColor(params, 'cubeColor').onChange(() => {
  material.color.set(params.cubeColor)
})

gui.add(cube, 'visible').name('yellow cube visible')
gui.add(cube.material, 'wireframe')

gui.add(params, 'spin')

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

const camera = new THREE.PerspectiveCamera(
  75,
  size.width / size.height,
  0.1,
  100
)

camera.position.z = 3
scene.add(camera)

const canvas = document.querySelector('.webgl')

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.dampingFactor = 0.03
controls.minDistance = 2
controls.maxDistance = 8

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
