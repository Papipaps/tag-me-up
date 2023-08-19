<template>
  <div class="card">
    <PrimeToast />
    <FileUpload
      @select="handleSelect($event)"
      :invalidFileLimitMessage="handleFileLimit()"
      name="demo[]"
      url="./upload.php"
      :fileLimit="1"
      @upload="onAdvancedUpload($event)"
      :multiple="false"
      accept="image/*"
      :maxFileSize="1000000"
    >
      <template #empty>
        <p>Drag and drop files to here to upload.</p>
      </template>
    </FileUpload>
  </div>
</template>

<script setup lang="ts">
import { useToast } from 'primevue/usetoast'
const toast = useToast()
function handleSelect(e: any) {
  const files = e.originalEvent.target.files
  console.log(files[0])
}
function handleFileLimit(){
    console.log("oui")
    toast.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 })
    return 'oui'
}
const onAdvancedUpload = (e: any) => {
  alert(e)
  toast.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 })
}
</script>
