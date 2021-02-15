const path = require("path");
const MyWebpackPlugin = require("./my-webpack-plugin");
const webpack = require("webpack");
const childProcess = require("child_process");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const apiMocker = require('connect-api-mocker');
const OptimizeCSSAssertsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin")
const CopyPlugin = require("copy-webpack-plugin")

const mode = process.env.NODE_ENV || "development";

module.exports = {
  mode,
  entry: {// bundle's entry point
    main: "./src/app.js", 
    math: "./src/math.js", 
  },
  output: {
    path: path.resolve(__dirname, "dist"), // output directory
    filename: "[name].js", // name of the generated bundle
  },
  devServer:{
    overlay: true,
    stats: "errors-only",
    historyApiFallback: true,
    before:app=>{
        app.use(apiMocker("/api","mocks/api"));      
    },
    hot:true,
    // proxy:{
    //   "/api" : "http:localhost:8081"
    // },
  },
  optimization:{
    minimizer:mode==="production" ? [
      new OptimizeCSSAssertsPlugin(),
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true, // 콘솔 로그를 제거.
          },
        },
      }),
    ] : [],
    splitChunks:{//중복 코드 제거
      chunks:"all"
    }
  },
  externals: {
    axios: "axios",
  },
  module: {
    rules: [
      {
        // file pattern, js 파일 모두 로더로 적용
        test: /\.js$/,
        use: [path.resolve("./my-webpack-loader.js")],
      },
      {
        //file pattern, js 파일 모두 로더로 적용
        test: /\.(css|scss)$/,
        //맨 뒤에서 부터 실행이 된다.
        use: [
          //맨 뒤에서 부터 실행이 된다.
          //5.x 버전 부터는 loader, options 처리를 해줘야 한다.
          mode === "production"
            ? {
                loader: MiniCssExtractPlugin.loader,
                options: {
                  publicPath: "",
                },
              }
            : "style-loader",
          "css-loader",
          "sass-loader",
          // 모든 자바 스크립트 파일에서 js 적용 npm i
          path.resolve("./my-webpack-loader.js"),
        ],
      },
      {
        test: /\.(png|jpg)$/,
        loader: "url-loader",
        options: {
          // publicPath: './dist/',
          name: "[name].[ext]?[hash]",
          limit: 20000, //20kb 미만의 경우 url-loader 이용하고 그 이상은 file-loader 처리
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/, //babel loader가 처리하지 않도록.
        // loader:'babel-loader'
        use: ["babel-loader"], //loader와 둘다 사용 가능
      },
    ],
  },
  plugins: [
    new MyWebpackPlugin(),
    new webpack.BannerPlugin({
      banner: `banner test ${new Date().toLocaleDateString()}`,
      // Commit Version: ${childProcess.execSync('git rev-parse --short HEAD')}
      // Commit User: ${childProcess.execSync('git config user.nmae')}
    }),
    new webpack.DefinePlugin({
      TWO: "1+1",
      "api.domain": JSON.stringify("http://google.com"),
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      templateParameters: {
        env: mode === "development" ? "개발" : "",
      },
      minify:
        mode === "production"
          ? {
              collapseWhitespace: true,
              removeComments: true,
            }
          : false,
    }),
    new CleanWebpackPlugin(),
    ...(mode === "production"
      ? [new MiniCssExtractPlugin({ filename: "[name].css" })]
      : []),
    new CopyPlugin({
      patterns: [
        { from: "./node_modules/axios/dist/axios.min.js", to: "./axios.min.js" },
      ],
    }),
  ],
};
