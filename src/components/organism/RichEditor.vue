<template>
  <div class="card">
      <Editor v-model="value" editorStyle="height: 320px" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const value = ref('');
</script>