module.exports = function myWebpackLoader(content){
  // console.log('run myWebpackLoader');
  return content.replace('console.log(','alert(');
}