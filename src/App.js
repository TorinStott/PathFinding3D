import './App.css';
import "./styles.css";
import React, { useRef, useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as THREE from "three";
import Navigation from './Navigation';
import 'bootstrap/dist/css/bootstrap.min.css';

const CameraController = () => {
  const { camera, gl } = useThree();
  useEffect(
    () => {
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
};

const tempBoxes = new THREE.Object3D();

const BoxGrid = ({ i, j }) => {
  const material = new THREE.MeshLambertMaterial({ color: 0x666666 });
  const boxesGeometry = new THREE.BoxBufferGeometry(0.5, 0.5, 0.5);
  const ref = useRef();

  useFrame(({ clock }) => {
    let counter = 0;
    const t = clock.oldTime * 0.001;
    for (let x = 0; x < i; x++) {
      for (let z = 0; z < j; z++) {
        const id = counter++;
        tempBoxes.position.set(i / 2 - x, 0, j / 2 - z);
        tempBoxes.updateMatrix();
        ref.current.setMatrixAt(id, tempBoxes.matrix);
      }
    }
    ref.current.instanceMatrix.needsUpdate = true;
  });

  return <instancedMesh ref={ref} args={[boxesGeometry, material, i * j]} />;
};


function App() {
  return(
  <>
  <Navigation />
  <Canvas>
    <CameraController />
    <ambientLight intensity={0.5} />
    <spotLight position={[10,15,10]} angle={0.9}/>
    <BoxGrid i={20} j={20} />
  </Canvas>
  </>
  )
}

export default App;
