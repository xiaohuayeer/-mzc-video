import React, { useEffect, useRef, useState, createContext } from "react";
import OneScreen from "./oneScreen";
import TwoScreen from "./twoScreen";
import MultiScreen from "./multiScreen";
import ReactLoading from "react-loading";
import "./screen.css";

const Context = createContext({});

export default function Index(props) {
  const { width, height, teaList, stuList, otherList, needSreenShot } = props;
  const { screenShot } = props;
  const [screen, setScreen] = useState(3);
  const [loading, setLoading] = useState(true);
  const loadingTimer = useRef(null);

  const [schedule, setSchedule] = useState(0); //进度
  const [playStatus, setPlayStatus] = useState(true); //播放暂停

  useEffect(() => {
    setLoading(true);
    setScreen(1);
    if (loadingTimer.current) clearTimeout(loadingTimer.current);
    setTimeout(() => {
      setLoading(false);
    }, 100);
  }, [teaList, stuList, otherList]);

  const handleChangeScreen = (num) => {
    if (loading) return;
    setLoading(true);
    if (num === 1) {
      //异步销毁播放器时间500ms
      setScreen(1);
      setTimeout(() => {
        setLoading(false);
      }, 500);
    } else {
      let _num = 2;
      if (teaList.length && stuList.length && otherList.length) {
        _num = 3;
      }
      setScreen(_num);
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };
  return (
    <Context.Provider
      value={{
        schedule,
        setSchedule,
        playStatus,
        setPlayStatus,
      }}
    >
      <div className="mzc-hlsScreen" style={{ width, height }}>
        {loading ? (
          <ReactLoading type="spin" color="#30bf99" height={30} width={30} />
        ) : screen === 1 ? (
          <OneScreen
            width={width}
            needSreenShot={needSreenShot}
            height={height}
            list={[...teaList, ...stuList, ...otherList]}
            screenShot={screenShot}
          />
        ) : screen === 2 ? (
          <TwoScreen
            width={width}
            height={height}
            needSreenShot={needSreenShot}
            listOne={teaList.length ? teaList : stuList}
            listTwo={otherList.length ? otherList : stuList}
            screenShot={screenShot}
          />
        ) : (
          <MultiScreen
            width={width}
            height={height}
            listOne={teaList}
            needSreenShot={needSreenShot}
            listTwo={stuList}
            listThree={otherList}
            screenShot={screenShot}
          />
        )}
        <div
          className="mzc-screenChange"
          style={{
            display:
              (teaList.length && stuList.length) ||
              (teaList.length && otherList.length) ||
              (stuList.length && otherList.length)
                ? "flex"
                : "none",
          }}
        >
          <span
            className={screen === 1 ? "active" : ""}
            onClick={() => handleChangeScreen(1)}
          >
            单屏
          </span>
          <span
            className={screen !== 1 ? "active" : ""}
            onClick={() => handleChangeScreen(999)}
          >
            多屏
          </span>
        </div>
      </div>
    </Context.Provider>
  );
}
export { Context };
