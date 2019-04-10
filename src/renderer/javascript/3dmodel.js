import * as THREE from 'three'

const cwidth = document.querySelector('#model-container').clientWidth - 40
const cheight = document.querySelector('#model-container').clientHeight - 40
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, cwidth / cheight, 0.1, 1000)

const renderer = new THREE.WebGLRenderer({ alpha: true })
renderer.setClearColor(0xffffff, 0)
renderer.setSize(cwidth, cheight)

const light = new THREE.PointLight(0xffffff)
light.position.set(0, 150, 100)
scene.add(light)
// SKYBOX/FOG
const skyBoxGeometry = new THREE.CubeGeometry(10000, 10000, 10000)
const skyBoxMaterial = new THREE.MeshBasicMaterial({ color: 0x9999ff, side: THREE.BackSide })
const skyBox = new THREE.Mesh(skyBoxGeometry, skyBoxMaterial)
scene.add(skyBox)

document.querySelector('#model-container').appendChild(renderer.domElement)

const geometry = new THREE.CylinderGeometry(1, 1, 5, 10, 1, false, 0, Math.PI * 2)
const material = new THREE.MeshNormalMaterial()
const cylinder = new THREE.Mesh(geometry, material)
scene.add(cylinder)

camera.position.z = 5
renderer.render(scene, camera)

const animate = (orientX, orientY, orientZ) => {
  const vector = new THREE.Vector3(
    orientX,
    orientY,
    orientZ,
  )

  const focalPoint = new THREE.Vector3(
    cylinder.position.x + vector.x,
    cylinder.position.y + vector.y,
    cylinder.position.z + vector.z,
  )

  const axis = new THREE.Vector3(0, 0, 1)
  cylinder.quaternion.setFromUnitVectors(axis, focalPoint.clone().normalize())
  renderer.render(scene, camera)
}

export default animate
