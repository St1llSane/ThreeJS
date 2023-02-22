import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import * as dat from 'dat.gui'
import './style.css'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Axes helper
// const axesHelper = new THREE.AxesHelper()
// scene.add(axesHelper)

// Textures
const textureLoader = new THREE.TextureLoader()
const matcapTexture = textureLoader.load('./textures/matcaps/10.png')

// Parameters
const params = {
  color: '#ffffff',
}

// Material
const material = new THREE.MeshMatcapMaterial({
  matcap: matcapTexture,
  color: params.color,
})

// Fonts
const fontLoader = new FontLoader()
fontLoader.load('./fonts/helvetiker_regular.typeface.json', (font) => {
  const textGeometry = new TextGeometry('Still Sane', {
    font,
    size: 0.5,
    height: 0.2,
    curveSegments: 5,
    bevelEnabled: true,
    bevelSize: 0.02,
    bevelThickness: 0.03,
    bevelOffset: 0,
    bevelSegments: 3,
  })
  textGeometry.computeBoundingBox()
  textGeometry.center()
  console.log(textGeometry.boundingBox)

  const text = new THREE.Mesh(textGeometry, material)
  scene.add(text)

  // Donuts
  const torusGeometry = new THREE.TorusGeometry(0.3, 0.19, 22, 74)

  console.time('donuts')

  for (let i = 0; i < 500; i++) {
    const torus = new THREE.Mesh(torusGeometry, material)

    torus.position.set(
      (Math.random() - 0.5) * 14,
      (Math.random() - 0.5) * 14,
      (Math.random() - 0.5) * 14
    )

    torus.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0)

    // Generate random numbers from 0.2 to 1.1
    const torusScale = Math.random() * 0.9 + 0.2
    torus.scale.set(torusScale, torusScale, torusScale)

    scene.add(torus)
  }

  console.timeEnd('donuts')
})

// Materials

// Meshes

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // Update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // Update renderer
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
)
camera.position.x = -1
camera.position.y = 0.5
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.enableRotate = true
controls.enablePan = false
controls.minDistance = 2

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Debug panel
const gui = new dat.GUI()
gui.addColor(params, 'color').onChange(() => {
  material.color.set(params.color)
})

// const cursor = {
//   x: 0,
//   y: 0,
// }
// 
// window.addEventListener('mousemove', (e) => {
//   cursor.x = e.clientX / sizes.width - 0.5
//   cursor.y = e.clientY / sizes.height - 0.5
// })

// Animations
const clock = new THREE.Clock()
const tick = () => {
  const elapsedTime = clock.getElapsedTime()

  // OrbitControls distance to target
  // const distance = controls.getDistance()

  // camera.position.x = -(cursor.x * 8) * (distance / 10)
  // camera.position.y = cursor.y * 8 * (distance / 10)

  // Update controls
  controls.update()

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}
tick()
