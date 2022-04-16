import { Model, Skybox, ThirdPersonCamera, useKeyboard, useLoop, World } from "lingo3d-react"
import { createRef, useRef } from "react"

function App() {
  // useKeyboard用于监控当前按键
  const key = useKeyboard()
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
  // // 左
  // if (key === "a") {
  //   motion = "leftTurn"
  // }
  // // 右
  // if (key === "d") {
  //   motion = "rightTurn"
  // }

  // useLoop 帧循环勾子
  useLoop(() => {
    characterRef.current.moveForward(-2)
  }, key === "w");
  useLoop(() => {
    characterRef.current.moveForward(1.8)
  }, key === "s");
  useLoop(() => {
    characterRef.current.moveRight(-2);
  }, key === "d");
  useLoop(() => {
    characterRef.current.moveRight(2);  
  }, key === "a");

  return (
    <World>
      <ThirdPersonCamera active mouseControl>
        <Model
          ref={characterRef}
          src="girl.fbx"
          physics="character"
          animations={{
            idle: "idle.fbx",
            walking: "walking.fbx",
            walkingBackwards: "walking-backwards.fbx",
            leftTurn: "left-turn.fbx",
            rightTurn: "right-turn.fbx"
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
      <Skybox texture="skybox.jpg" />
    </World >
  )
}

export default App
