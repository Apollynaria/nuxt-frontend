<template>
    <span style="display: flex; height: 100%; width: 100%; align-items: center;">
      <img :src="'https://www.ag-grid.com/example-assets/space-company-logos/' + cellValue.toLowerCase() + '.png'" style="display: block; width: 25px; height: auto; max-height: 50%; margin-right: 12px; filter: brightness(1.1);" />
      <p style="text-overflow: ellipsis; overflow: hidden; white-space: nowrap;">{{ cellValue }}</p>
    </span>
</template>
<script lang="ts" setup>

const props = defineProps({
  params: Object,
});

const cellValue = ref(props.params.value);

</script>
<style lang="scss" scoped>
    
</style>