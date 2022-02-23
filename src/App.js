import './App.css';
import "./styles.css";
import React, { useRef, useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as THREE from "three";
import Navigation from './Navigation';
import 'bootstrap/dist/css/bootstrap.min.css';

const scene = new THREE.Scene();
const camera = new THREE.Camera();
const tempBoxes = new THREE.Object3D();

const CameraController = () => {
  const { camera, gl } = useThree();
  useEffect(() => {
      const controls = new OrbitControls(camera, gl.domElement);
      controls.position0 = 100;
      controls.minDistance = 5;
      controls.maxDistance = 20;
      camera.position.set(0,50,10);
      controls.update();
      return () => {
        controls.dispose();
      };
    },
    [camera, gl]
  );
  return null;
}

var raycaster = new THREE.Raycaster();
var intersects = raycaster.intersectObject(scene, true);

if (intersects.length > 0) {
    var object = intersects[0].object;
    console.log(object);
    object.material.color.set( Math.random() * 0xffffff );
}

var counter = 0;
const boxesGrid = [];
const gridDimensions = 20;
function Box(props) {
  const box = useRef();
  const boxesGeometry = new THREE.BoxBufferGeometry(0.5, 0.5, 0.5);
  const boxDefaultColor = new THREE.Color('white')
  const boxSelectedColor = new THREE.Color('red')
  const boxClickedColor = new THREE.Color('green')
  let pointerOver = false;
  const [hovered, setHovered] = useState(false)
  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto'
  }, [hovered])
  for(let x=0;x<gridDimensions;x++){
    for(let z=0;z<gridDimensions;z++) {
      counter++;
      boxesGrid.push(
      <>
      <mesh ref={box} key={counter} 
      geometry={boxesGeometry} position={[x,0,z]}
      onPointerOver={(e) => e.object.material.color = boxSelectedColor}
      // onPointerOut={(e) => e.object.material.color = boxDefaultColor}
      onPointerDown={(e) => e.object.material.color = boxClickedColor}
      >
      <meshStandardMaterial color={'white'}></meshStandardMaterial>
      </mesh>
      </>
      )
    }
  }
  return null
}
function changeColor(e){
  
}
function App() {
  return(
  <>
  <Navigation />
  <Canvas>
    <Box material={'white'}></Box>
    {boxesGrid}
    <CameraController />
    <ambientLight intensity={0.5} />
    <spotLight position={[10,15,10]} angle={0.9}/>
  </Canvas>
  </>
  )
}

export default App;
