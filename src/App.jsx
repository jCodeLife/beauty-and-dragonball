import { Editor, Model, Skybox, ThirdPersonCamera, useKeyboard, useLoop, World, Find, Reticle } from "lingo3d-react"
import { createRef, useRef, useState } from "react"

function App() {
  // useKeyboard用于监控当前按键
  const key = useKeyboard()
  console.log(key);
  const [oneStar, setOneStar] = useState(false);
  const [twoStar, setTwoStar] = useState(false);
  const [threeStar, setThreeStar] = useState(false);
  const [fourStar, setFourStar] = useState(false);
  const [fiveStar, setFiveStar] = useState(false);
  const [sixStar, setSixStar] = useState(false);
  const [sevenStar, setSevenStar] = useState(false);

  const [sl, setSl] = useState(false);

  const characterRef = createRef()
  //用于标记找到的龙珠
  let [findBall, setFindBall] = useState(new Set())
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
  // 或者只按e时，开始跑
  if (key === "e") {
    motion = "running"
  }

  if (key === "Space") {
    motion = "jumping"
  }

  // useLoop 帧循环勾子
  useLoop(() => {
    characterRef.current.moveForward(-5)
  }, key === "w");
  useLoop(() => {
    characterRef.current.moveForward(1.8)
  }, key === "s");
  useLoop(() => {
    characterRef.current.moveForward(-10)
  }, key === "w e");
  useLoop(() => {
    characterRef.current.moveForward(-10)
  }, key === "e");
  useLoop(() => {
    characterRef.current.moveForward(-5)
  }, key === "Space");





  return (
    <>
      <World>
        <Skybox texture="skybox.jpg" />

        <ThirdPersonCamera active mouseControl innerY={66}>
          <Model
            ref={characterRef}
            src="girl.fbx"
            physics="character"
            animations={{
              idle: "idle.fbx",
              walking: "walking.fbx",
              walkingBackwards: "walking-backwards.fbx",
              running: "running.fbx",
              jumping: "jumping.fbx"
            }}
            animation={motion}
            scale={1}
            x={-221.30}
            y={-1300.07}
            z={-6722.07}
            rotationY={-180}
          />
        </ThirdPersonCamera>

        <Model
          src="map/scene.gltf"
          scale={40}
          physics="map"
        >
        </Model>

        <Model
          src="dragon_balls\scene.gltf"
          scale={3}
          physics="map"
          x={-221.30}
          y={-1300.07}
          z={-6722.07}
        />

        <Model
          src="dragon_ball.fbx"
          physics="map"
          x={516.29}
          y={-1198.63}
          z={173.60}
          scale={.5}
        >
          <Find name="Two Star_02 - Default_0"
            outline={oneStar}
            onClick={() => {
              setOneStar(true)
              findBall.add(1)
              console.log(findBall)
              if (findBall.size === 7) {
                alert("恭喜你！成功收集龙珠，快回到初始位置向神龙许愿吧")
              }
            }} ></Find>
        </Model>


        <Model
          id="two"
          src="dragon_ball.fbx"
          physics="map"
          x={-980.8}
          y={-801.4}
          z={2693.9}
          scale={.8}
        >
          <Find name="Two Star_02 - Default_0"
            outline={twoStar}
            onClick={() => {
              setTwoStar(true)
              findBall.add(2)
              console.log(findBall)
              if (findBall.size === 7) {
                alert("恭喜你！成功收集龙珠，快回到初始位置向神龙许愿吧")
              }
            }} ></Find>
        </Model>


        <Model
          src="dragon_ball.fbx"
          physics="map"
          x={-420.9}
          y={-1289.5}
          z={-3538.2}
          scale={.5}
        >
          <Find name="Two Star_02 - Default_0"
            outline={threeStar}
            onClick={() => {
              setThreeStar(true)
              findBall.add(3)
              console.log(findBall)
              if (findBall.size === 7) {
                alert("恭喜你！成功收集龙珠，快回到初始位置向神龙许愿吧")
              }
            }} ></Find>
        </Model>

        <Model
          src="dragon_ball.fbx"
          physics="map"
          x={-676.3}
          y={-1900.2}
          z={6343.7}
          scale={.8}
        >
          <Find name="Two Star_02 - Default_0"
            outline={fourStar}
            onClick={() => {
              setFourStar(true)
              findBall.add(4)
              console.log(findBall)
              if (findBall.size === 7) {
                alert("恭喜你！成功收集龙珠，快回到初始位置向神龙许愿吧")
              }
            }} ></Find>
        </Model>


        <Model
          src="dragon_ball.fbx"
          physics="map"
          x={-898.7}
          y={-1231.8}
          z={3563.8}
          scale={.5}
        >
          <Find name="Two Star_02 - Default_0"
            outline={fiveStar}
            onClick={() => {
              setFiveStar(true)
              findBall.add(5)
              console.log(findBall)
              if (findBall.size === 7) {
                alert("恭喜你！成功收集龙珠，快回到初始位置向神龙许愿吧")
              }
            }} ></Find>
        </Model>


        <Model
          src="dragon_ball.fbx"
          physics="map"
          x={395.9}
          y={-1308.6}
          z={5900.3}
          scale={.8}
        >
          <Find name="Two Star_02 - Default_0"
            outline={sixStar}
            onClick={() => {
              setSixStar(true)
              findBall.add(6)
              console.log(findBall)
              if (findBall.size === 7) {
                alert("恭喜你！成功收集龙珠，快回到初始位置向神龙许愿吧")
              }
            }} ></Find>
        </Model>


        <Model
          src="dragon_ball.fbx"
          physics="map"
          x={455.8}
          y={-1267.0}
          z={3867.4}
          scale={.8}
        >
          <Find name="Two Star_02 - Default_0"
            outline={sevenStar}
            onClick={() => {
              setSevenStar(true)
              findBall.add(7)
              console.log(findBall)
              if (findBall.size === 7) {
                alert("恭喜你！成功收集龙珠，快回到初始位置向神龙许愿吧")

              }
            }} ></Find>
        </Model>

        <Model
          visible={findBall.size === 7}
          src="sl2.fbx"
          scale={1}
          x={-221.30}
          y={-1300.07}
          z={-3700}

          onClick={() => {             
            setSl(true) 
            findBall.add(0)
          }}
        />

          <Model
            visible={sl}
            
            src="sl0.fbx"
            scale={37.82}
            x={-214.9}
            y={-804.91}
            z={-8364}
          />

         

      </World >
      <Reticle color="white" variant={1} />


      {/* <Editor /> */}



    </>
  )
}

export default App
