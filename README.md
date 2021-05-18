# vue-ims

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## 第一天笔记

使用fastmock中需要获取响应式数据：

+ 声明函数，通过_req来获取传入的值

+ post请求通过_req.body来获取传入的值

  比如传入的值是{"name":"123"}

  获取: _req.body.name

  在通过一定的逻辑处理return需要的值。

+ get请求通过_req.query来获取传入的值

  ..?id=1,目前发现只能获取?号后面的值

login:

+ 通过elementui中Form表单进行登录页面布局。

+ 给表单添加了自定义验证规则防止没输入数据提交给后台，浪费资源。
+ 使用fastmock给账号分成三级，方便后期做权限分类。超级管理，管理，和员工。
  + 超级管理所有权限
  + 管理无员工权限
  + 员工无删除权限，员工权限

+ 通过返回的token值来区分权限。
+ 通过localStorage.setItem保存用户数据和token值。
+ 设置路由跳转效验，防止直接通过url访问内部数据
+ 通过token值来获取用户数据，获取不到不能跳转。

修改密码: 

+ elementui中通过:visible.sync来设置模块的显示或隐藏

+ 双向绑定表单，ref 绑定控件，$refs 获取控件，:rules="rules"效验规则

+ 在data中return rules 来创建规则，可以使用函数规则

  ```
  规则
   data(){
   const validateOldPass = (rule, value, callback) => {....逻辑}
   	return {
   		rules: {
         		oldPass: [
         			{ validator: validateOldPass, trigger: "blur" },
         		]
         	}
   	}
   }
  ```

  

+ 重置表单

  ```
  this.$refs["form"].resetFields();
  ```

  