参考 https://zhuanlan.zhihu.com/p/340935487
https://juejin.cn/post/6943895171180265485

脚手架可以简单的理解为自动为我们创建项目基础文件的工具，看似很普通的一个需求背后却包含一定的道理，因为除了创建文件更重要的是提供给开发者一些约定和规范。

通常我们在去开发相同类型的项目时，都会有一些相同的约定，其中会有相同的文件组织结构，相同的代码开发范式，相同的模块依赖，设置还有有一些相同的工具配置，最后甚至连一些基础代码的代码在这些项目中都是一样的。

这样一来，我们就会出现搭建新项目时有大量的重复工作要做，脚手架工具就是用来解决这一类问题的。我们可以通过脚手架工具去快速搭建特定类型的项目骨架，然后去基于这个骨架进行后续的开发工作。

如果说你用过一些类似于 eclipse, visual studio 这样大型的 IDE 工具，就会明白，他们创建项目的过程实际上就是一个脚手架的工作流程。

在前端项目创建过程当中，由于前端技术选型比较多样，又没有一个统一的标准，所以前端方向的脚手架一般不会集成在某一个 IDE 当中，都是以一个独立的工具去存在，并且相对会复杂一些，但是本质上，脚手架的目标都是一样的，因为他们都是为了解决我们在创建项目过程当中的一些复杂的工作。

接下来我们对一些常用的脚手架工具做一些全面的介绍，然后再通过对一款通用的脚手架工具进行剖析，最后我们去开发一款自己的脚手架工具。通过这么几个环节，增强大家对于脚手架工具的一个了解和使用

# 常用的脚手架工具

目前市面上有很多成熟的脚手架工具，但大都是为特定项目类型服务的，例如我们在 React 项目中可以使用 create-react-app, 在 vue.js 项目中可以使用 vue-cli, angular 项目中使用 angular-cli。

这些工具他们实现方式都大同小异，无外乎就是根据用户输入的信息创建对应的项目基础结构，最终生成项目的配置，不过他们一般只适用于自身所服务的那个框架项目。

还有一类就是以 Yeoman 这样工具为代表的通用型项目脚手架工具，他们可以根据一套模板，生成一个对应的项目结构。这种类型的脚手架，一般都很灵活而且很容易扩展。

除了以上说的这种创建项目时才会用到的脚手架工具还有一类脚手架也非常有用，代表性的工具叫做 Plop，他们用来在项目开发过程中用于创建一些特定类型的问题，例如我们想在一个组件化的项目中创建一个新的组件或者模块化的项目中创建一个新的模块。

这些模块或者组件一般是由特定的几个文件组成的，并且让这些文件都有一些基本的代码结构，那相对于我们手动一个一个创建的话，脚手架会提供更为便捷，更为稳定的操作方式。

## Yeoman

时值当下，reactjs 和 vuejs 还有 angularjs 大行其道，这些框架的官方都提供了更为集成的脚手架工具链，所以说大家在谈论脚手架时最先想到的都是像 angular-cli 和 vue-cli 这样的工具，对于这一类的工具呢，由于它太过针对于某一个框架，而且在使用上也非常的普及我们就不做过多的介绍，这里我们着重的去探讨 Yeoman 这样一款工具。

因为 Yeoman 作为做老牌，最强大最通用的一款脚手架工具，他有更多值得我们借鉴和学习的地方。

Yeoman 官方的定义说他是一款用于创造现代化 web 应用的脚手架工具，不同于 vue-cli 这样的工具。Yeoman 更像是一个脚手架的运行平台，可以通过 Yeoman 搭配不同的 generator 去创建任何类型的项目。也就是说我们可以通过创建自己的 generator 从而去定制属于我们自己的前端脚手架。

Yeoman 的优点同时也是他的缺点，在很多专注基于框架开发的人眼中，Yeoman 过于通用，不够专注，所以更愿意使用像 Vue-cli 这样一类的脚手架，这也是像 Vue-cli 这一类工具为什么现在变得这么成功。但是这并不妨碍我们去学习 Yeoman, 接下来我们快速的学习 Yeoman 的用法和 genrator 的工作原理，为我们后面去开发自己的脚手架去做出准备。

## Yeoman 基础使用

Yemman 是一款基于 NodeJs 开发的一个工具模块，使用 Yeoman 的第一步是通过 npm 安装，先确保机器已经安装了 Node 环境。

可以使用 yarn 替代 npm，yarn 的体验个人觉得要比 npm 好。yarn 的全局安装是

