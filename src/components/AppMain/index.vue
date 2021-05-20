<template>
  <div class="main">
    <el-breadcrumb  separator="/">
      <el-breadcrumb-item class="link" :to="{ path: $route.pach }">{{$route.meta.title}}</el-breadcrumb-item>
    </el-breadcrumb>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },

  components: {},

  methods: {},
};
</script>

<style scoped>
.el-breadcrumb{
  height: 10px;
      padding: 20px;
      border-radius: 4px;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      margin-bottom: 10px;
}
.link {
  border-left: springgreen 3px solid;
  padding-left: 10px;
}
</style>