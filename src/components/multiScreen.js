import React from "react";
import OneScreen from "./oneScreen";

export default function MultiScreen(props) {
  const { width, height, listOne, listTwo, listThree } = props;
  const { screenShot } = props;
  return (
    <div style={{ display: "flex", width, height }}>
      <OneScreen
        width={(width / 5) * 3}
        height={height}
        id="hls_one"
        list={listOne}
        screenShot={screenShot}
      />
      <div style={{ width: (width / 5) * 2, height }}>
        <OneScreen
          width={(width / 5) * 2}
          height={height / 2}
          id="hls_two"
          list={listTwo}
          screenShot={screenShot}
        />
        <OneScreen
          width={(width / 5) * 2}
          height={height / 2}
          id="hls_three"
          list={listThree}
          screenShot={screenShot}
        />
      </div>
    </div>
  );
}
