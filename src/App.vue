<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <a-layout class="room-job">
    <a-layout-header>
      <h2 style="color: aliceblue;">ระบบจองห้อง</h2>
    </a-layout-header>
    <a-layout-content>
      <RouterView />
    </a-layout-content>
  </a-layout>
</template>

<style scoped>

</style>
