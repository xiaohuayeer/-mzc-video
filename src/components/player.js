import React, { useEffect, useRef, useState, useContext } from "react";
import axios from "axios";
import "xgplayer";
import HlsJsPlayer from "xgplayer-hls.js";
import ReactLoading from "react-loading";
import { Context } from "./index";
import "./player.css";

let hls_one_id = "";
let hls_two_id = "";
let hls_three_id = "";

export default function MPlayer(props) {
  const { url, id, width, height } = props;
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const numRef = useRef(1);
  const iviRef = useRef(null);
  const onlyIdRef = useRef("");

  const store = useContext(Context);

  useEffect(() => {
    onlyIdRef.current = getHlsOnlyId();
    if (id === "hls_one") {
      hls_one_id = onlyIdRef.current;
    } else if (id === "hls_two") {
      hls_two_id = onlyIdRef.current;
    } else {
      hls_three_id = onlyIdRef.current;
    }
    ajax(id, url, onlyIdRef.current);
    return () => {
      if (iviRef.current) {
        iviRef.current.src = id + "destroy_hls_url";
        setTimeout(() => {
          iviRef.current.destroy && iviRef.current.destroy(true);
          iviRef.current = null;
        }, 50);
      }
      console.log("销毁");
    };
  }, []);

  /**
   * @desc 主屏控制三屏
   * @param {Boolean} store.playStatus
   */
  useEffect(() => {
    if (store.playStatus) {
      iviRef.current && iviRef.current.play();
    } else {
      iviRef.current && iviRef.current.pause();
    }
  }, [store.playStatus]);

  // 播放器实例化
  const load = (id, src) => {
    let ivi = null;
    ivi = new HlsJsPlayer({
      id,
      url: src,
      volume: id === "hls_one" ? 0.5 : 0,
      controls: id === "hls_one" ? true : false,
      // error: true,
      autoplay: true,
      playsinline: true,
      // width: _w + "px",
      // height: _h + "px",
      width: "100%",
      height: "100%",
      lang: "zh-cn",
      hlsOpts: {
        //  xhrSetup: function(xhr, url) {
        //    xhr.withCredentials = true;
        //  }
        manifestLoadingTimeOut: 30000,
      }, //hls.js可选配置项
    });
    // 监听播放报错
    ivi.on("error", function (error) {
      console.log("error", src);
    });
    ivi.on("play", function (play) {
      if (id === "hls_one") {
        store.setPlayStatus(true);
      }
    });
    // ivi.on("playing", function (playing) {
    //   console.log("playing", src);
    // });
    ivi.on("pause", function (pause) {
      if (id === "hls_one") {
        store.setPlayStatus(false);
      }
    });
    // ivi.on("ended", function (ended) {
    //   console.log("ended", src);
    // });
    // ivi.on("seeking", function (seeking) {
    //   console.log("seeking", src);
    // });
    // ivi.on("seeked", function (seeked) {
    //   console.log("seeked", src);
    // });
    // ivi.on("timeupdate", function (timeupdate) {
    //   console.log("timeupdate", src);
    // });
    // ivi.on("waiting", function (waiting) {
    //   console.log("waiting", src);
    // });
    // ivi.on("canplaythrough", function (canplaythrough) {
    //   console.log("canplaythrough", src);
    // });
    // ivi.on("durationchange", function (durationchange) {
    //   console.log("durationchange", src);
    // });
    // ivi.on("volumechange", function (volumechange) {
    //   console.log("volumechange", src);
    // });
    // ivi.on("bufferedChange", function (bufferedChange) {
    //   console.log("bufferedChange", src);
    // });
    // ivi.on("definitionChange", function (definitionChange) {
    //   console.log("definitionChange", src);
    // });
    // ivi.on("playbackrateChange", function (playbackrateChange) {
    //   console.log("playbackrateChange", src);
    // });
    // ivi.on("requestFullscreen", function (requestFullscreen) {
    //   console.log("requestFullscreen", src);
    // });
    // ivi.on("exitFullscreen", function (exitFullscreen) {
    //   console.log("exitFullscreen", src);
    // });
    // ivi.on("controlShow", function (controlShow) {
    //   console.log("controlShow", src);
    // });
    // ivi.on("controlHide", function (controlHide) {
    //   console.log("controlHide", src);
    // });

    // 监听正常播放
    ivi.on("canplay", function (e) {
      ivi && ivi.play();
    });

    // 流不稳定情况下，触发播放
    setTimeout(() => {
      ivi && ivi.play();
    }, 1000);
    iviRef.current = ivi;
  };
  const ajax = async (id, src, hls_url_id) => {
    setLoading(true);
    if (src.indexOf("mp4&") > -1) {
      load(id, src);
      setLoading(false);
    } else {
      try {
        const res = await axios.get(src);
        if (
          (id === "hls_one" && hls_url_id === hls_one_id) ||
          (id === "hls_two" && hls_url_id === hls_two_id) ||
          (id === "hls_three" && hls_url_id === hls_three_id)
        ) {
          if (res.status === 200) {
            load(id, src);
          } else {
            setError(true);
          }
          setLoading(false);
        }
      } catch (err) {
        if (
          (id === "hls_one" && hls_url_id === hls_one_id) ||
          (id === "hls_two" && hls_url_id === hls_two_id) ||
          (id === "hls_three" && hls_url_id === hls_three_id)
        ) {
          numRef.current = numRef.current + 1;
          if (numRef.current > 5) {
            setError(true);
            setLoading(false);
          } else {
            ajax(id, src, hls_url_id);
          }
        }
      }
    }
  };
  const reloadVideo = () => {
    onlyIdRef.current = getHlsOnlyId();
    if (id === "hls_one") {
      hls_one_id = onlyIdRef.current;
    } else if (id === "hls_two") {
      hls_two_id = onlyIdRef.current;
    } else {
      hls_three_id = onlyIdRef.current;
    }
    numRef.current = 1;
    setError(false);
    ajax(id, url, onlyIdRef.current);
  };
  return (
    <div className="mzc-hlsVideo" style={{ width, height }}>
      <div className="mzc-hlsErr" style={{ display: error ? "flex" : "none" }}>
        加载失败，请<a onClick={reloadVideo}>点击</a>重试
      </div>
      <div className="mzc-hlsHasSrc" style={{ display: url ? "none" : "flex" }}>
        抱歉，暂无视频！
      </div>
      <div
        className="mzc-hlsLoading"
        style={{ display: loading ? "flex" : "none" }}
      >
        <ReactLoading type="spin" color="#30bf99" height={30} width={30} />
      </div>
      <div id={id} />
    </div>
  );
}

const getHlsOnlyId = () => {
  return "" + new Date().getTime() + Math.random() * 10000;
};
