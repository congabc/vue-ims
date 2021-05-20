<template>
  <div>
    <app-header></app-header>
    <app-nav></app-nav>
    <app-main></app-main>
  </div>
</template>

<script>
import AppNav from './AppNav'
import AppHeader from './AppHeader'
import AppMain from './AppMain'
export default {
  components: {AppNav, AppHeader,AppMain},
}
</script>

<style scoped>
.header {
    position: absolute;
    line-height: 50px;
    top: 0px;
    left: 0px;
    right: 0px;
    background-color: #2d3a4b
}

.main {
    position: absolute;
    top: 50px;
    left: 200px;
    right: 0px;
    bottom: 0px;
    padding: 10px;
    overflow-y: auto;
    /* background-color: red; */
}
</style>