class MyWebpackPlugin {
  
  // Ver 4.x
  // apply(compiler) {
  //       compiler.hooks.done.tap("My Plugin", stats => {
  //     console.log("MyPlugin: done")
  //   })
  //   // compiler.plugin() 함수로 후처리한다
  //   compiler.plugin("emit", (compilation, callback) => {
  //     const source = compilation.assets["main.js"].source()
  //     console.log(source)
  //     callback()
  //   })
  // }

  // Ver 5.x
   apply(compiler) {
    compiler.hooks.emit.tapAsync(
      'MyWebpackPlugin',
      (compilation, callback) => {
        const source = compilation.assets["main.js"].source()
        // console.log(source)
        callback();
      }
    );
  }
}

module.exports = MyWebpackPlugin