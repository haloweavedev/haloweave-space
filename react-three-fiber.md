Installation
Learn how to install react-three-fiber
npm install three @react-three/fiber

Warning
Fiber is compatible with React v18 and v19 and works with ReactDOM and React Native. Fiber is a React renderer, it must pair with a major version of React, just like react-dom, react-native, etc. @react-three/fiber@8 pairs with react@18, @react-three/fiber@9 pairs with react@19.

Getting started with React Three Fiber is not nearly as hard as you might have thought, but various frameworks may require particular attention.

We've put together guides for getting started with each popular framework:

Vite.js
Next.js
CDN w/o build tools
React Native
If you just want to give it a try, fork this example on codesandbox!

Vite.js
vite will also work out of the box.

# Create app
npm create vite my-app

# Select react as framework

# Install dependencies
cd my-app
npm install three @react-three/fiber

# Start development server
npm run dev

Next.js
It should work out of the box but you will encounter untranspiled add-ons in the three.js ecosystem, in that case,

Next.js 13.1 or latest version
You need to add three to transpilePackages property in next.config.js:

transpilePackages: ['three'],

Next.js 13.0 or oldest version
You can install the next-transpile-modules module:

npm install next-transpile-modules --save-dev

then, add this to your next.config.js

const withTM = require('next-transpile-modules')(['three'])
module.exports = withTM()

Make sure to check out our official next.js starter, too!

Without build tools
You can use React Three Fiber with browser-ready ES Modules from esm.sh and a JSX-like syntax powered by htm.

import ReactDOM from 'https://esm.sh/react-dom'
import React, { useRef, useState } from 'https://esm.sh/react'
import { Canvas, useFrame } from 'https://esm.sh/@react-three/fiber'
import htm from 'https://esm.sh/htm'

const html = htm.bind(React.createElement)
ReactDOM.render(html`<${Canvas}>...<//>`, document.getElementById('root'))

Full example
React Native
R3F v8 adds support for react-native and can be imported from @react-three/fiber/native. We use expo-gl and expo-asset under the hood for WebGL2 bindings and ensuring interplay between Metro and three.js loaders.

To get started, create an app via expo or react-native:

# Create a managed/bare app
npx create-expo-app
cd my-app

# or

# Create and link bare app
npx react-native init my-app
npx install-expo-modules@latest
cd my-app

Then install dependencies (for manual installation or migration, see expo modules installation):

# Automatically install
expo install expo-gl

# Install NPM dependencies
npm install three @react-three/fiber

Some configuration may be required to tell the Metro bundler about your assets if you use useLoader or Drei abstractions like useGLTF and useTexture:

// metro.config.js
module.exports = {
  resolver: {
    sourceExts: ['js', 'jsx', 'json', 'ts', 'tsx', 'cjs', 'mjs'],
    assetExts: ['glb', 'gltf', 'png', 'jpg'],
  },
}

R3F's API is completely x-platform, so you can use events and hooks just as you would on the web.

Note
Make sure to import from @react-three/fiber/native or @react-three/drei/native for correct IntelliSense and platform-specific abstractions.

Note
iOS simulators often have incomplete or unreliable OpenGL ES support, which can cause EXC_BAD_ACCESS crashes when rendering 3D content. Always test on a physical iOS device (iPhone/iPad running iOS 16 or later) to ensure stable WebGL rendering.

import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber/native'
import { useGLTF } from '@react-three/drei/native'
import modelPath from './path/to/model.glb'

function Model(props) {
  const gltf = useGLTF(modelPath)
  return <primitive {...props} object={gltf.scene} />
}

export default function App() {
  return (
    <Canvas>
      <ambientLight />
      <Suspense>
        <Model />
      </Suspense>
    </Canvas>
  )
}

---

Your first scene
This guide will help you setup your first React Three Fiber scene and introduce you to its core concepts.
This tutorial will assume some React knowledge.

Setting up the Canvas
We'll start by importing the <Canvas /> component from @react-three/fiber and putting it in our React tree.

import { createRoot } from 'react-dom/client'
import { Canvas } from '@react-three/fiber'

function App() {
  return (
    <div id="canvas-container">
      <Canvas />
    </div>
  )
}

createRoot(document.getElementById('root')).render(<App />)

The Canvas component does some important setup work behind the scenes:

It sets up a Scene and a Camera, the basic building blocks necessary for rendering
It renders our scene every frame, you do not need a traditional render-loop
Note
Canvas is responsive to fit the parent node, so you can control how big it is by changing the parents width and height, in this case #canvas-container.

