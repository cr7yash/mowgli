import React from "react";
import { AppContext, Stage } from "react-pixi-fiber";

import Runner from "./Runner";
import AnimatedSprite from "./AnimatedSprite";

import "./index.css";

/*
const height = 450;
const width = 600;
const OPTIONS = {
  backgroundColor: 0x1099bb,
  height: height,
  width: width
};
*/

const width = window.innerWidth < 800 ? window.innerWidth : 800;
const height = window.innerHeight < 600 ? window.innerHeight : 600;


export default () => {
  const [status, setStatus] = React.useState("play");
  const [isBananaVisible, setBananaVisible] = React.useState(true);

  const stopGame = () => {
    setStatus("stop");
  };

  const startGame = () => {
    window.localStorage.setItem("banana", 0);
    setStatus("play");
  };

  React.useEffect(() => {
    startGame();
  }, []);

  const catchBanana = () => {
//    console.log("catch banana");
    setBananaVisible(false);
    let banana = Number(window.localStorage.getItem("banana"));
    window.localStorage.setItem("banana", banana + 1);
    setTimeout(() => {
      setBananaVisible(true);
    }, 1500);
  };

  return (
    <center>
      {status === "stop" && (
        <div className="stop">
          <div>Your score: <b>{localStorage.getItem("banana")}</b> <img src="banana2.png" width="80" alt="banana"  /></div>
          <button onClick={startGame}>New game</button>
        </div>
      )}

      <Stage
        width={width}
        height={height}
        options={{ backgroundColor: 0x1099bb }}
        interactive
      >
        <AppContext.Consumer>
          {app => {
            if (status === "stop") {
              app.stop();
            } else {
              app.start();
            }

            return (
              <>
                <AnimatedSprite app={app}  shift={0} res="bg2.jpg" y={0} />
                <AnimatedSprite app={app}  shift={1286} res="bg2.jpg" y={0} />
                <AnimatedSprite
                  app={app}
                  shift={0}
                  speed={15}
                  res="ground.png"
                  y={app.screen.height - 150}
                />
                <AnimatedSprite
                  app={app}
                  shift={1286}
                  speed={15}
                  res="ground.png"
                  y={app.screen.height - 150}
                />
                <AnimatedSprite
                  app={app}
                  shift={643}
                  //length={643}
                  speed={25}
                  res="snail2.png"
                  y={app.screen.height - 200}
                />

                <AnimatedSprite
                  app={app}
                  shift={0}
                  length={800}
                  res="banana2.png"
                  //x={400}
                  visible={isBananaVisible}
                  y={90}
                />

                <Runner
                  app={app}
                  stopGame={stopGame}
                  catchBanana={catchBanana}
                  status={status}
                />
              </>
            );
          }}
        </AppContext.Consumer>
      </Stage>
      <div className="credit">
      </div>
    </center>
  );
};
