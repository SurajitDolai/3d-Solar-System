import * as THREE from 'https://unpkg.com/three@0.165.0/build/three.module.js';

import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";

let scene, camera, renderer, controls, skybox;
let sun, mercury, venus, earth, mars, jupiter, saturn, uranus, neptune;

let mercury_orbit = 50;
let venus_orbit = 60;
let earth_orbit = 70;
let mars_orbit = 80;
let jupiter_orbit = 100;
let saturn_orbit = 120;
let uranus_orbit = 140;
let neptune_orbit = 160;



let mercury_speed ;
let venus_speed;
let earth_speed;
let mars_speed ;
let jupiter_speed ;
let saturn_speed ;
let uranus_speed ;
let neptune_speed ;

const Btn = document.getElementById('btn');

let isPlaying = false;

Btn.addEventListener('click', () => {
  isPlaying = !isPlaying;

  if (isPlaying) {
   
    Btn.textContent = 'Pause';
      mercury_speed = 2;
      venus_speed = 1.5;
      earth_speed = 1;
      mars_speed = 0.8;
      jupiter_speed = 0.7;
      saturn_speed = 0.6;
      uranus_speed = 0.5;
      neptune_speed = 0.4;
  } else {
    
    Btn.textContent = 'Play';
      mercury_speed = 0;
      venus_speed = 0;
      earth_speed = 0;
      mars_speed = 0;
      jupiter_speed = 0;
      saturn_speed = 0;
      uranus_speed = 0;
      neptune_speed = 0;
  }
});


function createRing(outerRadius){
  let innerRadius=outerRadius-0.1;
  let thetaSegmmenet=64
  const geometry=new THREE.RingGeometry(innerRadius,outerRadius,thetaSegmmenet);
  const material=new THREE.MeshBasicMaterial({color:'grey',side:THREE.DoubleSide});
  const mesh=new THREE.Mesh(geometry,material);
  scene.add(mesh);
  mesh.rotation.x=Math.PI/2;
return mesh;
}

function loadPlant(texture, radius, widthSegment, heightSegement, meshType) {
  const geometry = new THREE.SphereGeometry(radius, widthSegment, heightSegement);
  const loader = new THREE.TextureLoader();
  const planttexture = loader.load(texture);
  const material = new THREE.MeshBasicMaterial({ map: planttexture })

  const planet = new THREE.Mesh(geometry, material)
  return planet;
}

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    85,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  )

  earth = loadPlant('img/earth_hd.jpg', 4, 100, 100, 'standard');
  sun = loadPlant('img/sun_hd.jpg', 20, 100, 100, 'basic');
  mercury = loadPlant('img/mercury_hd.jpg', 2, 100, 100, 'standard');
  venus = loadPlant('img/venus_hd.jpg', 3, 100, 100, 'standard');
  uranus = loadPlant('img/uranus_hd.jpg', 6, 100, 100, 'standard');

  mars = loadPlant('img/mars_hd.jpg', 3.5, 100, 100, 'standard');
  jupiter = loadPlant('img/jupiter_hd.jpg', 10, 100, 100, 'standard');
  saturn = loadPlant('img/saturn_hd.jpg', 8, 100, 100, 'standard');
  neptune = loadPlant('img/neptune_hd.jpg', 5, 100, 100, 'standard');

  scene.add(sun)
  scene.add(earth)
  scene.add(mercury)
  scene.add(venus)
  scene.add(mars)
  scene.add(jupiter)
  scene.add(saturn)
  scene.add(uranus)
  scene.add(neptune)

  createRing(earth_orbit)
  createRing(mercury_orbit)
  createRing(mars_orbit)
  createRing(uranus_orbit)
  createRing(jupiter_orbit)
  createRing(neptune_orbit)
  createRing(venus_orbit)
  createRing(saturn_orbit)
  createRing(earth_orbit)
  createRing(earth_orbit)

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  renderer.domElement.id = "c";
  renderer.render(scene, camera)

  controls = new OrbitControls(camera, renderer.domElement);
  controls.minDistance = 12;
  controls.maxDistance = 1000;

  camera.position.z = 100;

  // earth.position.x=sun.position.x+earth_orbit
}

 function planetrevolver(time,speed,planet,orbitradius,planetname){
      const orbitsppeed=0.001;
      const planetangle=time*orbitsppeed*speed;
      planet.position.x=sun.position.x+orbitradius*Math.cos(planetangle)
      planet.position.z=sun.position.x+orbitradius*Math.sin(planetangle)
    }

function animated(time) {
  const rotationspeed = 0.005;

  sun.rotation.y += rotationspeed;
  earth.rotation.y += rotationspeed;
  mercury.rotation.y += rotationspeed;
  venus.rotation.y += rotationspeed;
  mars.rotation.y += rotationspeed;
  jupiter.rotation.y += rotationspeed;
  saturn.rotation.y += rotationspeed;
  uranus.rotation.y+=rotationspeed;
  neptune.rotation.y +=rotationspeed;

  requestAnimationFrame(animated)
  renderer.render(scene, camera);
  planetrevolver(time,mercury_speed,mercury,mercury_orbit,"mercury");
  planetrevolver(time,venus_speed,venus,venus_orbit,"venus");
  planetrevolver(time,earth_speed,earth,earth_orbit,"earth");
  planetrevolver(time,mars_speed,mars,mars_orbit,"mars");
  planetrevolver(time,jupiter_speed,jupiter,jupiter_orbit,"jupiter");
  planetrevolver(time,saturn_speed,saturn,saturn_orbit,"saturn");
  planetrevolver(time,uranus_speed,uranus,uranus_orbit,"urenus");
  planetrevolver(time,neptune_speed,neptune,neptune_orbit,"neptune")

}

function onwindowResize(){
  camera.aspect=window.innerWidth/window.innerHeight;
  camera.updateProjectmatrix();
  renderer.setSize(window.innerWidth,window.innerHeight);
}
window.addEventListener("resize",onwindowResize,false)

init()
animated(0)


const toggleBtn = document.getElementById('toggleBtn');

toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');


  if (document.body.classList.contains('dark-mode')) {
    localStorage.setItem('theme', 'dark');
  } else {
    localStorage.setItem('theme', 'light');
  }
});


window.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
  }
});


