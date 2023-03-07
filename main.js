import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import './style.css'

// Canvas
const canvas = document.querySelector('.webgl')

// Scene
const scene = new THREE.Scene()

// Mesh
const object1 = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 16, 16),
  new THREE.MeshBasicMaterial({ color: '#ff0000' })
)
object1.position.x = -2

const object2 = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 16, 16),
  new THREE.MeshBasicMaterial({ color: '#ff0000' })
)

const object3 = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 16, 16),
  new THREE.MeshBasicMaterial({ color: '#ff0000' })
)
object3.position.x = 2

scene.add(object1, object2, object3)

// Raycaster
const raycaster = new THREE.Raycaster()

let currentIntersect = null

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

// Cursor
const cursor = new THREE.Vector2()

window.addEventListener('mousemove', (e) => {
  cursor.x = (e.clientX / sizes.width) * 2 - 1
  cursor.y = -((e.clientY / sizes.height) * 2 - 1)
})

window.addEventListener('click', () => {
  if (currentIntersect) {
    switch (currentIntersect.object) {
      case object1:
        console.log('clicked on object 1')
        break
      case object2:
        console.log('clicked on object 2')
        break
      case object3:
        console.log('clicked on object 3')
        break
    }
  }
})

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

  // Animate objects
  object1.position.y = Math.sin(elapsedTime * 0.6) * 1.5
  object2.position.y = Math.sin(elapsedTime * 0.8) * 1.5
  object3.position.y = Math.sin(elapsedTime * 1) * 1.5

  // Cast a ray
  raycaster.setFromCamera(cursor, camera)

  const objectsToTest = [object1, object2, object3]
  const intersects = raycaster.intersectObjects(objectsToTest)

  objectsToTest.forEach((obj) => {
    obj.material.color.set('#ff0000')
  })

  intersects.forEach((obj) => {
    obj.object.material.color.set('#ffffff')
  })

  if (intersects.length) {
    if (currentIntersect === null) {
      console.log('mouse enter')
    }

    currentIntersect = intersects[0]
  } else {
    if (currentIntersect) {
      console.log('mouse leave')
    }

    currentIntersect = null
  }

  renderer.render(scene, camera)
  controls.update()
  window.requestAnimationFrame(tick)
}
tick()
