import {Component, OnInit} from '@angular/core';
import * as THREE from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

import {GPUComputationRenderer} from "three/examples/jsm/misc/GPUComputationRenderer";

@Component({
  selector: 'app-engine',
  templateUrl: './engine.component.html',
  styleUrls: ['./engine.component.less']
})
export class EngineComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
    this.initData()
  }

//初始化 查询所有引擎
  initData() {
    // this.test();
    // this.list();
    // this.listt();
    // this.csdn();
    // this.Diagram();
    // this.charset();
    // this.charlist();

  }

  test() {
    /////////////////////////////////////////////////////////////
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    // renderer.setClearColor(0xffffff, 1.0); //设置画布的颜色
    renderer.setSize(window.innerWidth / 1.7, window.innerHeight / 1.7); //设置画布尺寸
    // renderer.setSize(1400, 400);
    // @ts-ignore
    document.getElementById("tt").appendChild(renderer.domElement); //设置页面div 显示区域

    //设置物体
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({color: 0x00ee0});
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    const animate = function () {
      requestAnimationFrame(animate);
      // cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    camera.position.z = 5;
    renderer.render(scene, camera);
    animate();
///////////////////////////////////////////////////////
  }

  list() {
    //初始化 画布
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer(); //2D画布
    renderer.setClearColor(0xffffff, 1.0); //设置画布的颜色
    renderer.setSize(1100, 750); //设置画布尺寸
    // @ts-ignore
    document.getElementById("container").appendChild(renderer.domElement); //设置页面div 显示区域


    // const renderer = new CSS3DRenderer(); //3D画布
    // camera.position.set( 600, 400, 1500 );
    // camera.lookAt( 0, 0, 0 );
    // renderer.setSize(window.innerWidth, window.innerHeight);
    // // @ts-ignore
    // document.getElementById('tt').appendChild(renderer.domElement);
    // const loader = new GLTFLoader();
    // loader.load( 'path/to/model.glb', function ( gltf ) {
    //   scene.add( gltf.scene );
    //   }, undefined, function ( error ) { console.error( error ); } );

    //绘制正方体图形
    // const geometry = new THREE.BoxGeometry(2, 4, 2);
    // const material = new THREE.MeshBasicMaterial({color: 0x0ffe0});
    // const cube = new THREE.Mesh(geometry, material);
    // scene.add(cube);
//绘制圆形
//     const geometry = new THREE.CircleGeometry( 2, 100 );
//     const material = new THREE.MeshBasicMaterial( { color: 0x0ffe0 } );
//     const circle = new THREE.Mesh( geometry, material );
//     scene.add( circle );
//     //网格几何体
//     const geometry = new THREE.SphereGeometry( 100, 100, 100 );
//     const wireframe = new THREE.WireframeGeometry( geometry );
//     const line = new THREE.LineSegments( wireframe );
//     // @ts-ignore
//     line.material.depthTest = false;
//     // @ts-ignore
//     line.material.opacity = 0.25;
//     // @ts-ignore
//     line.material.transparent = true;
//     scene.add( line );
    //圆环缓冲扭结几何体
    // const geometry = new THREE.TorusKnotGeometry(2, 0.8, 20, 3, 3, 3);
    // const material = new THREE.MeshBasicMaterial({color: 0xffff00});
    // const torusKnot = new THREE.Mesh(geometry, material);
    // scene.add(torusKnot);


    // //动画效果
    // const animate = function () {
    //   requestAnimationFrame(animate);
    //   // cube.rotation.x += 0.01; //旋转设置
    //   // cube.rotation.y += 0.01;//旋转设置
    //   torusKnot.rotation.x += 0.01;
    //   torusKnot.rotation.y += 0.01;
    //   camera.position.z = 5;
    //   renderer.render(torusKnot, camera); //显示画布
    // };
    // animate(); //调用动画效果方法
//////////////////////////////////////////////////
    let texture = new THREE.TextureLoader().load("/text.png")
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping; //每个都重复
    texture.repeat.set(1, 1)
    texture.needsUpdate = true;


    let geometry = new THREE.CylinderGeometry(4, 4, 2, 64);
    let materials = [
      new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.DoubleSide,
        transparent: true
      }),
      new THREE.MeshBasicMaterial({
        transparent: true,
        opacity: 0,
        side: THREE.DoubleSide
      }),
      new THREE.MeshBasicMaterial({
        transparent: true,
        opacity: 0,
        side: THREE.DoubleSide
      })
    ]
    let mesh = new THREE.Mesh(geometry, materials)

    scene.add(mesh)

    let s = 0;
    let p = 1;

    function animate() {
      // 一定要在此函数中调用
      s += 0.01;
      p -= 0.005;
      if (s > 2) {
        s = 0;
        p = 1;
      }
      mesh.scale.set(1 + s, 1, 1 + s);
      mesh.material[0].opacity = p;

      requestAnimationFrame(animate)
    }

    animate()


  }

  listt() {
    //初始化 画布
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({antialias: true, alpha: true}); //2D画布
    renderer.setClearAlpha(0.2);//设置透明度
    // renderer.setClearColor(0xffffff,1.0); //设置画布的颜色
    renderer.setSize(window.innerWidth, window.innerHeight); //设置画布尺寸
    // @ts-ignore
    document.getElementById("containerr").appendChild(renderer.domElement); //设置页面div 显示区域


    // const renderer = new CSS3DRenderer(); //3D画布
    // camera.position.set( 600, 400, 1500 );
    // camera.lookAt( 0, 0, 0 );
    // renderer.setSize(window.innerWidth, window.innerHeight);
    // // @ts-ignore
    // document.getElementById('tt').appendChild(renderer.domElement);
    // const loader = new GLTFLoader();
    // loader.load( 'path/to/model.glb', function ( gltf ) {
    //   scene.add( gltf.scene );
    //   }, undefined, function ( error ) { console.error( error ); } );

    //绘制正方体图形
    // const geometry = new THREE.BoxGeometry(2, 4, 2);
    // const material = new THREE.MeshBasicMaterial({color: 0x0ffe0});
    // const cube = new THREE.Mesh(geometry, material);
    // scene.add(cube);
//绘制圆形
//     const geometry = new THREE.CircleGeometry( 2, 100 );
//     const material = new THREE.MeshBasicMaterial( { color: 0x0ffe0 } );
//     const circle = new THREE.Mesh( geometry, material );
//     scene.add( circle );
//     //网格几何体
//     const geometry = new THREE.SphereGeometry( 100, 100, 100 );
//     const wireframe = new THREE.WireframeGeometry( geometry );
//     const line = new THREE.LineSegments( wireframe );
//     // @ts-ignore
//     line.material.depthTest = false;
//     // @ts-ignore
//     line.material.opacity = 0.25;
//     // @ts-ignore
//     line.material.transparent = true;
//     scene.add( line );
    //圆环缓冲扭结几何体
    const geometry = new THREE.TorusKnotGeometry(2, 0.8, 20, 3, 3, 3);
    const material = new THREE.MeshBasicMaterial({color: 0xffff00});
    const torusKnot = new THREE.Mesh(geometry, material);
    scene.add(torusKnot);


    //动画效果
    const animate = function () {
      requestAnimationFrame(animate);
      // cube.rotation.x += 0.01; //旋转设置
      // cube.rotation.y += 0.01;//旋转设置
      torusKnot.rotation.x += 0.01;
      torusKnot.rotation.y += 0.01;
      camera.position.z = 5;
      renderer.render(torusKnot, camera); //显示画布
    };
    animate(); //调用动画效果方法

  }

  //设置背景图实例
  csdn() {
    let scene, camera: any, renderer: any, stats;
// 1,创建环境
    scene = new THREE.Scene();
// 注意：scene.background  与 THREE.WebGLRenderer( { alpha: true } ) 冲突，会显示不错背景图
    //scene.background

    // 2.
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 200);
    camera.position.set(-10, 0, 25);
    //camera.lookAt( scene.position );
    // 3，
    const ambientLight = new THREE.AmbientLight(0xcccccc, 0.4);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
    directionalLight.position.set(-1, 1, 100);
    scene.add(directionalLight);
    // 4.
    renderer = new THREE.WebGLRenderer({alpha: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    document.body.appendChild(renderer.domElement);

    // 注意：.setClearColor 与 THREE.WebGLRenderer( { alpha: true } ) 冲突，会显示不错背景图
    // renderer.setClearColor('#cccccc');
    //5.
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.minDistance = 5;
    controls.maxDistance = 50;
    controls.enablePan = false; // 移动 禁止
    // 6.

    // @ts-ignore
    stats = new Stats();
    document.body.appendChild(stats.dom);

    function onWindowResize() {

      // @ts-ignore
      camera.aspect = window.innerWidth / window.innerHeight;
      // @ts-ignore
      camera.updateProjectionMatrix();
      // @ts-ignore
      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    // onWindowResize
    window.addEventListener('resize', onWindowResize);


    var mesh = new THREE.Mesh(new THREE.BoxGeometry(5, 5, 5), new THREE.MeshLambertMaterial());

    scene.add(mesh);
    var helper = new THREE.AxesHelper(20);
    scene.add(helper);


    // @ts-ignore
    stats = new Stats();
    document.body.appendChild(stats.dom);

    // window.location.href = renderer.domElement.toDataURL( 'image/png' );
    stats.update();
    renderer.render(scene, camera);
    // 7.
    const animate = function () {
      requestAnimationFrame(animate);
      // stats.update();
      // renderer.render(scene, camera);
    };
    animate();
  }

  Diagram() {
    // Texture width for simulation (each texel is a debris particle)
    const WIDTH = 64;

    let container;
    let stats: any;
    let camera: any, scene: any, renderer: any, geometry;

    const PARTICLES = WIDTH * WIDTH;

    let gpuCompute: any;
    let velocityVariable: any;
    let positionVariable: any;
    let velocityUniforms: any;
    let particleUniforms: any;
    let effectController: any;

    init();
    animate();

    function init() {

      container = document.createElement('div');
      document.body.appendChild(container);

      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 5, 15000);
      camera.position.y = 120;
      camera.position.z = 400;

      scene = new THREE.Scene();

      renderer = new THREE.WebGLRenderer();
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
      container.appendChild(renderer.domElement);

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.minDistance = 100;
      controls.maxDistance = 1000;

      effectController = {
        // Can be changed dynamically
        gravityConstant: 100.0,
        density: 0.45,

        // Must restart simulation
        radius: 300,
        height: 8,
        exponent: 0.4,
        maxMass: 15.0,
        velocity: 70,
        velocityExponent: 0.2,
        randVelocity: 0.001
      };

      initComputeRenderer();

      // @ts-ignore
      stats = new Stats();
      container.appendChild(stats.dom);

      window.addEventListener('resize', onWindowResize);

      initGUI();

      initProtoplanets();

      dynamicValuesChanger();

    }

    function initComputeRenderer() {

      gpuCompute = new GPUComputationRenderer(WIDTH, WIDTH, renderer);

      if (renderer.capabilities.isWebGL2 === false) {

        gpuCompute.setDataType(THREE.HalfFloatType);

      }

      const dtPosition = gpuCompute.createTexture();
      const dtVelocity = gpuCompute.createTexture();

      fillTextures(dtPosition, dtVelocity);

      // @ts-ignore
      velocityVariable = gpuCompute.addVariable('textureVelocity', document.getElementById('computeShaderVelocity').textContent, dtVelocity);
      // @ts-ignore
      positionVariable = gpuCompute.addVariable('texturePosition', document.getElementById('computeShaderPosition').textContent, dtPosition);

      gpuCompute.setVariableDependencies(velocityVariable, [positionVariable, velocityVariable]);
      gpuCompute.setVariableDependencies(positionVariable, [positionVariable, velocityVariable]);

      velocityUniforms = velocityVariable.material.uniforms;

      velocityUniforms['gravityConstant'] = {value: 0.0};
      velocityUniforms['density'] = {value: 0.0};

      const error = gpuCompute.init();

      if (error !== null) {

        console.error(error);

      }

    }

    function restartSimulation() {

      const dtPosition = gpuCompute.createTexture();
      const dtVelocity = gpuCompute.createTexture();

      fillTextures(dtPosition, dtVelocity);

      gpuCompute.renderTexture(dtPosition, positionVariable.renderTargets[0]);
      gpuCompute.renderTexture(dtPosition, positionVariable.renderTargets[1]);
      gpuCompute.renderTexture(dtVelocity, velocityVariable.renderTargets[0]);
      gpuCompute.renderTexture(dtVelocity, velocityVariable.renderTargets[1]);

    }

    function initProtoplanets() {

      geometry = new THREE.BufferGeometry();

      const positions = new Float32Array(PARTICLES * 3);
      let p = 0;

      for (let i = 0; i < PARTICLES; i++) {

        positions[p++] = (Math.random() * 2 - 1) * effectController.radius;
        positions[p++] = 0; //( Math.random() * 2 - 1 ) * effectController.radius;
        positions[p++] = (Math.random() * 2 - 1) * effectController.radius;

      }

      const uvs = new Float32Array(PARTICLES * 2);
      p = 0;

      for (let j = 0; j < WIDTH; j++) {

        for (let i = 0; i < WIDTH; i++) {

          uvs[p++] = i / (WIDTH - 1);
          uvs[p++] = j / (WIDTH - 1);

        }

      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));

      particleUniforms = {
        'texturePosition': {value: null},
        'textureVelocity': {value: null},
        'cameraConstant': {value: getCameraConstant(camera)},
        'density': {value: 0.0}
      };

      // THREE.ShaderMaterial

      const material = new THREE.ShaderMaterial({
        uniforms: particleUniforms,
        // @ts-ignore
        vertexShader: document.getElementById('particleVertexShader').textContent,
        // @ts-ignore
        fragmentShader: document.getElementById('particleFragmentShader').textContent
      });

      material.extensions.drawBuffers = true;

      const particles = new THREE.Points(geometry, material);
      particles.matrixAutoUpdate = false;
      particles.updateMatrix();

      scene.add(particles);

    }

    function fillTextures(texturePosition: any, textureVelocity: any) {

      const posArray = texturePosition.image.data;
      const velArray = textureVelocity.image.data;

      const radius = effectController.radius;
      const height = effectController.height;
      const exponent = effectController.exponent;
      const maxMass = effectController.maxMass * 1024 / PARTICLES;
      const maxVel = effectController.velocity;
      const velExponent = effectController.velocityExponent;
      const randVel = effectController.randVelocity;

      for (let k = 0, kl = posArray.length; k < kl; k += 4) {

        // Position
        let x, z, rr;

        do {

          x = (Math.random() * 2 - 1);
          z = (Math.random() * 2 - 1);
          rr = x * x + z * z;

        } while (rr > 1);

        rr = Math.sqrt(rr);

        const rExp = radius * Math.pow(rr, exponent);

        // Velocity
        const vel = maxVel * Math.pow(rr, velExponent);

        const vx = vel * z + (Math.random() * 2 - 1) * randVel;
        const vy = (Math.random() * 2 - 1) * randVel * 0.05;
        const vz = -vel * x + (Math.random() * 2 - 1) * randVel;

        x *= rExp;
        z *= rExp;
        const y = (Math.random() * 2 - 1) * height;

        const mass = Math.random() * maxMass + 1;

        // Fill in texture values
        posArray[k + 0] = x;
        posArray[k + 1] = y;
        posArray[k + 2] = z;
        posArray[k + 3] = 1;

        velArray[k + 0] = vx;
        velArray[k + 1] = vy;
        velArray[k + 2] = vz;
        velArray[k + 3] = mass;

      }

    }

    function onWindowResize() {

      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth, window.innerHeight);

      particleUniforms['cameraConstant'].value = getCameraConstant(camera);

    }

    function dynamicValuesChanger() {

      velocityUniforms['gravityConstant'].value = effectController.gravityConstant;
      velocityUniforms['density'].value = effectController.density;
      particleUniforms['density'].value = effectController.density;

    }

    function initGUI() {
      let gui: any;
      // const gui = new GUI( { width: 280 } );

      const folder1 = gui.addFolder('Dynamic parameters');

      folder1.add(effectController, 'gravityConstant', 0.0, 1000.0, 0.05).onChange(dynamicValuesChanger);
      folder1.add(effectController, 'density', 0.0, 10.0, 0.001).onChange(dynamicValuesChanger);

      const folder2 = gui.addFolder('Static parameters');

      folder2.add(effectController, 'radius', 10.0, 1000.0, 1.0);
      folder2.add(effectController, 'height', 0.0, 50.0, 0.01);
      folder2.add(effectController, 'exponent', 0.0, 2.0, 0.001);
      folder2.add(effectController, 'maxMass', 1.0, 50.0, 0.1);
      folder2.add(effectController, 'velocity', 0.0, 150.0, 0.1);
      folder2.add(effectController, 'velocityExponent', 0.0, 1.0, 0.01);
      folder2.add(effectController, 'randVelocity', 0.0, 50.0, 0.1);

      const buttonRestart = {
        restartSimulation: function () {

          restartSimulation();

        }
      };

      folder2.add(buttonRestart, 'restartSimulation');

      folder1.open();
      folder2.open();

    }

    function getCameraConstant(camera: any) {

      return window.innerHeight / (Math.tan(THREE.MathUtils.DEG2RAD * 0.5 * camera.fov) / camera.zoom);

    }


    function animate() {

      requestAnimationFrame(animate);

      render();
      stats.update();

    }

    function render() {

      gpuCompute.compute();

      particleUniforms['texturePosition'].value = gpuCompute.getCurrentRenderTarget(positionVariable).texture;
      particleUniforms['textureVelocity'].value = gpuCompute.getCurrentRenderTarget(velocityVariable).texture;

      renderer.render(scene, camera);

    }
  }

  charset() {
    /*** 创建场景对象*/
    var scene = new THREE.Scene();
    /**
     * 创建网格模型
     */
    var box = new THREE.BoxGeometry(100, 100, 100);//创建一个立方体几何对象
    var material = new THREE.MeshLambertMaterial({color: 0x0000ff});//材质对象
    var mesh = new THREE.Mesh(box, material);//网格模型对象
    scene.add(mesh);//网格模型添加到场景中
    /**
     * 光源设置
     */
      //点光源
    var point = new THREE.PointLight(0xffffff);
    point.position.set(400, 200, 300);//点光源位置
    scene.add(point);//点光源添加到场景中
    //环境光
    var ambient = new THREE.AmbientLight(0x444444);
    scene.add(ambient);
    /**
     * 相机设置
     */
    var width = window.innerWidth;//窗口宽度
    var height = window.innerHeight;//窗口高度
    var k = width / height;//窗口宽高比
    var s = 100;//三维场景缩放系数
    //创建相机对象
    var camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
    camera.position.set(200, 300, 200);//设置相机位置
    camera.lookAt(scene.position);//设置相机方向(指向的场景对象)
    /**
     * 创建渲染器对象
     */
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    renderer.setClearColor(0xb9d3ff, 1);//设置背景颜色
    // @ts-ignore
    document.getElementById("add").appendChild(renderer.domElement);
    // document.body.appendChild(renderer.domElement);//body元素中插入canvas对象
    //执行渲染操作
    renderer.render(scene, camera);
  }


  charlist() {
    /////////////////////////////////////////////////////////////4.4 透视投影照相机
    //创建一个三维场景
    const scene = new THREE.Scene();

    //透视投影相机设置
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(10, 10, 10);  //设置视野的中心坐标
    // camera.lookAt(0,0,0);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    //创建渲染器对象
    const renderer = new THREE.WebGLRenderer(); //定义着色器
    renderer.setSize(window.innerWidth / 1.7, window.innerHeight / 1.7); //设置画布尺寸
    // document.body.appendChild( renderer.domElement );
    // @ts-ignore
    document.getElementById("addd").appendChild(renderer.domElement); //设置页面div 显示区域

    //相机 卡擦
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(10, 0, 10);
    controls.update();
    // @ts-ignore
    controls.addEventListener('change', function () {
      renderer.render(scene, camera); //渲染操作
      console.log(111)
    });

    //设置物体
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    // const material = new THREE.MeshBasicMaterial({color: 0x00ee0}); //方体
    const material = new THREE.MeshLambertMaterial({
      color: 0x00ee0,//设置物体颜色
      transparent: true,//开启透明
      opacity: 0.5,//设置透明度
    });

    for (let i = 0; i < 10; i++) { //控制行
      for (let j = 0; j < 10; j++) { //控制列
        const cube = new THREE.Mesh(geometry, material);
        cube.position.set(i * 2, 0, j * 2);
        scene.add(cube); // 将物体添加到页面中
      }
    }

    //设置物体的位置
    // cube.position.set(0,2,0);
    //设置旋转 45度
    // cube.rotateY(Math.PI/4);

    //添加光源
    const light = new THREE.AmbientLight(0xffffff, 5);
    scene.add(light);
    //添加一个点光源
    const p = new THREE.PointLight(0xffffff, 0.9);
    p.position.set(2, 2, 2);
    scene.add(p);
    const axesHelper = new THREE.AxesHelper(150); //设置辅助三维坐标轴 rgb = xyz
    scene.add(axesHelper);
    //可视化光源
    const ph = new THREE.PointLightHelper(p, 0.5);
    scene.add(ph);

    //旋转
    const animate = function () { //循环函数

      // cube.rotation.x += 0.01;
      // cube.rotation.y += 0.01;
      // cube.rotation.z += 0.01;
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    camera.position.z = 5;
    renderer.render(scene, camera);
    animate();
///////////////////////////////////////////////////////
  }

}
