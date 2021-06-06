<template>
  <div class="login">
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <h1>出入库管理系统</h1>
      <el-form-item label="账 号" prop="username">
        <el-input
          type="text"
          style="width: 250px; margin-left: 10px"
          v-model="ruleForm.username"
          autocomplete="off"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="密 码" prop="password">
        <el-input
          type="password"
          style="width: 250px; margin-left: 10px"
          v-model="ruleForm.password"
          autocomplete="off"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item style="padding-top: 10px">
        <el-button type="primary" @click="submitForm('ruleForm')"
          >提交</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>


<script>
/*
登录逻辑
1 用户输入表单验证
2 验证通过提交表单，后台验证数据，验证通过返回对应的用户信息，刷新令牌，访问令牌，权限
3 返回的3种信息存储到cookie中，每次请求时候会验证访问令牌是否拥有权限，是否过期
4 完成登录进行跳转，动态生成路由
 */
import { login, getUserInfo } from "@/api/login";
export default {
  data() {
    var validateUser = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        // 重复调用会报错："RangeError: Maximum call stack size exceeded"
        // if (this.ruleForm.checkPass !== "") {
        //   this.$refs.ruleForm.validateField("username");
        // }
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (value.length < 6) {
        callback(new Error("密码小于6位数"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        username: "",
        password: "",
      },
      rules: {
        username: [{ validator: validateUser, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }],
      },
    };
  },
  created(){
            const _self = this;
            document.onkeydown = function(e){
                let key = window.event.keyCode;
                if(key === 13){
                    _self.submitForm();
                }
            }
        },
  methods: {
    submitForm(formName) {
      
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$store.dispatch('UserLogin', this.ruleForm).then((response) => {
            const {code ,message} =response
            if(code===200){
              this.$message({
                showClose: true,
                message: message,
                type: 'success'
              });
              this.$router.push("/home");
              
            }
          })
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      console.log(formName);
    },
  },
};
</script>
<style scoped>
h1 {
  text-align: center;
}
.login {
  position: absolute;
  width: 100%;
  height: 100%;
  background: url("../../assets/timg1.jpg") no-repeat;
  background-size: cover;
}
.demo-ruleForm {
  width: 400px;
  height: 300px;
  margin: 200px auto;
  border: 1px solid #fff;
  background-color: #eee;
  border-radius: 5%;
}
</style>