Adding a Mesh Component
To actually see something in our scene, we'll add a lowercase <mesh /> native element, which is the direct equivalent to new THREE.Mesh().

<Canvas>
  <mesh />

Note
Note that we don't need to import anything, All three.js objects will be treated as native JSX elements, just like you can just write <div /> or <span /> in regular ReactDOM. The general rule is that Fiber components are available under the camel-case version of their name in three.js.

A Mesh is a basic scene object in three.js, and it's used to hold the geometry and the material needed to represent a shape in 3D space. We'll create a new mesh using a BoxGeometry and a MeshStandardMaterial which automatically attach to their parent.

<Canvas>
  <mesh>
    <boxGeometry />
    <meshStandardMaterial />
  </mesh>
</Canvas>

Let's pause for a moment to understand exactly what is happening here. The code we just wrote is the equivalent to this three.js code:

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)

const renderer = new THREE.WebGLRenderer()
renderer.setSize(width, height)
document.querySelector('#canvas-container').appendChild(renderer.domElement)

const mesh = new THREE.Mesh()
mesh.geometry = new THREE.BoxGeometry()
mesh.material = new THREE.MeshStandardMaterial()

scene.add(mesh)

function animate() {
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
}

animate()

Constructor arguments
According to the docs for BoxGeometry we can optionally pass three arguments for: width, length and depth:

new THREE.BoxGeometry(2, 2, 2)

In order to do this in Fiber we use the args prop, which always takes an array whose items represent the constructor arguments.

<boxGeometry args={[2, 2, 2]} />

Note
Note that every time you change args, the object must be re-constructed!

Adding lights
Next, we will add some lights to our scene, by putting these components into our canvas.

<Canvas>
  <ambientLight intensity={0.1} />
  <directionalLight color="red" position={[0, 0, 5]} />

Props
This introduces us to the last fundamental concept of Fiber, how React props work on three.js objects. When you set any prop on a Fiber component, it will set the property of the same name on the three.js instance.

Let's focus on our ambientLight, whose documentation tells us that we can optionally construct it with a color, but it can also receive props.

<ambientLight intensity={0.1} />

Which is the equivalent to:

const light = new THREE.AmbientLight()
light.intensity = 0.1

Shortcuts
There are a few shortcuts for props that have a .set() method (colors, vectors, etc).

const light = new THREE.DirectionalLight()
light.position.set(0, 0, 5)
light.color.set('red')

Which is the same as the following in JSX:

<directionalLight position={[0, 0, 5]} color="red" />

Please refer to the API for a deeper explanation.

The result
styles.css
App.js
import { Canvas } from "@react-three/fiber";

export default function App() {
return (
    <Canvas>
      <mesh>
        <boxGeometry args={[2, 2, 2]} />
        <meshPhongMaterial />
      </mesh>
      <ambientLight intensity={0.1} />
      <directionalLight position={[0, 0, 5]} color="red" />
    </Canvas>
);
}

Open Sandbox
Tip
You can live-edit the code above:

try different materials, like MeshNormalMaterial or MeshBasicMaterial, give them a color
try different geometries, like SphereGeometry or OctahedronGeometry
try changing the position on our mesh component, by setting the prop with the same name
try extracting our mesh to a new component

----

code example

public/index.html : "<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<meta name="theme-color" content="#000000">
	<!--
      manifest.json provides metadata used when your web app is added to the
      homescreen on Android. See https://developers.google.com/web/fundamentals/engage-and-retain/web-app-manifest/
    -->
	<link rel="manifest" href="%PUBLIC_URL%/manifest.json">
	<link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
	<!--
      Notice the use of %PUBLIC_URL% in the tags above.
      It will be replaced with the URL of the `public` folder during the build.
      Only files inside the `public` folder can be referenced from the HTML.

      Unlike "/favicon.ico" or "favicon.ico", "%PUBLIC_URL%/favicon.ico" will
      work correctly both with client-side routing and a non-root public URL.
      Learn how to configure a non-root public URL by running `npm run build`.
    -->
	<title>React App</title>
</head>

<body>
	<noscript>
		You need to enable JavaScript to run this app.
	</noscript>
	<div id="root"></div>
	<!--
      This HTML file is a template.
      If you open it directly in the browser, you will see an empty page.

      You can add webfonts, meta tags, or analytics to this file.
      The build step will place the bundled scripts into the <body> tag.

      To begin the development, run `npm start` or `yarn start`.
      To create a production bundle, use `npm run build` or `yarn build`.
    -->
