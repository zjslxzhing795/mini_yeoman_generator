const Generator = require("yeoman-generator")

module.exports = class extends Generator {
  writing() {
    // Yeoman自动生成文件阶段调用此方法
    // 我们尝试往项目目录中写入文件
    // this.fs.write(this.destinationPath("temp.txt"), "123") // 这里的fs模块与node中的fs不同，是高度封装的模块功能更强大一些，
    // 通过模版方式写入文件到目标目录
    // 模版文件路径 (自动寻找到当前路径下的templates文件下下的路径)
    const tmpl = this.templatePath("foo.txt")
    // 输出目标路径
    const output = this.destinationPath("foofoofoo.txt")
    // 模版数据上下文
    const context = {
      title: "Hello, zz",
      success: true,
    }
    this.fs.copyTpl(tmpl, output, context)
  }
}
