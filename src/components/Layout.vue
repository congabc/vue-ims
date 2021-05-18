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
</style>