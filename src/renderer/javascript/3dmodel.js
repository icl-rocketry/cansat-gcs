const cwidth = document.querySelector("#model-container").clientWidth - 40;
const cheight = document.querySelector("#model-container").clientHeight - 40;
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, cwidth / cheight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setClearColor(0xffffff, 0);
renderer.setSize(cwidth, cheight);

var light = new THREE.PointLight(0xffffff);
light.position.set(0, 150, 100);
scene.add(light);
// SKYBOX/FOG
var skyBoxGeometry = new THREE.CubeGeometry(10000, 10000, 10000);
var skyBoxMaterial = new THREE.MeshBasicMaterial({ color: 0x9999ff, side: THREE.BackSide });
var skyBox = new THREE.Mesh(skyBoxGeometry, skyBoxMaterial);
scene.add(skyBox);

document.querySelector("#model-container").appendChild(renderer.domElement);

// var geometry = new THREE.BoxGeometry(1, 1, 1);
var geometry = new THREE.CylinderGeometry(1, 1, 5, 10, 1, false, 0, Math.PI * 2);
// var material = new THREE.MeshBasicMaterial({ color: 0x716ce1 });
var material = new THREE.MeshNormalMaterial();
var cylinder = new THREE.Mesh(geometry, material);
scene.add(cylinder);

camera.position.z = 5;

var animate = function () {
  requestAnimationFrame(animate);

  cylinder.rotation.x += 0.01;
  cylinder.rotation.y += 0.01;

  renderer.render(scene, camera);
};
animate();