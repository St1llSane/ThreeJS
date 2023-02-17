import * as THREE from 'three'
import gsap from 'gsap'
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

const camera = new THREE.PerspectiveCamera(75, size.width / size.height)
camera.position.z = 3
scene.add(camera)

const canvas = document.querySelector('.webgl')
const renderer = new THREE.WebGLRenderer({
  canvas,
})
renderer.setSize(size.width, size.height)

gsap.to(cube.position, { duration: .5, delay: 1, x: 2 })
gsap.to(cube.position, { duration: 1, delay: 1.5, x: -2 })
gsap.to(cube.position, { duration: .5, delay: 2.5, y: 1 })
gsap.to(cube.position, { duration: .5, delay: 2.5, x: 0 })
gsap.to(cube.position, { duration: 1, delay: 3, y: 0 })

// const clock = new THREE.Clock()
const tick = () => {
  // const elapsedTime = clock.getElapsedTime()

  // cube.rotation.y = elapsedTime * Math.PI * 2

  // cube.position.y = Math.sin(elapsedTime)
  // cube.position.x = Math.cos(elapsedTime)

  // camera.position.y = Math.sin(elapsedTime)
  // camera.position.x = Math.cos(elapsedTime)
  // camera.lookAt(cube.position)

  renderer.render(scene, camera)

  window.requestAnimationFrame(tick)
}
tick()
