import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as dat from 'dat.gui'
import gsap from 'gsap'
import './style.css'

// Textures
const loadingManager = new THREE.LoadingManager()
loadingManager.onStart = () => {
	console.log('onStart');
}
loadingManager.onProgress = () => {
	console.log('onProgress');
}
loadingManager.onLoad = () => {
	console.log('onLoad');
}
loadingManager.onError = () => {
	console.log('onError');
}

const textureLoader = new THREE.TextureLoader(loadingManager)
const colorTexture = textureLoader.load('./textures/minecraft.png')
const alphaTexture = textureLoader.load('./textures/door/alpha.jpg')
const heightTexture = textureLoader.load('./textures/door/height.jpg')
const normalTexture = textureLoader.load('./textures/door/normal.jpg')
const ambientOcclusionTexture = textureLoader.load('./textures/door/ambientOcclusion.jpg')
const metalnessTexture = textureLoader.load('./textures/door/metalness.jpg')
const roughnessTexture = textureLoader.load('./textures/door/roughness.jpg')

colorTexture.generateMipmaps = false
colorTexture.minFilter = THREE.NearestFilter
colorTexture.magFilter = THREE.NearestFilter

const scene = new THREE.Scene()

const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ map: colorTexture })
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
controls.minDistance = 1
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
