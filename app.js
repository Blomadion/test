// Создание сцены и камеры
const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0xd9d9d9, 200, 450); 

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 350;

// Рендерер
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xd9d9d9, 1); 
document.body.appendChild(renderer.domElement);

// Освещение
const ambient = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambient);

const topLight = new THREE.DirectionalLight(0xffffff, 0.6);
topLight.position.set(0, 300, 200);
scene.add(topLight);

const subtleLight = new THREE.PointLight(0xffffff, 0.25);
subtleLight.position.set(-200, -150, 100);
scene.add(subtleLight);

// Верхний свет для бликов
const highlightLight = new THREE.PointLight(0xffffff, 1.0, 500);
highlightLight.position.set(0, 400, 0);
scene.add(highlightLight);

// Массив сфер
const spheres = [];
const baseRadius = 80;     
const numSpheres = 3; // увеличиваем количество сфер

for (let i = 0; i < numSpheres; i++) {
  let size = Math.random() * 2 + 1; // уменьшаем размер сфер до 1-3

  const geometry = new THREE.SphereGeometry(size, 32, 32);
  const material = new THREE.MeshStandardMaterial({
    color: 0x000000,
    roughness: 0.1,
    metalness: 1.0,
    transparent: false
  });
  const sphere = new THREE.Mesh(geometry, material);

  const angle = (i / numSpheres) * Math.PI * 2 + (Math.random() * 0.4 - 0.2);
  const radius = baseRadius + (Math.random() * 20 - 10); 
  const speed = Math.random() * 0.002 + 0.001; // увеличиваем диапазон скорости для разнообразия

  spheres.push({ mesh: sphere, angle, radius, speed });
  scene.add(sphere);
}

// Анимация сфер
function animate() {
  requestAnimationFrame(animate);

  spheres.forEach(s => {
    s.angle += s.speed;
    const x = Math.cos(s.angle) * s.radius;
    const y = Math.sin(s.angle) * s.radius;
    s.mesh.position.set(x, y, Math.sin(s.angle * 1.3) * 15); // изменяем высоту для большего эффекта
  });

  renderer.render(scene, camera);
}
animate(); // Запуск анимации
