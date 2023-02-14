import {Component} from '@angular/core';
import * as THREE from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import gsap from "gsap";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  constructor() {}

  ngOnInit() {

    // this.list();
    // this.main();
  }

//初始化
  initData() {

  }

  list() {
    /////////////////////////////////////////////////////////////4.4 透视投影照相机
    //创建一个三维场景
    const scene = new THREE.Scene();

    //透视投影相机设置
    const camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(0, 10, 20);  //设置视野的中心坐标
    // camera.lookAt(0,0,0);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    //创建渲染器对象
    const renderer = new THREE.WebGLRenderer(); //定义着色器
    renderer.setSize(window.innerWidth, window.innerHeight); //设置画布尺寸
    // document.body.appendChild( renderer.domElement );
    // @ts-ignore
    document.getElementById("tt").appendChild(renderer.domElement); //设置页面div 显示区域

    //相机 卡擦
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(10, -10, 10); //设置视角点
    controls.update();
    // @ts-ignore
    controls.addEventListener('change', function () {
      renderer.render(scene, camera); //渲染操作
      console.log('渲染操作')
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
    // const axesHelper = new THREE.AxesHelper(150); //设置辅助三维坐标轴 rgb = xyz
    // scene.add(axesHelper);
    //可视化光源
    // const ph = new THREE.PointLightHelper(p,0.5);
    // scene.add(ph);

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

  main() {
    //导入THREE.js
    //导入THREE.OrbitControls 相机
    //导入THREE.GLTFLoader

    //创建场景
    let scene = new THREE.Scene();
    //创建相机
    let camera = new THREE.PerspectiveCamera(125, window.innerWidth / window.innerHeight, 0.1, 1000);
    //设置相机位置
    camera.position.set(0, 1, 25);
    camera.lookAt(new THREE.Vector3(0, -1, 0));
    //将相机添加到场景中
    scene.add(camera);

    //创建渲染器
    let renderer = new THREE.WebGL1Renderer();
    //设置渲染尺寸
    renderer.setSize(window.innerWidth, window.innerHeight);
    //将渲染器添加到页面中
    // document.body.appendChild(renderer.domElement);
    // @ts-ignore
    document.getElementById("yy").appendChild(renderer.domElement); //设置页面div 显示区域

    //创建控制器
    let controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, -1, 0);
    controls.update();
////////////////////////////////////////////
// 新建一个几何体(长方体)
    var cube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({
      color: 0xffff00,
      wireframe: true
    }));
    console.log("创建物体成功");
    cube.position.set(20, 5, 0);
    scene.add(cube);

    var cube1 = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({
      color: 0xffff00,
      wireframe: true
    }));
    console.log("创建物体成功");
    cube1.position.set(-20, 5, 0);
    console.log(cube1);
    scene.add(cube1);


    var circle = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({
      color: 0x00FF00,
      wireframe: true
    }));
    console.log("创建物体成功");
    circle.position.set(20, 5, 0);
    scene.add(circle);

    var circle3 = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true
    }));
    console.log("创建物体成功");
    circle3.position.set(0, 0, 0);
    scene.add(circle3);

    //星空背景////////////////////////////
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    for (let i = 0; i < 10000; i++) {
      vertices.push(THREE.MathUtils.randFloatSpread(2000)); // x
      vertices.push(THREE.MathUtils.randFloatSpread(2000)); // y
      vertices.push(THREE.MathUtils.randFloatSpread(2000)); // z
    }
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    const particles = new THREE.Points(geometry, new THREE.PointsMaterial({color: 0x888888}));
    scene.add(particles);
