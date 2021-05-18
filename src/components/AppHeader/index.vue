<template>
  <div class="line">
    <el-menu
      class="el-menu-demo"
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="red"
    >
      <span>
          <img class="logo" src="@/assets/tubiao.png" width="25px" />
          <span class="text">出入库管理系统</span>
      </span>
      

      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          {{ user.name }}<i class="el-icon-caret-bottom el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="el-icon-edit" command="a"
            >修改密码</el-dropdown-item
          >
          <el-dropdown-item icon="el-icon-s-fold" command="b"
            >退出系统</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
    </el-menu>
    <!-- 修改密码 -->
    <el-dialog title="修改密码" :visible.sync="dialogFormVisible" width="500px">
      <el-form
        :model="form"
        status-icon
        ref="form"
        :rules="rules"
        label-width="100px"
        style="width: 400px"
      >
        <el-form-item
          label="原密码"
          :label-width="formLabelWidth"
          prop="oldPass"
        >
          <el-input
            type="password"
            v-model="form.oldPass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="新密码"
          :label-width="formLabelWidth"
          prop="newPassword"
        >
          <el-input
            v-model="form.newPassword"
            autocomplete="off"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="确认密码"
          :label-width="formLabelWidth"
          prop="affirmPassword"
        >
          <el-input
            v-model="form.affirmPassword"
            autocomplete="off"
            type="password"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('form')">确 定</el-button>
        <el-button @click="resetForm('form')">重 置</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { checkPwd, updatePwd } from "../../api/password";
import { logout } from "@/api/login";
export default {
  data() {
    const validateOldPass = (rule, value, callback) => {
      checkPwd(this.user.id, value).then((response) => {
        const resp = response.data;
        if (resp.flag) {
          // 验证通过
          callback();
        } else {
          callback(new Error(resp.message));
        }
      });
    };
    const validateaffirmPass = (rule, value, callback) => {
      if (this.form.newPassword === value) {
        callback();
      } else {
        callback(new Error("两次输入的密码不一致"));
      }
    };
    const validateNewPassword = (rule, value, callback) => {
      if (this.form.oldPass !== value) {
        callback();
      } else {
        callback(new Error("不能和原密码一致"));
      }
    };
    return {
      user: localStorage.getItem("vue-ims-user"),
      token: localStorage.getItem("vue-ims-token"),
      activeIndex: "1",
      activeIndex2: "1",
      dialogFormVisible: false,
      formLabelWidth: "120px",
      form: {
        oldPass: "",
        newPassword: "",
        affirmPassword: "",
      },
      rules: {
        oldPass: [
          { required: true, message: "请输入原密码", trigger: "blur" },
          { validator: validateOldPass, trigger: "blur" },
        ],
        newPassword: [
          { validator: validateNewPassword, trigger: "blur" },
          { required: true, message: "密码不能为空", trigger: "blur" },
        ],
        affirmPassword: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { validator: validateaffirmPass, trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.user = JSON.parse(this.user);
  },
  methods: {
    handleCommand(command) {
      switch (command) {
        case "a":
          this.handlePwd();
          break;
        case "b":
          this.handleLogout();
          break;
      }
    },
    // 打开修改密码编辑框
    handlePwd() {
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["form"].resetFields();
      });
    },
    //修改密码提交数据
    submitForm(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          updatePwd(this.user.id, this.form.newPassword).then((response) => {
            this.$message({
              message: response.data.message,
              //    type: resp.falg ? 'succcess': 'warning'
              type: response.data.flag ? "succcess" : "warning",
            });
            if (response.data.flag) {
              this.handleLogout();
              this.dialogFormVisible = false;
            }
          });
        }
      });
    },
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleLogout() {
      logout(this.token).then((response) => {
        const resp = response.data;
        if (resp.flag) {
          localStorage.removeItem("vue-ims-user"),
            localStorage.removeItem("vue-ims-token");
          this.$router.push("/login");
        }
      });
    },
  },
};
</script>

<style scoped>
.logo{
  vertical-align: middle;
    padding: 0px 10px 0 40px;
}
.text{
  color: #fff;
  height: 62px;
  line-height: 62px;
}
.el-dropdown-link {
  cursor: pointer;
  color: #fff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.el-menu-item i {
font-size: 16px;
color: #fff;
}
.el-menu-item span img {
display: inline-block;
padding-right: 10px;
}
.el-dropdown {
  float: right;
  height: 61px;
  line-height: 61px;
  margin-right: 40px;
}
</style>
