# 皮带管家

这个前端项目使用 CRA 构建，可以阅读 [Create React App](https://github.com/facebook/create-react-app).
以及[craco](https://craco.js.org/).

## 快速开始

```bash
# 安装依赖
$ yarn install
# 运行
$ yarn start
# 构建
$ yarn build
# 检查ts类型规范
$ yarn check:types
# 对全局文件执行prettier
$ yarn format
```

###提交

1. 规范提交代码

```
# 修复bug fix: bug内容
fix: 修复了一个致命的bug
# feature feat: 任务内容
feat: 增加了一个新功能
# 主要type

feat:     增加新功能
fix:      修复bug

# 其他type

docs:     只改动了文档相关的内容
style:    不影响代码含义的改动，例如去掉空格、改变缩进、增删分号
build:    构造工具的或者外部依赖的改动，例如webpack，npm
refactor: 代码重构时使用
revert:   执行git revert打印的message


```
