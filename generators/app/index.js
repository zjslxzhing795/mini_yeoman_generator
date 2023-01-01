const Generator = require("yeoman-generator")

module.exports = class extends Generator {
  prompting() {
    // Yeoman 在询问用户环节会自动调用此方法
    // 在此方法中可以调用父类的prompt()方法发出对用户的命令行询问
    return this.prompt([
      {
        type: "input",
        name: "title",
        message: "Your project title",
        default: this.appname, // appname 为项目生成目录名称
      },
      {
        type: "input",
        name: "success",
        message: "Your project status",
        default: true,
      },
    ]).then((answers) => {
      // answers => {name: 'user input value'}
      console.log("answers=", answers)
      this.answer = answers
    })
  }
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
    const context = this.answer
    // {
    //   title: "Hello, zz",
    //   success: true,
    // }
    this.fs.copyTpl(tmpl, output, context)
  }
}
