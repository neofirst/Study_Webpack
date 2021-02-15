const path = require('path');
const MyWebpackPlugin = require('./my-webpack-plugin')
const webpack = require('webpack');
const childProcess = require('child_process')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const mode =  'development';

module.exports = {
  mode,
    entry: "./src/app.js", // bundle's entry point
    output: {
        path: path.resolve(__dirname, 'dist'), // output directory
        filename: "[name].js" // name of the generated bundle
    },
    module:{
      rules:[
        {
          //file pattern, js 파일 모두 로더로 적용
          test:/\.js$/,
          use:[
            path.resolve('./my-webpack-loader.js')
          ]
        },
        {
          //file pattern, js 파일 모두 로더로 적용
          test:/\.css$/, 
          //맨 뒤에서 부터 실행이 된다.
          use:[
            //맨 뒤에서 부터 실행이 된다.
            //5.x 버전 부터는 loader, options 처리를 해줘야 한다.
            mode === 'production' ?
            {
              loader: MiniCssExtractPlugin.loader,
              options:{
                publicPath:''
              }              
            }  : 'style-loader',
            'css-loader',
            //모든 자바 스크립트 파일에서 js 적용 npm i 
            path.resolve('./my-webpack-loader.js')
          ],
        },
        {
          test:/\.(png|jpg)$/, 
          loader:'url-loader',
          options:{
            // publicPath: './dist/',
            name:'[name].[ext]?[hash]',
            limit:20000,//20kb 미만의 경우 url-loader 이용하고 그 이상은 file-loader 처리
          }
        },
        {
          test:/\.js$/,
          exclude:/node_modules/,
          loader:'babel-loader'
        }
      ]
    },
    plugins:[
      new MyWebpackPlugin(),
      new webpack.BannerPlugin({
        banner:`banner test ${new Date().toLocaleDateString()} 
        `
        // Commit Version: ${childProcess.execSync('git rev-parse --short HEAD')}
        // Commit User: ${childProcess.execSync('git config user.nmae')}
      }),
      new webpack.DefinePlugin({
        TWO:'1+1',
        'api.domain':JSON.stringify('http://google.com')
      }),
      new HtmlWebpackPlugin({
        template: './src/index.html',
        templateParameters:{
          env:mode === 'development' ? '개발' : ''
        },
        minify: mode === 'production' ? {
          collapseWhitespace:true,
          removeComments:true
        } : false
      }),
      new CleanWebpackPlugin(),
      ...(
        mode === 'production' 
      ? [new MiniCssExtractPlugin({filename:'[name].css'})]
      : []
      )
    ]
};