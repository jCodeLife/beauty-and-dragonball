import { Model, Skybox, ThirdPersonCamera, useKeyboard, useLoop, World } from "lingo3d-react"
import { createRef, useRef } from "react"

function App() {
  // useKeyboard用于监控当前按键
  const key = useKeyboard()
  console.log(key);
  const characterRef = createRef()
  //声明motion，用于表示当前角色应该对应的动画，默认为站立idle
  let motion = "idle";
  // 前
  if (key === "w") {
    motion = "walking"
  }
  // 后
  if (key === "s") {
    motion = "walkingBackwards"
  }
  // 按下w和e时，开始跑
  if (key === "w e") {
    motion = "running"
  }

  // useLoop 帧循环勾子
  useLoop(() => {
    characterRef.current.moveForward(-4)
  }, key === "w");
  useLoop(() => {
    characterRef.current.moveForward(1.8)
  }, key === "s");
  useLoop(() => {
    characterRef.current.moveForward(-10)
  }, key === "w e");

  return (
    <World>
      <Skybox texture="skybox.jpg" />

      <ThirdPersonCamera active mouseControl>
        <Model
          ref={characterRef}
          src="girl.fbx"
          physics="character"
          animations={{
            idle: "idle.fbx",
            walking: "walking.fbx",
            walkingBackwards: "walking-backwards.fbx",
            running: "running.fbx"
          }}
          animation={motion}
          scale={1}
        />
      </ThirdPersonCamera>

      <Model
        src="map/scene.gltf"
        scale={40}
        physics="map"
      />

      <Model
        src="dragon_ball/scene.gltf"
        scale={10}
        physics="character"
      />
    </World >
  )
}

export default App