/////////////////////////////////////////////////////
// // 设置水面
//     const waterGeometry = new THREE .CircleGeometry(300,32);
//     const water = new Water(waterGeometry, {
//       textureWidth: 1024,
//       textureHeight: 1024,
//       color: 0xFF0000,
//       flowDirection: new THREE.Vector2(1, 1),
//     scale: 200,
//   });
//     water.rotation.x = -Math .PI / 2;
//     water.position.y = -0.5;
//     scene.add(water);
///////////////////////////////////////////////////////////////////
    // 创建点光源组
    const pointLightGroup = new THREE.Group();
    let radius = 3;
    let pointLightArr: any = [];
    for (let i = 0; i < 3; i++) {
      // 创建球体当灯泡
      const sphereGeometry = new THREE.SphereGeometry(0.2, 32, 32);
      const sphereMaterial = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        emissive: 0xffffff,
        emissiveIntensity: 10,
      });
      const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
      pointLightArr.push(sphere);
      sphere.position.set(
        radius * Math.cos((i * 2 * Math.PI) / 3),
        Math.cos((i * 2 * Math.PI) / 3),
        radius * Math.sin((i * 2 * Math.PI) / 3)
      );
      let pointLight = new THREE.PointLight(0xffffff, 1);
      sphere.add(pointLight);
      pointLightGroup.add(sphere);
    }
    scene.add(pointLightGroup);
//////////////////////////////////////////////////////
    // 使用补间函数 让物体旋转
    let optionsList = {
      angle: 0,
    };
    gsap.to(optionsList, {
      angle: Math.PI * 2,
      duration: 10,
      repeat: -1,
      ease: "linear",
      onUpdate: () => {
        pointLightGroup.rotation.y = optionsList.angle;
        pointLightArr.forEach((item: any, index: any) => {
          item.position.set(
            radius * Math.cos((index * 2 * Math.PI) / 3),
            Math.cos((index * 2 * Math.PI) / 3 + optionsList.angle * 5),
            radius * Math.sin((index * 2 * Math.PI) / 3)
          );
        });
      }
    });
//////////////////////////////////////////////

    //创建一条曲线
    const curvet = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-20, 5, 0),
      new THREE.Vector3(-5, 5, 5),
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(5, -5, 5),
      new THREE.Vector3(20, 5, 0)
    ]);
    const pointst = curvet.getPoints(50);
    const geometryt = new THREE.BufferGeometry().setFromPoints(pointst);
    const materialt = new THREE.LineBasicMaterial({color: 0xff0000});
    const curveObjectt = new THREE.Line(geometryt, materialt);
    scene.add(curveObjectt); //添加曲线

    let points = [];
    // //根据点创建曲线
    let curvePath: any; //曲线
    //将点添加到数组中
    // @ts-ignore
    for (let i = curveObjectt.geometry.attributes.position.count; i >= 0; i--) {
      points.push(
        new THREE.Vector3(
          // @ts-ignore
          curveObjectt.geometry.attributes.position.array[i * 3],
          // @ts-ignore
          curveObjectt.geometry.attributes.position.array[i * 3 + 1],
          // @ts-ignore
          curveObjectt.geometry.attributes.position.array[i * 3 + 2],
        )
      );
    }
    //处理数组中 第一个元素是原点坐标
    var newarr = points.concat();
    // 处理新数组，原数组不变
    newarr.shift();
    //创建曲线
    curvePath = new THREE.CatmullRomCurve3(newarr);
