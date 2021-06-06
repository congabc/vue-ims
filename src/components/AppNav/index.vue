<template>
  <div>
    <el-col :span="12">
      <el-menu
        default-active="2"
        :router="true"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item index="/home">
          <i class="el-icon-s-home"></i>
          <span slot="title">首 页</span>
        </el-menu-item>
        <el-submenu index="/channel">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>出库渠道</span>
          </template>
          <el-menu-item index="/channel/terminal">
            <i class="el-icon-s-check"></i> 终端客户</el-menu-item
          >
          <el-menu-item index="/channel/wholesale">
            <i class="el-icon-s-check"></i>批发客户</el-menu-item
          >
          <el-menu-item index="/channel/special">
            <i class="el-icon-s-check"></i>特渠客户</el-menu-item
          >
        </el-submenu>
        <el-submenu index="/supplier">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>供应商管理</span>
          </template>
          <el-menu-item index="/supplier/booze">
            <i class="el-icon-s-check"></i>酒水类</el-menu-item
          >
          <el-menu-item index="/supplier/cigarette">
            <i class="el-icon-s-check"></i>香烟类</el-menu-item
          >
          <el-menu-item index="/supplier/drinks">
            <i class="el-icon-s-check"></i>饮料类</el-menu-item
          >
          <el-menu-item index="/supplier/clearwater">
            <i class="el-icon-s-check"></i>纯水类</el-menu-item
          >
          <el-menu-item index="/supplier/snacks">
            <i class="el-icon-s-check"></i>零食类</el-menu-item
          >
          <el-menu-item index="/supplier/milk">
            <i class="el-icon-s-check"></i>奶制品</el-menu-item
          >
        </el-submenu>
        <el-menu-item index="/repertory" v-if="$store.state.iftrue==='admin'">
          <i class="el-icon-s-custom"></i>
          <span slot="title">库 存</span>
        </el-menu-item>
        <el-submenu index="/staff" v-if="$store.state.iftrue==='admin'">
          <template slot="title" >
            <i class="el-icon-location"></i>
            <span>员工管理</span>
          </template>
          <el-menu-item index="/staff/motorman" >
            <i class="el-icon-s-check"></i> 司机</el-menu-item
          >
          <el-menu-item index="/staff/salesman" >
            <i class="el-icon-s-check"></i>业务员</el-menu-item
          >
        </el-submenu>
      </el-menu>
    </el-col>
  </div>
</template>

<script>
 import { PcCookie, Key } from '@/utils/cookie'
export default {
  
  created(){
    console.log(this.$store.state.iftrue)
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>
<style scoped>
i{
  color: #ccc;
}
.el-menu {
  position: absolute;
  top: 50px;
  bottom: 0px;
  width: 200px;
  padding: 0px 10px 0 20px;
  box-sizing: border-box;
}
.el-submenu .el-menu-item {
  min-width: 150px;
  
}
</style>