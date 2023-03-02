import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import './style.css'

// Canvas
const canvas = document.querySelector('.webgl')

// Scene
const scene = new THREE.Scene()

// Textures
const textureLoader = new THREE.TextureLoader()
const particlesTexture = textureLoader.load('./textures/particles/2.png')

// Particles
const particlesGeometry = new THREE.BufferGeometry()
const count = 8000

const positions = new Float32Array(count * 3)
const colors = new Float32Array(count * 3)

for (let i = 0; i < count * 3; i++) {
  positions[i] = (Math.random() - 0.5) * 12
	colors[i] = Math.random()
}

particlesGeometry.setAttribute(
  'position',
  new THREE.BufferAttribute(positions, 3)
)
particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

// Material
const material = new THREE.PointsMaterial({
  size: 0.1,
  sizeAttenuation: true,
  color: '#CA47A3',
  transparent: true,
  alphaMap: particlesTexture,
  // alphaTest: 0.0001
  // depthTest: false
  depthWrite: false,
  blending: THREE.AdditiveBlending,
  vertexColors: true,
})

// Points
const particles = new THREE.Points(particlesGeometry, material)
scene.add(particles)

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
)
camera.position.z = 3
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)

// Resizing
window.addEventListener('resize', () => {
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.dampingFactor = 0.03
controls.minDistance = 0.1
controls.maxDistance = 10
controls.update()

// Animations
const clock = new THREE.Clock()

const tick = () => {
  const elapsedTime = clock.getElapsedTime()

  renderer.render(scene, camera)
  controls.update()
  window.requestAnimationFrame(tick)
}
tick()