/////////////////////////////////////////////////////

    // //声明 模型
    // let daodan :any; //导弹
    // let mapels; //地图 els
    // let mapwkl; //地图 wkl
    // let curvePath:any; //曲线
    // //gtf模型加载
    // let loader = new GLTFLoader();
    // loader.load(
    //   //模型路径
    //   '/statc/别墅.glb',
    //   //加载成功回调
    //   function (gltf) {
    //     //将加载的模型添加到场景中
    //     scene.add(gltf.scene);
    //     //获取模型中的导弹
    //     daodan = gltf.scene.children[3];
    //     //获取模型中的wkl 地图
    //     mapwkl = gltf.scene.children[1];
    //     //获取模型中的els地图
    //     mapels = gltf.scene.children[0];
    //     //获取模型中的曲线
    //     curvePath= gltf.scene.children[2];
    //     //添加到场景中
    //     scene.add(daodan);
    //     scene.add(mapwkl);
    //     scene.add(mapels);
    //
    //     //根据点创建曲线
    //     let points = [];
    //     //将点添加到数组中
    //     for (let i = curvePath.geometry.attributes.position.count-1; i >= 0; i++) {
    //       points.push(
    //         new THREE.Vector3(
    //           curvePath.geometry.attributes.position.array[i*3],
    //           curvePath.geometry.attributes.position.array[i*3+1],
    //           curvePath.geometry.attributes.position.array[i*3+2],
    //         )
    //       );
    //     }
    //     //创建曲线
    //     curvePath = new THREE.CatmullRomCurve3(points);
    // },
    //   //加载进度回调
    //   function (xhr) {
    //     console.log((xhr.loaded/xhr.total)*100+"% loaded");
    //   },
    //   //加载失败的回调
    //   function (error) {
    //     console.log("模型加载失败");
    //   }
    // );

    //创建平行光
    let light = new THREE.DirectionalLight(0xffffff, 2);
    //设置光源位置
    light.position.set(0, 10, 5);
    //将光源添加到场景中
    scene.add(light);

    //在添加一个平行光
    let light2 = new THREE.DirectionalLight(0xffffff, 0.5);
    //设置光源位置
    light2.position.set(0, -10, -5);
    //将光源添加到场景中
    scene.add(light2);

    //设置时间
    let params = {
      iTime: {
        value: 0,
      }
    };

    // //添加声音
    // const listener = new THREE.AudioListener();
    // const sound = new THREE.Audio(listener);
    // const audioloader = new THREE.AudioLoader();
    // audioloader.load("assts/tt.mp3",function (buffer) {
    //   sound.setBuffer(buffer);
    //   sound.setLoop(true);
    //   sound.setVolume(0.5);
    //   sound.play();
    // });

    //创建clock 时间
    let clock = new THREE.Clock();

    //创建渲染函数
    function render() {
      // //获取总耗时
      // // let delta = clock.getDelta();
      // //设置5秒 循环一次
      let t = clock.getElapsedTime() % 5;
      t = t / 5;
      //设置物体飞行路径
      //先判断curvePath是否存在,如果存在就设置飞行路径
      if (curvePath) {
        //设置物体飞行路径 circle飞行的物体
        circle.position.copy(curvePath.getPointAt(t));

        //判断 t+0.1是否小于1 如果小于1 就设置导弹飞行路径
        if (t + 0.1 < 1) {
          //设置导弹飞行方向
          circle.lookAt(curvePath.getPointAt(t + 0.01));
        }
        //   //判断 时间落点 显示精灵
        //   if(t > 0.95){
        //     // 将精灵添加到场景中
        //     scene.add(sprite);
        //     //判断是否爆炸产生声音
        //     if (!sound.isPlaying){
        //       sound.play();
        //     }
        //   }
      }
      params.iTime.value = t * 10;
      //渲染
      renderer.render(scene, camera);
      //循环渲染
      requestAnimationFrame(render);
    }

    //  调用渲染
    render();

    // //创建精灵材质
    // let spriteMaterial = new THREE.SpriteMaterial({
    //   color:0xffffff,
    //   transparent:true,
    //   blending:THREE.AdditiveBlending,
    // });
    // //添加一个 sprite
    // let sprite = new THREE.Sprite(spriteMaterial);
    // //设置精灵尺寸
    // sprite.scale.set(0.5,0.5,0.5);
    // //设置精灵位置
    // sprite.position.set(-5.5,0.8,0);
    // //将精灵添加到场景中
    // // scene.add(sprite);
    //
    // //在onbeforecompile函数中添加着色器代码
    // spriteMaterial.onBeforeCompile = function (shader) {
    //   //在着色器代码中添加着色器代码
    //   shader.vertexShader = shader.vertexShader.replace(
    //     //替换 common
    //     "#include <common>",
    //     `
    //     #include <common>
    //     varying vec2 vUv;`
    //   );
    //   shader.vertexShader = shader.vertexShader.replace(
    //     //替换vUv
    //     "#include <uv_vertex>",
    //     `#include <uv_vertex>
    //       vUv = uv;`
    //   );
    // //替换片元着色器
    // shader.fragmentShader = fragmentShare; //目前没有着色器代码
    // //添加uniform
    // shader.uniforms.iResolution = {
    //   value: new THREE.Vector2(window.innerWidth,window.innerHeight),
    // };
    // shader.uniforms.iTime = params.iTime;
    // shader.uniforms.iMouse ={
    //   value: new THREE.Vector2(0,0),
    // };
    // shader.uniforms.iChannel0 ={
    //   value: new THREE.TextureLoader().load(",,/../missile.png"),
    // };
    // shader.uniforms.iChannel1 ={
    //   value: new THREE.TextureLoader().load(",,/../missile.png"),
    // };
    // shader.uniforms.iChannel2 ={
    //   value: new THREE.TextureLoader().load(",,/../missile.png"),
    // };
    // }
    shui();
    //水波纹
    function shui() {
      let texture = new THREE.TextureLoader().load("./assets/tmp/img/wenli.png");
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping; //每个都重复
      texture.repeat.set(1, 1);
      texture.needsUpdate = true;

      let geometry = new THREE.CylinderGeometry(10, 10, 0.8, 64);
      let materials = [
        new THREE.MeshBasicMaterial({
          map: texture,
          color: 0xFF0000,
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
      ];
      let mesh = new THREE.Mesh(geometry, materials);
      scene.add(mesh);

      let s = 0;
      let p = 1;

      function animate() {
        // 一定要在此函数中调用
        s += 0.01; //数值越大 扩散越快
        p -= 0.005; //数值越小 扩散半径越大
        if (s > 2) { //累加到一定数值  返回初始状态
          s = 0;
          p = 1;
        }
        mesh.scale.set(1 + s, 1, 1 + s);
        mesh.material[0].opacity = p;
        renderer.render(scene, camera);
        requestAnimationFrame(animate)
      }

      animate()
    }

    //创建其他分支
    fenzhi();
    function fenzhi() {
      var cube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({
        color: 0x00FFFF,
        wireframe: true
      }));
      console.log("创建物体成功");
      cube.position.set(20, 5, 0);
      scene.add(cube);

      var cube1 = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({
        color: 0x00FFFF,
        wireframe: true
      }));
      console.log("创建物体成功");
      cube1.position.set(-40, 5, 0);
      console.log(cube1);
      scene.add(cube1);

//运动的物体
      var circle = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({
        color: 0xFF1493,
        wireframe: true
      }));
      console.log("创建物体成功");
      circle.position.set(20, 5, 0);
      scene.add(circle);
      //创建一条曲线
      const curvet = new THREE.CatmullRomCurve3([
        new THREE.Vector3(-40, 5, 0),
        new THREE.Vector3(-15, 15, 5),
        new THREE.Vector3(20, 5, 0)
      ]);
      const pointst = curvet.getPoints(50);
      const geometrytt = new THREE.BufferGeometry().setFromPoints(pointst);
      const materialtt = new THREE.LineBasicMaterial({color: 0xff0000});
      const curveObjectt = new THREE.Line(geometrytt, materialtt);
      scene.add(curveObjectt); //添加曲线

      let points = [];
      // //根据点创建曲线
      let curvePath: any; //曲线
      //将点添加到数组中
      // @ts-ignore
      for (let i = curveObjectt.geometry.attributes.position.count; i >= 0; i--) {
        points.push(
          new THREE.Vector3(
            // @ts-ignore
            curveObjectt.geometry.attributes.position.array[i * 3],
            // @ts-ignore
            curveObjectt.geometry.attributes.position.array[i * 3 + 1],
            // @ts-ignore
            curveObjectt.geometry.attributes.position.array[i * 3 + 2],
          )
        );
      }
      //处理数组中 第一个元素是原点坐标
      var newarr = points.concat();
      // 处理新数组，原数组不变
      newarr.shift();
      //创建曲线
      curvePath = new THREE.CatmullRomCurve3(newarr);

      //创建clock 时间
      let clock = new THREE.Clock();
      //创建渲染函数
      function render() {
        // //获取总耗时
        // // let delta = clock.getDelta();
        // //设置5秒 循环一次
        let t = clock.getElapsedTime() % 5;
        t = t / 5;
        //设置物体飞行路径
        //先判断curvePath是否存在,如果存在就设置飞行路径
        if (curvePath) {
          //设置物体飞行路径 circle飞行的物体
          circle.position.copy(curvePath.getPointAt(t));
          //判断 t+0.1是否小于1 如果小于1 就设置导弹飞行路径
          if (t + 0.1 < 1) {
            //设置导弹飞行方向
            circle.lookAt(curvePath.getPointAt(t + 0.01));
          }
        }
        params.iTime.value = t * 10;
        //渲染
        renderer.render(scene, camera);
        //循环渲染
        requestAnimationFrame(render);
      }
      //  调用渲染
      render();
    }

    fenzhitwo();
    function fenzhitwo() {
      var cube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({
        color: 0x00FFFF,
        wireframe: true
      }));
      console.log("创建物体成功");
      cube.position.set(20, 5, 0);
      scene.add(cube);

      var cube1 = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({
        color: 0xFAFAD2,
        wireframe: true
      }));
      console.log("创建物体成功");
      cube1.position.set(-30, 5, 0);
      console.log(cube1);
      scene.add(cube1);

