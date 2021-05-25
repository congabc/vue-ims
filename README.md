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
  有两点需要注意:
1.必须有对应的 ref，且名字一致，表明重置哪个表单。
  2.prop 设置的字段名要和 v-model 绑定的字段名一致，否则重置表单或进行自定义校验规则时不会生效。
  ```
  
  

## 第二天笔记

### 完成布局

1. 完成侧边栏样式

2. 组件路由走通

3. 整体布局完成。

### 完成功能

1. 空白重置，重置，表单显示数据完成

2. 目前完成了联系人搜索功能

## 第三天笔记

从fastmock中获取数据渲染到页面中在data中设置tableDate不能渲染数据到页面换成list就可以了。不知道什么原因

## 第四天笔记

### 实现功能

#### 搜索功能：

  通过店名，联系人，电话，单个或者多个条件本地搜索，所有条件不输入为显示当前分页的所有数据：类似重置功能

#### 新增客户功能： 

通过新增客户会吧当前页面最后一条数据替换成新增的客户

添加查看详细客户资料功能：之后会吧供应商的数据和这里关联，主要显示进货总量的构成

#### 分页功能：

1. 点击页码总条数不会更新
2. 实现展示每页个数的选项展示对应的数据个数

### 遇到的问题

![1621583718369](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1621583718369.png)

通过http://localhost:8081/打开网站也会报错，

重新打开页面报错，因为JS是单线程，意味着只能调用一个栈，当前执行完毕执行下一个。而这个报错是浏览器栈溢出，一般在递归中调用自己。查看报错信息，都是router路由报错。页面用路由跳转的只有一个

![1621584068442](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1621584068442.png)

![1621606852778](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1621606852778.png)

修改redirect: "/home"

注释掉就能正常运行。 问题解决

## 第五天笔记

发现登陆页面不输入账号密码也能登陆成功

正则表达式还不是很熟悉

遇到的问题：

1. 同时使用表单验证和绑定数据，修改表单数据的时候数据没有同步到vue

删除prop之后就能同步了，但是表单验证无效。

解决： 

通过监听表单绑定的值可以发现在表单提交之前双向绑定是生效的。submitData函数下所有数据删除重新写，发现能获取到值，

原来的

![1621736151129](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1621736151129.png)

this.$refs[from].resetFields();问题出在这里表单重置了。 删除就好了。



## 第六天笔记

1. 删除数据表单不刷新：

在CSDN中找到答案，每次更新的时候table插件不刷新，给需要更新的table绑定一个key，每次数据改变的时候刷新插件。每次删除的时候都改变一次key值

https://blog.csdn.net/weixin_47641768/article/details/112987531?utm_medium=distribute.pc_aggpage_search_result.none-task-blog-2~aggregatepage~first_rank_v2~rank_aggregation-1-112987531.pc_agg_rank_aggregation&utm_term=element+ui+%E7%9A%84%E8%A1%A8%E6%A0%BC%E5%88%B7%E6%96%B0%E9%97%AE%E9%A2%98&spm=1000.2123.3001.4430

删除数据更新之后，主表单的数据不更新

2. 通过elementui自带的字表合计无法吧值赋值给父表,无法选择要合计的列需要自定义

show-summary表单合计

:summary-method="getchildrenTotal"定义表单合计逻辑

```
// 合计计算总数函数逻辑
totalCount(sums,values,index){
      sums[index] = values.reduce((prev, curr) => {
        const value = Number(curr);
        if (!isNaN(value)) {
          return prev + curr;
        } else {
          return prev;
        }
      }, 0);
    },
```

单独提取出来方便选择需要合计的列

```
// 计算总数返回结果
    getTotal(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
        sums[index] = '合计';
        return;
        }
        const values = data.map(item => Number(item[column.property]));
        switch (column.property){
          case 'gross':
            this.totalCount(sums,values,index)
          break;
          case 'money':
            this.totalCount(sums,values,index)
          break;
          case 'money1':
            this.totalCount(sums,values,index)
          break;
          case 'money2':
            this.totalCount(sums,values,index)
          break;
          default:
            break
        }
      });
      return sums;
```

### 供应商管理实现功能

1. 点击单条数据显示订单数量

![1621904879013](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1621904879013.png)

样式处理不够，逻辑做完在整体处理样式

2. 添加订单功能

   添加订单会在当前客户数据下的子表单显示，并且重新计算进货总量，应付金额，实付金额是客户输入的。如果输入的价格和计算的价格不符，该条数据会警告，会显示待付金额

![1621905133797](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1621905133797.png)

3. 搜索功能

   支持模糊搜索，点击搜索之后清空搜索条件

4. 删除订单功能

   删除订单之后客户信息中的进货总量和应付金额会实时更新，**待付金额还没调整好**，

5. 待付金额有值变色

   新增的数据会实时计算，如果出现付款不足当前客户信息会警告变色

6. 支持新增客户

   新增客户下订单功能正常