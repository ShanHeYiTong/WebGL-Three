import { Component, OnInit} from '@angular/core';
import {map, tap} from 'rxjs';
import gsap from "gsap/gsap-core";
import {MapControls, OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import * as THREE from 'three';
@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
})
export class TableListComponent implements OnInit {



  constructor() {}

  ngOnInit() {
    this.initData();
  }
  initData(){
    this.main();
    this.ttl();
    this.show();
    this.shu();
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
    camera.position.set(0, 3, 30);
    camera.lookAt(new THREE.Vector3(0, -1, 0));
    //将相机添加到场景中
    scene.add(camera);

    //创建渲染器
    let renderer = new THREE.WebGL1Renderer();
    //设置渲染尺寸
    renderer.setSize(window.innerWidth, window.innerHeight);
    //将渲染器添加到页面中
    // @ts-ignore
    document.getElementById("v").appendChild(renderer.domElement); //设置页面div 显示区域

    //创建控制器
    let controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, -1, 0);
    controls.update();
    /////////////////////////////////////
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
    // const geometry = new THREE.BufferGeometry();
    // const vertices = [];
    // for (let i = 0; i < 10000; i++) {
    //   vertices.push(THREE.MathUtils.randFloatSpread(2000)); // x
    //   vertices.push(THREE.MathUtils.randFloatSpread(2000)); // y
    //   vertices.push(THREE.MathUtils.randFloatSpread(2000)); // z
    // }
    // geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    // const particles = new THREE.Points(geometry, new THREE.PointsMaterial({color: 0x888888}));
    // scene.add(particles);
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
          transparent: true,
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

  ttl() {
    const camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(2, 3, -6);
    camera.lookAt(0, 1, 0);

    const clock = new THREE.Clock();

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xa0a0a0);
    scene.fog = new THREE.Fog(0xa0a0a0, 10, 50);

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
    hemiLight.position.set(0, 20, 0);
    scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0x8B4513);//灯光
    dirLight.position.set(-3, 10, -10);
    dirLight.castShadow = true;
    dirLight.shadow.camera.top = 4;
    dirLight.shadow.camera.bottom = -4;
    dirLight.shadow.camera.left = -4;
    dirLight.shadow.camera.right = 4;
    dirLight.shadow.camera.near = 0.1;
    dirLight.shadow.camera.far = 40;
    scene.add(dirLight);


    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(200, 200), new THREE.MeshPhongMaterial({
      color: 0x999999,
      depthWrite: false
    }));
    mesh.rotation.x = -Math.PI / 2;
    mesh.receiveShadow = true;
    scene.add(mesh);