```js
yarn global add yo
```

yo 就是 yeoman 这款工具模块的名字。

yo 模块安装完成过后我们就可以使用 Yeoman 帮我们创建项目了，但是在之前我们的介绍我们知道，单有 yo 这个模块是不够的，因为 Yeoman 是搭配特定的 gengerator 才能使用，我们要想使用 Yeoman 帮我们创建项目的话，我们必须要找到对应项目类型的 generator。

例如我们想要生成一个 Node Module 项目，也就是 Node 模块，我们可以使用 generator-node 这样一个模块，使用这个 generator 的方式也是先把他通过全局范围安装的方式，安装到我们的本地。

```js
yarn global add generator-node;
```

有了这两款模块安装到本地过后我们就可以使用 yarn 去运行我们刚刚安装的 generator-node 的 gengerator, 也就是生成器自动的去帮我们创建一个全新的 Node Module, 可以先定位到项目所在的目录，也就是我们要执行命令的文件夹。

在这个文件夹下我们可以通过 Yeoman 所一共的命令，yo 加上我们刚刚安装的 generator-node 的生成器。运行特定的 generator 就是把我们刚刚包的名字前面 generator-这样一个前缀去掉，执行。

```js
yo node
```

在这个过程中，Yeoman 会提出一些问题，可以在命令行当中通过交互的方式把他填写进去，首先第一个是问这个模块叫什么名字, 会自动检查包名是否可用。

当我们所有选项都填写完毕之后会在项目中创建一些基础文件，并且帮我们在项目根目录下去运行 npm install，去安装这个项目必要的一些依赖。我们可以打开看到这个项目的目录结构。这些结构都是 yarn 通过这个脚手架帮我们创建的，此时此刻我们也能感受到，yarn 的一个优势。

我们通过编辑器打开目录，在目录中除了基本的文件外内部的一些基础代码基础的配置，都是提前帮我们配置好的，这也是脚手架工具的一个优势。

这里还要强调的一点是，在生成的过程当中，当生成完毕之后有个环节会告诉我们让我们去 travis 这时候命令行会卡死在这里，敲一下回车就可以结束整个脚手架的工作流程了，这样整个脚手架的工作流程就基本结束了。

结束过后刚刚我们已经说过了，脚手架的整个工作流程主要的目的就是让我们得到一个基础的项目结构以及一些基础代码。

总结一下在使用 Yeoman 的时候先需要在全局范围安装 yo

```js
npm install yo -g
yarn global add yo
```

有了这个 yo 工具之后我们要安装特定类型的 generator，因为不同类型的 generator 会帮我们生成不同的项目。

```js
npm install generator-node -g
yarn global generator-node
```

使用的过程当中，运行 yo node 自动去启动我们的安装的生成器，这个生成器运行过程会问一些问题，输入完成过后就可以得到一个想要的项目结构。

```js
yo node
```

## sub generator

有时候我们并不需要创建完整的项目结构，可能只是需要在已有的项目基础之上去创建一些特定类型的文件，例如我们去给一个已经存在的的项目去创建一个 readme，又或是我们在一个原有项目之上添加某些类型的配置文件，比如说 esline, babel 的配置文件，那这些配置文件都有一些基础代码如果自己手动去写的话很容易配错，可以通过生成器自动生成，这样的话会提高效率。

如果需要上面这些需求的话可以使用 Yeoman 所提供的 sub generator 这样一个特性来实现。

具体来看就是我们在项目目录下去运行一个特定的 sub generator 命令去生成对应的文件。我们这里可以使用 generator-node 里面所提供的一个子集的生成器，叫做 cli 的生成器。去帮我们生成一个 cli 应用所需要的一些文件，让我们的模块变成一个 cli 应用，我们可以尝试着去做一下:

```js
yo node:cli
```

运行 sub generator 的方式就是在原有 generator 命令的后面跟上 sub generator 的名字。

会提示我们是否要重写 package.json 文件，原因是我们在添加 cli 支持的时候会添加一些新的模块和配置。选择 yes 即可。

完成过后会提示重写了 package.json 创建了 lib\cli.js

在 package.json 中出现了一个"bin": "lib/cli.js"以及新的 dependencies 这些都是我们在 cli 应用中需要的，除了这些在 cli.js 里面提供了基础的代码结构。有了这些我们就可以将我们的 cli 代码模块作为一个全局的命令行模块去使用了，本地的模块我们可以挺过 yarn link 到全局范围，然后可以通过模块的名字去运行加进来的模块。

