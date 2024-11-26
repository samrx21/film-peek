<template>
  <Button
    :label="props.label"
    :icon="props.icon"
    class="bg-backButton hover:bg-secondary/95 cursor-pointer py-2 px-4 rounded-md text-white"
    unstyled
    :class="{ 'flex gap-2 items-center': props.icon }"
  />
</template>
<script setup lang="ts">
import Button from 'primevue/button'
const props = defineProps<{
  label: string
  icon?: string
}>()
</script>