</body>

</html>"

src/App.js : "import { useState, useTransition } from 'react'
import { useControls } from 'leva'
import { Canvas } from '@react-three/fiber'
import { AccumulativeShadows, RandomizedLight, Center, Environment, OrbitControls } from '@react-three/drei'

export default function App() {
  return (
    <Canvas shadows camera={{ position: [0, 0, 4.5], fov: 50 }}>
      <group position={[0, -0.65, 0]}>
        <Sphere />
        <AccumulativeShadows temporal frames={200} color="purple" colorBlend={0.5} opacity={1} scale={10} alphaTest={0.85}>
          <RandomizedLight amount={8} radius={5} ambient={0.5} position={[5, 3, 2]} bias={0.001} />
        </AccumulativeShadows>
      </group>
      <Env />
      <OrbitControls autoRotate autoRotateSpeed={4} enablePan={false} enableZoom={false} minPolarAngle={Math.PI / 2.1} maxPolarAngle={Math.PI / 2.1} />
    </Canvas>
  )
}

function Sphere() {
  const { roughness } = useControls({ roughness: { value: 1, min: 0, max: 1 } })
  return (
    <Center top>
      <mesh castShadow>
        <sphereGeometry args={[0.75, 64, 64]} />
        <meshStandardMaterial metalness={1} roughness={roughness} />
      </mesh>
    </Center>
  )
}

function Env() {
  const [preset, setPreset] = useState('sunset')
  // You can use the "inTransition" boolean to react to the loading in-between state,
  // For instance by showing a message
  const [inTransition, startTransition] = useTransition()
  const { blur } = useControls({
    blur: { value: 0.65, min: 0, max: 1 },
    preset: {
      value: preset,
      options: ['sunset', 'dawn', 'night', 'warehouse', 'forest', 'apartment', 'studio', 'city', 'park', 'lobby'],
      // If onChange is present the value will not be reactive, see https://github.com/pmndrs/leva/blob/main/docs/advanced/controlled-inputs.md#onchange
      // Instead we transition the preset value, which will prevents the suspense bound from triggering its fallback
      // That way we can hang onto the current environment until the new one has finished loading ...
      onChange: (value) => startTransition(() => setPreset(value))
    }
  })
  return <Environment preset={preset} background blur={blur} />
}
"

src/index.js : "import { createRoot } from 'react-dom/client'
import './styles.css'
import App from './App'
import { Leva } from 'leva'
import { Logo } from '@pmndrs/branding'

function Overlay() {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none', width: '100%', height: '100%' }}>
      <a href="https://pmnd.rs/" style={{ position: 'absolute', bottom: 40, left: 90, fontSize: '13px' }}>
        pmnd.rs
        <br />
        dev collective
      </a>
      <div style={{ position: 'absolute', top: 40, left: 40, fontSize: '13px' }}>😄 —</div>
      <div style={{ position: 'absolute', bottom: 40, right: 40, fontSize: '13px' }}>30/10/2022</div>
    </div>
  )
}

createRoot(document.getElementById('root')).render(
  <>
    <App />
    <Overlay />
    <Logo style={{ position: 'absolute', bottom: 40, left: 40, width: 30 }} />
    <Leva collapsed />
  </>
)
"

src/styles.css : "@import url('https://rsms.me/inter/inter.css');

* {
  box-sizing: border-box;
}

html,
body,
#root {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

body {
  overscroll-behavior-y: none;
  background: #f5f5f5;
  font-family: 'Inter var', sans-serif;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  color: black;
}

a {
  color: black;
}

a {
  pointer-events: all;
  color: black;
  text-decoration: none;
}

svg {
  fill: black;
}
"

package.json : "{
  "name": "environment-blur-and-transitions",
  "version": "1.0.0",
  "description": "",
  "keywords": [
    "environment",
    "blur"
  ],
  "main": "src/index.js",
  "dependencies": {
    "@pmndrs/branding": "0.0.8",
    "@react-three/drei": "9.77.3",
    "@react-three/fiber": "8.8.10",
    "@types/three": "0.144.0",
    "leva": "0.9.34",
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "react-scripts": "5.0.1",
    "three": "0.146.0"
  },
  "devDependencies": {},
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject"
  },
  "browserslist": [
    ">0.2%",
    "not dead",
    "not ie <= 11",
    "not op_mini all"
  ]
}"

pushing live