import {Component} from '@angular/core';
import * as THREE from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

import gsap from "gsap";
import * as glMatrix from 'src/assets/lib/gl-matrix';
import {TransformControls} from "three/examples/jsm/controls/TransformControls";
import {Geometry} from "three/examples/jsm/deprecated/Geometry";
import {ArcCurve, PointLight} from "three";
import {LineMaterial} from "three/examples/jsm/lines/LineMaterial";
//导入着色器文件 需要安装 npm install --save-dev vite-plugin-string
//创建 vite.config.js
//
// // @ts-ignore
// import vertexShader from '../../../assets/tmp/shaders/vertexShader.glsl';
//  // @ts-ignore
// import fragmentShader from '../../../assets/tmp/shaders/fragmentShader.glsl';
// // @ts-ignore
// import atmosphereVertexShader from '../../../assets/tmp/shaders/atmosphereVertexShader.glsl';
// // @ts-ignore
// import atmosphereFragmentShader from '../../../assets/tmp/shaders/atmosphereFragmentShader.glsl';

@Component({
  selector: 'app-effect',
  templateUrl: './effect.component.html',
  styleUrls: ['./effect.component.less']
})
export class EffectComponent {
  constructor() {
  }

  ngOnInit() {

    this.list();

  }
  list(){
   const  scene = new THREE.Scene();
    scene.background = new THREE.Color( 0x4169E1);
    const camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.set( 0, 250, 1000 );
    scene.add( camera );

    scene.add( new THREE.AmbientLight( 0xf0f0f0 ) );
    const light = new THREE.SpotLight( 0xffffff, 1.5 );
    light.position.set( 0, 1500, 200 );
    light.angle = Math.PI * 0.2;
    light.castShadow = true;
    light.shadow.camera.near = 200;
    light.shadow.camera.far = 2000;
    light.shadow.bias = - 0.000222;
    light.shadow.mapSize.width = 1024;
    light.shadow.mapSize.height = 1024;
    scene.add( light );

    const planeGeometry = new THREE.PlaneGeometry( window.innerWidth,window.innerHeight );
    planeGeometry.rotateX( - Math.PI / 2 );
    const planeMaterial = new THREE.ShadowMaterial( { color: 0x000000, opacity: 0.2 } );

    const plane = new THREE.Mesh( planeGeometry, planeMaterial );
    plane.position.y = - 200;
    plane.receiveShadow = true;
    scene.add( plane );

    const helper = new THREE.GridHelper( 2000, 100 );
    helper.position.y = 0;
    scene.add( helper );

  const  renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.shadowMap.enabled = true;
    // @ts-ignore
    document.getElementById('threeContainer').appendChild(renderer.domElement)

    // 创建轨道控制器
    const controls = new OrbitControls(camera, renderer.domElement)
    // 设置控制器阻尼，让控制器更真实
    controls.enableDamping = true
    controls.target.set( 0, 50, 0 );
    controls.update();

    zhuiti();
    //绘制锥体
    function zhuiti() {
      let texture = new THREE.TextureLoader().load("./assets/tmp/img/jianbian.png");
      renderer.render(scene, camera);
      // 材质
      var material = new THREE.MeshLambertMaterial({
        map: texture
      });
      const octahedron = new THREE.Mesh(new THREE.OctahedronGeometry(25, 0), material);
      octahedron.position.set(0, 50, 0);
      scene.add(octahedron);

      animate();
      function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
        octahedron.rotation.y += 0.01;
        //上下浮动
        // const time = Date.now() * 0.005;
        // octahedron.position.y = Math.cos( time ) * 0.75 + 2.25;
      }
    }


