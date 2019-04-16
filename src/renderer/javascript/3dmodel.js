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
const skyBoxGeometry = new THREE.CubeGeometry(10000, 10000, 10000)
const skyBoxMaterial = new THREE.MeshBasicMaterial({ color: 0x9999ff, side: THREE.BackSide })
const skyBox = new THREE.Mesh(skyBoxGeometry, skyBoxMaterial)
scene.add(skyBox)

document.querySelector('#model-container').appendChild(renderer.domElement)

const geometry = new THREE.CylinderGeometry(1, 1, 5, 10, 1, false, 0, Math.PI * 2)
geometry.center()
const material = new THREE.MeshNormalMaterial()
const cylinder = new THREE.Mesh(geometry, material)
const edge = new THREE.EdgesHelper(cylinder, 0xffffff)
scene.add(cylinder)
scene.add(edge)
camera.position.z = 6

let [prevX, prevY, prevZ] = [0, -90, 0]

const toRad = deg => deg * Math.PI / 180

const rotateModel = (orientX, orientY, orientZ) => {
  const X = toRad(orientX)
  const Y = toRad(orientY)
  const Z = toRad(orientZ)

  const axisX = new THREE.Vector3(0, 1, 0)
  const axisY = new THREE.Vector3(1, 0, 0)
  const axisZ = new THREE.Vector3(0, 0, 1)

  cylinder.rotateOnWorldAxis(axisX, X - prevX)
  cylinder.rotateOnWorldAxis(axisY, Y - prevY)
  cylinder.rotateOnWorldAxis(axisZ, Z - prevZ)

  edge.rotateOnWorldAxis(axisX, X - prevX)
  edge.rotateOnWorldAxis(axisY, Y - prevY)
  edge.rotateOnWorldAxis(axisZ, Z - prevZ)

  prevX = X
  prevY = Y
  prevZ = Z
  renderer.render(scene, camera)
}

export const animate = (orientX, orientY, orientZ) => {
  rotateModel(orientX, orientY, orientZ)
  renderer.render(scene, camera)
}

export const resetOrientation = () => {
  cylinder.rotation.x = 0
  cylinder.rotation.y = -90
  cylinder.rotation.z = 0

  edge.rotation.x = 0
  edge.rotation.y = -90
  edge.rotation.z = 0
  renderer.render(scene, camera)
}

resetOrientation()
