<template>
  <div class="card">
    <Editor
      v-model="value"
      editor-style="height: 320px"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
</script>