//创建渲染器
    let renderer = new THREE.WebGL1Renderer({
      antialias:true //开启适应浏览器纹理
    });
    //设置渲染尺寸
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio); //采用浏览器的纹理 分辨率
    //将渲染器添加到页面中
    // @ts-ignore
    document.getElementById("vv").appendChild(renderer.domElement); //设置页面div 显示区域
    //创建控制器
    let controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, -1, 0);
    controls.update();

    //设置物体
    const geometry = new THREE.BoxGeometry(0.5, 3, 0.5);
    const material = new THREE.MeshBasicMaterial({color: 0x708090});
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(-1, 1.5, 0); //物体坐标点y轴 应是物体高度的一半 2/1
    scene.add(cube);
    jianzhu();

    function jianzhu() {
      const geometry = new THREE.BoxGeometry(0.5, 0.9, 0.5);
      const material = new THREE.MeshBasicMaterial({color: 0x708090});
      const cube = new THREE.Mesh(geometry, material);
      cube.position.set(3, 0.45, -1);
      scene.add(cube);

      zhuiti();

      //绘制锥体
      function zhuiti() {
        let texture = new THREE.TextureLoader().load("./assets/tmp/img/jianbian.png");
        renderer.render(scene, camera);
        // 材质
        var material = new THREE.MeshLambertMaterial({
          map: texture
        });
        const octahedron = new THREE.Mesh(new THREE.OctahedronGeometry(0.2, 0), material);
        octahedron.position.set(1, 2.3, 0);
        scene.add(octahedron);
        animate();

        function animate() {
          requestAnimationFrame(animate);
          // cube.rotation.x += 0.01;
          octahedron.rotation.y += 0.01;
          renderer.render(scene, camera);
        }
      }

      sanjiao();

      //旋转三角
      function sanjiao() {
        // const geometry = new THREE.ConeGeometry(0.22, 0.3, 3);
        // const material = new THREE.MeshBasicMaterial({color: 0xFFFF00});
        const geometry = new THREE.CylinderGeometry( 0, 0.1, 0.3, 4, 1 );
        const material = new THREE.MeshPhongMaterial( { color: 0xADFF2F, flatShading: true } );
        const cube = new THREE.Mesh(geometry, material);
        cube.position.set(3, 1.2, -1);
        cube.rotation.set(-Math.PI , 0, 0); //设置物体绕X轴旋转180度
        scene.add(cube);
        animate();

        function animate() {
          requestAnimationFrame(animate);
          // cube.rotation.x += 0.01;
          cube.rotation.y += 0.01;
          renderer.render(scene, camera);
        }

        shui();

        //水波纹
        function shui() {
          let texture = new THREE.TextureLoader().load("./assets/tmp/img/wenli.png");
          texture.wrapS = texture.wrapT = THREE.RepeatWrapping; //每个都重复
          texture.repeat.set(1, 1);
          texture.needsUpdate = true;

          let geometry = new THREE.CylinderGeometry(0.1, 0.1, 0.05, 64);
          let materials = [
            new THREE.MeshBasicMaterial({
              map: texture,
              color: 0xFF1493,
              side: THREE.DoubleSide,
              transparent: true,
              depthWrite:false,//禁止写入深度缓冲区数据
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
          mesh.position.set(3, 1, -1);
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

        shu();

        //水波纹
        function shu() {
          let texture = new THREE.TextureLoader().load("./assets/tmp/img/wenli.png");
          texture.wrapS = texture.wrapT = THREE.RepeatWrapping; //每个都重复
          texture.repeat.set(1, 1);
          texture.needsUpdate = true;

          let geometry = new THREE.CylinderGeometry(0.15, 0.15, 0.05, 64);
          let materials = [
            new THREE.MeshBasicMaterial({
              map: texture,
              color: 0xFF1493,
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
          mesh.position.set(3, 1, -1);
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
      }

      jianzhu();

      function jianzhu() {
        const geometry = new THREE.BoxGeometry(0.5, 2, 0.5);
        const material = new THREE.MeshBasicMaterial({color: 0x800080});
        const cube = new THREE.Mesh(geometry, material);
        cube.position.set(1, 1, 0);
        scene.add(cube);
        jianzhu();

        function jianzhu() {
          const geometry = new THREE.BoxGeometry(0.8, 1, 0.5);
          const material = new THREE.MeshBasicMaterial({color: 0x708090});
          const cube = new THREE.Mesh(geometry, material);
          cube.position.set(0, 0.5, 0);
          scene.add(cube);
          jianzhu();

          function jianzhu() {
            const geometry = new THREE.BoxGeometry(1.5, 2, 1);
            const material = new THREE.MeshBasicMaterial({color: 0x00FF7F}); //绿色
            const cube = new THREE.Mesh(geometry, material);
            cube.position.set(-3.5, 1, -1.5);
            scene.add(cube);
            jianzhu();

            function jianzhu() {
              const geometry = new THREE.BoxGeometry(1, 1, 1);
              const material = new THREE.MeshBasicMaterial({color: 0x00FFFF});
              const cube = new THREE.Mesh(geometry, material);
              cube.position.set(4.5, 0.5, 0.5);
              scene.add(cube);
              jianzhu();

              function jianzhu() {
                const geometry = new THREE.BoxGeometry(1, 1, 1);
                const material = new THREE.MeshBasicMaterial({color: 0xB8860B});
                const cube = new THREE.Mesh(geometry, material);
                cube.position.set(-2.5, 0.5, 3.5);
                scene.add(cube);
              }
            }
          }
        }
      }
    }

    shui();
    //水波纹
    function shui() {
      let texture = new THREE.TextureLoader().load("./assets/tmp/img/wenli.png");
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping; //每个都重复
      texture.repeat.set(1, 1);
      texture.needsUpdate = true;

      let geometry = new THREE.CylinderGeometry(1, 1, 0.08, 64);
      let materials = [
        new THREE.MeshBasicMaterial({
          map: texture,
          color: 0xD2691E,
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
      mesh.position.set(0, 0, 0);
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

    fangfuqiang();
    //绘制防护墙
    function fangfuqiang() {
      /**
       * @param r {Number} 半径,
       * @param src {String} 纹理贴图的图片
       * @param pointsNumber {Number} 点的个数 越多越细致
       * @param position {Object} 位置
       * */
      let texture = new THREE.TextureLoader().load("./assets/tmp/img/wenli.png");
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping; //每个都重复
      texture.repeat.set(1, 1); //圆圈层数
      texture.needsUpdate = true;
      // function scatter3DCylinder(r, src) {
      const geometry = new THREE.CylinderGeometry(1.5, 1.5, 1, 64);
      const circle = new THREE.Mesh(geometry, [
        new THREE.MeshBasicMaterial({
          color: 0xDC143C,
          side: THREE.DoubleSide,
          transparent: true,
          // map: THREE.ImageUtils.loadTexture("./assets/tmp/img/123.png")
          map: texture
        }),
      ]);
      circle.position.set(-3.5, 0.5, -1.5);
      scene.add(circle);
      renderer.render(scene, camera);
    }

//曲线 物体运动
    quxian();
    function quxian() {
      //创建一条曲线
      const curvet = new THREE.CatmullRomCurve3([
        new THREE.Vector3(-1, 0, -3),
        new THREE.Vector3(0, 0, -2.5),
        new THREE.Vector3(1, 0, -2),
        new THREE.Vector3(2, 0, -1),
        new THREE.Vector3(2.5, 0, 0),
        new THREE.Vector3(2.5, 0, 1),
        new THREE.Vector3(3, 0, 2),
        new THREE.Vector3(2.5, 0, 3),
        new THREE.Vector3(1.5, 0, 4),
        new THREE.Vector3(1, 0, 3),
        new THREE.Vector3(-2, 0, 2),
        new THREE.Vector3(-3, 0, 1),
        new THREE.Vector3(-2, 0, -1),
        new THREE.Vector3(-1, 0, -2),
        new THREE.Vector3(0, 0.7, -3),
        new THREE.Vector3(1, 0, -4),
        new THREE.Vector3(1, 0, -4),
      ]);
      const pointst = curvet.getPoints(50);
      const geometryt = new THREE.BufferGeometry().setFromPoints(pointst);
      const materialt = new THREE.LineBasicMaterial({color: 0x191970});
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
      var circle = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.2, 0.2), new THREE.MeshBasicMaterial({
        color: 0xFF1493,
        wireframe: true
      }));
      console.log("创建物体成功");
      // circle.position.set(20, 5, 0);
      scene.add(circle);
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
        let t = clock.getElapsedTime() % 10;
        t = t / 10;
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
        // params.iTime.value = t * 10;
        //渲染
        renderer.render(scene, camera);
        //循环渲染
        requestAnimationFrame(render);
      }

      //  调用渲染
      render();
    }

//绘制地图
    ditu();
    function ditu() {
      const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(1, 50, 50),
        new THREE.MeshBasicMaterial({
          map: new THREE.TextureLoader().load("./assets/tmp/img/ditu.png")
        }),
        // new  ShaderMaterial({
        //   vertexShader,
        //   fragmentShader,
        //   uniforms: {
        //     globeTexture: {
        //       value: new THREE.TextureLoader().load('./assets/tmp/img/ditu.png')
        //     }
        //   }
        // })
      );
      sphere.position.set(3, 2, 5);
      scene.add(sphere);
      // camera.position.z = 10; //设置摄像机镜头的 远近
      animate();
      function animate() {
        requestAnimationFrame(animate);
        sphere.rotation.x += 0.01;
        sphere.rotation.y += 0.01;
        renderer.render(scene, camera);
      }
    }

    tiaoxian();
    //绘制条线 着色器代码
    function tiaoxian(){
      let ratio = {
        value: 0
      };

      // 飞线效果的相关配置数据
      const flyData = [{
        start: {  //起始点位置
          x: 3,
          y: 0,
          z: -3
        },
        end: { // 结束点位置
          x: 0,
          y: 0,
          z: -1
        },
        range: 18, // 飞线长度
        height: 12, // 轨迹的高度
        color: '#FF0000', // 颜色
        speed: 0.1, // 速度
        size:1 // 飞线点点的大小
      },
        // {
        //   start: {  //起始点位置
        //     x: -3,
        //     y: 0,
        //     z: -3
        //   },
        //   end: { // 结束点位置
        //     x: -4,
        //     y: 0,
        //     z: -2
        //   },
        //   range: 1, // 飞线长度
        //   height: 1, // 轨迹的高度
        //   color: '#ff0000', // 颜色
        //   speed: 0.6, // 速度
        //   size: 1 // 飞线点点的大小
        // },
        // //一条线 一个对象
        // {
        //   start: {  //起始点位置
        //     x: -3,
        //     y: 0,
        //     z: -3
        //   },
        //   end: { // 结束点位置
        //     x: -2,
        //     y: 0,
        //     z: -4
        //   },
        //   range: 1, // 飞线长度
        //   height: 1, // 轨迹的高度
        //   color: '#ffffff', // 颜色
        //   speed: 0.6, // 速度
        //   size: 1 // 飞线点点的大小
        // },
        // {
        //   start: {  //起始点位置
        //     x: -3,
        //     y: 0,
        //     z: -3
        //   },
        //   end: { // 结束点位置
        //     x: 0,
        //     y: 0,
        //     z: -2
        //   },
        //   range: 1, // 飞线长度
        //   height: 1, // 轨迹的高度
        //   color: '#ffffff', // 颜色
        //   speed: 0.6, // 速度
        //   size: 1 // 飞线点点的大小
        // },
      ];
      //着色器 使用
      function init () {
        const vertexShader =  `
            // 接收js传入的attribute值，会经过线性插值
            attribute float current;

            // 接收js传入的uniform值
            uniform float uSize;
            uniform float uTime;
            uniform vec3 uColor;
            uniform float uRange;
            uniform float uTotal;
            uniform float uSpeed;

            // 向片元着色器传值颜色和透明度
            varying vec3 vcolor;
            varying float vopacity;

            void main () {
                float size = uSize;
                // 根据时间确定当前飞线的位置， 以结束点为准
                float currentEnd = uTotal * fract(uTime * uSpeed);
                // 判断当前像素点是否在飞线范围内，如果在范围内设置尺寸和透明度
                if (current < currentEnd && current > currentEnd - uRange) {
                    // 设置渐变的尺寸，头大尾小
                    float sizePct = (uRange - (currentEnd - current)) / uRange;
                    size *= sizePct;
                    vopacity = 1.0;
                } else {
                    vopacity = 0.0;
                }
                // 将颜色传递给片元着色器
                vcolor = uColor;
                // 设置点的大小
                gl_PointSize = size * 0.4;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `;
        const fragmentShader =  `
            precision mediump float;
            // 接收顶点着色器传入的值
            varying float vopacity;
            varying vec3 vcolor;

            void main () {
                // 设置颜色
                gl_FragColor = vec4(vcolor, vopacity);
            }
        `;

        // 循环创建飞线
        flyData.forEach(item => {
          initFly(item);
        });

        function initFly(options:any) {
          // 接收传入的参数
          const {
            start,
            end,
            height,
            size,
            color,
            range,
            speed
          } = options;
          // 起点位置
          const _start = new THREE.Vector3(start.x, start.y, start.z);
          // 结束点位置
          const _end = new THREE.Vector3(end.x, end.y, end.z);
          // 计算中建点位置
          /* lerp方法的用法： 在该向量与传入的向量v之间的线性插值，
              alpha是沿着线的长度的百分比 —— alpha = 0 时表示的是当前向量，
              alpha = 1 时表示的是所传入的向量v。

              此处传入 0.5 返回得是中间点位置
          **/
          const _center = _start.clone().lerp(_end, 0.5);
          // 把中间点的位置沿着y轴方向向上移动 height 距离
          _center.y += height;
          // 计算起点到终点间点的个数
          // @ts-ignore
          const number = parseInt(_start.distanceTo(_center) + _end.distanceTo(_center));
          // 创建一条平滑的三维 二次贝塞尔曲线， 由起点、终点和一个控制点所定义
          const curve = new THREE.QuadraticBezierCurve3(
            _start,
            _center,
            _end
          );
          // 将curve分成 number-1 段；得到number个点；存入数组points 中
          const points = curve.getPoints(number);
          // 申明变量用于存点的信息
          const positions:any = [];
          // 申明变量用于存点的索引信息
          const current:any = [];
          // 遍历点数组，将索引存入current， 将点的x,y,z展开，存入positions数组
          points.forEach((item, index) => {
            positions.push(
              item.x,
              item.y,
              item.z
            );
            current.push(index);
          });

          // 创建BufferGeometry 并把positions和current传给对应的attribute属性，供顶点着色器使用
          const geometry = new THREE.BufferGeometry();
          geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
          geometry.setAttribute('current', new THREE.Float32BufferAttribute(current, 1));
          // 创建shader材质
          const material = new THREE.ShaderMaterial({
            transparent: true,
            depthWrite: false,
            depthTest: false,
            blending: THREE.AdditiveBlending,
            uniforms: {
              uSize: { // 点的大小
                value: size
              },
              uTime: ratio, // 时间
              uColor: { // 颜色
                value: new THREE.Color(color)
              },
              uRange: { // 飞线长度
                value: range
              },
              uTotal: { // 轨迹总长度，（点的总个数）
                value: number
              },
              uSpeed: { // 飞行速度
                value: speed
              }
            },
            vertexShader,
            fragmentShader
          });
          // 创建并添加到场景中
          const flyPoints = new THREE.Points(geometry, material);
          scene.add(flyPoints);
        }

        let next = 0;
        render();
        function render () {
          next += 0.01;
          ratio.value = next;

          requestAnimationFrame(render);
          renderer.render(scene, camera);
        }
      }
      init();


    }

//动画渲染
    animate();
    function animate() {
      requestAnimationFrame(animate);
      // cube.rotation.x += 0.01;
      // scene.rotation.y += 0.01;
      renderer.render(scene, camera);

    }

// 辅助坐标 红色代表 X 轴. 绿色代表 Y 轴. 蓝色代表 Z 轴.
    const axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);
    const size = 10;
    const divisions = 10;
//辅助网格
    const gridHelper = new THREE.GridHelper(size, divisions);
    scene.add(gridHelper);
  }


  show(){

    let scene:any, camera:any, renderer:any;
    let width = window.innerWidth;
    let height = window.innerHeight;

    let ratio = {
      value: 0
    };

    // 飞线效果的相关配置数据
    const flyData = [{
      start: {  //起始点位置
        x: 0,
        y: 0,
        z: 0
      },
      end: { // 结束点位置
        x: -250,
        y: 0,
        z: 0
      },
      range: 180, // 飞线长度
      height: 120, // 轨迹的高度
      color: '#e4393c', // 颜色
      speed: 1, // 速度
      size: 10 // 飞线点点的大小
    },
      {
        start: {  //起始点位置
          x: 0,
          y: 0,
          z: 0
        },
        end: { // 结束点位置
          x: 250,
          y: 0,
          z: 0
        },
        range: 180, // 飞线长度
        height: 160, // 轨迹的高度
        color: '#ff0000', // 颜色
        speed: 0.6, // 速度
        size: 10 // 飞线点点的大小
      },
      //一条线 一个对象
      {
        start: {  //起始点位置
          x: 0,
          y: 0,
          z: 0
        },
        end: { // 结束点位置
          x: -120,
          y: 0,
          z: 0
        },
        range: 150, // 飞线长度
        height: 160, // 轨迹的高度
        color: '#ffffff', // 颜色
        speed: 0.6, // 速度
        size: 10 // 飞线点点的大小
      },
      //一条线 一个对象
      {
        start: {  //起始点位置
          x: 0,
          y: 0,
          z: 0
        },
        end: { // 结束点位置
          x: 0,
          y: 0,
          z: -10
        },
        range: 15, // 飞线长度
        height: 16, // 轨迹的高度
        color: '#ffffff', // 颜色
        speed: 0.6, // 速度
        size: 10 // 飞线点点的大小
      },
    ];
    function init () {
      // 场景
      scene = new THREE.Scene();
      //坐标辅助器
      let helper = new THREE.AxesHelper(10);
      scene.add(helper);

      // 环境光
      let light = new THREE.AmbientLight(0xadadad); // soft white light
      scene.add(light);

      // 平行光源
      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
      directionalLight.position.set(100, 100, 0);
      scene.add(directionalLight);

      // 相机
      camera = new THREE.PerspectiveCamera(75, width / height, 1, 10000)
      camera.position.set(30, 32, 260)
      scene.add(camera)

      // 渲染器
      renderer = new THREE.WebGLRenderer();
      renderer.setSize(width, height)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(new THREE.Color('#32373E'), 1);
      // document.body.appendChild(renderer.domElement);
      // @ts-ignore
      document.getElementById("y").appendChild(renderer.domElement); //设置页面div 显示区域
      const vertexShader =  `
            // 接收js传入的attribute值，会经过线性插值
            attribute float current;

            // 接收js传入的uniform值
            uniform float uSize;
            uniform float uTime;
            uniform vec3 uColor;
            uniform float uRange;
            uniform float uTotal;
            uniform float uSpeed;

            // 向片元着色器传值颜色和透明度
            varying vec3 vcolor;
            varying float vopacity;

            void main () {
                float size = uSize;
                // 根据时间确定当前飞线的位置， 以结束点为准
                float currentEnd = uTotal * fract(uTime * uSpeed);
                // 判断当前像素点是否在飞线范围内，如果在范围内设置尺寸和透明度
                if (current < currentEnd && current > currentEnd - uRange) {
                    // 设置渐变的尺寸，头大尾小
                    float sizePct = (uRange - (currentEnd - current)) / uRange;
                    size *= sizePct;
                    vopacity = 1.0;
                } else {
                    vopacity = 0.0;
                }
                // 将颜色传递给片元着色器
                vcolor = uColor;
                // 设置点的大小
                gl_PointSize = size * 0.4;
               
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `;
      const fragmentShader =  `
            precision mediump float;
            // 接收顶点着色器传入的值
            varying float vopacity;
            varying vec3 vcolor;

            void main () {
                // 设置颜色
                gl_FragColor = vec4(vcolor, vopacity);
            }
        `;

      // 创建飞线
      flyData.forEach(item => {
        initFly(item);
      });

      function initFly(options:any) {
        // 接收传入的参数
        const {
          start,
          end,
          height,
          size,
          color,
          range,
          speed
        } = options;
        // 起点位置
        const _start = new THREE.Vector3(start.x, start.y, start.z);
        // 结束点位置
        const _end = new THREE.Vector3(end.x, end.y, end.z);
        // 计算中建点位置
        /* lerp方法的用法： 在该向量与传入的向量v之间的线性插值，
            alpha是沿着线的长度的百分比 —— alpha = 0 时表示的是当前向量，
            alpha = 1 时表示的是所传入的向量v。

            此处传入 0.5 返回得是中间点位置
        **/
        const _center = _start.clone().lerp(_end, 0.5);
        // 把中间点的位置沿着y轴方向向上移动 height 距离
        _center.y += height;
        // 计算起点到终点间点的个数

        // @ts-ignore
        const number = parseInt(_start.distanceTo(_center) + _end.distanceTo(_center));
        // 创建一条平滑的三维 二次贝塞尔曲线， 由起点、终点和一个控制点所定义
        const curve = new THREE.QuadraticBezierCurve3(
          _start,
          _center,
          _end
        );
        // 将curve分成 number-1 段；得到number个点；存入数组points 中
        const points = curve.getPoints(number);
        // 申明变量用于存点的信息
        const positions:any = [];
        // 申明变量用于存点的索引信息
        const current:any = [];
        // 遍历点数组，将索引存入current， 将点的x,y,z展开，存入positions数组
        points.forEach((item, index) => {
          positions.push(
            item.x,
            item.y,
            item.z
          );
          current.push(index);
        });

        // 创建BufferGeometry 并把positions和current传给对应的attribute属性，供顶点着色器使用
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        geometry.setAttribute('current', new THREE.Float32BufferAttribute(current, 1));
        // 创建shader材质
        const material = new THREE.ShaderMaterial({
          transparent: true,
          depthWrite: false,
          depthTest: false,
          blending: THREE.AdditiveBlending,
          uniforms: {
            uSize: { // 点的大小
              value: size
            },
            uTime: ratio, // 时间
            uColor: { // 颜色
              value: new THREE.Color(color)
            },
            uRange: { // 飞线长度
              value: range
            },
            uTotal: { // 轨迹总长度，（点的总个数）
              value: number
            },
            uSpeed: { // 飞行速度
              value: speed
            }
          },
          vertexShader,
          fragmentShader
        });
        // 创建并添加到场景中
        const flyPoints = new THREE.Points(geometry, material);
        scene.add(flyPoints);
      }



      let next = 0;
      render();
      function render () {
        next += 0.01
        ratio.value = next;

        requestAnimationFrame(render);
        renderer.render(scene, camera);
      }

      //创建控制器
      let controls = new OrbitControls(camera, renderer.domElement);
      controls.update();
    }
    init();

  }

  //建筑群案例
  shu(){
    let camera:any, controls:any, scene:any, renderer:any;
    init();
    animate();

    function init() {

      scene = new THREE.Scene();
      // scene.background = new THREE.Color(    "rgba(25,35,39)" ); //地面颜色
      scene.background = new THREE.Color("rgba(255,255,255)" ); //地面颜色
      // scene.fog = new THREE.FogExp2( 0xcccccc, 0.002 ); //设置雾

      renderer = new THREE.WebGLRenderer( { antialias: true } );
      renderer.setPixelRatio( window.devicePixelRatio );
      renderer.setSize( window.innerWidth, window.innerHeight );
      // document.body.appendChild( renderer.domElement );
      // @ts-ignore
      document.getElementById("s").appendChild(renderer.domElement); //设置页面div 显示区域
      camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000 );
      camera.position.set( 400, 200, 0 );


      // controls 地图控件
      controls = new MapControls( camera, renderer.domElement );
      //controls.addEventListener( 'change', render ); // call this only in static scenes (i.e., if there is no animation loop)

      controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
      controls.dampingFactor = 0.05;
      controls.screenSpacePanning = false;
      controls.minDistance = 100;
      controls.maxDistance = 500;
      controls.maxPolarAngle = Math.PI / 2;

      // world  循环生成建筑
      //图形物体
      const geometry = new THREE.BoxGeometry( 1, 1, 1 );
      geometry.translate( 0, 0.5, 0 );
      //材质
      const material = new THREE.MeshPhysicalMaterial( {
        // color: 0xffffff,
        //颜色为
        color: "rgb(135,206,250)",
        //金属度
        metalness: 0.5,
        //粗糙度
        roughness: 0.1,
        //透明度
        transmission: 0.9,
        //模型是否透明
        transparent: true,

        flatShading: true ,
        // map: new THREE.TextureLoader().load("./assets/tmp/img/luofan.png")
      } );
      // map: new THREE.TextureLoader().load("./assets/tmp/img/fanngzi.png")} );

      console.log(geometry);
      for ( let i = 0; i < 500; i ++ ) {
        // // 拿到模型线框的Geometry
        // const edges = new THREE.EdgesGeometry(geometry, 1);
        // //设置模型的材质
        // const lineMaterial = new THREE.LineBasicMaterial({
        //   // 线的颜色
        //   color: "rgba(38,133,254)",
        // });
        const mesh = new THREE.Mesh( geometry, material );
        mesh.position.x = Math.random() * 1600 - 800;
        mesh.position.y = 0;
        mesh.position.z = Math.random() * 1600 - 800;
        mesh.scale.x = 20;
        mesh.scale.y = Math.random() * 80 + 10;
        mesh.scale.z = 20;
        mesh.updateMatrix();
        mesh.matrixAutoUpdate = false;

        // // 拿到模型线框的Geometry
        // const edges = new THREE.EdgesGeometry(geometry, 1);
        // //设置模型的材质
        // const lineMaterial = new THREE.LineBasicMaterial({
        //   // 线的颜色
        //   color: "rgba(38,133,254)",
        // });
        // //把数据组合起来
        // const lineS = new THREE.LineSegments(edges, lineMaterial);
        // //设置数据的位置
        // lineS.position.set(
        //   child.position.x,
        //   child.position.y,
        //   child.position.z
        // );

        scene.add( mesh );
      }

      // lights 灯光
      const dirLight1 = new THREE.DirectionalLight( 0xffffff );
      dirLight1.position.set( 1, 1, 1 );
      scene.add( dirLight1 );

      const dirLight2 = new THREE.DirectionalLight( 0x002288 );
      dirLight2.position.set( - 1, - 1, - 1 );
      scene.add( dirLight2 );

      const ambientLight = new THREE.AmbientLight( 0x222222 );
      scene.add( ambientLight );

      // 辅助坐标 红色代表 X 轴. 绿色代表 Y 轴. 蓝色代表 Z 轴.
      const axesHelper = new THREE.AxesHelper(1900);
      scene.add(axesHelper);
      const size = 1800;
      const divisions = 1800;
//辅助网格
      const gridHelper = new THREE.GridHelper(size, divisions);
      scene.add(gridHelper);
    }

    function animate() {

      requestAnimationFrame( animate );

      controls.update(); // only required if controls.enableDamping = true, or if controls.autoRotate = true

      renderer.render( scene, camera );

    }


  }

}
