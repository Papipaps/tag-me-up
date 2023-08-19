<script setup lang="ts">
import NavigationBar from './components/organism/NavigationBar.vue'
import ToolBox from './components/organism/ToolBox.vue'
import PinList from './components/organism/PinList.vue'
import PinMap from './components/organism/PinMap.vue'
</script>

<template>
  <!-- HEADER -->
  <NavigationBar />
<!-- MAIN SECTION -->
  <main>
    <ToolBox/>
    <PinMap/>
    <PinList/>
  </main>
</template>

<style scoped></style>