```js
yarn link // 映射到全局
yarn // 安装依赖
my-module --help // 运行
```

以上就是 generator 子集的 generator 的一个特性，值得注意的是并不是每一个 generator 都一个子集的生成器，所以我们在使用之前要通过所使用的 generator 的官方文档来明确这个 generator 下面有没有一个子集的生成器，例如我们测试的这个 generator-node 就提供了 sub generator。

## Yeoman 的常规使用

这里我们总结一下使用 Yeoman 一般需要去遵循哪几个步骤，首先需要明确你自己的需求，你到底是要做一个什么样类型的项目，然后根据你的需求去找到合适的 Generator，再然后就是通过全局范围安装你所找到的 Generator，再然后我们就要通过 Yo 这个命令去运行对应的 Generator，最后通过命令行交互的方式去填写这个 Generator 里面对应的一些配置选项，最后就得到了我们所需要的项目结构。

具体来说，例如我们想创建一个网页应用，首先到 Yeoman 官网找到我们想要的 generator, 比如我们找到 webapp 这个 generator。

```js
yarn global add generator-webapp
yo webapp
```

会自动下载 generator 并且安装依赖，在这个过程中可能会安装一些 c++的依赖，这些二进制的依赖而这些依赖并不能被镜像加速，可能会很慢。我们可以配置对应的加速镜像比如淘宝镜像源。

## 自定义 Generator

基于 Yeoman 搭建自己的脚手架

通过上文对 Yeoman 的介绍，我们知道，不同的 generator 可以生成不同的项目，我们可以通过创建自己的 generator 帮我们生成自定义的项目结构。

即便是市面上已经有了很多的 generator 我们还是要创造自己的 generator 的必要，因为市面上的 generator 都是通用的，而实际开发过程当中会出现一部分基础代码甚至业务代码在生成相同业务时，还是会是重复的。

那我们这个时候就可以把公共的部分都放到脚手架当中去生成，让脚手架工具去发挥更大的价值。

例如我们在创建 Vue 项目的时候，官方默认的脚手架工具，只会去创建一个最基础的项目骨架，但是并不包含我们经常要用到的模块，例如 axios，vue-router, weex, 需要每次在创建完项目之后再去手动的引入这些模块，并且去编写一些基础的使用代码。

试想一下如果我们把这些也放到脚手架当中那么就不存在我们刚刚说的这些问题。

## Generator 基本结构

|—— generators 生成器目录 | app/ 默认生成器目录 index.js 默认生成器实现 |—— package.json 模块包配置文件

首先创建一个 generators 文件夹，作为生成器的目录，再在里面存放一个 app 的文件夹，用于去存放我们生成器对应的代码。

如果需要提供多个的 sub generator 可以在 app 的同级目录 再去添加一个新的生成器目录 app2, 那我们的模块就有了一个叫做 app2 的子生成器

### generator-

除了特定的结构，还有个与普通 npm 不同的是，Yeoman 的 generator 的模块的名称必须是 generator-这样的一种格式，如果说你在具体开发的时候没有去使用这样一个格式的名称，Yeoman 在后续工作的时候就没有办法找到你所提供的这个生成器模块。

可以做下具体的演示，首先创建文件夹 generator-simple 作为生成器模块的目录。

```js
mkdir generator-simple
```

在目录下通过 yo init 的方式创建一个 package.json

```js
yo init
```

我们还需要安装一个 yeoman-generator 的模块，这个模块提供了我们生成器的一个基类，这个基类当中提供了一些工具函数，让我们可以在创建生成器的时候更加便捷。

```js
yarn add yeoman-generator
```

安装完工具过后，我们通过编辑器打开目录，然后我们在目录下按照项目结构要求，去创建一个 generators 的文件夹，在这个目录下创建 app 目录，在目录中创建 index.js, 作为 generator 的核心入口文件。

generator-simple -> generators -> app -> index.js

index,js 需要导出一个继承自 Yeoman Generator 的类型 Yeoman Generator 在工作时会自动调用我们在此类型中定义的一些生命周期方法 我们可以在这些方法中可以通过调用父类提供的一些工具方法实现一些功能，例如文件写入。

```js
const Generator = require("yeoman-generator")

module.exports = class extends Generator {
  writing() {
    // Yeoman自动生成文件阶段调用此方法
    // 我们尝试往项目目录中写入文件
    this.fs.write(this.destinationPath("temp.txt"), "123") // 这里的fs模块与node中的fs不同，是高度封装的模块功能更强大一些，
  }
}
```

