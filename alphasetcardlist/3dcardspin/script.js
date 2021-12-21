var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(50, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.z = 80;
camera.position.y = 0;

var renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMapEnabled = true;
renderer.shadowMapSoft = true;
renderer.shadowCameraNear = 3;
renderer.shadowCameraFar = camera.far;
renderer.shadowCameraFov = 50;
renderer.shadowMapBias = 0.0039;
renderer.shadowMapDarkness = 0.8;
renderer.shadowMapWidth = 512;
renderer.shadowMapHeight = 512;
// renderer.setClearColor( 0x000000, 0 ); // the default

document.body.appendChild(renderer.domElement);

var cube = new THREE.CubeGeometry(30, 45, 0.00001);
THREE.ImageUtils.crossOrigin = '';

var img1 = THREE.ImageUtils.loadTexture('./images/backside.png');
var img2 = THREE.ImageUtils.loadTexture('./images/30.png');
var img3 = THREE.ImageUtils.loadTexture('');

var texture1 = new THREE.MeshPhongMaterial({
  bumpMap: img1,
  bumpScale: -0.5,
  map: img1,
  shininess: 90,
  specular: 0x222222,
  specularMap: img1,
  transparent: true
});

var texture2 = new THREE.MeshPhongMaterial({
  bumpMap: img2,
  bumpScale: -0.5,
  map: img2,
  shininess: 90,
  specular: 0x11111,
  specularMap: img2,
  transparent: true
});

var texture3 = new THREE.MeshPhongMaterial();

var textures = [texture3, texture3, texture3, texture3, texture2, texture1];
var meshFaceMaterial = new THREE.MeshFaceMaterial(textures);

var card = new THREE.Mesh(cube, meshFaceMaterial);
card.position.z = 14;
card.castShadow = true;

var plane = new THREE.Mesh(
  new THREE.PlaneGeometry(255, 30),
  new THREE.MeshPhongMaterial({
    map: img3
  })
);

plane.overdraw = true;
plane.position.z = 0;
plane.receiveShadow = true;

var directionalLight = new THREE.DirectionalLight(0xFFFFFF);
directionalLight.position.set(5, 5, 120);
//directionalLight.shadowCameraVisible = true;
directionalLight.castShadow = false;
directionalLight.shadowCameraNear = 1;
directionalLight.shadowDarkness = 0.5;

var ambientLight = new THREE.AmbientLight(0x000000);

scene.add(ambientLight);
scene.add(directionalLight);
scene.add(card);
scene.add(plane);

function render() {
  requestAnimationFrame(render);
  card.rotation.y += 0.015;
  renderer.render(scene, camera);
}

render();