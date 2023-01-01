const Generator = require("yeoman-generator")

module.exports = class extends Generator {
  writing() {
    // Yeoman自动生成文件阶段调用此方法
    // 我们尝试往项目目录中写入文件
    this.fs.write(this.destinationPath("temp.txt"), "123") // 这里的fs模块与node中的fs不同，是高度封装的模块功能更强大一些，
  }
}