this.destinationPath: 父类中方法，获取绝对路径 this.fs: 父类中模块

这时，我们一个简单的 generator 就已经完成了，我们通过 npm link 的方式把这个模块连接到全局范围, 使之成为一个全局模块包，这样的话，Yeoman 在工作的时候就可以找到我们自己写的这个 generator-simple 模块

```js
yarn link
```

准备就绪，我们可以通过 Yeoman 去运行这个生成器，具体的操作方式就是 yo simple

```js
yo simple
```

### 根据模板创建文件

很多时候我们需要自动的去创建的文件有很多，而且文件的内容也相对复杂，再这样的一种情况下，我们就可以使用模板去创建文件，因为这样可以更加便捷一些。

我们首先在生成器的目录下添加一个 template 目录，然后将我们需要的生成的文件都放入到 template 目录中作为模板。

模板中是完全遵循 EJS 模板引擎的模板语法。也就是可以通过<%=title%>的方式去动态输出一些数据。也可以去做一些判断循环之类的操作。

有了模板过后我们在生成文件之时就不用再借助于 fs 的 write 方法去写入文件，而是借助于 fs 当中有个专门使用模板引擎的方法，叫做 copytemplate 的方式，具体使用的时候有三个参数，分别是，模板文件的路径，输出文件的路径，模板数据的上下文。

模板文件路径我们可以借助于 this.templatePath('foo.txt')，自动去获取当前 template 目录下的文件路径。

输出路径我们仍旧私用 this.destinationPath('foo.txt');

模板数据上下文只需要定义一个对象就可以了，用于传入 ejs

我们将定义的三个参数传入。这个方法会自动把我们模板文件映射到输出文件上。

```js
const tmpl = this.templatePath("foo.txt")

const output = this.destinationPath("foo.txt")

const context = { title: "yd" }

this.fs.copyTpl(tmpl, output, context)
```

通过 Yeoman 去运行 generator

```js
yo simple
```

相对于手动去创建每一个文件，模板的方式大大提高了效率，特别是文件比较多，比较复杂的情况下。

### 接收用户输入数据

对于模板中的动态数据，例如项目的标题，项目的名称，这样的数据我们一般通过命令行交互的方式去询问我们的使用者，从而得到。

在 generator 中想要发起一个命令行交互询问，可以通过实现 generator 类型当中的 promting 方法。

```js
const Generator = require("yeoman-generator")

module.exports = class extends Generator {
  prompting() {}
}
```

在这个方法当中我们可以调用父类提供的 promit 方法发出对用户的命令行询问。这个方法返回一个 promise 也就是说他是一个 promise 方法，我们在调用的时候对他 return，这样 Yeoman 在调用的时候就有更好的异步流程控制。

这个方法接受一个数组参数，数组的每一项都是一个问题对象，我们可以传入类型 type, name, message 和 default

```js
;[
  {
    type: "input", // 提问类型
    name: "name", // 得到结果的一个键
    message: "message", // 命令行提示的话
    default: this.appname, // appname 为项目生成目录文件夹的名字，会作为问题的默认值
  },
]
```

在 promise 执行过后我们会得到一个返回值，返回值就是问题的一个结果。会以一个对象的形式出现。对象的键就是刚刚输入的 name，值就是用户输入的内容，将这个值挂载在全局，this 中，方便日后使用

```js
const Generator = require("yeoman-generator")
module.exports = class extends Generator {
  prompting() {
    return this.prompt([
      {
        type: "input", // 提问类型
        name: "projectName", // 得到结果的一个键
        message: "message", // 命令行提示的话
        default: this.appname, // appname 为项目生成目录文件夹的名字，会作为问题的默认值
      },
    ]).then((answers) => {
      this.answers = answers
    })
  }
}
```

有了这个 this.answers 我们就可以在 writing 的时候去传入我们的模板引擎，使用这个数据作为模板数据的上下文

```js
const context = this.answers
this.fs.copyTpl(tmpl, output, context)
```

我们再去运行 Yeoman 的时候就会提示问题啦。这就是我们在模板中如何动态接受用户数据的实现方式。

### Vue Generator 案例

定一个带有一定基础代码的 vuejs 项目脚手架。

首先按照原始的方式去创建理想的项目结构，首先按照原始的方式去创建一个理想的项目结构(你意向的项目结构)，把需要使用的基础代码全部包含在里面，然后再去封装一个全新的 generator 用于去生成我们这样一个理想的项目结构。

