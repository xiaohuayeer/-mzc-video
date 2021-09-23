import React from "react";
import OneScreen from "./oneScreen";

export default function TwoScreen(props) {
  const { listOne, listTwo, width, height } = props;
  const { screenShot } = props;
  return (
    <div className="mzc-twoScreen" style={{ width, height, display: "flex" }}>
      <OneScreen
        width={width / 2}
        height={height}
        id="hls_one"
        list={listOne}
        screenShot={screenShot}
      />
      <OneScreen
        width={width / 2}
        height={height}
        id="hls_two"
        list={listTwo}
        screenShot={screenShot}
      />
    </div>
  );
}
