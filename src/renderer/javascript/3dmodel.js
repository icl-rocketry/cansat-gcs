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

// var geometry = new THREE.BoxGeometry(1, 1, 1);
const geometry = new THREE.CylinderGeometry(1, 1, 5, 10, 1, false, 0, Math.PI * 2)
// var material = new THREE.MeshBasicMaterial({ color: 0x716ce1 });
const material = new THREE.MeshNormalMaterial()
const cylinder = new THREE.Mesh(geometry, material)
scene.add(cylinder)

camera.position.z = 5

const animate = () => {
  requestAnimationFrame(animate)

  cylinder.rotation.x += 0.01
  cylinder.rotation.y += 0.01

  renderer.render(scene, camera)
}

animate()