首先打开命令行窗口，然后通过 mkdir 去创建一个全新的 gengerator 目录。

```js
mkdir generator-vue
cd generator-vue
```

通过 yarn init 初始化一个 package.json, 然后安装 Yeoman 的依赖

```js
yarn init
yarn add yeoman-generator
```

新建一个 generator 的主入口文件，

generators/app/index.js

```js
const Generator = require("yeoman-generator")

module.exports = class extends Generator {
  prompting() {
    return this.promit([
      {
        type: "input",
        name: "name",
        message: "Your project name",
        default: this.appname,
      },
    ]).then((answer) => {
      // 获取到用户输入的数据
      this.answer = answer
    })
  }
  writing() {}
}
```

定义的 writing 方法不再像之前一样写入单个文件，批量的把我们刚刚准备好的那些结构批量生成，所以我们先去创建一个 templates 目录, 把我们项目的结构 copy 到我们的 templates 当中作为模板，有了模板过后需要把项目结构里面一些可能发生变化的地方通过模板引擎的方式去挖坑(文件后缀名不一定非要写成 ejs)

我们只定义了项目名称，所以我们把所有的名称替换掉。

我们把每一个文件通过模板转换，生成到对应的路径，我们通过数组循环的方式批量去生成每一个文件。把对应的模板生成到对应的位置当中。

```js
writing() {
const templates = [
'.browserslistrc',
'src/views/Home.vue'
]
templayes.forEach(item => {
this.copyTpl(this.templatePath(item),
this.destinationPath(item),
this.answer);
})
}
```

将我们的 generator-vue 通过 link 的方式定义到全局

```js
yarn link
```

然后我们在一个全新的目录使用该 generator

```js
yo vue;
```

会提示输入项目名称，输入之后，可能提示找不到某某的文件的错误，可能是数组中定义了该文件，而 template 中不存在。检查修复后，重新运行 yo vue

如果我们希望输出 ejs 模板，而不要被转译，我们可以<% 后面再加上一个%, 这样就会被转译，而不会报出变量不存在的错误。 <%= name %> -> <%%= name %>

### 发布 Generator

因为 Generator 实际上就是第一个 npm 的模块，实际我们发布 generator 就是发布 npm 的模块。我们只需要将自己已经写好的 generator 模块去通过 npm publish 这样一个命令发布成一个公开额模块就可以了。

具体在做之前呢，我们一般会将项目的源代码托管到一个公开的，源代码仓库上面，这里呢我们先去创建一个本地的仓库，通过命令行。

在创建项目之前呢，我们通过 gitignore 去忽略一系列文件。

```js
echo node_modules > .gitignore
```

有了这个文件过后再通过 git init 去初始化一个本地的空仓库。

有了本地空仓库过后我们通过 git status 去看一下本地仓库的状态。可以看到里面存在的文件没有被跟踪，我们可以通过 git add . 当前目录下所有的文件。

我们再去创建一次提交 git commit

创建过提交过后，我们需要有一个远端的仓库，我们把本地的仓库的操作日志，同步到远端。我们在 github 创建一个新的仓库。仓库的名字和描述根据自己喜好填写，得到 github 上面的仓库过后，我们把仓库地址 copy 下来。

我们通过 git remote add origin <复制的地址>，这样就为我们本地的仓库添加了一个远端仓库的别名。

现在我们再 push 的时候就可以使用这个别名，git push -u origin master, 就把本地 master 分支的代码推送到远端 master 分支。

```js
git init
git status
git add .
git commit -m "init"
git remote add origin <复制的地址>
git push -u origin master
```

创建仓库过后，我们就可以在项目的跟目录通过 npm publish 的方式去发布这个模块。yarn publish 和 npm publish 效果是一样的。

```js
yarn punlish
```

发布的时候会提示输入版本号和密码等信息。

如果我们使用了国内镜像源，这里的发布就会出现问题，因为大部分国内的镜像，比如淘宝镜像都是只读镜像，我们要修改本地镜像配置或者发布的时候修改--registry=官方的镜像

```js
yarn publish --registry=https://registry-yarnpkg.com
```

这里我们就将我们的镜像发布到了 npm 和 yarn, 因为 yarn 和 npm 是同步的。

有了这个模块，我们可以通过 npm 去全局安装，然后通过 Yeoman 去使用他。

如果需要这个 generator 在官方仓库列表中也会出现的话，可以为这个项目添加一个 yeoman-generator 的关键词，这个时候，Yeoman 的官方就会发现这个项目。
