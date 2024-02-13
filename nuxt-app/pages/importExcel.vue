<template>
    <div class="w-full h-[80vh]">
        <div class="p-3 space-y-8 font-[sans-serif] max-w-md mx-auto">
            <input-import-excel @rowDataIsReady="changeRowData"></input-import-excel>
        </div>
        <div class="h-full flex w-full justify-center">
            <ag-grid-vue v-if="rowData.length !== 0"
            class="ag-theme-quartz w-full h-full" 
            :rowData="rowData" 
            :columnDefs="columnDefs"
            :autoSizeStrategy="{type: 'fitGridWidth',}"
            :defaultColDef="defaultColDef"
            ></ag-grid-vue>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AgGridVue } from 'ag-grid-vue3';

const rowData = ref([]);
const countries = ref(['China', 'Russia', 'Czech Republic', 'Croatia', 'New Zealand', 'South Korea', 'Sweden', 'South Korea', 'Australia']);

const columnDefs = ref([
  { field: 'athlete', headerName: 'Athlete', minWidth: 180 },
  { field: 'age', headerName: 'Age' },
  { field: 'country', headerName: 'Country', minWidth: 150, cellEditor: 'agSelectCellEditor', cellEditorParams: { values: countries }, },
  { field: 'year', headerName: 'Year' },
  { field: 'date', headerName: 'Date', minWidth: 130 },
  { field: 'sport', headerName: 'Sport', minWidth: 100 },
  { field: 'gold', headerName: 'Gold' },
  { field: 'silver', headerName: 'Silver' },
  { field: 'bronze', headerName: 'Bronze' },
  { field: 'total', headerName: 'Total' },
]);

const defaultColDef = ref({
    filter: true,
    editable: true,
});

const changeRowData = (newRowData) => {
    rowData.value = newRowData;
};

</script>

<style>
</style>