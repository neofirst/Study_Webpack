참고 자료
- https://www.edc4it.com/en/blog/webpack-tutorial.html
npx webpack, npm run build
- webpack 실행
- build는 package 스크립트 내부에 설정 후 실행.

css loader
- npm i css-loader

style loader
- css를 모듈로 사용하려면 설치
- npm i style-loader

sass loader
- npm i sass-loader node-sass
  node-sass는 sass를 css로 변경

웹팩은 빌드 시 마다 고유값 생성한다.
캐시 무력화하며 성능상 처리한다. (ex. hash)

file-loader
- 파일을 모듈로 처리.

url-loader
페이지 내에서 여러개의 작은 이미지 사용 시 성능을 고려해야한다.
- data url 사용.
- npm i url-loader
- limit 범위 밖일 경우 file-loader가 동작한다.

https://jeonghwan-kim.github.io/series/2019/12/22/frontend-dev-env-babel.html

웹팩 
- https://webpack.js.org/contribute/writing-a-plugin/
- 여러개의 파일을 하나로 묶어주며 이를 번들이라고 한다. 벌들러라고 부른다.
- node_modules/.bin/webpack --mode development --entry ./src/app.js --output dis/main.js

엔트리/아웃풋
npm i webpack webpack-cli -D

Banner Plugin
- 기록용

Define Plugin
- 환경 정보 제공

HtmlTemplate Plugin
- HTML 파일을 후처리하는 용도.
- npm i -D html-webpack-plugin

CleanWebpackPlugin
- 빌드 이전 결과물 제거
- npm i clean-webpack-plugin

MiniCssExtract Plugin
- CSS를 CSS별로 파일로 뽑아내는 용도.
  큰 파일 하나보단 여러개의 파일로 분할.
  페이지 로딩과 연관.
- loader 설정 추가.  
- npm i -D mini-css-extract-plugin

- npx webpack --mode=development or npx webpack --mode=production

Development Mode
- npm i webpack-dev-server -D

Babel
- cross browsing 처리.
  es6, typesript, jsx 포함.
  ex 경우 es6 미적용.
- npm i -D @babel/core @babel/cli
  npx babel app.js
- Parsing(토큰 단위 분해)->Transforming(변환)->Printing(출력)
- 플러그인->변환 작업을 담당하며 바벨은 파싱과 출력만 담당한다.
  npx babel app.js --plugins ./my-babel-plugin.js
- npm i -D @babel/plugin-transform-block-scoping
  npx babel app.js --plugins @babel/plugin-transform-block-scoping
- npm install -D @babel/plugin-transform-arrow-functions
  npx babel app.js --plugins @babel/plugin-transform-arrow-functions
- npm install --save-dev @babel/plugin-transform-strict-mode
  babel.config.js
  npx babel app.js

preset
- belbel은 목적에 따라 몇 가지 preset을 제공한다.
  preset-env - 바벨 7 이전 버전은 각 es문법 따라 각각있었지만 통합.
  preset-flow
  preset-react
  preset-typescript
  
explore env preset
- npm install -D @babel/preset-env
  npm i -D babel-loader

ie await/async 사용
- npm regenerator-runtime

ES-Lint
- https://eslint.org/docs/rules/
- formating, code quality
- npm i eslint
  npx eslint --init
  npx eslint app.js
- typescript
  @typescript-eslint/parser

Prettier
- npm i -D prettier
  npx prettier app.js

ES-Lint, Prettier Merge
- npm i -D eslint-config-prettier
- npm i -D eslint-plugin-prettier

husky
- npm i -D husky
- npm i -D lint-staged
  commit 대상만 확인

webpack develope server
- npm i -D webpack-dev-server

API
- npm i axios
Mocks Api
- npm i -D connect-api-mocker

최적화

최적화 위한 Plugin
- development
  NamedChunksPlugin
  NamedModulesPlugin
- production
  FlagDependencyUsagePlugin
  FlagIncludedChunksPlugin
  ModuleConcatenationPlugin
  NoEmitOnErrorsPlugin
  OccurrenceOrderPlugin
  SideEffectsFlagPlugin
  TerserPlugin  

optimazation 최적화 
- CSS 최적화
- npm i -D optimize-css-assets-webpack-plugin

TerserWebpackPlugin 최적화
- js 난독화 및 debugger 구문 제거, 콘솔 로그 제거
- npm i -D terser-webpack-plugin

Code Splitting 최적화
- Chunk

Externals
- Build Process 제외
  Ex) Axios
- npm i -D copy-webpack-plugin