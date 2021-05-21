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
import { login, getUserInfo } from "@/api/login";
export default {
  data() {
    var validateUser = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("username");
        }
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
        user: [{ validator: validateUser, trigger: "blur" }],
        checkPass: [{ validator: validatePass, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      
      this.$refs[formName].validate((valid) => {
        if (valid) {
          
          login(this.ruleForm.username, this.ruleForm.password).then(
            (response) => {
              const resp = response.data;
              const token = resp.data.token;
              console.log(token);
              if (resp.flag) {
                getUserInfo(token).then((response) => {
                  let respUser = response.data;
                  
                  if (respUser.flag) {
                    localStorage.setItem(
                      "vue-ims-user",
                      JSON.stringify(respUser.data)
                    );
                    localStorage.setItem("vue-ims-token", token);
                    this.$router.push("/home");
                  } else {
                    this.$message({
                      message: respUser.message,
                      type: "warning",
                    });
                  }
                });
              } else {
                this.$message({
                  message: respUser.message,
                  type: "warning",
                });
              }
            }
          );
        } else {
          console.log("验证失败");
          return false;
        }
      });
    },
    resetForm(formName) {
      // this.$refs[formName].resetFields();
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