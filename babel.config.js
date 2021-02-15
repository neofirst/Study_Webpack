// module.exports = {
//   presets: ["./mypreset.js"],
// }

module.exports = {
  "presets": [
    [
      "@babel/preset-env", { 
      "targets": {
        chrome:'88',
        ie:'11'
        },
        "useBuiltIns":"usage",//'entry', false
        "corejs":{
          version:3
        }
      }
    ]
  ]
}