/*
 * @Author: mzc
 * @Date: 2021-09-22 16:01:40
 * @Last Modified by: mzc
 * @Last Modified time: 2021-09-24 10:57:45
 */
/**
 * @desc 单屏组件
 * @param {Object[]} list 场景列表 { name: '场景名称', id: 'id值', url: '视频地址' }
 * @param {Number} width 宽度
 * @param {Number} height 高度
 */
import React, { useEffect, useRef, useState, useContext } from "react";
import Player from "./player";
import WjPng from "./i/jp.png";
import ReactLoading from "react-loading";
import { Select } from "antd";
import "./screen.css";
import "antd/dist/antd.css";
import { Context } from "./index";

export default function OneScreen(props) {
  const { list, width, height, id, needSreenShot } = props;
  const { screenShot } = props;
  const [display, setDisplay] = useState(false);
  const [loading, setLoading] = useState(true);
  const [screenId, setScreenId] = useState("");
  const [url, setUrl] = useState("");
  const moveRef = useRef(null);
  const store = useContext(Context);
  let _id = id ? id : "hls_one";
  useEffect(() => {
    if (list.length) {
      setScreenId(list[0].id);
      setUrl(list[0].url);
    } else {
      setUrl("");
    }
    setLoading(false);
  }, []);
  const handleMove = () => {
    if (moveRef.current) clearTimeout(moveRef.current);
    setDisplay(true);
    moveRef.current = setTimeout(() => {
      setDisplay(false);
    }, 3000);
  };
  const handleLeave = () => setDisplay(false);
  const onChange = (value) => {
    setLoading(true);
    setScreenId(value);
    setUrl(list.find((item) => item.id === value).url);
    setTimeout(() => {
      setLoading(false);
    }, 100);
    if (id === "hls_one") {
      store.setSchedule(0);
    }
  };
  const handleScreenShot = () => {
    const video = document.querySelector(`#${_id} video`);
    var canvas = document.createElement("canvas");
    canvas.width = 1920;
    canvas.height = 1080;
    canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
    const base64 = canvas.toDataURL();
    screenShot && screenShot(base64);
  };
  return (
    <div
      className="mzc-hlsOneScreen"
      style={{ width, height }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <div
        className="mzc-hlsMask"
        style={{ display: display ? "block" : "none" }}
      >
        <div className="mzc-selectList">
          <Select
            value={screenId}
            className="mzc-hls-select"
            onChange={onChange}
            style={{
              width: 110,
              backgroundColor: "transparent",
              fontSize: 14,
            }}
            suffixIcon={<span> </span>}
            getPopupContainer={(trigerNode) => trigerNode.parentNode}
            dropdownStyle={{ backgroundColor: "#fff" }}
          >
            {list.map((item) => {
              return (
                <Select.Option key={item.id} value={item.id}>
                  {item.name}
                </Select.Option>
              );
            })}
          </Select>
        </div>
        <div
          className="mzc-screenShot"
          onClick={handleScreenShot}
          style={{ display: needSreenShot ? "flex" : "none" }}
        >
          <span>截图标记</span>
          <img src={WjPng} alt="" />
        </div>
      </div>
      {loading ? (
        <div className="mzc-screenLoading">
          <ReactLoading type="spin" color="#30bf99" height={30} width={30} />
        </div>
      ) : (
        <Player width={width} height={height} id={_id} url={url} />
      )}
    </div>
  );
}
