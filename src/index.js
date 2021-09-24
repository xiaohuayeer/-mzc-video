import React, { useMemo, useState, createContext } from "react";
import ReactDOM from "react-dom";
import Index from "./components/index";

const App = (props) => {
  const { width, height, stuList, teaList, otherList, needSreenShot } = props;
  const { screenShot } = props;
  const content = useMemo(() => {
    return (
      <Index
        width={width}
        needSreenShot={needSreenShot}
        height={height}
        teaList={teaList}
        stuList={stuList}
        otherList={otherList}
        screenShot={screenShot}
      />
    );
  }, [teaList, stuList, otherList, width, height]);

  return <div style={{ width, height }}>{content}</div>;
};

//要实现局部热更新，必须要添加此句
if (module.hot) {
  module.hot.accept();
}

ReactDOM.render(<App />, document.getElementById("root"));
