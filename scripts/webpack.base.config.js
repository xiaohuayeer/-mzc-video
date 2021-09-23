const webpackConfigBase = {
  //module此处为loader区域，一般文件内容解析，处理放在此处，如babel，less,postcss转换等
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react"],
          },
        },
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 1000 * 1024 * 2, //unit:byte,under this value to transform to base64 code.
              // name: "./static/media/pic/[name].[hash:8].[ext]",
              name: "[name].[hash:8].[ext]",
            },
          },
        ],
        // include: resolve(__dirname, "..", "src"),
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: (loader) => [require("autoprefixer")()],
            },
          },
        ],
      },
    ],
  },
};
module.exports = webpackConfigBase;