    // //弧线
    // yuanhu();
    // function yuanhu() {
    //
    //   /**
    //    * 创建线条模型
    //    */
    //
    //   var geometry = new THREE.BufferGeometry(); //声明一个几何体对象Geometry
    //
    //   var p1 = new THREE.Vector3(-80, 0, 0);
    //   var p2 = new THREE.Vector3(-40, 25, 0);
    //   var p3 = new THREE.Vector3(40, 25, 0);
    //   var p4 = new THREE.Vector3(80, 0, 0);
    //   // 三维三次贝赛尔曲线
    //   var curve = new THREE.CubicBezierCurve3(p1, p2, p3, p4);
    //   //getPoints是基类Curve的方法，返回一个vector3对象作为元素组成的数组
    //   var points = curve.getPoints(100); //分段数100，返回101个顶点
    //   // setFromPoints方法从points中提取数据改变几何体的顶点属性vertices
    //   geometry.setFromPoints(points);
    //   //材质对象
    //   var material = new THREE.LineBasicMaterial({
    //     color: 0xFF4500
    //   });
    //   //线条模型对象
    //   var line = new THREE.Line(geometry, material);
    //   scene.add(line); //线条对象添加到场景中
    //
    // }
    //弧线
    y();
    function y() {
      /**
       * 创建线条模型
       */
      var geometry = new THREE.BufferGeometry(); //声明一个几何体对象Geometry
      var p1 = new THREE.Vector3(0, 0, 0);
      var p2 = new THREE.Vector3(0, 25, 40);
      var p3 = new THREE.Vector3(0, 25, 80);
      var p4 = new THREE.Vector3(0, 0, 180);
      // 三维三次贝赛尔曲线
      var curve = new THREE.CubicBezierCurve3(p1, p2, p3, p4);
      //getPoints是基类Curve的方法，返回一个vector3对象作为元素组成的数组
      var points = curve.getPoints(100); //分段数100，返回101个顶点
      // setFromPoints方法从points中提取数据改变几何体的顶点属性vertices
      geometry.setFromPoints(points);
      //材质对象
      var material = new THREE.LineBasicMaterial({
        color: 0xFF4500
      });
      //线条模型对象
      var line = new THREE.Line(geometry, material);
      scene.add(line); //线条对象添加到场景中
      var circle = new THREE.Mesh(new THREE.BoxGeometry(2, 2, 2), new THREE.MeshBasicMaterial({
        color: 0xffffff,
        wireframe: true
      }));
      console.log("创建物体成功");
      // circle.position.set(20, 5, 0);
      scene.add(circle);
      //创建clock 时间
      let clock = new THREE.Clock();
      //创建渲染函数
      function render() {
        // //获取总耗时
        // // let delta = clock.getDelta();
        // //设置5秒 循环一次
        let t = clock.getElapsedTime() % 5;
        t = t / 1;
        //设置物体飞行路径
        //先判断curvePath是否存在,如果存在就设置飞行路径
        if (curve) {
          //设置物体飞行路径 circle飞行的物体
          circle.position.copy(curve.getPointAt(t));
          //判断 t+0.1是否小于1 如果小于1 就设置飞行路径
          if (t + 0.1 < 1) {
            //设置飞行方向
            circle.lookAt(curve.getPointAt(t + 0.01));
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
    //弧线
    yy();
    function yy() {
      /**
       * 创建线条模型
       */
      var geometry = new THREE.BufferGeometry(); //声明一个几何体对象Geometry
      var p1 = new THREE.Vector3(0, 0, 0);
      var p2 = new THREE.Vector3(40, 25, 40);
      var p3 = new THREE.Vector3(80, 25, 80);
      var p4 = new THREE.Vector3(160, 0, 160);
      // 三维三次贝赛尔曲线
      var curve = new THREE.CubicBezierCurve3(p1, p2, p3, p4);
      //getPoints是基类Curve的方法，返回一个vector3对象作为元素组成的数组
      var points = curve.getPoints(100); //分段数100，返回101个顶点
      // setFromPoints方法从points中提取数据改变几何体的顶点属性vertices
      geometry.setFromPoints(points);
      //材质对象
      var material = new THREE.LineBasicMaterial({
        color: 0xFF4500
      });
      //线条模型对象
      var line = new THREE.Line(geometry, material);
      scene.add(line); //线条对象添加到场景中
      var circle = new THREE.Mesh(new THREE.BoxGeometry(2, 2, 2), new THREE.MeshBasicMaterial({
        color: 0xffffff,
        wireframe: true
      }));
      console.log("创建物体成功");
      // circle.position.set(20, 5, 0);
      scene.add(circle);
      //创建clock 时间
      let clock = new THREE.Clock();
      //创建渲染函数
      function render() {
        // //获取总耗时
        // // let delta = clock.getDelta();
        // //设置5秒 循环一次
        let t = clock.getElapsedTime() % 5;
        t = t / 1;
        //设置物体飞行路径
        //先判断curvePath是否存在,如果存在就设置飞行路径
        if (curve) {
          //设置物体飞行路径 circle飞行的物体
          circle.position.copy(curve.getPointAt(t));
          //判断 t+0.1是否小于1 如果小于1 就设置飞行路径
          if (t + 0.1 < 1) {
            //设置飞行方向
            circle.lookAt(curve.getPointAt(t + 0.01));
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
    //弧线
    yyy();
    function yyy() {
      /**
       * 创建线条模型
       */
      var geometry = new THREE.BufferGeometry(); //声明一个几何体对象Geometry
      var p1 = new THREE.Vector3(0, 0, 0);
      var p2 = new THREE.Vector3(-40, 25, 40);
      var p3 = new THREE.Vector3(-80, 25, 80);
      var p4 = new THREE.Vector3(-160, 0, 160);
      // 三维三次贝赛尔曲线
      var curve = new THREE.CubicBezierCurve3(p1, p2, p3, p4);
      //getPoints是基类Curve的方法，返回一个vector3对象作为元素组成的数组
      var points = curve.getPoints(100); //分段数100，返回101个顶点
      // setFromPoints方法从points中提取数据改变几何体的顶点属性vertices
      geometry.setFromPoints(points);
      //材质对象
      var material = new THREE.LineBasicMaterial({
        color: 0xFF4500
      });
      //线条模型对象
      var line = new THREE.Line(geometry, material);
      scene.add(line); //线条对象添加到场景中
      var circle = new THREE.Mesh(new THREE.BoxGeometry(2, 2, 2), new THREE.MeshBasicMaterial({
        color: 0xffffff,
        wireframe: true
      }));
      console.log("创建物体成功");
      // circle.position.set(20, 5, 0);
      scene.add(circle);
      //创建clock 时间
      let clock = new THREE.Clock();
      //创建渲染函数
      function render() {
        // //获取总耗时
        // // let delta = clock.getDelta();
        // //设置5秒 循环一次
        let t = clock.getElapsedTime() % 5;
        t = t / 1;
        //设置物体飞行路径
        //先判断curvePath是否存在,如果存在就设置飞行路径
        if (curve) {
          //设置物体飞行路径 circle飞行的物体
          circle.position.copy(curve.getPointAt(t));
          //判断 t+0.1是否小于1 如果小于1 就设置飞行路径
          if (t + 0.1 < 1) {
            //设置飞行方向
            circle.lookAt(curve.getPointAt(t + 0.01));
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
    //弧线
    yyyy();
    function yyyy() {
      /**
       * 创建线条模型
       */
      var geometry = new THREE.BufferGeometry(); //声明一个几何体对象Geometry
      var p1 = new THREE.Vector3(0, 0, 0);
      var p2 = new THREE.Vector3(-80, 25, -80);
      var p3 = new THREE.Vector3(-160, 25, -160);
      var p4 = new THREE.Vector3(-280, 0, -280);
      // 三维三次贝赛尔曲线
      var curve = new THREE.CubicBezierCurve3(p1, p2, p3, p4);
      //getPoints是基类Curve的方法，返回一个vector3对象作为元素组成的数组
      var points = curve.getPoints(100); //分段数100，返回101个顶点
      // setFromPoints方法从points中提取数据改变几何体的顶点属性vertices
      geometry.setFromPoints(points);
      //材质对象
      var material = new THREE.LineBasicMaterial({
        color: 0xFF4500
      });
      //线条模型对象
      var line = new THREE.Line(geometry, material);
      scene.add(line); //线条对象添加到场景中
      var circle = new THREE.Mesh(new THREE.BoxGeometry(2, 2, 2), new THREE.MeshBasicMaterial({
        color: 0xffffff,
        wireframe: true
      }));
      console.log("创建物体成功");
      // circle.position.set(20, 5, 0);
      scene.add(circle);
      //创建clock 时间
      let clock = new THREE.Clock();
      //创建渲染函数
      function render() {
        // //获取总耗时
        // // let delta = clock.getDelta();
        // //设置5秒 循环一次
        let t = clock.getElapsedTime() % 5;
        t = t / 1;
        //设置物体飞行路径
        //先判断curvePath是否存在,如果存在就设置飞行路径
        if (curve) {
          //设置物体飞行路径 circle飞行的物体
          circle.position.copy(curve.getPointAt(t));
          //判断 t+0.1是否小于1 如果小于1 就设置飞行路径
          if (t + 0.1 < 1) {
            //设置飞行方向
            circle.lookAt(curve.getPointAt(t + 0.01));
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
      //弧线
      yy();
      function yy() {
        /**
         * 创建线条模型
         */
        var geometry = new THREE.BufferGeometry(); //声明一个几何体对象Geometry
        var p1 = new THREE.Vector3(-280, 0, -280);
        var p2 = new THREE.Vector3(-230, 25, -280);
        var p3 = new THREE.Vector3(-180, 25, -280);
        var p4 = new THREE.Vector3(-130, 0, -280);
        // 三维三次贝赛尔曲线
        var curve = new THREE.CubicBezierCurve3(p1, p2, p3, p4);
        //getPoints是基类Curve的方法，返回一个vector3对象作为元素组成的数组
        var points = curve.getPoints(100); //分段数100，返回101个顶点
        // setFromPoints方法从points中提取数据改变几何体的顶点属性vertices
        geometry.setFromPoints(points);
        //材质对象
        var material = new THREE.LineBasicMaterial({
          color: 0xFF4500
        });
        //线条模型对象
        var line = new THREE.Line(geometry, material);
        scene.add(line); //线条对象添加到场景中
        var circle = new THREE.Mesh(new THREE.BoxGeometry(2, 2, 2), new THREE.MeshBasicMaterial({
          color: 0xffffff,
          wireframe: true
        }));
        console.log("创建物体成功");
        // circle.position.set(20, 5, 0);
        scene.add(circle);
        //创建clock 时间
        let clock = new THREE.Clock();
        //创建渲染函数
        function render() {
          // //获取总耗时
          // // let delta = clock.getDelta();
          // //设置5秒 循环一次
          let t = clock.getElapsedTime() % 5;
          t = t / 1;
          //设置物体飞行路径
          //先判断curvePath是否存在,如果存在就设置飞行路径
          if (curve) {
            //设置物体飞行路径 circle飞行的物体
            circle.position.copy(curve.getPointAt(t));
            //判断 t+0.1是否小于1 如果小于1 就设置飞行路径
            if (t + 0.1 < 1) {
              //设置飞行方向
              circle.lookAt(curve.getPointAt(t + 0.01));
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
      //弧线
      yl();
      function yl() {
        /**
         * 创建线条模型
         */
        var geometry = new THREE.BufferGeometry(); //声明一个几何体对象Geometry
        var p1 = new THREE.Vector3(-280, 0, -280);
        var p2 = new THREE.Vector3(-280, 25, -230);
        var p3 = new THREE.Vector3(-280, 25, -180);
        var p4 = new THREE.Vector3(-280, 0, -130);
        // 三维三次贝赛尔曲线
        var curve = new THREE.CubicBezierCurve3(p1, p2, p3, p4);
        //getPoints是基类Curve的方法，返回一个vector3对象作为元素组成的数组
        var points = curve.getPoints(100); //分段数100，返回101个顶点
        // setFromPoints方法从points中提取数据改变几何体的顶点属性vertices
        geometry.setFromPoints(points);
        //材质对象
        var material = new THREE.LineBasicMaterial({
          color: 0xFF4500
        });
        //线条模型对象
        var line = new THREE.Line(geometry, material);
        scene.add(line); //线条对象添加到场景中
        var circle = new THREE.Mesh(new THREE.BoxGeometry(2, 2, 2), new THREE.MeshBasicMaterial({
          color: 0xffffff,
          wireframe: true
        }));
        console.log("创建物体成功");
        // circle.position.set(20, 5, 0);
        scene.add(circle);
        //创建clock 时间
        let clock = new THREE.Clock();
        //创建渲染函数
        function render() {
          // //获取总耗时
          // // let delta = clock.getDelta();
          // //设置5秒 循环一次
          let t = clock.getElapsedTime() % 5;
          t = t / 1;
          //设置物体飞行路径
          //先判断curvePath是否存在,如果存在就设置飞行路径
          if (curve) {
            //设置物体飞行路径 circle飞行的物体
            circle.position.copy(curve.getPointAt(t));
            //判断 t+0.1是否小于1 如果小于1 就设置飞行路径
            if (t + 0.1 < 1) {
              //设置飞行方向
              circle.lookAt(curve.getPointAt(t + 0.01));
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
      yll();
      function yll() {
        /**
         * 创建线条模型
         */
        var geometry = new THREE.BufferGeometry(); //声明一个几何体对象Geometry
        var p1 = new THREE.Vector3(-280, 0, -280);
        var p2 = new THREE.Vector3(-330, 25, -280);
        var p3 = new THREE.Vector3(-380, 25, -280);
        var p4 = new THREE.Vector3(-430, 0, -280);
        // 三维三次贝赛尔曲线
        var curve = new THREE.CubicBezierCurve3(p1, p2, p3, p4);
        //getPoints是基类Curve的方法，返回一个vector3对象作为元素组成的数组
        var points = curve.getPoints(100); //分段数100，返回101个顶点
        // setFromPoints方法从points中提取数据改变几何体的顶点属性vertices
        geometry.setFromPoints(points);
        //材质对象
        var material = new THREE.LineBasicMaterial({
          color: 0xFF4500
        });
        //线条模型对象
        var line = new THREE.Line(geometry, material);
        scene.add(line); //线条对象添加到场景中
        var circle = new THREE.Mesh(new THREE.BoxGeometry(2, 2, 2), new THREE.MeshBasicMaterial({
          color: 0xffffff,
          wireframe: true
        }));
        console.log("创建物体成功");
        // circle.position.set(20, 5, 0);
        scene.add(circle);
        //创建clock 时间
        let clock = new THREE.Clock();
        //创建渲染函数
        function render() {
          // //获取总耗时
          // // let delta = clock.getDelta();
          // //设置5秒 循环一次
          let t = clock.getElapsedTime() % 5;
          t = t / 1;
          //设置物体飞行路径
          //先判断curvePath是否存在,如果存在就设置飞行路径
          if (curve) {
            //设置物体飞行路径 circle飞行的物体
            circle.position.copy(curve.getPointAt(t));
            //判断 t+0.1是否小于1 如果小于1 就设置飞行路径
            if (t + 0.1 < 1) {
              //设置飞行方向
              circle.lookAt(curve.getPointAt(t + 0.01));
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
      ylll();
      function ylll() {
        /**
         * 创建线条模型
         */
        var geometry = new THREE.BufferGeometry(); //声明一个几何体对象Geometry
        var p1 = new THREE.Vector3(-280, 0, -280);
        var p2 = new THREE.Vector3(-280, 25, -330);
        var p3 = new THREE.Vector3(-280, 25, -380);
        var p4 = new THREE.Vector3(-280, 0, -430);
        // 三维三次贝赛尔曲线
        var curve = new THREE.CubicBezierCurve3(p1, p2, p3, p4);
        //getPoints是基类Curve的方法，返回一个vector3对象作为元素组成的数组
        var points = curve.getPoints(100); //分段数100，返回101个顶点
        // setFromPoints方法从points中提取数据改变几何体的顶点属性vertices
        geometry.setFromPoints(points);
        //材质对象
        var material = new THREE.LineBasicMaterial({
          color: 0xFF4500
        });
        //线条模型对象
        var line = new THREE.Line(geometry, material);
        scene.add(line); //线条对象添加到场景中
        var circle = new THREE.Mesh(new THREE.BoxGeometry(2, 2, 2), new THREE.MeshBasicMaterial({
          color: 0xffffff,
          wireframe: true
        }));
        console.log("创建物体成功");
        // circle.position.set(20, 5, 0);
        scene.add(circle);
        //创建clock 时间
        let clock = new THREE.Clock();
        //创建渲染函数
        function render() {
          // //获取总耗时
          // // let delta = clock.getDelta();
          // //设置5秒 循环一次
          let t = clock.getElapsedTime() % 5;
          t = t / 1;
          //设置物体飞行路径
          //先判断curvePath是否存在,如果存在就设置飞行路径
          if (curve) {
            //设置物体飞行路径 circle飞行的物体
            circle.position.copy(curve.getPointAt(t));
            //判断 t+0.1是否小于1 如果小于1 就设置飞行路径
            if (t + 0.1 < 1) {
              //设置飞行方向
              circle.lookAt(curve.getPointAt(t + 0.01));
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
      yllll();
      function yllll() {
        /**
         * 创建线条模型
         */
        var geometry = new THREE.BufferGeometry(); //声明一个几何体对象Geometry
        var p1 = new THREE.Vector3(-280, 0, -280);
        var p2 = new THREE.Vector3(-330, 25, -330);
        var p3 = new THREE.Vector3(-380, 25, -380);
        var p4 = new THREE.Vector3(-430, 0, -430);
        // 三维三次贝赛尔曲线
        var curve = new THREE.CubicBezierCurve3(p1, p2, p3, p4);
        //getPoints是基类Curve的方法，返回一个vector3对象作为元素组成的数组
        var points = curve.getPoints(100); //分段数100，返回101个顶点
        // setFromPoints方法从points中提取数据改变几何体的顶点属性vertices
        geometry.setFromPoints(points);
        //材质对象
        var material = new THREE.LineBasicMaterial({
          color: 0xFF4500
        });
        //线条模型对象
        var line = new THREE.Line(geometry, material);
        scene.add(line); //线条对象添加到场景中
        var circle = new THREE.Mesh(new THREE.BoxGeometry(2, 2, 2), new THREE.MeshBasicMaterial({
          color: 0xffffff,
          wireframe: true
        }));
        console.log("创建物体成功");
        // circle.position.set(20, 5, 0);
        scene.add(circle);
        //创建clock 时间
        let clock = new THREE.Clock();
        //创建渲染函数
        function render() {
          // //获取总耗时
          // // let delta = clock.getDelta();
          // //设置5秒 循环一次
          let t = clock.getElapsedTime() % 5;
          t = t / 1;
          //设置物体飞行路径
          //先判断curvePath是否存在,如果存在就设置飞行路径
          if (curve) {
            //设置物体飞行路径 circle飞行的物体
            circle.position.copy(curve.getPointAt(t));
            //判断 t+0.1是否小于1 如果小于1 就设置飞行路径
            if (t + 0.1 < 1) {
              //设置飞行方向
              circle.lookAt(curve.getPointAt(t + 0.01));
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
      ylllll();
      function ylllll() {
        /**
         * 创建线条模型
         */
        var geometry = new THREE.BufferGeometry(); //声明一个几何体对象Geometry
        var p1 = new THREE.Vector3(-280, 0, -280);
        var p2 = new THREE.Vector3(-230, 25, -230);
        var p3 = new THREE.Vector3(-180, 25, -180);
        var p4 = new THREE.Vector3(-130, 0, -130);
        // 三维三次贝赛尔曲线
        var curve = new THREE.CubicBezierCurve3(p1, p2, p3, p4);
        //getPoints是基类Curve的方法，返回一个vector3对象作为元素组成的数组
        var points = curve.getPoints(100); //分段数100，返回101个顶点
        // setFromPoints方法从points中提取数据改变几何体的顶点属性vertices
        geometry.setFromPoints(points);
        //材质对象
        var material = new THREE.LineBasicMaterial({
          color: 0xFF4500
        });
        //线条模型对象
        var line = new THREE.Line(geometry, material);
        scene.add(line); //线条对象添加到场景中
        var circle = new THREE.Mesh(new THREE.BoxGeometry(2, 2, 2), new THREE.MeshBasicMaterial({
          color: 0xffffff,
          wireframe: true
        }));
        console.log("创建物体成功");
        // circle.position.set(20, 5, 0);
        scene.add(circle);
        //创建clock 时间
        let clock = new THREE.Clock();
        //创建渲染函数
        function render() {
          // //获取总耗时
          // // let delta = clock.getDelta();
          // //设置5秒 循环一次
          let t = clock.getElapsedTime() % 5;
          t = t / 1;
          //设置物体飞行路径
          //先判断curvePath是否存在,如果存在就设置飞行路径
          if (curve) {
            //设置物体飞行路径 circle飞行的物体
            circle.position.copy(curve.getPointAt(t));
            //判断 t+0.1是否小于1 如果小于1 就设置飞行路径
            if (t + 0.1 < 1) {
              //设置飞行方向
              circle.lookAt(curve.getPointAt(t + 0.01));
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
      yllllll();
      function yllllll() {
        /**
         * 创建线条模型
         */
        var geometry = new THREE.BufferGeometry(); //声明一个几何体对象Geometry
        var p1 = new THREE.Vector3(-280, 0, -280);
        var p2 = new THREE.Vector3(-230, 25, -330);
        var p3 = new THREE.Vector3(-180, 25, -380);
        var p4 = new THREE.Vector3(-130, 0, -430);
        // 三维三次贝赛尔曲线
        var curve = new THREE.CubicBezierCurve3(p1, p2, p3, p4);
        //getPoints是基类Curve的方法，返回一个vector3对象作为元素组成的数组
        var points = curve.getPoints(100); //分段数100，返回101个顶点
        // setFromPoints方法从points中提取数据改变几何体的顶点属性vertices
        geometry.setFromPoints(points);
        //材质对象
        var material = new THREE.LineBasicMaterial({
          color: 0xFF4500
        });
        //线条模型对象
        var line = new THREE.Line(geometry, material);
        scene.add(line); //线条对象添加到场景中
        var circle = new THREE.Mesh(new THREE.BoxGeometry(2, 2, 2), new THREE.MeshBasicMaterial({
          color: 0xffffff,
          wireframe: true
        }));
        console.log("创建物体成功");
        // circle.position.set(20, 5, 0);
        scene.add(circle);
        //创建clock 时间
        let clock = new THREE.Clock();
        //创建渲染函数
        function render() {
          // //获取总耗时
          // // let delta = clock.getDelta();
          // //设置5秒 循环一次
          let t = clock.getElapsedTime() % 5;
          t = t / 1;
          //设置物体飞行路径
          //先判断curvePath是否存在,如果存在就设置飞行路径
          if (curve) {
            //设置物体飞行路径 circle飞行的物体
            circle.position.copy(curve.getPointAt(t));
            //判断 t+0.1是否小于1 如果小于1 就设置飞行路径
            if (t + 0.1 < 1) {
              //设置飞行方向
              circle.lookAt(curve.getPointAt(t + 0.01));
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
      ylllllll();
      function ylllllll() {
        /**
         * 创建线条模型
         */
        var geometry = new THREE.BufferGeometry(); //声明一个几何体对象Geometry
        var p1 = new THREE.Vector3(-280, 0, -280);
        var p2 = new THREE.Vector3(-330, 25, -230);
        var p3 = new THREE.Vector3(-380, 25, -180);
        var p4 = new THREE.Vector3(-430, 0, -130);
        // 三维三次贝赛尔曲线
        var curve = new THREE.CubicBezierCurve3(p1, p2, p3, p4);
        //getPoints是基类Curve的方法，返回一个vector3对象作为元素组成的数组
        var points = curve.getPoints(100); //分段数100，返回101个顶点
        // setFromPoints方法从points中提取数据改变几何体的顶点属性vertices
        geometry.setFromPoints(points);
        //材质对象
        var material = new THREE.LineBasicMaterial({
          color: 0xFF4500
        });
        //线条模型对象
        var line = new THREE.Line(geometry, material);
        scene.add(line); //线条对象添加到场景中
        var circle = new THREE.Mesh(new THREE.BoxGeometry(2, 2, 2), new THREE.MeshBasicMaterial({
          color: 0xffffff,
          wireframe: true
        }));
        console.log("创建物体成功");
        // circle.position.set(20, 5, 0);
        scene.add(circle);
        //创建clock 时间
        let clock = new THREE.Clock();
        //创建渲染函数
        function render() {
          // //获取总耗时
          // // let delta = clock.getDelta();
          // //设置5秒 循环一次
          let t = clock.getElapsedTime() % 5;
          t = t / 1;
          //设置物体飞行路径
          //先判断curvePath是否存在,如果存在就设置飞行路径
          if (curve) {
            //设置物体飞行路径 circle飞行的物体
            circle.position.copy(curve.getPointAt(t));
            //判断 t+0.1是否小于1 如果小于1 就设置飞行路径
            if (t + 0.1 < 1) {
              //设置飞行方向
              circle.lookAt(curve.getPointAt(t + 0.01));
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
    }

    //顶点光源
    g();
    function g() {
      // 创建球体当灯泡
      const sphereGeometry = new THREE.CylinderGeometry( 0, 8, 1, 32 );
      const sphereMaterial = new THREE.MeshStandardMaterial({
        color: 0xFF1493,
        emissive: 0xFF1493,
        emissiveIntensity: 10,
      });

      const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
      sphere.position.set(-280, 0, -280);
      let pointLight = new THREE.PointLight(0xFF1493, 1);
      sphere.add(pointLight);
      scene.add(sphere);
    }

    // // 飞线效果的相关配置数据
    // const flyData = [{
    //   start: {  //起始点位置
    //     x: 0,
    //     y: 0,
    //     z: 0
    //   },
    //   end: { // 结束点位置
    //     x: -250,
    //     y: 0,
    //     z: 0
    //   },
    //   range: 180, // 飞线长度
    //   height: 120, // 轨迹的高度
    //   color: '#e4393c', // 颜色
    //   speed: 1, // 速度
    //   size: 10 // 飞线点点的大小
    // },
    //   {
    //     start: {  //起始点位置
    //       x: 0,
    //       y: 0,
    //       z: 0
    //     },
    //     end: { // 结束点位置
    //       x: 250,
    //       y: 0,
    //       z: 0
    //     },
    //     range: 180, // 飞线长度
    //     height: 160, // 轨迹的高度
    //     color: '#ff0000', // 颜色
    //     speed: 0.6, // 速度
    //     size: 10 // 飞线点点的大小
    //   },
    //   //一条线 一个对象
    //   {
    //     start: {  //起始点位置
    //       x: 0,
    //       y: 0,
    //       z: 0
    //     },
    //     end: { // 结束点位置
    //       x: -120,
    //       y: 0,
    //       z: 0
    //     },
    //     range: 150, // 飞线长度
    //     height: 160, // 轨迹的高度
    //     color: '#ffffff', // 颜色
    //     speed: 0.6, // 速度
    //     size: 10 // 飞线点点的大小
    //   },
    //   //一条线 一个对象
    //   {
    //     start: {  //起始点位置
    //       x: 0,
    //       y: 0,
    //       z: 0
    //     },
    //     end: { // 结束点位置
    //       x: 0,
    //       y: 0,
    //       z: -10
    //     },
    //     range: 15, // 飞线长度
    //     height: 16, // 轨迹的高度
    //     color: '#ffffff', // 颜色
    //     speed: 0.6, // 速度
    //     size: 10 // 飞线点点的大小
    //   },
    // ];
    // let ratio = {
    //   value: 0
    // };
    // const vertexShader =  `
    //         // 接收js传入的attribute值，会经过线性插值
    //         attribute float current;
    //
    //         // 接收js传入的uniform值
    //         uniform float uSize;
    //         uniform float uTime;
    //         uniform vec3 uColor;
    //         uniform float uRange;
    //         uniform float uTotal;
    //         uniform float uSpeed;
    //
    //         // 向片元着色器传值颜色和透明度
    //         varying vec3 vcolor;
    //         varying float vopacity;
    //
    //         void main () {
    //             float size = uSize;
    //             // 根据时间确定当前飞线的位置， 以结束点为准
    //             float currentEnd = uTotal * fract(uTime * uSpeed);
    //             // 判断当前像素点是否在飞线范围内，如果在范围内设置尺寸和透明度
    //             if (current < currentEnd && current > currentEnd - uRange) {
    //                 // 设置渐变的尺寸，头大尾小
    //                 float sizePct = (uRange - (currentEnd - current)) / uRange;
    //                 size *= sizePct;
    //                 vopacity = 1.0;
    //             } else {
    //                 vopacity = 0.0;
    //             }
    //             // 将颜色传递给片元着色器
    //             vcolor = uColor;
    //             // 设置点的大小
    //             gl_PointSize = size * 0.4;
    //
    //             gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    //         }
    //     `;
    // const fragmentShader =  `
    //         precision mediump float;
    //         // 接收顶点着色器传入的值
    //         varying float vopacity;
    //         varying vec3 vcolor;
    //
    //         void main () {
    //             // 设置颜色
    //             gl_FragColor = vec4(vcolor, vopacity);
    //         }
    //     `;
    //
    // // 创建飞线
    // flyData.forEach(item => {
    //   initFly(item);
    // });
    //
    // function initFly(options:any) {
    //   // 接收传入的参数
    //   const {
    //     start,
    //     end,
    //     height,
    //     size,
    //     color,
    //     range,
    //     speed
    //   } = options;
    //   // 起点位置
    //   const _start = new THREE.Vector3(start.x, start.y, start.z);
    //   // 结束点位置
    //   const _end = new THREE.Vector3(end.x, end.y, end.z);
    //   // 计算中建点位置
    //   /* lerp方法的用法： 在该向量与传入的向量v之间的线性插值，
    //       alpha是沿着线的长度的百分比 —— alpha = 0 时表示的是当前向量，
    //       alpha = 1 时表示的是所传入的向量v。
    //
    //       此处传入 0.5 返回得是中间点位置
    //   **/
    //   const _center = _start.clone().lerp(_end, 0.5);
    //   // 把中间点的位置沿着y轴方向向上移动 height 距离
    //   _center.y += height;
    //   // 计算起点到终点间点的个数
    //
    //   // @ts-ignore
    //   const number = parseInt(_start.distanceTo(_center) + _end.distanceTo(_center));
    //   // 创建一条平滑的三维 二次贝塞尔曲线， 由起点、终点和一个控制点所定义
    //   const curve = new THREE.QuadraticBezierCurve3(
    //     _start,
    //     _center,
    //     _end
    //   );
    //   // 将curve分成 number-1 段；得到number个点；存入数组points 中
    //   const points = curve.getPoints(number);
    //   // 申明变量用于存点的信息
    //   const positions:any = [];
    //   // 申明变量用于存点的索引信息
    //   const current:any = [];
    //   // 遍历点数组，将索引存入current， 将点的x,y,z展开，存入positions数组
    //   points.forEach((item, index) => {
    //     positions.push(
    //       item.x,
    //       item.y,
    //       item.z
    //     );
    //     current.push(index);
    //   });
    //
    //   // 创建BufferGeometry 并把positions和current传给对应的attribute属性，供顶点着色器使用
    //   const geometry = new THREE.BufferGeometry();
    //   geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    //   geometry.setAttribute('current', new THREE.Float32BufferAttribute(current, 1));
    //   // 创建shader材质
    //   const material = new THREE.ShaderMaterial({
    //     transparent: true,
    //     depthWrite: false,
    //     depthTest: false,
    //     blending: THREE.AdditiveBlending,
    //     uniforms: {
    //       uSize: { // 点的大小
    //         value: size
    //       },
    //       uTime: ratio, // 时间
    //       uColor: { // 颜色
    //         value: new THREE.Color(color)
    //       },
    //       uRange: { // 飞线长度
    //         value: range
    //       },
    //       uTotal: { // 轨迹总长度，（点的总个数）
    //         value: number
    //       },
    //       uSpeed: { // 飞行速度
    //         value: speed
    //       }
    //     },
    //     vertexShader,
    //     fragmentShader
    //   });
    //   // 创建并添加到场景中
    //   const flyPoints = new THREE.Points(geometry, material);
    //   scene.add(flyPoints);
    // }
    //
    // let next = 0;
    function animate() {
          requestAnimationFrame(animate);
      // next += 0.01
      // ratio.value = next;
          renderer.render(scene, camera);
        }
        animate();

    //点光源
    guanyuan();
    function guanyuan() {
      // 创建点光源组
      const pointLightGroup = new THREE.Group();
      let radius = 1;
      let pointLightArr: any = [];
      // 创建球体当灯泡
      const sphereGeometry = new THREE.CylinderGeometry( 0, 15, 1, 32 );
      const sphereMaterial = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        emissive: 0xffffff,
        emissiveIntensity: 100,
      });
      const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
      pointLightArr.push(sphere);
      sphere.position.set(
        radius * Math.cos((1 * 2 * Math.PI) / 3),
        Math.cos((1 * 2 * Math.PI) / 3),
        radius * Math.sin((1 * 2 * Math.PI) / 3)
      );
      let pointLight = new THREE.PointLight(0xffffff, 1);
      sphere.add(pointLight);
      pointLightGroup.add(sphere);
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


    }

    //测试浮动
    fudong();
    function fudong() {
      var circle = new THREE.Mesh(new THREE.BoxGeometry(2, 2, 2), new THREE.MeshBasicMaterial({
        color: 0xffffff,
        wireframe: true
      }));
      console.log("创建物体成功");
      circle.position.set(280, 0, 115);
      scene.add(circle);

      function render() {
        requestAnimationFrame(render)
        renderer.render(scene, camera)
        // 浮标上下浮动 ------------遍历到这个浮标组的子模型，给每一个子模型添加运动，或者下边  ↓
          const time = Date.now() * 0.005
        circle.position.y = Math.cos( time ) * 0.75 + 2.25
      }
      render();

    }

  }



//   main() {
//     const scene = new THREE.Scene();
//
//     const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);
//
//     const renderer = new THREE.WebGLRenderer({
//       antialias: true,
//       // @ts-ignore
//       // canvas: document.querySelector('canvas')
//     });
//     renderer.setSize(innerWidth, innerHeight);
//     renderer.setPixelRatio(window.devicePixelRatio);
//     // document.body.appendChild(renderer.domElement);
//     // @ts-ignore
//     document.getElementById("tt").appendChild(renderer.domElement); //设置页面div 显示区域
//
//     const vertexShader = `
// //     varying vec2 vertexUV;
// //     varying vec3 vertexNormal;
// // void main() {
// //    vertexUV = uv;
// //   vertexNormal = normalize(normalMatrix * normal);
// //   // vertexNormal = normal;
// //   gl_Position = projectionMatrix * modelViewMatrix * vec4(
// //   position,0.9 );
// // }
// varying vec2 vertexUV;
//     varying vec3 vertexNormal;
// void main() {
//    vec2 vertexUV = uv;
//   vec3 vertexNormal = normalize(normalMatrix * normal);
//   // vertexNormal = normal;
//   gl_Position = projectionMatrix * modelViewMatrix * vec4(
//   position,0.9 );
// }
// `;
//     const fragmentShader = `
//     uniform sampler2D globeTexture;
// varying vec2 vertexUV;
// varying vec3 vertexNormal;
// void main() {
//   float intensity = 1.05 - dot(vertexNormal,vec3(0.0,0.0,1.0 ));
//   vec3 atmosphere = vec3(0.3,0.6,1.0) * pow(intensity,1.5);
//   gl_FragColor = vec4(atmosphere + texture2D(globeTexture, vertexUV).xyz,1.0);
// }
// `;
//     const atmosphereVertexShader = `
//     varying vec3 vertexNormal;
//      void main() {
//     vertexNormal = normalize(normalMatrix * normal);
//     gl_Position = projectionMatrix * modelViewMatrix * vec4(position,0.9 );
// }
// `;
//     const atmosphereFragmentShader = `
//     varying vec3 vertexNormal;
//      void main(){
//   float intensity = pow(0.05 - dot(vertexNormal, vec3(0, 0,1.0)),2.0);
//   gl_FragColor = vec4(0.3,0.6,1.0,1.0) * intensity;
// }
// `;
//
// // create a sphere
// //     const sphere = new THREE.Mesh(
// //       new THREE.SphereGeometry(5, 50, 50),
// //       new THREE.ShaderMaterial({
// //         vertexShader,
// //         fragmentShader,
// //         uniforms: {
// //           globeTexture: {
// //             value: new THREE.TextureLoader().load('./assets/tmp/img/ditu.png')
// //           }
// //         }
// //       // new THREE.MeshBasicMaterial({
// //       //   color:0xff0000
// //       //   map: new THREE.TextureLoader().load('./assets/tmp/img/ditu.png')
// //         }
// //         )
// //     );
//     // scene.add(sphere);
//
//     const uniforms = {
//       globeTexture: { value: new THREE.TextureLoader().load('./assets/tmp/img/ditu.png') }
//     };
//     const sphere = new THREE.Mesh(
//       new THREE.SphereGeometry(3, 50, 50),
//       // new THREE.MeshBasicMaterial({
//       //   map: new THREE.TextureLoader().load("./assets/tmp/img/ditu.png")
//       // }),
//       new  THREE.ShaderMaterial({
//         vertexShader,
//         fragmentShader,
//         uniforms: uniforms,
//         //   {
//         //   globeTexture: {
//         //     value: THREE.ImageUtils.loadTexture('./assets/tmp/img/ditu.png')
//         //   }
//         // }
//       })
//     );
//     scene.add(sphere);
//
//     // create atmosphere
//     const atmosphere = new THREE.Mesh(
//       new THREE.SphereGeometry(5, 50, 50),
//       new THREE.ShaderMaterial({
//         // uniforms: uniforms,
//         vertexShader: atmosphereVertexShader,
//         fragmentShader: atmosphereFragmentShader,
//         blending: THREE.AdditiveBlending,
//         side: THREE.BackSide,
//
//       })
//     );
//
//     atmosphere.scale.set(1.1, 1.1, 1.1);
//     scene.add(atmosphere);
//
//     const mouse: any = {
//       x: undefined,
//       y: undefined
//     };
//
//     const group = new THREE.Group();
//     // group.add(sphere);
//     scene.add(group);
//
//     const starGeometry = new THREE.BufferGeometry();
//     const starMaterial = new THREE.PointsMaterial({
//       color: 0xffffff
//     });
//
//     const starVertices = [];
//     for (let i = 0; i < 10000; i++) {
//       const x = (Math.random() - 0.5) * 2000;
//       const y = (Math.random() - 0.5) * 2000;
//       const z = -Math.random() * 3000;
//       starVertices.push(x, y, z)
//     }
//     starGeometry.setAttribute(
//       'position',
//       new THREE.Float32BufferAttribute(starVertices, 3)
//     );
//     const stars = new THREE.Points(starGeometry, starMaterial);
//     scene.add(stars);
//
//     camera.position.z = 15;
//
//     function animate() {
//       requestAnimationFrame(animate);
//       renderer.render(scene, camera);
//       sphere.rotation.y += 0.002;
//       // atmosphere.rotation.y += 0.002;
//       gsap.to(group.rotation, {
//         x: -mouse.y * 0.3,
//         y: mouse.x * 0.5,
//         duration: 2
//       });
//     }
//
//     animate();
//
//     // addEventListener( 'mousemove',() => {
//     //   mouse.x = (event.clientX / innerWidth)
//     //     * 2 - 1;
//     //   mouse.y = -(event.clientY / innerHeight)
//     //     * 2 + 1 ;
//     //   console.log(mouse);
//     // })
//   }



}
