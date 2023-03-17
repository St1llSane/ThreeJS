import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import * as dat from 'dat.gui'
import './style.css'

// Canvas
const canvas = document.querySelector('.webgl')

// Scene
const scene = new THREE.Scene()

// Update all materials
const updateAllMaterials = () => {
  scene.traverse((child) => {
    if (
      child instanceof THREE.Mesh &&
      child.material instanceof THREE.MeshStandardMaterial
    ) {
      // child.material.envMap = envMap
      child.material.envMapIntensity = debugObject.envMapIntensity
      child.material.needsUpdate = true
    }
  })
}

// Loaders
const gltfLoader = new GLTFLoader()
const cubeTextureLoader = new THREE.CubeTextureLoader()

// Env Map
const envMap = cubeTextureLoader.load([
  './textures/environmentMaps/0/px.jpg',
  './textures/environmentMaps/0/nx.jpg',
  './textures/environmentMaps/0/py.jpg',
  './textures/environmentMaps/0/ny.jpg',
  './textures/environmentMaps/0/pz.jpg',
  './textures/environmentMaps/0/nz.jpg',
])
scene.background = envMap
scene.environment = envMap
envMap.encoding = THREE.sRGBEncoding

// Models
gltfLoader.load('./models/hamburger.glb', (gltf) => {
  gltf.scene.scale.set(0.3, 0.3, 0.3)
  gltf.scene.position.set(0, -1, 0)

  const children = [...gltf.scene.children]
  children.forEach((child) => {
    child.castShadow = true
    child.receiveShadow = true
  })

  scene.add(gltf.scene)

  updateAllMaterials()

  gui
    .add(gltf.scene.rotation, 'y')
    .min(-Math.PI)
    .max(Math.PI)
    .step(0.001)
    .name('ModelRotation')
})

// Lights
const directionalLight = new THREE.DirectionalLight('#ffffff', 3)
directionalLight.position.set(0.25, 3, -2.25)
directionalLight.castShadow = true
directionalLight.shadow.camera.far = 15
directionalLight.shadow.mapSize.set(1024, 1024)
directionalLight.shadow.normalBias = 0.02
scene.add(directionalLight)

// const directionalLightHelper = new THREE.CameraHelper(
//   directionalLight.shadow.camera, 1
// )
// scene.add(directionalLightHelper)

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
camera.position.set(5, 1, -5)
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true })
renderer.setSize(sizes.width, sizes.height)
renderer.physicallyCorrectLights = true
renderer.outputEncoding = THREE.sRGBEncoding
renderer.toneMapping = THREE.ReinhardToneMapping
renderer.toneMappingExposure = 1
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

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
controls.maxDistance = 25
controls.update()

// Debug UI
const gui = new dat.GUI({ width: 320 })
const debugObject = {}

gui
  .add(directionalLight, 'intensity')
  .min(0)
  .max(10)
  .step(0.01)
  .name('DLightIntensity')
gui
  .add(directionalLight.position, 'x')
  .min(-5)
  .max(5)
  .step(0.001)
  .name('LightX')
gui
  .add(directionalLight.position, 'y')
  .min(-5)
  .max(5)
  .step(0.001)
  .name('LightY')
gui
  .add(directionalLight.position, 'z')
  .min(-5)
  .max(5)
  .step(0.001)
  .name('LightZ')

debugObject.envMapIntensity = 2.3
gui
  .add(debugObject, 'envMapIntensity')
  .min(0)
  .max(10)
  .step(0.01)
  .name('EnvMapIntensity')
  .onChange(updateAllMaterials)

gui
  .add(renderer, 'toneMapping', {
    NTM: THREE.NoToneMapping,
    LTN: THREE.LinearToneMapping,
    RTM: THREE.ReinhardToneMapping,
    CTM: THREE.CineonToneMapping,
    ATN: THREE.ACESFilmicToneMapping,
  })
  .onFinishChange(() => {
    renderer.toneMapping = Number(renderer.toneMapping)
    updateAllMaterials()
  })

gui
  .add(renderer, 'toneMappingExposure')
  .min(0)
  .max(5)
  .step(0.01)
  .name('ToneMappingExposure')

// Animations
const clock = new THREE.Clock()

const tick = () => {
  const elapsedTime = clock.getElapsedTime()

  renderer.render(scene, camera)
  controls.update()
  window.requestAnimationFrame(tick)
}
tick()