//运动的物体
      var circle = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({
        color: 0xFF1493,
        wireframe: true
      }));
      console.log("创建物体成功");
      circle.position.set(20, 5, 0);
      scene.add(circle);
      //创建一条曲线
      const curvet = new THREE.CatmullRomCurve3([
        new THREE.Vector3(-30, 5, 0),
        new THREE.Vector3(-15, 15, 2),
        new THREE.Vector3(20, 5, 0)
      ]);
      const pointst = curvet.getPoints(50);
      const geometrytt = new THREE.BufferGeometry().setFromPoints(pointst);
      const materialtt = new THREE.LineBasicMaterial({color: 0xff0000});
      const curveObjectt = new THREE.Line(geometrytt, materialtt);
      scene.add(curveObjectt); //添加曲线

      let points = [];
      // //根据点创建曲线
      let curvePath: any; //曲线
      //将点添加到数组中
      // @ts-ignore
      for (let i = curveObjectt.geometry.attributes.position.count; i >= 0; i--) {
        points.push(
          new THREE.Vector3(
            // @ts-ignore
            curveObjectt.geometry.attributes.position.array[i * 3],
            // @ts-ignore
            curveObjectt.geometry.attributes.position.array[i * 3 + 1],
            // @ts-ignore
            curveObjectt.geometry.attributes.position.array[i * 3 + 2],
          )
        );
      }
      //处理数组中 第一个元素是原点坐标
      var newarr = points.concat();
      // 处理新数组，原数组不变
      newarr.shift();
      //创建曲线
      curvePath = new THREE.CatmullRomCurve3(newarr);

      //创建clock 时间
      let clock = new THREE.Clock();
      //创建渲染函数
      function render() {
        // //获取总耗时
        // // let delta = clock.getDelta();
        // //设置5秒 循环一次
        let t = clock.getElapsedTime() % 5;
        t = t / 5;
        //设置物体飞行路径
        //先判断curvePath是否存在,如果存在就设置飞行路径
        if (curvePath) {
          //设置物体飞行路径 circle飞行的物体
          circle.position.copy(curvePath.getPointAt(t));
          //判断 t+0.1是否小于1 如果小于1 就设置导弹飞行路径
          if (t + 0.1 < 1) {
            //设置导弹飞行方向
            circle.lookAt(curvePath.getPointAt(t + 0.01));
          }
        }
        params.iTime.value = t * 10;
        //渲染
        renderer.render(scene, camera);
        //循环渲染
        requestAnimationFrame(render);
      }
      //  调用渲染
      render();
    }

  }
}
